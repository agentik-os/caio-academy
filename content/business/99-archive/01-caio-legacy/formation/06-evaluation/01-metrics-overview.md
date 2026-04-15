# Métriques d'Évaluation

Mesurer la qualité de ton modèle - essentiel pour la mission

## Pourquoi Évaluer?

L'évaluation est fondamentale en machine learning. Comme le dit l'adage : "Si tu ne peux pas le mesurer, tu ne peux pas l'améliorer." Pour la mission, définir des critères de qualité clairs et mesurables est critique pour garantir que le chatbot répond aux attentes.

## Classification des Métriques

Les métriques se divisent en deux grandes catégories. Les métriques automatiques sont calculables par un programme et incluent la perplexité (loss), l'Exact Match, les scores BLEU et ROUGE pour la similarité textuelle, et le BERTScore pour la similarité sémantique. Les métriques humaines nécessitent une annotation manuelle et évaluent des aspects subjectifs comme la pertinence, l'exactitude, la fluence et l'utilité des réponses.

## 1. Perplexité (PPL)

La perplexité mesure à quel point le modèle est "surpris" par le texte. Une perplexité basse indique que le modèle prédit bien le texte suivant.

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

def compute_perplexity(model, tokenizer, text):
    inputs = tokenizer(text, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs, labels=inputs["input_ids"])
    loss = outputs.loss
    perplexity = torch.exp(loss)
    return perplexity.item()

# Plus bas = mieux
# Bon modèle: PPL < 10 sur du texte naturel
```

Un bon modèle sur du texte naturel aura typiquement une perplexité inférieure à 10. Plus le modèle est "surpris" (perplexité élevée), moins il comprend bien le texte.

## 2. Exact Match (EM)

L'Exact Match vérifie si la prédiction correspond exactement à la référence, généralement après normalisation (minuscules, suppression des espaces).

```python
def exact_match(prediction, reference):
    return prediction.strip().lower() == reference.strip().lower()

def compute_em(predictions, references):
    matches = sum(exact_match(p, r) for p, r in zip(predictions, references))
    return matches / len(predictions)
```

Cette métrique est stricte : une réponse presque correcte obtient le même score qu'une réponse complètement fausse. Elle est particulièrement adaptée aux tâches où seule une réponse exacte est acceptable.

## 3. BLEU Score

BLEU (Bilingual Evaluation Understudy) mesure la similarité en termes de n-grams entre la prédiction et la référence. Initialement développé pour la traduction automatique, il est maintenant utilisé dans diverses tâches.

```python
from sacrebleu import corpus_bleu

predictions = ["The cat sat on the mat."]
references = [["The cat is on the mat."]]

bleu = corpus_bleu(predictions, references)
print(f"BLEU: {bleu.score:.2f}")  # 0-100, plus haut = mieux
```

### BLEU Limitations

BLEU a plusieurs limitations importantes. Il ne capture pas la sémantique, donc deux phrases avec le même sens mais des mots différents obtiendront un score bas. Il pénalise injustement les paraphrases correctes. BLEU est néanmoins utile pour la traduction et le résumé où la forme littérale compte.

## 4. ROUGE Score

ROUGE (Recall-Oriented Understudy for Gisting Evaluation) mesure le rappel des n-grams. Il est particulièrement utilisé pour évaluer les résumés automatiques.

```python
from rouge_score import rouge_scorer

scorer = rouge_scorer.RougeScorer(['rouge1', 'rouge2', 'rougeL'])

prediction = "The cat sat on the mat"
reference = "A cat is sitting on a mat"

scores = scorer.score(reference, prediction)
print(f"ROUGE-1: {scores['rouge1'].fmeasure:.3f}")
print(f"ROUGE-2: {scores['rouge2'].fmeasure:.3f}")
print(f"ROUGE-L: {scores['rougeL'].fmeasure:.3f}")
```

### Types de ROUGE

**ROUGE-1** évalue les unigrams (mots individuels), mesurant le chevauchement de vocabulaire. **ROUGE-2** évalue les bigrams (paires de mots), capturant mieux la structure. **ROUGE-L** évalue la plus longue sous-séquence commune, moins sensible à l'ordre des mots.

## 5. BERTScore

BERTScore mesure la similarité sémantique en utilisant des embeddings contextuels de BERT, capturant ainsi le sens au-delà des mots exacts.

```python
from bert_score import score

predictions = ["The weather is nice today."]
references = ["It's a beautiful day outside."]

P, R, F1 = score(predictions, references, lang="en")
print(f"BERTScore F1: {F1.mean():.3f}")  # 0-1, plus haut = mieux
```

L'avantage principal de BERTScore est qu'il capture la similarité sémantique, pas seulement lexicale. Deux phrases avec des mots différents mais un sens similaire obtiendront un bon score.

## 6. Évaluation pour Q&A

Pour les systèmes de questions-réponses, plusieurs métriques complémentaires sont nécessaires.

```python
def evaluate_qa(predictions, references):
    """Évaluation complète pour Q&A"""
    results = {
        'exact_match': 0,
        'f1': 0,
        'contains_answer': 0
    }

    for pred, ref in zip(predictions, references):
        # Exact Match
        if pred.lower().strip() == ref.lower().strip():
            results['exact_match'] += 1

        # F1 sur les tokens
        pred_tokens = set(pred.lower().split())
        ref_tokens = set(ref.lower().split())

        if pred_tokens and ref_tokens:
            precision = len(pred_tokens & ref_tokens) / len(pred_tokens)
            recall = len(pred_tokens & ref_tokens) / len(ref_tokens)
            f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0
            results['f1'] += f1

        # Contains Answer
        if ref.lower() in pred.lower():
            results['contains_answer'] += 1

    n = len(predictions)
    return {k: v/n for k, v in results.items()}
```

Cette fonction calcule trois métriques : l'Exact Match pour les réponses parfaites, le score F1 sur les tokens pour les réponses partiellement correctes, et Contains Answer pour vérifier si la réponse contient au moins l'information attendue.

## 7. Évaluation Humaine

L'évaluation humaine reste indispensable pour capturer des aspects qualitatifs que les métriques automatiques ne peuvent pas mesurer.

### Template d'Annotation

Un template d'annotation structuré garantit la cohérence entre annotateurs.

```python
evaluation_criteria = {
    "relevance": {
        "description": "La réponse est-elle pertinente par rapport à la question?",
        "scale": "1-5",
        "anchors": {
            1: "Complètement hors-sujet",
            3: "Partiellement pertinent",
            5: "Parfaitement pertinent"
        }
    },
    "accuracy": {
        "description": "Les informations sont-elles correctes?",
        "scale": "1-5",
        "anchors": {
            1: "Erreurs factuelles majeures",
            3: "Quelques erreurs mineures",
            5: "Toutes les informations sont correctes"
        }
    },
    "fluency": {
        "description": "Le texte est-il bien écrit?",
        "scale": "1-5",
        "anchors": {
            1: "Incompréhensible",
            3: "Compréhensible mais maladroit",
            5: "Naturel et fluide"
        }
    },
    "helpfulness": {
        "description": "La réponse est-elle utile?",
        "scale": "1-5",
        "anchors": {
            1: "Inutile",
            3: "Partiellement utile",
            5: "Très utile"
        }
    }
}
```

### Calculer l'Agreement

Pour valider la fiabilité des annotations, on mesure l'accord entre annotateurs.

```python
from sklearn.metrics import cohen_kappa_score

def inter_annotator_agreement(annotations1, annotations2):
    """Cohen's Kappa entre deux annotateurs"""
    return cohen_kappa_score(annotations1, annotations2)

# Kappa > 0.6 = accord acceptable
# Kappa > 0.8 = bon accord
```

Un Kappa supérieur à 0.6 indique un accord acceptable, et supérieur à 0.8 indique un excellent accord. Si le Kappa est trop faible, les guidelines d'annotation doivent être clarifiées.

## 8. LLM-as-Judge

Une approche moderne consiste à utiliser un LLM puissant pour évaluer les réponses d'un autre modèle.

```python
def llm_judge(prompt, response, criteria):
    """Évaluation par LLM"""
    judge_prompt = f"""
    Evaluate the following response based on these criteria:

    Question: {prompt}

    Response: {response}

    Criteria:
    - Relevance (1-5): Is the response relevant to the question?
    - Accuracy (1-5): Is the information correct?
    - Helpfulness (1-5): Is the response useful?

    Provide scores in JSON format:
    {{"relevance": X, "accuracy": X, "helpfulness": X, "explanation": "..."}}
    """

    result = judge_model.generate(judge_prompt)
    return json.loads(result)
```

Cette approche est plus scalable que l'annotation humaine et peut capturer des nuances subtiles, mais nécessite un modèle juge de haute qualité pour être fiable.

## 9. Framework d'Évaluation Complet

Un framework complet combine plusieurs métriques pour une évaluation robuste.

```python
class ModelEvaluator:
    def __init__(self, model, tokenizer):
        self.model = model
        self.tokenizer = tokenizer

    def evaluate(self, test_data):
        """Évaluation complète"""
        predictions = []
        references = []

        # Générer les prédictions
        for item in test_data:
            prompt = item['instruction']
            inputs = self.tokenizer(prompt, return_tensors="pt")
            outputs = self.model.generate(**inputs, max_new_tokens=200)
            prediction = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
            predictions.append(prediction)
            references.append(item['output'])

        # Calculer les métriques
        results = {
            'exact_match': self.compute_em(predictions, references),
            'bleu': self.compute_bleu(predictions, references),
            'rouge': self.compute_rouge(predictions, references),
            'bertscore': self.compute_bertscore(predictions, references),
        }

        return results

    def generate_report(self, results):
        """Rapport d'évaluation"""
        report = """
# Evaluation Report

## Automatic Metrics
| Metric | Score |
|--------|-------|
"""
        for metric, score in results.items():
            report += f"| {metric} | {score:.4f} |\n"

        return report
```

## Résumé: Quelles Métriques Utiliser?

| Tâche | Métriques Recommandées |
|-------|------------------------|
| Q&A | EM, F1, BERTScore |
| Génération | ROUGE, BERTScore, Human eval |
| Traduction | BLEU, COMET |
| Classification | Accuracy, F1, Precision, Recall |
| Chatbot | Human eval, LLM-judge |

Pour la mission de chatbot interne, une combinaison d'évaluation humaine (pertinence, exactitude, utilité) et de LLM-judge pour scalabilité sera probablement la meilleure approche.

*Prochaine étape: `02-llm-benchmarks.md`*
