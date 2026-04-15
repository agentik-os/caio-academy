# RLHF - Reinforcement Learning from Human Feedback

> La technique qui a rendu ChatGPT si "aligné" et utile

---

## Qu'est-ce que RLHF?

```
Modèle pré-entraîné
       ↓
Supervised Fine-Tuning (SFT) ← Ton focus principal
       ↓
Reward Model Training ← Apprend les préférences humaines
       ↓
RL Fine-Tuning (PPO) ← Optimise pour la reward
       ↓
Modèle aligné
```

**Pour la mission**: Tu feras principalement du SFT. RLHF est avancé mais bon à connaître.

---

## Les 3 Étapes de RLHF

### 1. Supervised Fine-Tuning (SFT)

Entraîner sur des exemples de haute qualité (ce qu'on a vu).

```python
# Ce que tu fais déjà
dataset = [
    {"instruction": "...", "output": "réponse de qualité"}
]
sft_model = train(base_model, dataset)
```

### 2. Reward Model Training

Entraîner un modèle à prédire les préférences humaines.

```python
# Dataset de préférences
comparisons = [
    {
        "prompt": "Explain quantum physics",
        "chosen": "Quantum physics studies particles at atomic scale...",
        "rejected": "idk lol its complicated"
    }
]

# Le reward model apprend: chosen > rejected
reward_model = train_reward_model(comparisons)
```

### 3. RL Fine-Tuning (PPO)

Utiliser le reward model pour améliorer le LLM.

```python
# Pseudo-code
for prompt in prompts:
    response = llm.generate(prompt)
    reward = reward_model.score(prompt, response)
    llm.update(reward)  # PPO algorithm
```

---

## Implémentation avec TRL

### Reward Model

```python
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from trl import RewardTrainer, RewardConfig
from datasets import load_dataset

# Dataset de préférences
dataset = load_dataset("json", data_files="preferences.jsonl")
# Format: {"prompt": "...", "chosen": "...", "rejected": "..."}

# Modèle reward
model = AutoModelForSequenceClassification.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    num_labels=1
)
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-v0.1")

# Config
config = RewardConfig(
    output_dir="./reward_model",
    per_device_train_batch_size=4,
    num_train_epochs=1,
    learning_rate=1e-5,
)

# Trainer
trainer = RewardTrainer(
    model=model,
    args=config,
    tokenizer=tokenizer,
    train_dataset=dataset["train"],
)

trainer.train()
```

### PPO Training

```python
from trl import PPOTrainer, PPOConfig, AutoModelForCausalLMWithValueHead
from transformers import AutoTokenizer

# Modèle SFT avec value head
model = AutoModelForCausalLMWithValueHead.from_pretrained("./sft_model")
tokenizer = AutoTokenizer.from_pretrained("./sft_model")

# Reward model
reward_model = ...  # Chargé précédemment

# Config PPO
config = PPOConfig(
    model_name="./sft_model",
    learning_rate=1e-5,
    batch_size=8,
    mini_batch_size=1,
    gradient_accumulation_steps=8,
)

# Trainer
ppo_trainer = PPOTrainer(
    config=config,
    model=model,
    tokenizer=tokenizer,
)

# Training loop
for batch in dataloader:
    queries = batch["query"]

    # Generate responses
    responses = ppo_trainer.generate(queries)

    # Score with reward model
    rewards = [reward_model(q, r) for q, r in zip(queries, responses)]

    # PPO step
    stats = ppo_trainer.step(queries, responses, rewards)
```

---

## DPO - Alternative Plus Simple

**Direct Preference Optimization** = RLHF sans reward model séparé!

```python
from trl import DPOTrainer, DPOConfig
from transformers import AutoModelForCausalLM, AutoTokenizer
from datasets import load_dataset

# Modèle SFT (point de départ)
model = AutoModelForCausalLM.from_pretrained("./sft_model")
tokenizer = AutoTokenizer.from_pretrained("./sft_model")

# Dataset de préférences
dataset = load_dataset("json", data_files="preferences.jsonl")
# Format: {"prompt": "...", "chosen": "...", "rejected": "..."}

# Config
config = DPOConfig(
    output_dir="./dpo_model",
    per_device_train_batch_size=4,
    learning_rate=5e-7,
    num_train_epochs=1,
    beta=0.1,  # KL penalty
)

# Trainer
trainer = DPOTrainer(
    model=model,
    args=config,
    train_dataset=dataset["train"],
    tokenizer=tokenizer,
)

trainer.train()
```

### DPO vs PPO

| Aspect | PPO (RLHF) | DPO |
|--------|------------|-----|
| Complexité | Élevée | Simple |
| Reward model | Requis | Non requis |
| Stabilité | Difficile à tuner | Plus stable |
| Performance | State-of-art | Très proche |

**Recommandation**: Commencer par DPO si tu veux faire de l'alignement.

---

## Créer un Dataset de Préférences

### Format

```json
{
    "prompt": "How do I make a cake?",
    "chosen": "Here's a step-by-step recipe:\n1. Preheat oven to 350°F\n2. Mix flour, sugar, and eggs...",
    "rejected": "just google it"
}
```

### Stratégies de Collecte

```python
# 1. Annotation humaine (gold standard)
def human_annotation(prompt, response_a, response_b):
    # Interface pour annotateurs
    # Retourne la meilleure réponse
    pass

# 2. LLM-as-judge (plus scalable)
def llm_judge(prompt, response_a, response_b):
    judge_prompt = f"""
    Rate which response is better for the given prompt.

    Prompt: {prompt}

    Response A: {response_a}

    Response B: {response_b}

    Which is better? Answer A or B only.
    """
    verdict = judge_model.generate(judge_prompt)
    return verdict

# 3. Feedback implicite (clicks, ratings)
def from_user_feedback(logs):
    # Analyser les thumbs up/down
    pass
```

---

## Quand Utiliser RLHF/DPO?

### Tu en as besoin si:
- Le modèle donne des réponses techniquement correctes mais mal formulées
- Tu veux un ton spécifique (professionnel, friendly, etc.)
- Tu veux éviter certains comportements (toxicité, hallucinations)
- Tu as des données de préférences

### Tu n'en as PAS besoin si:
- SFT suffit pour ta tâche
- Tu n'as pas de données de préférences
- Tu veux juste des réponses factuelles

**Pour la mission**: Commence par SFT. Ajoute DPO si les réponses sont bonnes mais pas "alignées".

---

## Résumé

```
Pipeline complet:
1. SFT: Apprend la tâche (obligatoire)
2. DPO/RLHF: Aligne aux préférences (optionnel)

Recommandation:
- Commence TOUJOURS par SFT
- Évalue si l'alignement est nécessaire
- Si oui: DPO (plus simple) avant PPO
```

---

*Phase 5 complète! Prochaine phase: `docs/06-evaluation/`*
