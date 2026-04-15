# Mathématiques Essentielles pour ML

> Le minimum vital - pas besoin d'un PhD, juste les concepts clés

---

## Bonne Nouvelle

Tu n'as pas besoin de maîtriser les maths pour UTILISER le ML moderne.
Les frameworks (PyTorch, Transformers) cachent la complexité.

**Mais** comprendre ces concepts t'aidera à:
- Débugger quand ça ne marche pas
- Choisir les bons hyperparamètres
- Comprendre pourquoi certaines approches fonctionnent

---

## 1. Algèbre Linéaire (Le Plus Important)

### Vecteurs

Un vecteur = une liste de nombres.

```python
import numpy as np

# Vecteur (représentation d'un mot, d'une image, etc.)
word_embedding = np.array([0.2, -0.5, 0.8, 0.1])

# En ML, TOUT est converti en vecteurs:
# - Mots → embeddings
# - Images → pixels aplatis
# - Audio → spectrogrammes
```

### Matrices

Une matrice = un tableau 2D de nombres.

```python
# Matrice (les paramètres d'un réseau de neurones)
weights = np.array([
    [0.1, 0.2, 0.3],
    [0.4, 0.5, 0.6]
])

# Shape: (2, 3) → 2 lignes, 3 colonnes
print(weights.shape)
```

### Tenseurs

Un tenseur = une matrice à N dimensions.

```python
# Tensor 3D (batch d'images par exemple)
images = np.random.randn(32, 224, 224)  # 32 images de 224x224

# Tensor 4D (batch d'images RGB)
images_rgb = np.random.randn(32, 3, 224, 224)  # 32 images, 3 channels, 224x224
```

### Opérations Clés

```python
# Dot product (produit scalaire) - FONDAMENTAL
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
dot = np.dot(a, b)  # 1*4 + 2*5 + 3*6 = 32

# Matrix multiplication
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
C = A @ B  # ou np.matmul(A, B)

# Transposée
A.T  # Inverse lignes et colonnes

# Broadcasting (extension automatique des dimensions)
a = np.array([[1], [2], [3]])  # Shape: (3, 1)
b = np.array([1, 2, 3, 4])      # Shape: (4,)
c = a + b                        # Shape: (3, 4) - broadcast!
```

### Pourquoi c'est important?

```python
# Un neurone = dot product + activation
def neuron(inputs, weights, bias):
    return activation(np.dot(inputs, weights) + bias)

# Un layer = multiplication matricielle
def layer(inputs, weight_matrix, bias_vector):
    return activation(inputs @ weight_matrix + bias_vector)
```

---

## 2. Calcul Différentiel (Gradients)

### Le Concept Clé: Dérivée

La dérivée dit "comment la sortie change quand l'entrée change".

```python
# f(x) = x²
# f'(x) = 2x (la dérivée)

# Si x = 3, f'(3) = 6
# → Si on augmente x un peu, f(x) augmente ~6 fois plus vite
```

### Gradient

Le gradient = la dérivée pour plusieurs variables.

```python
# f(x, y) = x² + y²
# gradient = [∂f/∂x, ∂f/∂y] = [2x, 2y]

# Le gradient pointe vers la direction de plus forte augmentation
# Pour MINIMISER, on va dans la direction OPPOSÉE
```

### Gradient Descent (L'Algorithme Fondamental)

```python
# Pseudo-code de l'entraînement
parameters = random_init()

for epoch in range(num_epochs):
    # 1. Forward pass: calculer la prédiction
    prediction = model(input, parameters)

    # 2. Calculer l'erreur (loss)
    loss = compute_loss(prediction, target)

    # 3. Backward pass: calculer les gradients
    gradients = compute_gradients(loss, parameters)  # Backpropagation

    # 4. Mettre à jour les paramètres
    parameters = parameters - learning_rate * gradients
```

### Backpropagation

PyTorch calcule les gradients automatiquement (autograd):

```python
import torch

x = torch.tensor([2.0], requires_grad=True)
y = x ** 2  # y = 4

y.backward()  # Calcule dy/dx
print(x.grad)  # tensor([4.0]) car d(x²)/dx = 2x = 2*2 = 4
```

---

## 3. Probabilités et Statistiques

### Distributions

```python
import numpy as np

# Distribution normale (Gaussienne)
# La plupart des poids sont initialisés ainsi
weights = np.random.randn(100)  # Moyenne 0, écart-type 1

# Distribution uniforme
random_values = np.random.uniform(0, 1, 100)  # Entre 0 et 1
```

### Softmax (Convertir scores → probabilités)

```python
def softmax(x):
    exp_x = np.exp(x - np.max(x))  # Stabilité numérique
    return exp_x / exp_x.sum()

scores = np.array([2.0, 1.0, 0.1])
probs = softmax(scores)
# array([0.659, 0.242, 0.099]) → somme = 1.0
```

### Cross-Entropy Loss (La Loss Standard pour Classification)

```python
def cross_entropy(predictions, targets):
    """
    predictions: probabilités prédites (après softmax)
    targets: one-hot encoded labels
    """
    return -np.sum(targets * np.log(predictions + 1e-9))

# Exemple
pred = np.array([0.7, 0.2, 0.1])  # Prédit classe 0
target = np.array([1, 0, 0])      # Vraie classe 0
loss = cross_entropy(pred, target)  # ~0.36 (faible = bon)

pred = np.array([0.1, 0.7, 0.2])  # Prédit classe 1
loss = cross_entropy(pred, target)  # ~2.30 (élevé = mauvais)
```

---

## 4. Concepts Spécifiques ML

### Normalisation

```python
# Z-score normalization
def normalize(x):
    return (x - x.mean()) / x.std()

# Min-Max normalization (0 à 1)
def minmax(x):
    return (x - x.min()) / (x.max() - x.min())

# Pourquoi? Les réseaux apprennent mieux avec des données normalisées
```

### Batch Normalization

```python
# Normalise les activations dans le réseau
# Accélère l'entraînement, stabilise

class BatchNorm:
    def forward(self, x):
        mean = x.mean(dim=0)
        var = x.var(dim=0)
        x_norm = (x - mean) / torch.sqrt(var + 1e-5)
        return self.gamma * x_norm + self.beta
```

### Attention (Le Cœur des Transformers)

```python
# Simplified attention
def attention(query, key, value):
    """
    query: ce qu'on cherche
    key: ce qu'on compare
    value: ce qu'on retourne
    """
    # Score = similarité entre query et key
    scores = query @ key.T / np.sqrt(key.shape[-1])

    # Convertir en probabilités
    weights = softmax(scores)

    # Moyenne pondérée des values
    output = weights @ value
    return output
```

---

## 5. Résumé: Ce Que Tu Dois Retenir

### Must-Know (à comprendre)

| Concept | Pourquoi |
|---------|----------|
| Tenseurs/Matrices | Tout le ML manipule des tenseurs |
| Dot Product | Base des réseaux de neurones |
| Gradient Descent | Comment les modèles apprennent |
| Softmax | Convertir logits en probabilités |
| Cross-Entropy | Loss standard pour classification |

### Nice-to-Know (culture générale)

| Concept | Pourquoi |
|---------|----------|
| Backpropagation | PyTorch le fait pour toi |
| Batch Norm | Souvent déjà dans les modèles |
| Attention | Comprendre les Transformers |

### Pas Nécessaire (pour l'instant)

- Preuves mathématiques
- Calcul matriciel avancé
- Optimisation convexe

---

## Exercice Pratique

```python
import numpy as np

# 1. Crée deux vecteurs et calcule leur produit scalaire
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
# Ta réponse: ?

# 2. Applique softmax à ces scores
scores = np.array([2.0, 1.0, 0.5])
# Ta réponse: ?

# 3. Calcule la cross-entropy loss
predictions = np.array([0.7, 0.2, 0.1])
targets = np.array([1, 0, 0])
# Ta réponse: ?

# 4. Normalise ce vecteur (z-score)
data = np.array([10, 20, 30, 40, 50])
# Ta réponse: ?
```

<details>
<summary>Solutions</summary>

```python
# 1. Dot product
dot = np.dot(a, b)  # 32

# 2. Softmax
def softmax(x):
    exp_x = np.exp(x - np.max(x))
    return exp_x / exp_x.sum()
probs = softmax(scores)  # [0.576, 0.212, 0.212]

# 3. Cross-entropy
loss = -np.sum(targets * np.log(predictions + 1e-9))  # ~0.357

# 4. Z-score normalization
normalized = (data - data.mean()) / data.std()
# [-1.41, -0.71, 0, 0.71, 1.41]
```
</details>

---

## Ressources pour Aller Plus Loin

- **3Blue1Brown** - Visualisations exceptionnelles (YouTube)
  - "Essence of Linear Algebra"
  - "Neural Networks"
- **Khan Academy** - Algèbre linéaire et calcul
- **Fast.ai** - Approche pratique "code first"

---

*Prochaine étape: `03-neural-networks.md`*
