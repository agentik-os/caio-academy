# Réseaux de Neurones

> Du perceptron aux architectures modernes

---

## Le Neurone Artificiel

### Analogie Biologique (simplifiée)

A biological neuron receives signals through its **dendrites**, processes them in the **cell body**, and transmits the result through its **axon**. The artificial counterpart mirrors this structure: **inputs** (x) receive data, **weights** (w) and a **bias** (b) serve as learnable parameters, and an **activation function** decides whether to "fire."

### Mathématiquement

```python
def neuron(inputs, weights, bias, activation_fn):
    """
    inputs: [x1, x2, ..., xn]
    weights: [w1, w2, ..., wn]
    bias: b

    output = activation(sum(xi * wi) + b)
    """
    weighted_sum = sum(x * w for x, w in zip(inputs, weights)) + bias
    return activation_fn(weighted_sum)
```

### Visualisation

Each input (x1, x2, x3) is multiplied by its corresponding weight (w1, w2, w3), the products are summed together with the bias (b), and the result passes through an activation function to produce the output.

---

## Fonctions d'Activation

### Pourquoi?

Sans activation, un réseau profond = juste une transformation linéaire.
Les activations ajoutent de la **non-linéarité**.

### Les Plus Courantes

```python
import numpy as np

# 1. ReLU (la plus utilisée)
def relu(x):
    return np.maximum(0, x)
# Simple, efficace, standard pour les couches cachées

# 2. Sigmoid (pour probabilités 0-1)
def sigmoid(x):
    return 1 / (1 + np.exp(-x))
# Utilisé pour classification binaire en sortie

# 3. Tanh (-1 à 1)
def tanh(x):
    return np.tanh(x)
# Alternative à sigmoid, centrée sur 0

# 4. Softmax (multi-classe)
def softmax(x):
    exp_x = np.exp(x - np.max(x))
    return exp_x / exp_x.sum()
# Utilisé en sortie pour classification multi-classe

# 5. GELU (utilisé dans les Transformers)
def gelu(x):
    return 0.5 * x * (1 + np.tanh(np.sqrt(2/np.pi) * (x + 0.044715 * x**3)))
# Plus smooth que ReLU, meilleur pour NLP
```

### Visualisation

**ReLU** outputs zero for all negative inputs and rises linearly for positive values. **Sigmoid** produces an S-shaped curve that squashes values between 0 and 1. **Tanh** is similar to sigmoid but centered around zero, squashing values between -1 and 1.

---

## Architecture d'un Réseau

### Couches (Layers)

A neural network is organized into layers. The **input layer** receives raw features (x1, x2, x3). These feed forward into one or more **hidden layers** (h1, h2, h3, h4) where learned transformations occur. Finally, the **output layer** produces the predictions (y1, y2). Every neuron in one layer connects to every neuron in the next.

### En Code PyTorch

```python
import torch
import torch.nn as nn

class SimpleNetwork(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()

        # Couches
        self.layer1 = nn.Linear(input_size, hidden_size)
        self.layer2 = nn.Linear(hidden_size, hidden_size)
        self.layer3 = nn.Linear(hidden_size, output_size)

        # Activation
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.relu(self.layer1(x))
        x = self.relu(self.layer2(x))
        x = self.layer3(x)  # Pas d'activation sur la dernière couche
        return x

# Usage
model = SimpleNetwork(input_size=10, hidden_size=64, output_size=3)
input_data = torch.randn(32, 10)  # Batch de 32, 10 features
output = model(input_data)  # Shape: (32, 3)
```

---

## Forward Pass vs Backward Pass

### Forward Pass (Inférence)

```python
# Input → traitement couche par couche → Output
x = input_data
x = relu(linear1(x))  # Couche 1
x = relu(linear2(x))  # Couche 2
output = linear3(x)    # Sortie
```

### Backward Pass (Entraînement)

```python
# 1. Forward pour obtenir la prédiction
prediction = model(input)

# 2. Calculer la loss
loss = criterion(prediction, target)

# 3. Backward: calculer les gradients
loss.backward()  # PyTorch calcule ∂loss/∂param pour chaque paramètre

# 4. Update: ajuster les paramètres
optimizer.step()  # params = params - lr * gradients
```

---

## Types de Réseaux

### 1. Feedforward (MLP - Multi-Layer Perceptron)

A feedforward network passes data through a series of dense (fully-connected) layers from input to output. It is the simplest architecture and works well for tabular data and straightforward classification tasks.

### 2. CNN (Convolutional Neural Network)

A CNN processes data through alternating convolutional and pooling layers before a final dense layer produces the output. Convolutions detect local patterns (edges, textures) while pooling reduces spatial dimensions. CNNs are the standard for image and computer vision tasks.

```python
class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3)
        self.pool = nn.MaxPool2d(2)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3)
        self.fc = nn.Linear(64 * 6 * 6, 10)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 6 * 6)  # Flatten
        x = self.fc(x)
        return x
```

### 3. RNN/LSTM (Recurrent Neural Network)

Recurrent networks process sequences step by step, passing a hidden state from one time step to the next. This allows them to capture temporal dependencies. LSTMs (Long Short-Term Memory) add gating mechanisms to handle longer sequences without forgetting. Before the Transformer era, RNNs and LSTMs were the standard for text and sequence tasks.

### 4. Transformer (Le Standard Actuel pour NLP)

The Transformer processes input through an embedding layer, then through repeated blocks of **self-attention** and **feed-forward networks**. The self-attention mechanism allows every token to "look at" every other token in the sequence simultaneously, capturing context far more effectively than recurrent approaches. Transformers power all modern LLMs and are increasingly used across every domain of ML.

---

## Le Transformer (Ton Focus)

### Architecture Simplifiée

The flow begins with raw input text ("Hello world"), which is **tokenized** into integer IDs. Each token is then converted into a dense vector through an **embedding layer**. These embeddings pass through a stack of **Transformer blocks** (typically 12 or more), where each block contains a **multi-head attention** layer -- allowing every token to attend to every other token -- followed by a **feed-forward network**. The final output is an enriched representation of each token that captures deep contextual meaning.

### Self-Attention (Le Cœur)

```python
def self_attention(x):
    """
    x: embeddings des tokens (batch, seq_len, embed_dim)
    """
    # Projections linéaires
    Q = x @ W_query  # Ce qu'on cherche
    K = x @ W_key    # Ce qu'on compare
    V = x @ W_value  # Ce qu'on retourne

    # Scores d'attention
    scores = Q @ K.transpose(-2, -1) / sqrt(embed_dim)

    # Softmax pour avoir des poids
    attention_weights = softmax(scores, dim=-1)

    # Moyenne pondérée des values
    output = attention_weights @ V
    return output
```

**Intuition**: Chaque mot "regarde" tous les autres mots pour décider quels contextes sont importants.

---

## Résumé: Ce Que Tu Dois Retenir

| Concept | Importance | Détails |
|---------|------------|---------|
| Neurone | Base | weighted sum + activation |
| ReLU | Très utilisé | max(0, x) |
| Forward/Backward | Fondamental | Inférence vs Training |
| MLP | Base | Couches fully-connected |
| Transformer | **CRUCIAL** | Architecture des LLMs |
| Self-Attention | **CRUCIAL** | Permet de capturer le contexte |

---

## Exercice Pratique

Implémente un réseau simple en PyTorch:

```python
import torch
import torch.nn as nn

# TODO: Crée un réseau avec:
# - Input: 784 (image MNIST 28x28 aplatie)
# - Hidden 1: 256 + ReLU
# - Hidden 2: 128 + ReLU
# - Output: 10 (digits 0-9)

class MNISTClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        # Ton code ici

    def forward(self, x):
        # Ton code ici
        pass

# Test
model = MNISTClassifier()
x = torch.randn(32, 784)  # Batch de 32 images
output = model(x)
print(output.shape)  # Devrait être (32, 10)
```

<details>
<summary>Solution</summary>

```python
class MNISTClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer1 = nn.Linear(784, 256)
        self.layer2 = nn.Linear(256, 128)
        self.layer3 = nn.Linear(128, 10)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.relu(self.layer1(x))
        x = self.relu(self.layer2(x))
        x = self.layer3(x)  # Pas de softmax ici, CrossEntropyLoss le fait
        return x
```
</details>

---

*Prochaine étape: `04-training-concepts.md`*
