# Train/Test Split Strategies

Bien séparer les données pour une évaluation fiable

## Pourquoi Splitter?

La séparation des données est fondamentale pour évaluer correctement un modèle. Le dataset complet est divisé en trois parties : l'ensemble d'entraînement (train) représente typiquement 80% des données et sert à l'apprentissage du modèle. L'ensemble de validation (10%) est utilisé pour le réglage des hyperparamètres pendant le développement. Enfin, l'ensemble de test (10%) sert à l'évaluation finale et ne doit JAMAIS être touché pendant le développement.

**Règle d'or** : Le modèle ne doit JAMAIS voir les données de test pendant l'entraînement.

## Split Simple

La manière la plus basique de séparer les données est le split aléatoire avec `scikit-learn`.

```python
from sklearn.model_selection import train_test_split

# Split 80/10/10
train, temp = train_test_split(data, test_size=0.2, random_state=42)
val, test = train_test_split(temp, test_size=0.5, random_state=42)

print(f"Train: {len(train)}, Val: {len(val)}, Test: {len(test)}")
```

### Avec Hugging Face

La bibliothèque Hugging Face Datasets offre une API pratique pour le splitting :

```python
from datasets import load_dataset, DatasetDict

dataset = load_dataset("json", data_files="data.jsonl")

# Split
split = dataset['train'].train_test_split(test_size=0.2, seed=42)
test_val = split['test'].train_test_split(test_size=0.5, seed=42)

dataset = DatasetDict({
    'train': split['train'],
    'validation': test_val['train'],
    'test': test_val['test']
})
```

## Stratified Split (Classification)

Pour les tâches de classification, il est important de maintenir la distribution des classes dans chaque split. Cela garantit que chaque ensemble contient une proportion représentative de chaque classe.

```python
from sklearn.model_selection import train_test_split

# Extraire les labels
labels = [item['label'] for item in data]

# Split stratifié
train, temp, train_labels, temp_labels = train_test_split(
    data, labels,
    test_size=0.2,
    stratify=labels,  # Maintient la distribution
    random_state=42
)

val, test = train_test_split(
    temp,
    test_size=0.5,
    stratify=temp_labels,
    random_state=42
)

# Vérifier la distribution
from collections import Counter
print("Train distribution:", Counter([d['label'] for d in train]))
print("Val distribution:", Counter([d['label'] for d in val]))
print("Test distribution:", Counter([d['label'] for d in test]))
```

Après le split, il est crucial de vérifier que les distributions sont similaires dans les trois ensembles.

## Split par Groupes

Pour éviter le data leakage, il faut parfois grouper les données par entité (utilisateur, conversation, session) avant de les séparer. Cela garantit qu'aucune information d'un même groupe ne se retrouve à la fois dans train et test.

```python
from sklearn.model_selection import GroupShuffleSplit

# Chaque item a un group_id (ex: user_id, conversation_id)
groups = [item['user_id'] for item in data]

splitter = GroupShuffleSplit(n_splits=1, test_size=0.2, random_state=42)

for train_idx, test_idx in splitter.split(data, groups=groups):
    train = [data[i] for i in train_idx]
    test = [data[i] for i in test_idx]

# Vérification: aucun groupe dans les deux splits
train_groups = set(item['user_id'] for item in train)
test_groups = set(item['user_id'] for item in test)
assert train_groups.isdisjoint(test_groups), "Data leakage!"
```

La vérification finale assure qu'aucun groupe ne se retrouve à la fois dans train et test, ce qui causerait un data leakage.

## Split Temporel

Pour les données avec timestamps, il est souvent plus réaliste de séparer chronologiquement plutôt qu'aléatoirement. Cela évite le problème de "prédire le passé" et simule mieux un déploiement réel où le modèle doit prédire des événements futurs.

```python
from datetime import datetime

def temporal_split(data, train_end, val_end):
    """Split basé sur les dates"""
    data = sorted(data, key=lambda x: x['timestamp'])

    train = [d for d in data if d['timestamp'] < train_end]
    val = [d for d in data if train_end <= d['timestamp'] < val_end]
    test = [d for d in data if d['timestamp'] >= val_end]

    return train, val, test

# Exemple
train, val, test = temporal_split(
    data,
    train_end=datetime(2024, 6, 1),
    val_end=datetime(2024, 9, 1)
)
```

Cette approche est particulièrement importante pour les données de séries temporelles ou les applications où la temporalité est significative.

## K-Fold Cross Validation

Pour les petits datasets ou pour obtenir une évaluation plus robuste, la validation croisée K-Fold divise les données en K plis et utilise chacun comme ensemble de validation à tour de rôle.

```python
from sklearn.model_selection import KFold

kfold = KFold(n_splits=5, shuffle=True, random_state=42)

results = []
for fold, (train_idx, val_idx) in enumerate(kfold.split(data)):
    train = [data[i] for i in train_idx]
    val = [data[i] for i in val_idx]

    # Entraîner et évaluer
    model = train_model(train)
    score = evaluate_model(model, val)
    results.append(score)

print(f"Average score: {np.mean(results):.4f} ± {np.std(results):.4f}")
```

Cette méthode donne une estimation plus stable des performances, particulièrement utile quand les données sont limitées.

## Bonnes Pratiques

### 1. Fixer le Random Seed

Pour assurer la reproductibilité des expériences, il est essentiel de fixer tous les seeds aléatoires.

```python
import random
import numpy as np
import torch

def set_seed(seed=42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)

set_seed(42)
```

### 2. Sauvegarder les Splits

Sauvegarder les identifiants des splits permet de reproduire exactement les mêmes séparations plus tard, ce qui est crucial pour comparer différentes expériences.

```python
import json

splits = {
    'train_ids': [item['id'] for item in train],
    'val_ids': [item['id'] for item in val],
    'test_ids': [item['id'] for item in test],
    'seed': 42,
    'created_at': datetime.now().isoformat()
}

with open('splits.json', 'w') as f:
    json.dump(splits, f)
```

### 3. Éviter le Data Leakage

Le data leakage est l'une des erreurs les plus courantes et les plus dangereuses en machine learning. Voici les sources principales à éviter :

**Sources de leakage** :
1. Même conversation ou entité dans train et test
2. Augmentation de données AVANT le split
3. Normalisation avec statistiques calculées sur tout le dataset
4. Sélection de features effectuée sur tout le dataset

**Règles à suivre** :
- Toujours splitter AVANT toute transformation
- Augmenter SEULEMENT l'ensemble d'entraînement
- Calculer les statistiques (moyenne, écart-type) SEULEMENT sur train
- Effectuer la sélection de features uniquement sur train

## Résumé

| Stratégie | Quand l'utiliser |
|-----------|------------------|
| Simple random | Dataset standard sans structure particulière |
| Stratified | Classification avec classes déséquilibrées |
| Group | Données avec dépendances (users, sessions, conversations) |
| Temporal | Données temporelles ou séries temporelles |
| K-Fold | Petit dataset, besoin d'évaluation robuste |

*Phase 4 complète! Prochaine phase: `docs/05-llm-training/`*
