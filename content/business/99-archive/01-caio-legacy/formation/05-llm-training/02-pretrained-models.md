# Modèles Pré-entraînés

Pourquoi et comment utiliser des modèles existants au lieu de partir de zéro

## Pourquoi Ne Pas Entraîner From Scratch?

L'entraînement d'un LLM from scratch nécessite des ressources considérables. Pour un modèle Llama 7B, le coût en compute se situe entre 150k et 500k dollars, et pour un Llama 70B, entre 1 et 5 millions de dollars. Ces modèles nécessitent des trillions de tokens de données et plusieurs semaines voire mois d'entraînement sur des clusters de GPUs.

En revanche, le fine-tuning d'un modèle existant coûte entre 100 et 10 000 dollars, nécessite seulement quelques milliers d'exemples de données, et se termine en quelques heures ou jours. Pour la mission, la stratégie sera donc de fine-tuner un modèle pré-entraîné plutôt que d'en entraîner un from scratch.

## Hugging Face Hub

Hugging Face Hub est la plateforme centrale pour partager et découvrir des modèles de machine learning. Elle héberge des dizaines de milliers de modèles pré-entraînés prêts à l'emploi.

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

# Charger un modèle depuis le Hub
model_name = "mistralai/Mistral-7B-v0.1"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)
```

### Modèles Populaires pour Fine-tuning

| Modèle | Taille | Licence | Usage |
|--------|--------|---------|-------|
| **Mistral-7B** | 7B | Apache 2.0 | General, très bon ratio qualité/taille |
| **Llama-3-8B** | 8B | Meta License | General, state-of-art |
| **Qwen2-7B** | 7B | Apache 2.0 | Multilingual, code |
| **Phi-3-mini** | 3.8B | MIT | Compact, efficace |
| **Gemma-7B** | 7B | Gemma License | Google, bien optimisé |

## Charger un Modèle

### Standard

Le chargement standard est simple et direct.

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-v0.1")
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-v0.1")
```

### Avec Quantization (Économiser la mémoire)

La quantization réduit la précision numérique des poids du modèle, diminuant drastiquement l'utilisation de la mémoire avec une perte de qualité minime.

```python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

# 4-bit quantization
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)

model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    quantization_config=bnb_config,
    device_map="auto"
)
```

Un modèle 7B en float16 nécessite environ 14GB de VRAM, mais en 4-bit seulement 4GB, permettant de l'exécuter sur des GPUs grand public.

### Avec Flash Attention (Performance)

Flash Attention est une implémentation optimisée de l'attention qui réduit l'utilisation de la mémoire et accélère les calculs.

```python
model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    torch_dtype=torch.float16,
    attn_implementation="flash_attention_2",  # Requiert flash-attn
    device_map="auto"
)
```

## Inference Basique

La bibliothèque `transformers` offre une API pipeline pour simplifier l'inférence.

```python
from transformers import pipeline

# Pipeline simple
generator = pipeline("text-generation", model="mistralai/Mistral-7B-v0.1")

response = generator(
    "What is machine learning?",
    max_new_tokens=100,
    do_sample=True,
    temperature=0.7
)
print(response[0]['generated_text'])
```

### Inference Manuelle

Pour plus de contrôle sur la génération, on peut utiliser directement les méthodes du modèle.

```python
# Plus de contrôle
prompt = "Explain quantum computing in simple terms:"

inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

outputs = model.generate(
    **inputs,
    max_new_tokens=200,
    do_sample=True,
    temperature=0.7,
    top_p=0.9,
    top_k=50,
    repetition_penalty=1.1,
    pad_token_id=tokenizer.eos_token_id
)

response = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(response)
```

## Paramètres de Génération

| Paramètre | Description | Valeur Typique |
|-----------|-------------|----------------|
| `max_new_tokens` | Nombre max de tokens générés | 100-2000 |
| `temperature` | Créativité (0=déterministe, 1=créatif) | 0.7 |
| `top_p` | Nucleus sampling | 0.9 |
| `top_k` | Top-k sampling | 50 |
| `repetition_penalty` | Pénalise les répétitions | 1.1 |
| `do_sample` | Activer le sampling | True |

La température contrôle le caractère aléatoire : une température basse (0.1-0.3) donne des réponses plus déterministes et factuelles, tandis qu'une température haute (0.7-1.0) donne des réponses plus créatives mais potentiellement moins précises.

## Chat Templates

Les modèles instruction-tuned utilisent des formats spécifiques pour structurer les conversations entre système, utilisateur et assistant.

```python
# Mistral/Llama chat format
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is Python?"},
]

# Appliquer le template
prompt = tokenizer.apply_chat_template(messages, tokenize=False)
print(prompt)
# <s>[INST] You are a helpful assistant. [/INST]
# [INST] What is Python? [/INST]
```

### Templates Courants

Différents modèles utilisent différents formats de template :

**ChatML (OpenAI style)** : Ce format utilise des balises `<|im_start|>` et `<|im_end|>` pour délimiter les messages de chaque rôle (system, user, assistant).

**Llama 2 style** : Utilise des balises `[INST]` et `[/INST]` avec une section spéciale `<<SYS>>` pour les instructions système.

**Mistral style** : Une variante simplifiée du format Llama, également basée sur `[INST]` et `[/INST]`.

Il est crucial d'utiliser le bon template pour chaque modèle, car ils ont été entraînés avec ces formats spécifiques.

## Choisir le Bon Modèle

### Critères

**1. Taille vs VRAM disponible**

La taille du modèle doit correspondre à votre matériel : un modèle 7B nécessite environ 14GB en float16 ou 4GB en 4-bit, un 13B nécessite 26GB en float16 ou 7GB en 4-bit, et un 70B nécessite 140GB en float16 ou 35GB en 4-bit.

**2. Licence**

Les licences Apache 2.0 et MIT permettent un usage commercial sans restriction. Les licences Meta License et Gemma peuvent avoir des restrictions selon l'usage.

**3. Spécialisation**

Certains modèles sont généralistes (Mistral, Llama), d'autres sont spécialisés pour le code (CodeLlama, StarCoder, DeepSeek Coder) ou multilingues (Qwen, Aya).

**4. Base vs Instruct**

Les modèles "base" sont destinés au fine-tuning, tandis que les modèles "instruct" sont déjà optimisés pour suivre des instructions et peuvent être utilisés directement.

### Recommandations

Pour un budget limité, considérez Phi-3-mini (3.8B) ou Qwen2-1.5B. Pour un équilibre qualité/performance, Mistral-7B ou Llama-3-8B sont excellents. Pour la performance maximale, Llama-3-70B ou Mixtral-8x7B sont les meilleurs choix.

Pour la mission spécifique de chatbot qualifié, Mistral-7B-v0.3 ou Llama-3-8B offrent un bon compromis entre qualité et ressources nécessaires.

## Sauvegarder et Partager

```python
# Sauvegarder localement
model.save_pretrained("./my_finetuned_model")
tokenizer.save_pretrained("./my_finetuned_model")

# Push vers Hugging Face Hub
model.push_to_hub("username/my-finetuned-model")
tokenizer.push_to_hub("username/my-finetuned-model")
```

## Résumé

Le processus de sélection et d'utilisation d'un modèle pré-entraîné suit ces étapes : choisir un modèle base adapté à la taille de votre VRAM, à votre licence d'usage, et à votre tâche spécifique. Charger le modèle efficacement en utilisant la quantization si la mémoire est limitée, Flash Attention pour la vitesse, et device_map="auto" pour la distribution multi-GPU. Utiliser les bons paramètres de génération (temperature, top_p, top_k) pour contrôler la qualité des sorties. Et respecter le chat template spécifique du modèle pour assurer des performances optimales.

*Prochaine étape: `03-fine-tuning-basics.md`*
