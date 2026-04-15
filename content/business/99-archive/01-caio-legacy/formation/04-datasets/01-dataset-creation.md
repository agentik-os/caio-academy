# Création de Datasets

> La qualité du dataset = la qualité du modèle

---

## Pourquoi C'est Critique

```
"Garbage in, garbage out"

Même le meilleur modèle ne peut pas compenser un mauvais dataset.
Pour la mission: le dataset QUALIFIÉ est le cœur du projet.
```

---

## Types de Données pour LLMs

### 1. Instruction-Following (Fine-tuning)

```json
{
  "instruction": "Résume ce texte en 3 points",
  "input": "Le machine learning est une branche de l'IA...",
  "output": "1. Le ML permet aux machines d'apprendre\n2. ..."
}
```

### 2. Conversationnel (Chat)

```json
{
  "messages": [
    {"role": "system", "content": "Tu es un assistant helpful"},
    {"role": "user", "content": "Qu'est-ce que Python?"},
    {"role": "assistant", "content": "Python est un langage..."}
  ]
}
```

### 3. Question-Réponse

```json
{
  "context": "Paris est la capitale de la France...",
  "question": "Quelle est la capitale de la France?",
  "answer": "Paris"
}
```

### 4. Classification

```json
{
  "text": "Ce produit est excellent!",
  "label": "positive"
}
```

---

## Sources de Données

### 1. Données Internes (Mission)

```python
# Extraire depuis une base de données
import pandas as pd

df = pd.read_sql("""
    SELECT question, answer, category
    FROM support_tickets
    WHERE resolved = true
    AND quality_score >= 4
""", connection)

# Convertir au format requis
dataset = []
for _, row in df.iterrows():
    dataset.append({
        "instruction": row['question'],
        "output": row['answer'],
        "category": row['category']
    })
```

### 2. Données Existantes (Hugging Face Hub)

```python
from datasets import load_dataset

# Datasets populaires
squad = load_dataset("squad")           # Q&A
imdb = load_dataset("imdb")             # Sentiment
alpaca = load_dataset("tatsu-lab/alpaca")  # Instructions
```

### 3. Données Synthétiques (Générées par IA)

```python
from openai import OpenAI

client = OpenAI()

def generate_training_example(topic):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{
            "role": "user",
            "content": f"""Generate a training example about {topic}:
            Format:
            Question: [user question]
            Answer: [detailed answer]"""
        }]
    )
    # Parser la réponse
    return parse_qa(response.choices[0].message.content)
```

---

## Formats Standards

### JSON Lines (.jsonl) - Recommandé

```jsonl
{"instruction": "Question 1", "output": "Réponse 1"}
{"instruction": "Question 2", "output": "Réponse 2"}
{"instruction": "Question 3", "output": "Réponse 3"}
```

```python
import json

# Lire
with open('data.jsonl', 'r') as f:
    data = [json.loads(line) for line in f]

# Écrire
with open('data.jsonl', 'w') as f:
    for item in data:
        f.write(json.dumps(item) + '\n')
```

### Parquet (Efficace pour gros datasets)

```python
import pandas as pd

# Lire
df = pd.read_parquet('data.parquet')

# Écrire
df.to_parquet('data.parquet')

# Avec Hugging Face datasets
from datasets import Dataset
dataset = Dataset.from_parquet('data.parquet')
```

### CSV (Simple mais limité)

```python
import pandas as pd

df = pd.read_csv('data.csv')
# Attention aux problèmes d'échappement avec du texte long
```

---

## Structure de Dataset

### Pour Fine-tuning LLM

```python
# Format Alpaca (populaire)
{
    "instruction": str,  # La tâche/question
    "input": str,        # Contexte additionnel (optionnel)
    "output": str        # La réponse attendue
}

# Format ShareGPT (conversations)
{
    "conversations": [
        {"from": "human", "value": "..."},
        {"from": "gpt", "value": "..."},
        {"from": "human", "value": "..."},
        {"from": "gpt", "value": "..."}
    ]
}

# Format OpenAI/ChatML
{
    "messages": [
        {"role": "system", "content": "..."},
        {"role": "user", "content": "..."},
        {"role": "assistant", "content": "..."}
    ]
}
```

---

## Exemple: Pipeline de Création

```python
import json
import pandas as pd
from tqdm import tqdm

class DatasetCreator:
    def __init__(self, source_path):
        self.source_path = source_path
        self.data = []

    def load_raw_data(self):
        """Charger les données brutes"""
        self.raw_data = pd.read_csv(self.source_path)
        print(f"Loaded {len(self.raw_data)} raw samples")

    def clean_data(self):
        """Nettoyer les données"""
        # Supprimer les doublons
        self.raw_data = self.raw_data.drop_duplicates()

        # Supprimer les lignes vides
        self.raw_data = self.raw_data.dropna(subset=['question', 'answer'])

        # Supprimer les réponses trop courtes
        self.raw_data = self.raw_data[self.raw_data['answer'].str.len() > 10]

        print(f"After cleaning: {len(self.raw_data)} samples")

    def format_data(self):
        """Convertir au format cible"""
        for _, row in tqdm(self.raw_data.iterrows(), desc="Formatting"):
            self.data.append({
                "instruction": self.clean_text(row['question']),
                "input": "",
                "output": self.clean_text(row['answer'])
            })

    def clean_text(self, text):
        """Nettoyer un texte"""
        if pd.isna(text):
            return ""
        text = str(text).strip()
        text = ' '.join(text.split())  # Normaliser les espaces
        return text

    def validate(self):
        """Valider le dataset"""
        valid = []
        for item in tqdm(self.data, desc="Validating"):
            if self.is_valid(item):
                valid.append(item)
        self.data = valid
        print(f"After validation: {len(self.data)} samples")

    def is_valid(self, item):
        """Vérifier qu'un sample est valide"""
        if not item['instruction'] or not item['output']:
            return False
        if len(item['instruction']) < 10:
            return False
        if len(item['output']) < 20:
            return False
        return True

    def save(self, output_path):
        """Sauvegarder le dataset"""
        with open(output_path, 'w', encoding='utf-8') as f:
            for item in self.data:
                f.write(json.dumps(item, ensure_ascii=False) + '\n')
        print(f"Saved {len(self.data)} samples to {output_path}")

    def run(self, output_path):
        """Pipeline complet"""
        self.load_raw_data()
        self.clean_data()
        self.format_data()
        self.validate()
        self.save(output_path)


# Usage
creator = DatasetCreator("raw_support_data.csv")
creator.run("train_data.jsonl")
```

---

## Statistiques du Dataset

```python
import json
import numpy as np
from collections import Counter

def analyze_dataset(path):
    with open(path, 'r') as f:
        data = [json.loads(line) for line in f]

    # Stats de base
    print(f"Total samples: {len(data)}")

    # Longueurs
    instruction_lengths = [len(d['instruction']) for d in data]
    output_lengths = [len(d['output']) for d in data]

    print(f"\nInstruction lengths:")
    print(f"  Mean: {np.mean(instruction_lengths):.0f}")
    print(f"  Median: {np.median(instruction_lengths):.0f}")
    print(f"  Max: {max(instruction_lengths)}")

    print(f"\nOutput lengths:")
    print(f"  Mean: {np.mean(output_lengths):.0f}")
    print(f"  Median: {np.median(output_lengths):.0f}")
    print(f"  Max: {max(output_lengths)}")

    # Distribution des catégories (si présent)
    if 'category' in data[0]:
        categories = Counter(d['category'] for d in data)
        print(f"\nCategory distribution:")
        for cat, count in categories.most_common(10):
            print(f"  {cat}: {count} ({100*count/len(data):.1f}%)")

analyze_dataset("train_data.jsonl")
```

---

## Résumé

| Étape | Action |
|-------|--------|
| 1. Collecter | Sources internes, API, scraping |
| 2. Nettoyer | Doublons, nulls, longueur min |
| 3. Formater | JSONL, format Alpaca/ShareGPT |
| 4. Valider | Qualité, cohérence |
| 5. Analyser | Stats, distribution |
| 6. Splitter | Train/Val/Test |

---

*Prochaine étape: `02-data-cleaning.md`*
