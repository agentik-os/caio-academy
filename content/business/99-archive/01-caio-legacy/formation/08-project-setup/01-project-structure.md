# Structure de Projet ML

Organisation professionnelle pour un projet de fine-tuning LLM

## Structure Recommandée

Une organisation claire du projet facilite la collaboration, la reproductibilité et la maintenance. Voici une structure type pour un projet de fine-tuning LLM :

```
projet-llm/
├── README.md                 # Documentation principale
├── CLAUDE.md                 # Instructions pour Claude Code
├── pyproject.toml            # Config Python moderne
├── requirements.txt          # Dépendances (backup)
│
├── configs/                  # Configurations
│   ├── training/
│   │   ├── base.yaml         # Config par défaut
│   │   ├── qlora.yaml        # Config QLoRA
│   │   └── full_ft.yaml      # Config full fine-tuning
│   └── evaluation/
│       └── benchmarks.yaml
│
├── data/                     # Datasets (gitignore les gros fichiers)
│   ├── raw/                  # Données brutes
│   ├── processed/            # Données nettoyées
│   ├── train.jsonl
│   ├── validation.jsonl
│   └── test.jsonl
│
├── src/                      # Code source
│   ├── __init__.py
│   ├── data/
│   │   ├── __init__.py
│   │   ├── dataset.py        # Classes Dataset
│   │   ├── preprocessing.py  # Nettoyage
│   │   └── tokenization.py   # Tokenization
│   ├── models/
│   │   ├── __init__.py
│   │   └── model.py          # Model wrappers
│   ├── training/
│   │   ├── __init__.py
│   │   ├── trainer.py        # Training loop
│   │   └── callbacks.py      # Custom callbacks
│   └── evaluation/
│       ├── __init__.py
│       ├── metrics.py        # Métriques custom
│       └── benchmark.py      # Benchmarks
│
├── scripts/                  # Scripts exécutables
│   ├── train.py              # Entraînement
│   ├── evaluate.py           # Évaluation
│   ├── inference.py          # Inférence
│   └── prepare_data.py       # Préparation données
│
├── notebooks/                # Jupyter notebooks
│   ├── 01_data_exploration.ipynb
│   ├── 02_training_experiments.ipynb
│   └── 03_evaluation_analysis.ipynb
│
├── outputs/                  # Outputs (gitignore)
│   ├── checkpoints/          # Model checkpoints
│   ├── logs/                 # Training logs
│   └── results/              # Evaluation results
│
├── tests/                    # Tests
│   ├── test_data.py
│   ├── test_training.py
│   └── test_evaluation.py
│
└── .mcp.json                 # Config MCP servers
```

Cette structure sépare clairement les préoccupations : configuration, données, code source, scripts, notebooks d'exploration, outputs, et tests.

## Fichiers de Config

### pyproject.toml

Le fichier `pyproject.toml` est le standard moderne pour configurer les projets Python :

```toml
[project]
name = "llm-finetuning"
version = "0.1.0"
description = "LLM Fine-tuning for internal chatbot"
requires-python = ">=3.10"

dependencies = [
    "torch>=2.0.0",
    "transformers>=4.35.0",
    "datasets>=2.14.0",
    "peft>=0.6.0",
    "trl>=0.7.0",
    "accelerate>=0.24.0",
    "bitsandbytes>=0.41.0",
    "wandb>=0.16.0",
    "evaluate>=0.4.0",
    "scikit-learn>=1.3.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0.0",
    "black>=23.0.0",
    "ruff>=0.1.0",
    "jupyter>=1.0.0",
]

[tool.black]
line-length = 100

[tool.ruff]
line-length = 100
select = ["E", "F", "I"]
```

Cette configuration définit les dépendances principales et les outils de développement optionnels. Black et Ruff assurent un style de code cohérent.

### configs/training/qlora.yaml

Un fichier de configuration pour QLoRA (Quantized Low-Rank Adaptation) :

```yaml
# Model
model_name: "mistralai/Mistral-7B-v0.1"
model_max_length: 2048

# LoRA
lora:
  r: 16
  lora_alpha: 32
  target_modules:
    - q_proj
    - k_proj
    - v_proj
    - o_proj
    - gate_proj
    - up_proj
    - down_proj
  lora_dropout: 0.05

# Quantization
quantization:
  load_in_4bit: true
  bnb_4bit_quant_type: "nf4"
  bnb_4bit_compute_dtype: "float16"

# Training
training:
  num_epochs: 3
  batch_size: 4
  gradient_accumulation_steps: 4
  learning_rate: 2e-4
  warmup_ratio: 0.03
  weight_decay: 0.01
  max_grad_norm: 1.0

# Optimizer
optimizer: "paged_adamw_8bit"

# Logging
logging:
  logging_steps: 10
  save_steps: 100
  eval_steps: 100

# Output
output_dir: "./outputs/qlora-run"
```

Cette configuration centralise tous les hyperparamètres, facilitant les expériences et la reproductibilité.

## Script d'Entraînement Type

Un script d'entraînement complet qui charge la configuration et lance le fine-tuning :

```python
# scripts/train.py
import argparse
import yaml
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from trl import SFTTrainer, SFTConfig
from datasets import load_dataset

def load_config(config_path):
    with open(config_path) as f:
        return yaml.safe_load(f)

def main(config_path):
    config = load_config(config_path)

    # Quantization
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=config['quantization']['load_in_4bit'],
        bnb_4bit_quant_type=config['quantization']['bnb_4bit_quant_type'],
        bnb_4bit_compute_dtype=getattr(torch, config['quantization']['bnb_4bit_compute_dtype']),
    )

    # Model
    model = AutoModelForCausalLM.from_pretrained(
        config['model_name'],
        quantization_config=bnb_config,
        device_map="auto"
    )
    model = prepare_model_for_kbit_training(model)

    tokenizer = AutoTokenizer.from_pretrained(config['model_name'])
    tokenizer.pad_token = tokenizer.eos_token

    # LoRA
    peft_config = LoraConfig(
        r=config['lora']['r'],
        lora_alpha=config['lora']['lora_alpha'],
        target_modules=config['lora']['target_modules'],
        lora_dropout=config['lora']['lora_dropout'],
        bias="none",
        task_type="CAUSAL_LM"
    )

    # Dataset
    dataset = load_dataset("json", data_files={
        "train": "data/train.jsonl",
        "validation": "data/validation.jsonl"
    })

    # Training args
    training_args = SFTConfig(
        output_dir=config['output_dir'],
        num_train_epochs=config['training']['num_epochs'],
        per_device_train_batch_size=config['training']['batch_size'],
        gradient_accumulation_steps=config['training']['gradient_accumulation_steps'],
        learning_rate=config['training']['learning_rate'],
        warmup_ratio=config['training']['warmup_ratio'],
        weight_decay=config['training']['weight_decay'],
        max_grad_norm=config['training']['max_grad_norm'],
        logging_steps=config['logging']['logging_steps'],
        save_steps=config['logging']['save_steps'],
        eval_steps=config['logging']['eval_steps'],
        evaluation_strategy="steps",
        fp16=True,
        optim=config['optimizer'],
        max_seq_length=config['model_max_length'],
    )

    # Trainer
    trainer = SFTTrainer(
        model=model,
        args=training_args,
        train_dataset=dataset["train"],
        eval_dataset=dataset["validation"],
        peft_config=peft_config,
        tokenizer=tokenizer,
    )

    # Train
    trainer.train()
    trainer.save_model(f"{config['output_dir']}/final")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", default="configs/training/qlora.yaml")
    args = parser.parse_args()
    main(args.config)
```

Ce script est modulaire et paramétrable, permettant de tester différentes configurations facilement.

## .gitignore

Un fichier `.gitignore` approprié évite de committer des fichiers inutiles ou sensibles :

```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
.pytest_cache/
*.egg-info/

# Environments
venv/
.venv/
env/

# Data (gros fichiers)
data/raw/
data/processed/*.jsonl
*.parquet

# Outputs
outputs/
checkpoints/
*.pt
*.safetensors

# Logs
logs/
wandb/
*.log

# IDE
.idea/
.vscode/
*.swp

# Jupyter
.ipynb_checkpoints/

# Secrets
.env
*.key
credentials.json
```

## Workflow Typique

Le workflow de développement suit ces étapes :

```bash
# 1. Setup
git clone <repo>
cd projet-llm
python -m venv venv
source venv/bin/activate
pip install -e ".[dev]"

# 2. Préparer les données
python scripts/prepare_data.py --input raw_data.csv --output data/

# 3. Explorer (notebook)
jupyter lab notebooks/01_data_exploration.ipynb

# 4. Entraîner
python scripts/train.py --config configs/training/qlora.yaml

# 5. Évaluer
python scripts/evaluate.py --model outputs/qlora-run/final

# 6. Inférence
python scripts/inference.py --model outputs/qlora-run/final --prompt "..."
```

Cette structure et ce workflow fournissent une base solide pour un projet ML professionnel, facilitant la collaboration, l'expérimentation, et la mise en production.

*Documentation complète créée! Tu as maintenant une roadmap complète pour te former au ML/AI Engineering.*
