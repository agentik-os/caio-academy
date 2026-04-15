# AMD ROCm Setup pour PyTorch

> **CRITIQUE**: La mission utilise des GPUs AMD, pas NVIDIA!
> Donc pas de CUDA, mais ROCm (Radeon Open Compute)

---

## NVIDIA vs AMD: Les Différences

| Aspect | NVIDIA | AMD |
|--------|--------|-----|
| SDK | CUDA | ROCm |
| PyTorch device | `cuda` | `cuda` (oui, même nom!) |
| Bibliothèque math | cuDNN | MIOpen |
| Profiler | Nsight | rocprof |
| Support | Excellent | En amélioration |

### La Bonne Nouvelle

PyTorch utilise `cuda` comme device même pour AMD ROCm.
Ton code reste le même!

```python
# Fonctionne pour NVIDIA ET AMD
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)
```

---

## Installation ROCm

### Prérequis

- Linux (Ubuntu 22.04 recommandé)
- GPU AMD supporté:
  - MI100, MI200, MI300 (datacenter)
  - RX 7900 XTX, RX 7900 XT (consumer)
  - Radeon PRO (workstation)

### Étape 1: Installer ROCm

```bash
# Ubuntu 22.04
wget https://repo.radeon.com/amdgpu-install/6.0/ubuntu/jammy/amdgpu-install_6.0.60000-1_all.deb
sudo apt install ./amdgpu-install_6.0.60000-1_all.deb
sudo amdgpu-install --usecase=rocm

# Ajouter l'utilisateur au groupe
sudo usermod -a -G render,video $USER

# Reboot
sudo reboot
```

### Étape 2: Vérifier l'Installation

```bash
# Vérifier que le GPU est détecté
rocm-smi

# Affiche quelque chose comme:
# ======================= ROCm System Management Interface =======================
# GPU  Temp   AvgPwr  SCLK    MCLK    Fan     Perf    PwrCap  VRAM%  GPU%
# 0    45c    30W     300Mhz  1200Mhz 0%      auto    250W    0%     0%

# Version ROCm
cat /opt/rocm/.info/version
```

### Étape 3: Installer PyTorch pour ROCm

```bash
# Créer un environnement
conda create -n pytorch-rocm python=3.11 -y
conda activate pytorch-rocm

# Installer PyTorch pour ROCm 5.7
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm5.7

# Ou ROCm 6.0 (plus récent)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.0
```

### Étape 4: Vérifier PyTorch + ROCm

```python
import torch

print(f"PyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")  # True si ROCm OK
print(f"CUDA version: {torch.version.cuda}")           # ROCm version
print(f"Device count: {torch.cuda.device_count()}")
print(f"Device name: {torch.cuda.get_device_name(0)}")

# Test simple
x = torch.randn(3, 3).cuda()
print(x)
```

---

## Utilisation en Code

### Device Management

```python
import torch

# Détecter le device
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# Transférer vers GPU
tensor = torch.randn(1000, 1000)
tensor_gpu = tensor.to(device)
# ou
tensor_gpu = tensor.cuda()

# Transférer vers CPU
tensor_cpu = tensor_gpu.cpu()

# Créer directement sur GPU
tensor = torch.randn(1000, 1000, device=device)
```

### Modèle sur GPU

```python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Linear(256, 10)
)

# Transférer le modèle
model = model.to(device)

# Forward pass
x = torch.randn(32, 784, device=device)
output = model(x)  # Calcul sur GPU
```

### DataLoader avec GPU

```python
from torch.utils.data import DataLoader

train_loader = DataLoader(
    dataset,
    batch_size=32,
    shuffle=True,
    num_workers=4,
    pin_memory=True  # Accélère le transfert CPU→GPU
)

for batch in train_loader:
    inputs, labels = batch
    inputs = inputs.to(device, non_blocking=True)  # Transfert async
    labels = labels.to(device, non_blocking=True)

    outputs = model(inputs)
    # ...
```

---

## Différences avec NVIDIA à Connaître

### 1. Performance

```
NVIDIA A100 vs AMD MI250:
- Généralement comparable
- AMD peut être moins optimisé pour certaines opérations
- Flash Attention: support AMD ajouté récemment
```

### 2. Bibliothèques

```python
# Certaines libs sont CUDA-only, vérifier la compatibilité:
# - bitsandbytes: Support AMD en beta
# - DeepSpeed: Support AMD
# - FSDP: Support AMD
# - Flash Attention: Support AMD (flash-attn >= 2.0)

# Installation Flash Attention pour AMD
pip install flash-attn --no-build-isolation
```

### 3. Debugging

```bash
# Variables d'environnement utiles
export AMD_LOG_LEVEL=1        # Logs AMD
export HIP_VISIBLE_DEVICES=0  # Équivalent CUDA_VISIBLE_DEVICES
export ROCM_PATH=/opt/rocm

# Profiling
rocprof --stats python train.py
```

---

## Problèmes Courants

### "No GPU detected"

```bash
# Vérifier les permissions
groups $USER  # Doit contenir render et video

# Vérifier le driver
dmesg | grep amdgpu

# Vérifier ROCm
rocm-smi
```

### "Out of Memory"

```python
# Réduire le batch size
batch_size = 8  # au lieu de 32

# Gradient checkpointing
model.gradient_checkpointing_enable()

# Mixed precision
from torch.cuda.amp import autocast
with autocast():
    output = model(input)
```

### "Slow Performance"

```python
# Utiliser le bon format de données
# Channels-first: (N, C, H, W) - standard pour PyTorch

# Désactiver le debug
torch.backends.cudnn.benchmark = True

# Compiler le modèle (PyTorch 2.0+)
model = torch.compile(model)
```

---

## Configuration pour Hugging Face

```python
from transformers import AutoModelForCausalLM, TrainingArguments

# Le modèle détecte automatiquement ROCm
model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    torch_dtype=torch.float16,
    device_map="auto"  # Distribue sur les GPUs disponibles
)

# Training arguments pour AMD
training_args = TrainingArguments(
    output_dir="./output",
    per_device_train_batch_size=4,  # Ajuster selon VRAM
    gradient_accumulation_steps=8,
    fp16=True,  # Mixed precision (fonctionne sur AMD)
    # bf16=True,  # Alternative si supporté par le GPU
)
```

---

## Résumé: Checklist AMD Setup

```
[ ] ROCm installé et version vérifiée
[ ] Utilisateur dans groupes render et video
[ ] rocm-smi détecte le GPU
[ ] PyTorch installé avec index rocm
[ ] torch.cuda.is_available() retourne True
[ ] Test simple (tensor sur GPU) fonctionne
[ ] Modèle simple s'entraîne sans erreur
```

---

## Ressources

- [PyTorch ROCm Docs](https://pytorch.org/get-started/locally/)
- [ROCm Documentation](https://rocm.docs.amd.com/)
- [Hugging Face + AMD](https://huggingface.co/docs/transformers/perf_train_gpu_one)

---

*Prochaine étape: `03-training-loop.md`*
