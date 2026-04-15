# Nettoyage de Données

> 80% du temps ML = préparer les données

---

## Les Problèmes Courants

| Problème | Impact | Solution |
|----------|--------|----------|
| Doublons | Overfitting | Déduplication |
| Valeurs manquantes | Erreurs | Suppression/Imputation |
| Bruit | Mauvaise qualité | Filtrage |
| Incohérences | Confusion modèle | Normalisation |
| Déséquilibre | Biais | Resampling |

---

## 1. Déduplication

### Doublons Exacts

```python
import pandas as pd

# Supprimer les doublons exacts
df = df.drop_duplicates()

# Sur certaines colonnes seulement
df = df.drop_duplicates(subset=['instruction', 'output'])
```

### Doublons Proches (Fuzzy)

```python
from difflib import SequenceMatcher
from tqdm import tqdm

def similarity(a, b):
    return SequenceMatcher(None, a, b).ratio()

def deduplicate_fuzzy(data, threshold=0.9):
    """Supprime les samples trop similaires"""
    unique = []

    for item in tqdm(data, desc="Deduplicating"):
        is_duplicate = False
        for existing in unique:
            if similarity(item['instruction'], existing['instruction']) > threshold:
                is_duplicate = True
                break
        if not is_duplicate:
            unique.append(item)

    print(f"Removed {len(data) - len(unique)} fuzzy duplicates")
    return unique
```

### Avec MinHash (Scalable)

```python
from datasketch import MinHash, MinHashLSH

def deduplicate_minhash(data, threshold=0.5):
    lsh = MinHashLSH(threshold=threshold, num_perm=128)
    unique_indices = []

    for i, item in enumerate(tqdm(data)):
        # Créer MinHash
        m = MinHash(num_perm=128)
        for word in item['instruction'].split():
            m.update(word.encode('utf8'))

        # Vérifier si similaire existe déjà
        result = lsh.query(m)
        if not result:
            lsh.insert(str(i), m)
            unique_indices.append(i)

    return [data[i] for i in unique_indices]
```

---

## 2. Nettoyage de Texte

```python
import re
import unicodedata

def clean_text(text):
    """Pipeline de nettoyage de texte"""
    if not text or not isinstance(text, str):
        return ""

    # 1. Normaliser Unicode
    text = unicodedata.normalize('NFKC', text)

    # 2. Supprimer les caractères de contrôle
    text = ''.join(char for char in text if unicodedata.category(char) != 'Cc')

    # 3. Normaliser les espaces
    text = ' '.join(text.split())

    # 4. Supprimer les URLs (optionnel)
    text = re.sub(r'https?://\S+', '[URL]', text)

    # 5. Supprimer les emails (optionnel)
    text = re.sub(r'\S+@\S+', '[EMAIL]', text)

    # 6. Supprimer les numéros de téléphone (optionnel)
    text = re.sub(r'\b\d{10,}\b', '[PHONE]', text)

    return text.strip()
```

### Nettoyage HTML

```python
from bs4 import BeautifulSoup

def clean_html(text):
    soup = BeautifulSoup(text, 'html.parser')
    return soup.get_text(separator=' ')
```

### Nettoyage Code

```python
def clean_code_examples(text):
    """Normalise les blocs de code"""
    # Standardiser les backticks
    text = re.sub(r'```(\w*)\n', r'```\1\n', text)

    # Supprimer les lignes vides excessives dans le code
    text = re.sub(r'\n{3,}', '\n\n', text)

    return text
```

---

## 3. Filtrage par Qualité

### Longueur

```python
def filter_by_length(data, min_input=10, max_input=2000,
                     min_output=20, max_output=4000):
    filtered = []
    for item in data:
        input_len = len(item.get('instruction', '') + item.get('input', ''))
        output_len = len(item.get('output', ''))

        if min_input <= input_len <= max_input and \
           min_output <= output_len <= max_output:
            filtered.append(item)

    print(f"Filtered: {len(data)} → {len(filtered)}")
    return filtered
```

### Score de Qualité

```python
def compute_quality_score(item):
    """Score de qualité heuristique"""
    score = 0

    # Longueur raisonnable
    if 50 < len(item['output']) < 2000:
        score += 1

    # Pas trop de répétitions
    words = item['output'].split()
    unique_ratio = len(set(words)) / len(words) if words else 0
    if unique_ratio > 0.5:
        score += 1

    # Contient de la ponctuation
    if re.search(r'[.!?]', item['output']):
        score += 1

    # Pas d'erreurs évidentes
    if '[ERROR]' not in item['output'] and 'undefined' not in item['output']:
        score += 1

    return score

def filter_by_quality(data, min_score=3):
    return [item for item in data if compute_quality_score(item) >= min_score]
```

### Filtrage par Langue

```python
from langdetect import detect, LangDetectException

def filter_by_language(data, target_lang='fr'):
    filtered = []
    for item in data:
        try:
            text = item['instruction'] + ' ' + item['output']
            if detect(text) == target_lang:
                filtered.append(item)
        except LangDetectException:
            continue
    return filtered
```

---

## 4. Normalisation

### Casse

```python
def normalize_case(text, mode='preserve'):
    """
    modes: 'lower', 'upper', 'preserve', 'sentence'
    """
    if mode == 'lower':
        return text.lower()
    elif mode == 'upper':
        return text.upper()
    elif mode == 'sentence':
        return text.capitalize()
    return text
```

### Dates et Nombres

```python
import dateparser

def normalize_dates(text):
    """Normalise les dates au format ISO"""
    # Pattern pour détecter les dates
    date_patterns = [
        r'\d{1,2}/\d{1,2}/\d{2,4}',
        r'\d{1,2}-\d{1,2}-\d{2,4}',
        r'\d{1,2} \w+ \d{4}'
    ]

    for pattern in date_patterns:
        matches = re.findall(pattern, text)
        for match in matches:
            parsed = dateparser.parse(match)
            if parsed:
                text = text.replace(match, parsed.strftime('%Y-%m-%d'))

    return text
```

---

## 5. Gestion des Valeurs Manquantes

```python
def handle_missing(data, strategy='remove'):
    """
    strategies: 'remove', 'fill', 'flag'
    """
    if strategy == 'remove':
        return [item for item in data
                if item.get('instruction') and item.get('output')]

    elif strategy == 'fill':
        for item in data:
            if not item.get('input'):
                item['input'] = ''
        return data

    elif strategy == 'flag':
        for item in data:
            item['has_missing'] = not (item.get('instruction') and item.get('output'))
        return data
```

---

## 6. Pipeline Complet

```python
class DataCleaner:
    def __init__(self, data):
        self.data = data
        self.stats = {
            'initial': len(data),
            'steps': []
        }

    def log_step(self, name):
        self.stats['steps'].append({
            'name': name,
            'count': len(self.data)
        })
        print(f"After {name}: {len(self.data)} samples")

    def remove_duplicates(self):
        self.data = list({
            json.dumps(d, sort_keys=True): d for d in self.data
        }.values())
        self.log_step('remove_duplicates')
        return self

    def clean_texts(self):
        for item in self.data:
            item['instruction'] = clean_text(item.get('instruction', ''))
            item['output'] = clean_text(item.get('output', ''))
            if 'input' in item:
                item['input'] = clean_text(item.get('input', ''))
        self.log_step('clean_texts')
        return self

    def filter_length(self, min_output=20, max_output=4000):
        self.data = [
            item for item in self.data
            if min_output <= len(item.get('output', '')) <= max_output
        ]
        self.log_step('filter_length')
        return self

    def filter_quality(self, min_score=2):
        self.data = [
            item for item in self.data
            if compute_quality_score(item) >= min_score
        ]
        self.log_step('filter_quality')
        return self

    def run(self):
        return (self
            .remove_duplicates()
            .clean_texts()
            .filter_length()
            .filter_quality())

    def get_data(self):
        return self.data

    def get_stats(self):
        self.stats['final'] = len(self.data)
        self.stats['removed'] = self.stats['initial'] - self.stats['final']
        return self.stats


# Usage
cleaner = DataCleaner(raw_data)
clean_data = cleaner.run().get_data()
stats = cleaner.get_stats()
print(f"Kept {stats['final']}/{stats['initial']} samples ({100*stats['final']/stats['initial']:.1f}%)")
```

---

## Résumé

```
Pipeline de Nettoyage:
1. Déduplication (exact + fuzzy)
2. Nettoyage texte (unicode, espaces, HTML)
3. Filtrage longueur
4. Filtrage qualité
5. Normalisation
6. Gestion des manquants
7. Validation finale
```

---

*Prochaine étape: `03-data-qualification.md`*
