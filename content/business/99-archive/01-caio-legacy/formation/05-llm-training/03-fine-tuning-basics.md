# Fine-Tuning Basics

> Adapter un modèle pré-entraîné à ta tâche spécifique

---

## Qu'est-ce que le Fine-Tuning?

```
Modèle pré-entraîné (général)
         ↓
    + Dataset spécifique
         ↓
Modèle fine-tuned (spécialisé)
```

Le modèle garde ses connaissances générales mais s'adapte à ton domaine.

---

## Types de Fine-Tuning

### 1. Full Fine-Tuning

Entraîner TOUS les paramètres du modèle.

```python
# Tous les paramètres sont entraînables
for param in model.parameters():
    param.requires_grad = True

# Coûteux en mémoire et compute
# 7B modèle = ~56GB VRAM en full precision
```

**Quand l'utiliser:**
- Gros budget compute
- Besoin de performance maximale
- Dataset très différent du pré-entraînement

### 2. Parameter-Efficient Fine-Tuning (PEFT)

Entraîner seulement une petite partie des paramètres.

```
Full: 7B paramètres entraînés
PEFT: ~1-10M paramètres entraînés (0.1-1%)
```

**Méthodes PEFT:**
- **LoRA** (Low-Rank Adaptation) ← Le plus populaire
- **QLoRA** (Quantized LoRA)
- **Adapters**
- **Prefix Tuning**

---

## Full Fine-Tuning avec Hugging Face

```python
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from datasets import load_dataset

# 1. Charger le modèle
model_name = "mistralai/Mistral-7B-v0.1"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

# 2. Préparer le dataset
dataset = load_dataset("json", data_files="train_data.jsonl")

def format_example(example):
    """Formatter selon le template du modèle"""
    text = f"### Instruction:\n{example['instruction']}\n\n### Response:\n{example['output']}"
    return {"text": text}

dataset = dataset.map(format_example)

def tokenize(example):
    return tokenizer(
        example["text"],
        truncation=True,
        max_length=2048,
        padding="max_length"
    )

tokenized_dataset = dataset.map(tokenize, batched=True)

# 3. Configurer l'entraînement
training_args = TrainingArguments(
    output_dir="./output",
    num_train_epochs=3,
    per_device_train_batch_size=1,  # Petit à cause de la mémoire
    gradient_accumulation_steps=8,   # Simule batch_size=8
    learning_rate=2e-5,
    weight_decay=0.01,
    warmup_ratio=0.1,
    logging_steps=10,
    save_steps=100,
    fp16=True,  # Mixed precision
    gradient_checkpointing=True,  # Économise la mémoire
)

# 4. Data collator
data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False  # Causal LM, pas masked
)

# 5. Créer le Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset["train"],
    data_collator=data_collator,
)

# 6. Entraîner
trainer.train()

# 7. Sauvegarder
trainer.save_model("./finetuned_model")
```

---

## Supervised Fine-Tuning (SFT) avec TRL

La bibliothèque TRL simplifie le fine-tuning pour les LLMs.

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from trl import SFTTrainer, SFTConfig
from datasets import load_dataset

# Charger
model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-v0.1")
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-v0.1")

# Dataset
dataset = load_dataset("json", data_files="train_data.jsonl")

def format_prompt(example):
    return f"""### Instruction:
{example['instruction']}

### Response:
{example['output']}"""

# Config
sft_config = SFTConfig(
    output_dir="./output",
    max_seq_length=2048,
    num_train_epochs=3,
    per_device_train_batch_size=1,
    gradient_accumulation_steps=8,
    learning_rate=2e-5,
    fp16=True,
    logging_steps=10,
    save_steps=100,
)

# Trainer
trainer = SFTTrainer(
    model=model,
    args=sft_config,
    train_dataset=dataset["train"],
    formatting_func=format_prompt,
    tokenizer=tokenizer,
)

trainer.train()
```

---

## Hyperparamètres Importants

### Learning Rate

```python
# Trop grand: instabilité, divergence
# Trop petit: convergence lente, pas d'amélioration

# Valeurs typiques pour fine-tuning LLM:
learning_rate = 2e-5  # Standard
learning_rate = 5e-6  # Conservateur (petits datasets)
learning_rate = 1e-4  # Agressif (gros datasets)
```

### Batch Size et Gradient Accumulation

```python
# Effective batch size = per_device_batch_size × gradient_accumulation × num_gpus

per_device_train_batch_size = 1   # Limité par VRAM
gradient_accumulation_steps = 8   # Simule batch_size=8

# Plus grand batch = plus stable mais plus de mémoire
```

### Epochs

```python
# Pour LLM fine-tuning: 1-5 epochs typiquement
# Trop d'epochs = overfitting sur le dataset de fine-tuning
num_train_epochs = 3
```

### Warmup

```python
# Augmente progressivement le LR au début
warmup_ratio = 0.1  # 10% des steps en warmup
# Ou
warmup_steps = 100
```

---

## Économiser la Mémoire

### 1. Gradient Checkpointing

```python
# Recalcule les activations au lieu de les stocker
model.gradient_checkpointing_enable()
# Ou dans TrainingArguments:
gradient_checkpointing=True
```

### 2. Mixed Precision

```python
# Float16 au lieu de Float32
training_args = TrainingArguments(
    fp16=True,  # Pour NVIDIA et AMD
    # bf16=True,  # Alternative, meilleure stabilité
)
```

### 3. Réduire la Longueur de Séquence

```python
max_seq_length = 1024  # Au lieu de 4096
# Impact: modèle voit moins de contexte
```

### 4. Gradient Accumulation

```python
per_device_train_batch_size = 1
gradient_accumulation_steps = 16
# Batch effectif de 16 mais mémoire pour 1
```

---

## Évaluation Pendant l'Entraînement

```python
from transformers import TrainingArguments, Trainer

training_args = TrainingArguments(
    # ...
    evaluation_strategy="steps",
    eval_steps=100,
    load_best_model_at_end=True,
    metric_for_best_model="eval_loss",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,  # Important!
)
```

---

## Exemple Complet

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from trl import SFTTrainer, SFTConfig
from datasets import load_dataset

# 1. Setup
model_name = "mistralai/Mistral-7B-v0.1"
device = "cuda" if torch.cuda.is_available() else "cpu"

# 2. Charger modèle et tokenizer
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16,
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

# 3. Activer gradient checkpointing
model.gradient_checkpointing_enable()

# 4. Dataset
dataset = load_dataset("json", data_files={
    "train": "train.jsonl",
    "validation": "val.jsonl"
})

def format_example(example):
    return f"""<s>[INST] {example['instruction']} [/INST] {example['output']}</s>"""

# 5. Config
config = SFTConfig(
    output_dir="./mistral-finetuned",
    max_seq_length=2048,
    num_train_epochs=3,
    per_device_train_batch_size=1,
    per_device_eval_batch_size=1,
    gradient_accumulation_steps=8,
    learning_rate=2e-5,
    weight_decay=0.01,
    warmup_ratio=0.1,
    fp16=True,
    logging_steps=10,
    save_steps=100,
    evaluation_strategy="steps",
    eval_steps=100,
    load_best_model_at_end=True,
)

# 6. Trainer
trainer = SFTTrainer(
    model=model,
    args=config,
    train_dataset=dataset["train"],
    eval_dataset=dataset["validation"],
    formatting_func=format_example,
    tokenizer=tokenizer,
)

# 7. Train
trainer.train()

# 8. Save
trainer.save_model("./mistral-finetuned-final")
tokenizer.save_pretrained("./mistral-finetuned-final")
```

---

## Résumé

| Aspect | Recommandation |
|--------|----------------|
| Learning Rate | 2e-5 (ajuster si nécessaire) |
| Epochs | 1-5 |
| Batch Size | 1 + gradient accumulation |
| Mixed Precision | fp16 ou bf16 |
| Gradient Checkpointing | Activé |
| Warmup | 10% des steps |

---

*Prochaine étape: `04-lora-qlora.md` (PEFT - plus efficace!)*
