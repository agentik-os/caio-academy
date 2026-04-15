# Distributed Training (Multi-GPU)

> Entraîner sur plusieurs GPUs pour aller plus vite

---

## Pourquoi Multi-GPU?

```
1 GPU:  [=========] 10 heures
4 GPUs: [==] 2.5 heures (idéal)
        [===] 3 heures (réaliste avec overhead)
```

**Use cases:**
- Modèles trop gros pour 1 GPU (LLMs)
- Accélérer l'entraînement
- Plus gros batch sizes

---

## Les Stratégies

### 1. Data Parallelism (DP)

```
Le MÊME modèle sur chaque GPU, données différentes

GPU 0: [Model] ← Batch 1
GPU 1: [Model] ← Batch 2
GPU 2: [Model] ← Batch 3
GPU 3: [Model] ← Batch 4
           ↓
    Synchronisation des gradients
           ↓
       Update global
```

### 2. Model Parallelism (MP)

```
Le modèle est SPLIT entre les GPUs

GPU 0: [Layers 1-6]  →  GPU 1: [Layers 7-12]
           ↓                      ↓
      Forward pass            Forward pass
```

### 3. Fully Sharded Data Parallel (FSDP)

```
Combine Data + Model parallelism
Chaque GPU a une partie du modèle ET des données
Économise la mémoire
```

---

## Data Parallel Simple (DDP)

### Setup Minimal

```python
import torch
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP
from torch.utils.data.distributed import DistributedSampler

def setup(rank, world_size):
    """Initialise le process group"""
    dist.init_process_group(
        backend="nccl",  # ou "gloo" pour CPU
        init_method="env://",
        world_size=world_size,
        rank=rank
    )
    torch.cuda.set_device(rank)

def cleanup():
    dist.destroy_process_group()

def train(rank, world_size):
    setup(rank, world_size)

    # Créer le modèle
    model = MyModel().to(rank)
    model = DDP(model, device_ids=[rank])

    # Dataset avec DistributedSampler
    dataset = MyDataset()
    sampler = DistributedSampler(dataset, num_replicas=world_size, rank=rank)
    dataloader = DataLoader(dataset, batch_size=32, sampler=sampler)

    # Training loop
    for epoch in range(num_epochs):
        sampler.set_epoch(epoch)  # Important pour le shuffle!

        for batch in dataloader:
            inputs = batch[0].to(rank)
            labels = batch[1].to(rank)

            outputs = model(inputs)
            loss = criterion(outputs, labels)

            loss.backward()
            optimizer.step()
            optimizer.zero_grad()

    cleanup()

# Lancer
import torch.multiprocessing as mp

if __name__ == "__main__":
    world_size = torch.cuda.device_count()
    mp.spawn(train, args=(world_size,), nprocs=world_size, join=True)
```

### Lancer avec torchrun (Recommandé)

```bash
# train.py doit utiliser les variables d'environnement
torchrun --nproc_per_node=4 train.py

# Ou sur plusieurs machines
torchrun --nnodes=2 --nproc_per_node=4 --node_rank=0 --master_addr=IP --master_port=1234 train.py
```

```python
# train.py
import os
import torch
import torch.distributed as dist

def main():
    # torchrun définit ces variables automatiquement
    local_rank = int(os.environ["LOCAL_RANK"])
    world_size = int(os.environ["WORLD_SIZE"])

    dist.init_process_group(backend="nccl")
    torch.cuda.set_device(local_rank)

    # ... reste du code
```

---

## Avec Hugging Face Accelerate (Simplifié)

### Installation

```bash
pip install accelerate
accelerate config  # Configuration interactive
```

### Code

```python
from accelerate import Accelerator

accelerator = Accelerator()

# Préparation automatique
model, optimizer, train_loader = accelerator.prepare(
    model, optimizer, train_loader
)

# Training loop (presque inchangé!)
for batch in train_loader:
    outputs = model(**batch)
    loss = outputs.loss

    accelerator.backward(loss)  # Au lieu de loss.backward()
    optimizer.step()
    optimizer.zero_grad()

# Sauvegarder
accelerator.save_state("checkpoint/")
```

### Lancer

```bash
# Single GPU
python train.py

# Multi-GPU
accelerate launch --num_processes=4 train.py
```

---

## FSDP (Pour Gros Modèles)

```python
from torch.distributed.fsdp import FullyShardedDataParallel as FSDP
from torch.distributed.fsdp import MixedPrecision
from torch.distributed.fsdp.wrap import transformer_auto_wrap_policy

# Policy de wrapping (quels layers shardé)
wrap_policy = transformer_auto_wrap_policy(
    transformer_layer_cls={TransformerBlock}
)

# Mixed precision
mixed_precision = MixedPrecision(
    param_dtype=torch.float16,
    reduce_dtype=torch.float16,
    buffer_dtype=torch.float16
)

# Wrapper FSDP
model = FSDP(
    model,
    auto_wrap_policy=wrap_policy,
    mixed_precision=mixed_precision,
    device_id=local_rank
)
```

### Avec Accelerate

```python
from accelerate import Accelerator, FullyShardedDataParallelPlugin
from torch.distributed.fsdp import ShardingStrategy

fsdp_plugin = FullyShardedDataParallelPlugin(
    sharding_strategy=ShardingStrategy.FULL_SHARD,
    mixed_precision_policy=mixed_precision_policy,
)

accelerator = Accelerator(fsdp_plugin=fsdp_plugin)
```

---

## DeepSpeed (Alternative Populaire)

```bash
pip install deepspeed
```

```python
import deepspeed

model_engine, optimizer, _, _ = deepspeed.initialize(
    args=args,
    model=model,
    model_parameters=model.parameters(),
    config="deepspeed_config.json"
)

for batch in train_loader:
    outputs = model_engine(batch)
    loss = outputs.loss

    model_engine.backward(loss)
    model_engine.step()
```

### deepspeed_config.json

```json
{
    "train_batch_size": 32,
    "gradient_accumulation_steps": 4,
    "fp16": {
        "enabled": true
    },
    "zero_optimization": {
        "stage": 2,
        "offload_optimizer": {
            "device": "cpu"
        }
    }
}
```

---

## AMD ROCm: Considérations

### Backend

```python
# Pour AMD, utiliser RCCL (ROCm Collective Communications Library)
dist.init_process_group(backend="nccl")  # Même nom, mais utilise RCCL
```

### Variables d'Environnement

```bash
# Équivalent de CUDA_VISIBLE_DEVICES
export HIP_VISIBLE_DEVICES=0,1,2,3
export ROCR_VISIBLE_DEVICES=0,1,2,3
```

### Vérifier Multi-GPU

```python
import torch

print(f"Number of GPUs: {torch.cuda.device_count()}")
for i in range(torch.cuda.device_count()):
    print(f"  GPU {i}: {torch.cuda.get_device_name(i)}")
```

---

## Résumé: Quand Utiliser Quoi

| Situation | Solution |
|-----------|----------|
| Modèle tient sur 1 GPU | DDP simple |
| Modèle trop gros | FSDP ou DeepSpeed ZeRO |
| Code simple, flexibilité | Accelerate |
| Très gros modèles, optimisations avancées | DeepSpeed |
| Production Hugging Face | Accelerate |

---

## Checklist Multi-GPU

```
[ ] torch.cuda.device_count() > 1
[ ] DistributedSampler pour les données
[ ] sampler.set_epoch(epoch) à chaque epoch
[ ] DDP ou FSDP wrapper sur le modèle
[ ] Sauvegarder avec accelerator ou sur rank 0 seulement
[ ] Tester avec torchrun ou accelerate launch
```

---

*Phase 3 complète! Prochaine phase: `docs/04-datasets/`*
