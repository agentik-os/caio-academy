# Bibliotheques Python Essentielles pour ML/AI

> Les packages que tu utiliseras quotidiennement

---

## Vue d'ensemble

The essential Python libraries for ML/AI fall into three categories:

- **Data Handling:** numpy (numerical computation) and pandas (tabular data manipulation)
- **ML/Deep Learning:** torch (PyTorch), transformers and datasets (Hugging Face), scikit-learn (classical ML)
- **Utilities:** tqdm (progress bars), logging (structured logs), pyyaml (configuration files)

---

## 1. NumPy - Calcul Numérique

**C'est quoi?** La base de tout calcul scientifique en Python.

```python
import numpy as np

# Créer des arrays
arr = np.array([1, 2, 3, 4, 5])
zeros = np.zeros((3, 4))          # Matrice 3x4 de zéros
ones = np.ones((2, 3))            # Matrice 2x3 de uns
rand = np.random.randn(3, 3)      # Matrice aléatoire (normale)

# Opérations vectorisées (RAPIDE)
arr * 2                           # [2, 4, 6, 8, 10]
arr + arr                         # [2, 4, 6, 8, 10]
np.sqrt(arr)                      # Racine carrée de chaque élément
np.sum(arr)                       # Somme
np.mean(arr)                      # Moyenne
np.std(arr)                       # Écart-type

# Reshaping
arr.reshape(5, 1)                 # De (5,) à (5, 1)
arr.T                             # Transposée

# Indexing avancé
matrix = np.random.randn(4, 4)
matrix[0]                         # Première ligne
matrix[:, 0]                      # Première colonne
matrix[matrix > 0]                # Tous les éléments > 0

# Broadcasting (concept important!)
a = np.array([[1], [2], [3]])     # Shape: (3, 1)
b = np.array([1, 2, 3])           # Shape: (3,)
a + b                             # Shape: (3, 3) - broadcasting!
```

### Pourquoi c'est important pour ML?
- Les tenseurs PyTorch sont compatibles avec NumPy
- Toutes les données passent par NumPy à un moment
- Opérations vectorisées = performances GPU

---

## 2. Pandas - Manipulation de Données

**C'est quoi?** Excel/SQL en Python. DataFrames tabulaires.

```python
import pandas as pd

# Créer un DataFrame
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'score': [85.5, 90.0, 78.5]
})

# Lecture de fichiers
df = pd.read_csv('data.csv')
df = pd.read_json('data.json')
df = pd.read_parquet('data.parquet')  # Format recommandé pour ML

# Exploration
df.head()                         # 5 premières lignes
df.info()                         # Types et nulls
df.describe()                     # Stats descriptives
df.shape                          # (lignes, colonnes)
df.columns                        # Liste des colonnes

# Sélection
df['name']                        # Une colonne (Series)
df[['name', 'age']]               # Plusieurs colonnes (DataFrame)
df.loc[0]                         # Première ligne par label
df.iloc[0]                        # Première ligne par index
df[df['age'] > 25]                # Filtrage conditionnel

# Transformation
df['age_doubled'] = df['age'] * 2
df['category'] = df['score'].apply(lambda x: 'pass' if x > 80 else 'fail')

# Agrégation
df.groupby('category')['score'].mean()
df.pivot_table(values='score', index='category', aggfunc='mean')

# Nettoyage
df.dropna()                       # Supprimer les lignes avec NaN
df.fillna(0)                      # Remplacer NaN par 0
df.drop_duplicates()              # Supprimer les doublons

# Export
df.to_csv('output.csv', index=False)
df.to_parquet('output.parquet')
```

### Pourquoi c'est important pour ML?
- Préparation des datasets
- Analyse exploratoire (EDA)
- Feature engineering

---

## 3. Hugging Face Transformers

**C'est quoi?** La bibliothèque #1 pour les LLMs et NLP.

```python
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    AutoModelForSequenceClassification,
    Trainer,
    TrainingArguments,
    pipeline
)

# Pipeline simple (inference)
classifier = pipeline("sentiment-analysis")
result = classifier("I love this product!")
# [{'label': 'POSITIVE', 'score': 0.9998}]

generator = pipeline("text-generation", model="gpt2")
result = generator("Once upon a time", max_length=50)

# Charger un modèle manuellement
model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Tokenization
text = "Hello, how are you?"
tokens = tokenizer(text, return_tensors="pt")
# {'input_ids': tensor([[...]]), 'attention_mask': tensor([[...]])}

# Inference
outputs = model(**tokens)
logits = outputs.logits

# Training (aperçu)
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=8,
    learning_rate=2e-5,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
)

trainer.train()
```

---

## 4. Hugging Face Datasets

**C'est quoi?** Gestion de datasets pour ML.

```python
from datasets import load_dataset, Dataset

# Charger un dataset public
dataset = load_dataset("imdb")
# DatasetDict({
#     train: Dataset({features: ['text', 'label'], num_rows: 25000}),
#     test: Dataset({features: ['text', 'label'], num_rows: 25000})
# })

# Accéder aux splits
train = dataset['train']
test = dataset['test']

# Explorer
print(train[0])                   # Premier exemple
print(train['text'][:5])          # 5 premiers textes

# Créer depuis pandas
df = pd.DataFrame({'text': [...], 'label': [...]})
dataset = Dataset.from_pandas(df)

# Créer depuis dict
dataset = Dataset.from_dict({
    'text': ['Hello', 'World'],
    'label': [0, 1]
})

# Transformations
def tokenize(example):
    return tokenizer(example['text'], truncation=True, padding=True)

tokenized = dataset.map(tokenize, batched=True)

# Filtrage
filtered = dataset.filter(lambda x: len(x['text']) > 100)

# Split train/test
split = dataset.train_test_split(test_size=0.2)

# Sauvegarder
dataset.save_to_disk("./my_dataset")
dataset = load_from_disk("./my_dataset")

# Format pour PyTorch
dataset.set_format("torch", columns=["input_ids", "attention_mask", "label"])
```

---

## 5. scikit-learn

**C'est quoi?** ML classique (pas deep learning).

```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
from sklearn.linear_model import LogisticRegression

# Split train/test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Normalisation
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)  # Pas fit sur test!

# Encoding labels
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

# Entraînement
model = LogisticRegression()
model.fit(X_train_scaled, y_train)

# Prédiction
y_pred = model.predict(X_test_scaled)

# Évaluation
print(accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))
```

---

## 6. Utilitaires Essentiels

### tqdm - Barres de progression

```python
from tqdm import tqdm
import time

# Boucle simple
for i in tqdm(range(100)):
    time.sleep(0.01)
# 100%|██████████| 100/100 [00:01<00:00, 98.21it/s]

# Avec description
for i in tqdm(range(100), desc="Training"):
    time.sleep(0.01)

# Avec pandas
df.progress_apply(lambda x: x * 2)  # Après tqdm.pandas()
```

### logging - Logs propres

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

logger.info("Training started")
logger.warning("Low memory")
logger.error("Training failed")
```

### PyYAML - Fichiers de config

```python
import yaml

# Lire
with open('config.yaml', 'r') as f:
    config = yaml.safe_load(f)

# Écrire
with open('config.yaml', 'w') as f:
    yaml.dump(config, f)
```

---

## Installation Recommandée

```bash
# Environnement conda
conda create -n denny python=3.11 -y
conda activate denny

# Core ML
pip install numpy pandas scikit-learn

# Deep Learning (AMD ROCm)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm5.6

# NLP/LLM
pip install transformers datasets tokenizers accelerate

# Utils
pip install tqdm pyyaml python-dotenv jupyter ipywidgets

# Dev
pip install black isort pytest
```

---

## Exercice Pratique

Crée un script qui:
1. Charge le dataset IMDB avec `datasets`
2. Explore avec `pandas`
3. Tokenize avec `transformers`
4. Affiche des stats avec `numpy`

```python
# exercice.py
from datasets import load_dataset
import pandas as pd
import numpy as np
from transformers import AutoTokenizer
from tqdm import tqdm

# 1. Charger
dataset = load_dataset("imdb", split="train[:1000]")

# 2. Convertir en pandas
df = dataset.to_pandas()
print(df.head())
print(df['label'].value_counts())

# 3. Tokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

lengths = []
for text in tqdm(df['text'], desc="Tokenizing"):
    tokens = tokenizer(text)
    lengths.append(len(tokens['input_ids']))

# 4. Stats
print(f"Mean length: {np.mean(lengths):.2f}")
print(f"Max length: {np.max(lengths)}")
print(f"Min length: {np.min(lengths)}")
```

---

*Prochaine étape: `04-type-hints.md`*
