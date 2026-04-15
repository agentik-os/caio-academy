# Qu'est-ce que le Machine Learning?

> Du code "if/else" à des systèmes qui apprennent des données

---

## La Différence Fondamentale

### Programmation Traditionnelle

In traditional programming, you supply the **input** along with **explicit rules**, and the program produces an output. You write every conditional yourself -- if the temperature exceeds 30, return "hot"; if it exceeds 15, return "warm"; otherwise, return "cold."

### Machine Learning

Machine learning inverts this relationship. You supply the **input** along with the **expected output**, and the system discovers the rules automatically. Given thousands of labeled examples -- (35, "hot"), (20, "warm"), (5, "cold") -- the model learns the thresholds on its own, without a single hand-written conditional.

---

## Les 3 Types de ML

### 1. Supervised Learning (Apprentissage Supervisé)

**Tu as:** Des exemples avec les réponses correctes (labels)
**Le modèle apprend:** La relation input → output

```python
# Exemple: Classification d'emails
X = ["Free money!!!", "Meeting at 3pm", "You won $1000"]
y = ["spam", "not_spam", "spam"]

model.fit(X, y)  # Apprend
model.predict(["Free gift!"])  # → "spam"
```

**Cas d'usage:**
- Classification (spam/not spam, sentiment, catégories)
- Régression (prix, température, scores)
- Chatbots avec réponses attendues

**C'est ce que tu feras pour la mission** (dataset qualifié → modèle)

### 2. Unsupervised Learning (Apprentissage Non Supervisé)

**Tu as:** Des données SANS labels
**Le modèle apprend:** Des patterns, clusters, structures

```python
# Exemple: Segmentation clients
X = [[age, revenue, purchases], ...]

model.fit(X)
clusters = model.predict(X)  # → [0, 1, 0, 2, 1, ...]
# Groupe 0: "jeunes urbains", Groupe 1: "seniors", etc.
```

**Cas d'usage:**
- Clustering (groupes de clients, documents similaires)
- Réduction de dimensionnalité (PCA, t-SNE)
- Détection d'anomalies

### 3. Reinforcement Learning (Apprentissage par Renforcement)

**Tu as:** Un environnement avec des récompenses/punitions
**Le modèle apprend:** À maximiser les récompenses

```python
# Exemple: Jeu
state = game.get_state()
action = agent.choose_action(state)
reward = game.step(action)
agent.learn(state, action, reward)
```

**Cas d'usage:**
- Jeux (AlphaGo, jeux vidéo)
- Robotique
- RLHF pour LLMs (la mission mentionne ça!)

---

## Focus: Supervised Learning pour LLMs

Pour la mission, tu vas principalement faire du **supervised learning** sur des LLMs:

You will work with a **qualified dataset** where each entry pairs a user question (the input) with the expected answer (the output). The model learns to generate responses that match the patterns and knowledge embedded in those examples.

### Le Pipeline

The standard ML pipeline flows through five stages. First, you **collect data** -- assembling input-output pairs. Second, you **prepare** the data by cleaning, formatting, and tokenizing it. Third, you **train** the model, during which it adjusts its internal parameters. Fourth, you **evaluate** the model's quality against held-out test data. Finally, you **deploy** the trained model so it can serve real users.

---

## Vocabulaire Essentiel

| Terme | Définition | Analogie |
|-------|------------|----------|
| **Model** | Programme qui apprend | Le cerveau |
| **Parameters** | Les "poids" du modèle | Les neurones |
| **Training** | Ajuster les paramètres | Étudier |
| **Inference** | Utiliser le modèle | Passer l'examen |
| **Dataset** | Ensemble de données | Le manuel |
| **Features** | Variables d'entrée | Les questions |
| **Labels** | Réponses correctes | Les réponses |
| **Loss** | Mesure de l'erreur | La note (inversée) |
| **Epoch** | Une passe sur tout le dataset | Relire le manuel |
| **Batch** | Groupe d'exemples traités ensemble | Un chapitre |
| **Overfitting** | Mémorise au lieu de généraliser | Apprendre par cœur |
| **Underfitting** | N'apprend pas assez | Pas assez étudié |

---

## Deep Learning vs Machine Learning

Machine Learning divides into two broad families. The first is **classical algorithms** -- logistic regression, decision trees, random forests, SVMs, and KNN -- which work well on structured, tabular data. The second is **deep learning**, a subset of ML that uses neural networks with many layers. Deep learning itself branches into CNNs (for images), RNNs and LSTMs (for sequences), and **Transformers** (for language models). Transformers are your primary focus.

**Deep Learning** = ML avec des réseaux de neurones profonds (beaucoup de couches).

**Transformers** = Architecture révolutionnaire pour le NLP (2017), base de tous les LLMs modernes (GPT, BERT, Claude, etc.)

---

## Le Problème que tu vas Résoudre

### Contexte Mission

The workflow begins with the company's internal qualified data, which feeds into the fine-tuning of an existing LLM, producing a chatbot that responds with deep domain knowledge.

### Exemple Concret

```python
# Dataset interne
training_data = [
    {
        "input": "Quel est le prix du produit X?",
        "output": "Le produit X coûte 99€. Il est disponible en 3 couleurs."
    },
    {
        "input": "Comment contacter le support?",
        "output": "Vous pouvez contacter le support au 01 23 45 67 89 ou par email à support@company.com"
    },
    # ... des milliers d'exemples qualifiés
]

# Fine-tuning
model = load_base_llm()
model.train(training_data)

# Inference
response = model.generate("Quel est le délai de livraison?")
# → Réponse basée sur les données internes
```

---

## Exercice de Réflexion

Pour chaque scénario, identifie:
1. Le type de ML (supervised, unsupervised, RL)
2. Les inputs (features)
3. Les outputs (labels si supervised)

### Scénario 1: Détection de spam
<details>
<summary>Réponse</summary>

- **Type:** Supervised (classification)
- **Input:** Texte de l'email, métadonnées
- **Output:** Label (spam / not_spam)
</details>

### Scénario 2: Recommandation de produits similaires
<details>
<summary>Réponse</summary>

- **Type:** Unsupervised (clustering/similarity)
- **Input:** Caractéristiques des produits
- **Output:** Pas de label, juste des groupes similaires
</details>

### Scénario 3: Chatbot qui s'améliore avec le feedback utilisateur
<details>
<summary>Réponse</summary>

- **Type:** Reinforcement Learning (ou Supervised avec feedback)
- **Input:** Conversation
- **Output:** Récompense (thumbs up/down) → améliore les réponses
</details>

### Scénario 4: Prédire le prix d'une maison
<details>
<summary>Réponse</summary>

- **Type:** Supervised (régression)
- **Input:** Surface, localisation, nombre de pièces, etc.
- **Output:** Prix (nombre continu)
</details>

---

*Prochaine étape: `02-math-essentials.md`*
