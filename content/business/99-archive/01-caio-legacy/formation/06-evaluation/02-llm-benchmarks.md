# Benchmarks LLM Standards

> Les benchmarks que tout le monde utilise pour comparer les LLMs

---

## Pourquoi des Benchmarks Standards?

```
Permettent de:
1. Comparer objectivement les modèles
2. Suivre les progrès dans le domaine
3. Identifier les forces/faiblesses
4. Valider que le fine-tuning n'a pas dégradé les capacités générales
```

---

## Benchmarks Principaux

### 1. MMLU (Massive Multitask Language Understanding)

57 sujets académiques, ~14k questions.

```python
from lm_eval import evaluator
from lm_eval.models.huggingface import HFLM

model = HFLM(pretrained="mistralai/Mistral-7B-v0.1")

results = evaluator.simple_evaluate(
    model=model,
    tasks=["mmlu"],
    num_fewshot=5
)
print(f"MMLU Accuracy: {results['results']['mmlu']['acc,none']:.2%}")
```

**Scores typiques:**
- GPT-4: ~86%
- Llama 3 70B: ~82%
- Mistral 7B: ~60%

### 2. HellaSwag

Complétion de phrases avec bon sens.

```python
results = evaluator.simple_evaluate(
    model=model,
    tasks=["hellaswag"],
    num_fewshot=10
)
```

### 3. ARC (AI2 Reasoning Challenge)

Questions de science niveau école.

```python
results = evaluator.simple_evaluate(
    model=model,
    tasks=["arc_easy", "arc_challenge"],
    num_fewshot=25
)
```

### 4. TruthfulQA

Évite les hallucinations et fausses informations.

```python
results = evaluator.simple_evaluate(
    model=model,
    tasks=["truthfulqa"],
    num_fewshot=0
)
```

---

## Utiliser lm-evaluation-harness

L'outil standard pour évaluer les LLMs.

### Installation

```bash
pip install lm-eval
```

### Évaluation Complète

```bash
# Ligne de commande
lm_eval --model hf \
    --model_args pretrained=mistralai/Mistral-7B-v0.1 \
    --tasks mmlu,hellaswag,arc_easy,arc_challenge \
    --num_fewshot 5 \
    --batch_size 8 \
    --output_path ./results
```

### En Python

```python
from lm_eval import evaluator
from lm_eval.models.huggingface import HFLM

# Charger le modèle
model = HFLM(
    pretrained="./my-finetuned-model",
    dtype="float16",
    device="cuda"
)

# Évaluer
results = evaluator.simple_evaluate(
    model=model,
    tasks=["mmlu", "hellaswag", "arc_easy", "arc_challenge", "truthfulqa"],
    num_fewshot=5,
    batch_size=8
)

# Afficher les résultats
for task, metrics in results['results'].items():
    print(f"{task}: {metrics}")
```

---

## Benchmarks par Domaine

### Code

```python
# HumanEval - Génération de code Python
results = evaluator.simple_evaluate(
    model=model,
    tasks=["humaneval"],
    num_fewshot=0
)

# MBPP - Plus de problèmes de code
results = evaluator.simple_evaluate(
    model=model,
    tasks=["mbpp"],
    num_fewshot=3
)
```

### Math

```python
# GSM8K - Problèmes de maths en mots
results = evaluator.simple_evaluate(
    model=model,
    tasks=["gsm8k"],
    num_fewshot=8
)

# MATH - Problèmes plus difficiles
results = evaluator.simple_evaluate(
    model=model,
    tasks=["minerva_math"],
    num_fewshot=4
)
```

### Français

```python
# FrenchBench ou traduction MMLU
# Moins standardisé, souvent custom
```

---

## Créer ton Propre Benchmark

Pour la mission: benchmark spécifique au domaine.

```python
import json
from tqdm import tqdm

class CustomBenchmark:
    def __init__(self, test_file):
        with open(test_file) as f:
            self.data = [json.loads(l) for l in f]

    def evaluate(self, model, tokenizer):
        correct = 0
        results = []

        for item in tqdm(self.data):
            # Générer la réponse
            inputs = tokenizer(item['question'], return_tensors="pt").to(model.device)
            outputs = model.generate(**inputs, max_new_tokens=100)
            prediction = tokenizer.decode(outputs[0], skip_special_tokens=True)

            # Évaluer
            is_correct = self.check_answer(prediction, item['answer'])
            correct += is_correct

            results.append({
                'question': item['question'],
                'expected': item['answer'],
                'predicted': prediction,
                'correct': is_correct
            })

        accuracy = correct / len(self.data)
        return accuracy, results

    def check_answer(self, prediction, expected):
        """Logique de vérification custom"""
        # Exact match
        if expected.lower() in prediction.lower():
            return True

        # Ou utiliser BERTScore, etc.
        return False

# Usage
benchmark = CustomBenchmark("domain_test_set.jsonl")
accuracy, details = benchmark.evaluate(model, tokenizer)
print(f"Domain Accuracy: {accuracy:.2%}")
```

---

## Comparer Avant/Après Fine-tuning

```python
def compare_models(base_model, finetuned_model, tasks):
    """Compare les performances avant/après fine-tuning"""
    results = {
        'base': {},
        'finetuned': {}
    }

    # Évaluer base
    base_results = evaluator.simple_evaluate(
        model=base_model,
        tasks=tasks,
        num_fewshot=5
    )

    # Évaluer fine-tuned
    ft_results = evaluator.simple_evaluate(
        model=finetuned_model,
        tasks=tasks,
        num_fewshot=5
    )

    # Comparer
    print("\nComparison:")
    print(f"{'Task':<20} {'Base':<10} {'Fine-tuned':<10} {'Δ':<10}")
    print("-" * 50)

    for task in tasks:
        base_score = base_results['results'][task].get('acc,none', 0)
        ft_score = ft_results['results'][task].get('acc,none', 0)
        delta = ft_score - base_score
        print(f"{task:<20} {base_score:.2%}    {ft_score:.2%}      {delta:+.2%}")
```

---

## Résumé des Benchmarks

| Benchmark | Mesure | Shots | Score Typique 7B |
|-----------|--------|-------|------------------|
| MMLU | Connaissances | 5 | 55-65% |
| HellaSwag | Bon sens | 10 | 75-85% |
| ARC-Easy | Science | 25 | 70-80% |
| ARC-Challenge | Science | 25 | 45-55% |
| TruthfulQA | Honnêteté | 0 | 35-45% |
| HumanEval | Code | 0 | 15-30% |
| GSM8K | Maths | 8 | 30-50% |

---

*Phase 6 quasi complète! Voir aussi: `03-human-evaluation.md`*
