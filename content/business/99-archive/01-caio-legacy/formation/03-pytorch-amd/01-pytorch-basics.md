# PyTorch Basics

> Le framework deep learning le plus utilisé en recherche et industrie

---

## Pourquoi PyTorch?

| Framework | Avantages | Utilisé par |
|-----------|-----------|-------------|
| **PyTorch** | Pythonic, flexible, debug facile | Meta, OpenAI, Anthropic |
| TensorFlow | Production-ready, TFLite | Google |
| JAX | Performance, TPU | Google DeepMind |

**Pour la mission → PyTorch** (le plus demandé pour LLMs)

---

## Tensors (La Base)

### Création

```python
import torch

# Depuis liste Python
tensor = torch.tensor([1, 2, 3, 4])

# Depuis NumPy
import numpy as np
arr = np.array([1, 2, 3])
tensor = torch.from_numpy(arr)

# Tenseurs spéciaux
zeros = torch.zeros(3, 4)        # Matrice 3x4 de zéros
ones = torch.ones(2, 3)          # Matrice 2x3 de uns
rand = torch.rand(2, 3)          # Uniforme [0, 1)
randn = torch.randn(2, 3)        # Normale (μ=0, σ=1)
eye = torch.eye(3)               # Matrice identité 3x3
arange = torch.arange(0, 10, 2)  # [0, 2, 4, 6, 8]

# Avec un type spécifique
float_tensor = torch.tensor([1, 2], dtype=torch.float32)
int_tensor = torch.tensor([1, 2], dtype=torch.int64)
```

### Attributs

```python
t = torch.randn(3, 4, 5)

print(t.shape)       # torch.Size([3, 4, 5])
print(t.dtype)       # torch.float32
print(t.device)      # cpu (ou cuda:0, ou hip:0 pour AMD)
print(t.ndim)        # 3 dimensions
print(t.numel())     # 60 éléments total
```

### Opérations

```python
a = torch.tensor([1., 2., 3.])
b = torch.tensor([4., 5., 6.])

# Opérations élément par élément
a + b         # tensor([5., 7., 9.])
a * b         # tensor([4., 10., 18.])
a ** 2        # tensor([1., 4., 9.])
torch.sqrt(a) # tensor([1., 1.41, 1.73])

# Réductions
a.sum()       # tensor(6.)
a.mean()      # tensor(2.)
a.max()       # tensor(3.)
a.argmax()    # tensor(2) - index du max

# Produit scalaire
torch.dot(a, b)  # tensor(32.)

# Multiplication matricielle
A = torch.randn(2, 3)
B = torch.randn(3, 4)
C = A @ B        # ou torch.matmul(A, B) - Shape: (2, 4)
```

### Reshaping

```python
t = torch.arange(12)  # [0, 1, 2, ..., 11]

# Reshape
t.view(3, 4)       # Matrice 3x4
t.view(2, 2, 3)    # Tensor 3D
t.view(-1, 4)      # -1 = inférer automatiquement (3, 4)

# Ajouter/Enlever dimensions
t = torch.randn(3, 4)
t.unsqueeze(0)     # (1, 3, 4) - ajoute dim au début
t.unsqueeze(-1)    # (3, 4, 1) - ajoute dim à la fin

t = torch.randn(1, 3, 1, 4)
t.squeeze()        # (3, 4) - enlève toutes les dims de taille 1
t.squeeze(0)       # (3, 1, 4) - enlève seulement dim 0

# Transposée
t = torch.randn(3, 4)
t.T                # (4, 3)
t.transpose(0, 1)  # Équivalent

# Permute (réordonne les dimensions)
t = torch.randn(2, 3, 4)
t.permute(2, 0, 1)  # (4, 2, 3)
```

### Indexing

```python
t = torch.randn(4, 5)

# Comme NumPy
t[0]           # Première ligne
t[:, 0]        # Première colonne
t[1:3, 2:4]    # Sous-matrice
t[t > 0]       # Tous les éléments positifs

# Indexing avancé
indices = torch.tensor([0, 2, 3])
t[indices]     # Lignes 0, 2, 3
```

---

## Autograd (Calcul Automatique des Gradients)

### Le Concept

```python
# PyTorch trace les opérations et calcule les gradients automatiquement

x = torch.tensor([2.0], requires_grad=True)  # On veut le gradient
y = x ** 2 + 3 * x + 1  # y = x² + 3x + 1

y.backward()  # Calcule dy/dx

print(x.grad)  # tensor([7.]) car dy/dx = 2x + 3 = 2*2 + 3 = 7
```

### En Pratique

```python
# Les paramètres du modèle ont requires_grad=True par défaut
model = nn.Linear(10, 5)

# Forward pass
x = torch.randn(32, 10)
y = model(x)
loss = y.sum()

# Backward pass
loss.backward()  # Calcule les gradients

# Les gradients sont stockés dans .grad
print(model.weight.grad.shape)  # (5, 10)
print(model.bias.grad.shape)    # (5,)
```

### Contextes sans Gradient

```python
# Pour l'inférence (économise mémoire et calcul)
model.eval()
with torch.no_grad():
    predictions = model(input)

# Ou avec inference_mode (plus strict, plus rapide)
with torch.inference_mode():
    predictions = model(input)
```

---

## nn.Module (Créer des Modèles)

### Structure de Base

```python
import torch.nn as nn
import torch.nn.functional as F

class MyModel(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()  # Toujours appeler super().__init__()

        # Définir les couches
        self.linear1 = nn.Linear(input_size, hidden_size)
        self.linear2 = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        # Définir le forward pass
        x = F.relu(self.linear1(x))
        x = self.linear2(x)
        return x

# Usage
model = MyModel(784, 256, 10)
output = model(torch.randn(32, 784))  # Appelle forward() automatiquement
```

### Couches Communes

```python
# Fully connected
nn.Linear(in_features, out_features)

# Convolution
nn.Conv2d(in_channels, out_channels, kernel_size)

# Recurrent
nn.LSTM(input_size, hidden_size, num_layers)
nn.GRU(input_size, hidden_size, num_layers)

# Normalization
nn.BatchNorm1d(num_features)
nn.LayerNorm(normalized_shape)

# Dropout
nn.Dropout(p=0.5)

# Activation
nn.ReLU()
nn.GELU()
nn.Softmax(dim=-1)

# Embedding (pour NLP)
nn.Embedding(num_embeddings, embedding_dim)
```

### Accéder aux Paramètres

```python
model = MyModel(784, 256, 10)

# Tous les paramètres
for name, param in model.named_parameters():
    print(f"{name}: {param.shape}")

# Nombre total de paramètres
total_params = sum(p.numel() for p in model.parameters())
print(f"Total parameters: {total_params:,}")

# Paramètres entraînables seulement
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
```

---

## Sauvegarder et Charger

### Sauvegarder

```python
# Option 1: Seulement les poids (recommandé)
torch.save(model.state_dict(), 'model_weights.pt')

# Option 2: Tout le modèle (moins flexible)
torch.save(model, 'full_model.pt')
```

### Charger

```python
# Option 1: Charger les poids
model = MyModel(784, 256, 10)  # Recréer l'architecture
model.load_state_dict(torch.load('model_weights.pt'))

# Option 2: Charger le modèle complet
model = torch.load('full_model.pt')
```

### Checkpoint complet (pour reprendre l'entraînement)

```python
# Sauvegarder
checkpoint = {
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss,
}
torch.save(checkpoint, 'checkpoint.pt')

# Charger
checkpoint = torch.load('checkpoint.pt')
model.load_state_dict(checkpoint['model_state_dict'])
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
epoch = checkpoint['epoch']
loss = checkpoint['loss']
```

---

## Exercice Pratique

```python
import torch
import torch.nn as nn

# 1. Crée un tensor 3D de shape (2, 3, 4) avec des valeurs aléatoires
# 2. Calcule la moyenne sur la dernière dimension
# 3. Crée un modèle simple avec:
#    - Linear(20 → 64) + ReLU
#    - Linear(64 → 32) + ReLU
#    - Linear(32 → 10)
# 4. Fais un forward pass avec un batch de 8 samples
# 5. Calcule la loss (CrossEntropyLoss) avec des labels aléatoires
# 6. Fais un backward pass et affiche le gradient du premier layer
```

<details>
<summary>Solution</summary>

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

# 1. Tensor 3D
t = torch.randn(2, 3, 4)
print(f"Shape: {t.shape}")

# 2. Moyenne sur dernière dimension
mean = t.mean(dim=-1)
print(f"Mean shape: {mean.shape}")  # (2, 3)

# 3. Modèle
class SimpleModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(20, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, 10)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

model = SimpleModel()

# 4. Forward pass
batch = torch.randn(8, 20)
output = model(batch)
print(f"Output shape: {output.shape}")  # (8, 10)

# 5. Loss
labels = torch.randint(0, 10, (8,))
criterion = nn.CrossEntropyLoss()
loss = criterion(output, labels)
print(f"Loss: {loss.item():.4f}")

# 6. Backward et gradient
loss.backward()
print(f"fc1 weight gradient shape: {model.fc1.weight.grad.shape}")  # (64, 20)
```
</details>

---

*Prochaine étape: `02-amd-rocm-setup.md`*
