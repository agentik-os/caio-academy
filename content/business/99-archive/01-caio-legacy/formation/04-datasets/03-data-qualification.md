# Qualification des Données

La qualification des données est une étape critique pour garantir la qualité du modèle final. Elle consiste à définir et mesurer la qualité des données avant de les utiliser pour l'entraînement.

## Processus de Qualification

Le processus de qualification se situe entre le nettoyage des données brutes et la préparation finale pour l'entraînement. Les données passent par plusieurs étapes : collecte des données brutes, nettoyage initial, puis qualification selon cinq dimensions essentielles (exactitude, complétude, cohérence, pertinence et actualité), avant d'être finalement prêtes pour le training.

## Les Cinq Dimensions de la Qualité

### 1. Exactitude (Accuracy)

L'exactitude vérifie si les informations contenues dans les données sont correctes. Pour les données contenant des faits vérifiables, il est possible de les comparer à une source de vérité (ground truth database).

```python
def check_accuracy(item, ground_truth_db):
    """Vérifie si les faits sont corrects"""
    # Exemple: vérifier les prix, dates, noms
    facts = extract_facts(item['output'])

    for fact in facts:
        if not verify_fact(fact, ground_truth_db):
            return False, f"Incorrect fact: {fact}"

    return True, "All facts verified"

# Pour données manuelles: double annotation
def double_annotate(items, annotators):
    """Chaque item annoté par 2 personnes"""
    results = []
    for item in items:
        a1 = annotators[0].annotate(item)
        a2 = annotators[1].annotate(item)

        if a1 == a2:
            results.append({'item': item, 'label': a1, 'agreement': True})
        else:
            # Arbitrage par un 3ème annotateur
            a3 = annotators[2].annotate(item)
            results.append({'item': item, 'label': a3, 'agreement': False})

    return results
```

Pour les annotations manuelles, la méthode de double annotation avec arbitrage garantit une meilleure fiabilité. Chaque élément est annoté par deux personnes indépendantes. En cas de désaccord, un troisième annotateur tranche.

### 2. Complétude (Completeness)

La complétude mesure si les réponses contiennent tous les éléments nécessaires. Cette dimension est particulièrement importante pour les chatbots où une réponse incomplète peut frustrer l'utilisateur.

```python
def check_completeness(item, required_elements):
    """Vérifie que tous les éléments requis sont présents"""
    output = item['output']
    missing = []

    for element in required_elements:
        if element not in output.lower():
            missing.append(element)

    score = 1 - len(missing) / len(required_elements)
    return score, missing

# Exemple pour un chatbot support
required_elements = ['solution', 'étapes', 'contact']
score, missing = check_completeness(item, required_elements)
```

Le score de complétude est calculé comme la proportion d'éléments requis présents dans la réponse. Un score de 1 indique que tous les éléments sont présents.

### 3. Cohérence (Consistency)

La cohérence vérifie que les données sont cohérentes entre elles. Par exemple, la même question devrait recevoir des réponses similaires à travers le dataset.

```python
def check_consistency(data):
    """Vérifie la cohérence du dataset"""
    issues = []

    # Même question → même type de réponse?
    questions = {}
    for item in data:
        q = item['instruction']
        if q in questions:
            # Comparer les réponses
            if very_different(item['output'], questions[q]):
                issues.append(f"Inconsistent answers for: {q[:50]}...")
        else:
            questions[q] = item['output']

    return issues

def very_different(a, b):
    """Vérifie si deux réponses sont contradictoires"""
    from difflib import SequenceMatcher
    similarity = SequenceMatcher(None, a, b).ratio()
    return similarity < 0.3  # Très différentes
```

Cette vérification utilise une mesure de similarité textuelle pour détecter les réponses contradictoires pour une même question.

### 4. Pertinence (Relevance)

La pertinence évalue si la réponse correspond vraiment à la question posée. Cette dimension utilise des embeddings sémantiques pour mesurer la similarité entre question et réponse.

```python
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer('all-MiniLM-L6-v2')

def check_relevance(item):
    """Score de pertinence question-réponse"""
    q_embedding = model.encode([item['instruction']])
    a_embedding = model.encode([item['output']])

    similarity = cosine_similarity(q_embedding, a_embedding)[0][0]

    # Score 0-1, > 0.3 généralement OK
    return similarity

def filter_by_relevance(data, threshold=0.3):
    return [item for item in data if check_relevance(item) > threshold]
```

Un score de similarité supérieur à 0.3 indique généralement une bonne pertinence. Ce seuil peut être ajusté selon les besoins spécifiques.

### 5. Actualité (Timeliness)

L'actualité vérifie que les informations sont à jour. Cette dimension est particulièrement importante pour les données temporelles ou les informations qui évoluent rapidement.

```python
from datetime import datetime

def check_timeliness(item, max_age_days=365):
    """Vérifie que les données sont récentes"""
    # Si le dataset a des timestamps
    if 'created_at' in item:
        age = (datetime.now() - item['created_at']).days
        return age <= max_age_days

    # Sinon, détecter des dates dans le texte
    dates = extract_dates(item['output'])
    if dates:
        oldest = min(dates)
        age = (datetime.now() - oldest).days
        return age <= max_age_days

    return True  # Pas de date = pas de vérification possible
```

## Score de Qualification Global

Pour obtenir une évaluation globale de la qualité, on combine les cinq dimensions avec des poids configurables selon les priorités du projet.

```python
class DataQualifier:
    def __init__(self, weights=None):
        self.weights = weights or {
            'accuracy': 0.3,
            'completeness': 0.2,
            'consistency': 0.2,
            'relevance': 0.2,
            'timeliness': 0.1
        }

    def score_item(self, item, context=None):
        """Score global de qualité pour un item"""
        scores = {}

        # Chaque dimension
        scores['accuracy'] = self.check_accuracy(item, context)
        scores['completeness'] = self.check_completeness(item)
        scores['relevance'] = self.check_relevance(item)
        scores['timeliness'] = self.check_timeliness(item)

        # Score pondéré
        total = sum(
            scores[dim] * self.weights[dim]
            for dim in scores
        )

        return total, scores

    def qualify_dataset(self, data, threshold=0.7):
        """Qualifie tout le dataset"""
        qualified = []
        rejected = []

        for item in data:
            score, details = self.score_item(item)
            item['_quality_score'] = score
            item['_quality_details'] = details

            if score >= threshold:
                qualified.append(item)
            else:
                rejected.append(item)

        stats = {
            'total': len(data),
            'qualified': len(qualified),
            'rejected': len(rejected),
            'qualification_rate': len(qualified) / len(data),
            'avg_score': sum(i['_quality_score'] for i in data) / len(data)
        }

        return qualified, rejected, stats
```

Le système de qualification par défaut accorde 30% de poids à l'exactitude, considérée comme la dimension la plus critique. Les autres dimensions se partagent le reste de manière équilibrée.

## Annotation Humaine

L'annotation humaine reste souvent nécessaire pour valider la qualité des données, particulièrement pour les dimensions subjectives comme la clarté ou le ton.

### Guidelines d'Annotation

Les guidelines doivent être claires et précises pour assurer la cohérence entre annotateurs. Voici un exemple de structure :

**Objectif** : Évaluer si la réponse du chatbot est de qualité suffisante.

**Critères (échelle 1-5)** :

**Exactitude**
- 5 : Toutes les informations sont correctes
- 3 : Quelques erreurs mineures
- 1 : Erreurs factuelles majeures

**Complétude**
- 5 : Répond entièrement à la question
- 3 : Répond partiellement
- 1 : Ne répond pas à la question

**Clarté**
- 5 : Parfaitement clair et structuré
- 3 : Compréhensible mais pourrait être mieux
- 1 : Confus ou mal écrit

**Ton**
- 5 : Professionnel et approprié
- 3 : Acceptable
- 1 : Inapproprié

**Score Final** : Moyenne des 4 critères. Un item est qualifié si le score moyen est supérieur ou égal à 3.5.

### Outil d'Annotation

Pour faciliter le travail des annotateurs, un outil simple peut être développé en Python :

```python
import json
from datetime import datetime

class AnnotationTool:
    def __init__(self, data, output_path):
        self.data = data
        self.output_path = output_path
        self.annotations = []
        self.current_idx = 0

    def display_item(self, item):
        print("\n" + "="*50)
        print(f"Item {self.current_idx + 1}/{len(self.data)}")
        print("="*50)
        print(f"\n[INSTRUCTION]\n{item['instruction']}")
        print(f"\n[OUTPUT]\n{item['output']}")
        print("="*50)

    def get_scores(self):
        scores = {}
        for criterion in ['accuracy', 'completeness', 'clarity', 'tone']:
            while True:
                try:
                    score = int(input(f"{criterion} (1-5): "))
                    if 1 <= score <= 5:
                        scores[criterion] = score
                        break
                except ValueError:
                    pass
                print("Please enter a number 1-5")
        return scores

    def annotate(self):
        for i, item in enumerate(self.data):
            self.current_idx = i
            self.display_item(item)

            scores = self.get_scores()
            comment = input("Comment (optional): ")

            annotation = {
                'item_id': i,
                'scores': scores,
                'avg_score': sum(scores.values()) / len(scores),
                'comment': comment,
                'annotator': 'human',
                'timestamp': datetime.now().isoformat()
            }
            self.annotations.append(annotation)

            # Sauvegarder progressivement
            self.save()

            cont = input("\nContinue? (y/n): ")
            if cont.lower() != 'y':
                break

    def save(self):
        with open(self.output_path, 'w') as f:
            json.dump(self.annotations, f, indent=2)
```

Cet outil affiche chaque item, collecte les scores pour chaque critère, et sauvegarde progressivement pour éviter la perte de données en cas d'interruption.

## Inter-Annotator Agreement

Pour mesurer la fiabilité des annotations, il est important de calculer l'accord entre annotateurs.

```python
from sklearn.metrics import cohen_kappa_score

def compute_agreement(annotations1, annotations2):
    """Calcule l'accord entre deux annotateurs"""
    # Extraire les labels
    labels1 = [a['avg_score'] >= 3.5 for a in annotations1]  # Binariser
    labels2 = [a['avg_score'] >= 3.5 for a in annotations2]

    # Cohen's Kappa
    kappa = cohen_kappa_score(labels1, labels2)

    # Interprétation
    if kappa > 0.8:
        agreement = "Almost perfect"
    elif kappa > 0.6:
        agreement = "Substantial"
    elif kappa > 0.4:
        agreement = "Moderate"
    else:
        agreement = "Fair or poor"

    return kappa, agreement
```

Le coefficient Kappa de Cohen mesure l'accord au-delà du hasard. Un Kappa supérieur à 0.6 indique un accord acceptable, et supérieur à 0.8 indique un bon accord.

## Rapport de Qualification

Un rapport détaillé aide à comprendre les résultats de la qualification et à identifier les problèmes.

```python
def generate_qualification_report(data, qualified, rejected, stats):
    """Génère un rapport de qualification"""
    report = f"""
# Data Qualification Report
Generated: {datetime.now().isoformat()}

## Summary
- Total samples: {stats['total']}
- Qualified: {stats['qualified']} ({100*stats['qualification_rate']:.1f}%)
- Rejected: {stats['rejected']}
- Average quality score: {stats['avg_score']:.2f}

## Quality Distribution
"""

    # Distribution des scores
    import numpy as np
    scores = [item['_quality_score'] for item in data]
    report += f"""
- Min: {np.min(scores):.2f}
- Max: {np.max(scores):.2f}
- Median: {np.median(scores):.2f}
- Std: {np.std(scores):.2f}

## Rejection Reasons
"""

    # Analyser les raisons de rejet
    for item in rejected[:10]:
        details = item['_quality_details']
        weak_dims = [d for d, s in details.items() if s < 0.5]
        report += f"- Score {item['_quality_score']:.2f}: weak on {weak_dims}\n"

    return report
```

## Résumé

| Dimension | Question | Méthode |
|-----------|----------|---------|
| Exactitude | C'est vrai? | Fact-checking, double annotation |
| Complétude | C'est complet? | Checklist d'éléments requis |
| Cohérence | C'est cohérent? | Comparaison entre samples similaires |
| Pertinence | Ça répond? | Similarity embeddings |
| Actualité | C'est à jour? | Vérification des dates |

*Prochaine étape: `04-train-test-split.md`*
