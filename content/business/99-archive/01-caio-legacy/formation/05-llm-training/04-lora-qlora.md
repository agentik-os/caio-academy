# LoRA et QLoRA

> Parameter-Efficient Fine-Tuning - la méthode moderne pour fine-tuner les LLMs

---

## Le Problème du Full Fine-Tuning

```
Mistral 7B Full Fine-Tuning:
- Paramètres: 7 milliards
- VRAM: ~56GB (fp16) ou ~28GB avec gradient checkpointing
- Stockage: 14GB par checkpoint
```

**LoRA résout ça en entraînant seulement ~0.1% des paramètres.**

---

## Comment LoRA Fonctionne

### L'Intuition

Au lieu de modifier directement les poids W, on ajoute une "mise à jour" de faible rang.

```
Original:     y = W × x           (W est une matrice gigante)

Avec LoRA:    y = W × x + B × A × x
                  ↑         ↑   ↑
              (gelé)    (petit) (petit)
```

### Mathématiquement

```
W' = W + ΔW
ΔW = B × A

Où:
- W: matrice originale (ex: 4096 × 4096)
- A: matrice de rang r (ex: 4096 × 8)
- B: matrice de rang r (ex: 8 × 4096)

Paramètres originaux: 4096 × 4096 = 16M
Paramètres LoRA:     4096 × 8 + 8 × 4096 = 65K
Réduction: 99.6%
```

---

## Implémentation avec PEFT

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model, TaskType
import torch

# 1. Charger le modèle base
model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    torch_dtype=torch.float16,
    device_map="auto"
)

# 2. Configurer LoRA
lora_config = LoraConfig(
    r=8,                       # Rang (plus grand = plus de capacité)
    lora_alpha=32,             # Scaling factor
    target_modules=[           # Quels modules adapter
        "q_proj", "k_proj", "v_proj", "o_proj",  # Attention
        "gate_proj", "up_proj", "down_proj"       # MLP
    ],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

# 3. Appliquer LoRA
model = get_peft_model(model, lora_config)

# 4. Voir le nombre de paramètres entraînables
model.print_trainable_parameters()
# trainable params: 4,194,304 || all params: 7,245,967,360 || trainable%: 0.058
```

---

## QLoRA (Quantized LoRA)

Combine LoRA avec quantization 4-bit = fine-tuning sur un seul GPU!

```python
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
import torch

# 1. Config quantization 4-bit
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)

# 2. Charger le modèle quantifié
model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    quantization_config=bnb_config,
    device_map="auto"
)

# 3. Préparer pour l'entraînement
model = prepare_model_for_kbit_training(model)

# 4. Ajouter LoRA
lora_config = LoraConfig(
    r=16,                      # Plus grand r car modèle quantifié
    lora_alpha=32,
    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj"
    ],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
```

---

## Training avec TRL + QLoRA

```python
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import LoraConfig, prepare_model_for_kbit_training
from trl import SFTTrainer, SFTConfig
from datasets import load_dataset
import torch

# Config
model_name = "mistralai/Mistral-7B-v0.1"

# Quantization
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)

# Modèle
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
    device_map="auto"
)
model = prepare_model_for_kbit_training(model)

# Tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

# LoRA
peft_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                    "gate_proj", "up_proj", "down_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# Dataset
dataset = load_dataset("json", data_files="data.jsonl")

def format_prompt(example):
    return f"<s>[INST] {example['instruction']} [/INST] {example['output']}</s>"

# Training config
training_args = SFTConfig(
    output_dir="./qlora-output",
    max_seq_length=2048,
    num_train_epochs=3,
    per_device_train_batch_size=4,  # Plus grand avec QLoRA!
    gradient_accumulation_steps=4,
    learning_rate=2e-4,             # Plus grand LR pour LoRA
    weight_decay=0.01,
    warmup_ratio=0.03,
    fp16=True,
    logging_steps=10,
    save_steps=100,
    optim="paged_adamw_8bit",       # Optimizer efficace
)

# Trainer
trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    peft_config=peft_config,
    formatting_func=format_prompt,
    tokenizer=tokenizer,
)

# Train
trainer.train()

# Save (seulement les poids LoRA, ~50MB!)
trainer.save_model("./qlora-adapter")
```

---

## Hyperparamètres LoRA

### Rang (r)

```python
r = 8    # Petit: moins de capacité, plus rapide
r = 16   # Standard
r = 64   # Grand: plus de capacité, plus lent
r = 256  # Très grand: proche du full fine-tuning
```

### Alpha (lora_alpha)

```python
# Scaling factor: actual_weight = (alpha / r) * LoRA_weight
lora_alpha = 16  # Standard
lora_alpha = 32  # Plus d'influence des poids LoRA

# Règle: alpha = 2 × r est souvent un bon choix
```

### Target Modules

```python
# Modules à adapter (dépend de l'architecture)

# Mistral/Llama
target_modules = [
    "q_proj", "k_proj", "v_proj", "o_proj",  # Attention
    "gate_proj", "up_proj", "down_proj"       # MLP (feedforward)
]

# BERT
target_modules = ["query", "key", "value", "dense"]

# Pour trouver les modules disponibles:
print(model)
```

---

## Fusionner les Poids LoRA

Après l'entraînement, tu peux fusionner LoRA avec le modèle base.

```python
from peft import PeftModel

# Charger le modèle base
base_model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    torch_dtype=torch.float16
)

# Charger l'adapter LoRA
model = PeftModel.from_pretrained(base_model, "./qlora-adapter")

# Fusionner
merged_model = model.merge_and_unload()

# Sauvegarder le modèle fusionné
merged_model.save_pretrained("./merged-model")
tokenizer.save_pretrained("./merged-model")
```

---

## Comparaison des Méthodes

| Méthode | VRAM (7B) | Params entraînés | Stockage adapter |
|---------|-----------|------------------|------------------|
| Full FT | ~56GB | 7B (100%) | 14GB |
| LoRA | ~28GB | ~4M (0.06%) | ~50MB |
| QLoRA | ~8GB | ~4M (0.06%) | ~50MB |

---

## Résumé

```
QLoRA = La méthode recommandée pour fine-tuner des LLMs

Avantages:
✓ Fine-tune un 7B sur un GPU 8GB
✓ Adapters légers (~50MB)
✓ Performance proche du full fine-tuning
✓ Facile à partager et combiner

Hyperparamètres recommandés:
- r: 16-64
- alpha: 2 × r
- target_modules: tous les projections attention + MLP
- learning_rate: 2e-4 (plus grand que full FT)
- optimizer: paged_adamw_8bit
```

---

*Prochaine étape: `05-rlhf.md`*
