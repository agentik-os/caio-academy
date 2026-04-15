# Overfitting and Regularization

The number one problem in ML and how to combat it.

## The Problem: Overfitting

### Definition

**Overfitting** occurs when the model **memorizes** the training data instead of **generalizing** from it.

A model that achieves 99% accuracy on training data but only 60% on test data has learned by heart instead of understanding the underlying patterns.

### Visualization

**Underfitting** (too simple): A linear model trying to fit non-linear data. Both train and test performance are poor (around 50%).

**Good Fit** (just right): The model captures the underlying pattern. Train performance is around 85%, test is around 83%.

**Overfitting** (too complex): The model fits every noise point in the training data. Train performance is 99%, but test drops to 60%.

## Diagnostic

### Learning Curves

```python
import matplotlib.pyplot as plt

# Track loss during training
train_losses = []
val_losses = []

for epoch in range(num_epochs):
    train_loss = train_one_epoch(model, train_loader)
    val_loss = evaluate(model, val_loader)

    train_losses.append(train_loss)
    val_losses.append(val_loss)

# Plot
plt.plot(train_losses, label='Train')
plt.plot(val_losses, label='Validation')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.show()
```

### Patterns to Recognize

**Underfitting:** Both train and validation loss remain high and don't improve. The model is too simple or hasn't trained enough.

**Good fit:** Both losses decrease together and converge. There's a reasonable gap (around 5%).

**Overfitting:** Training loss continues to decrease, but validation loss stops improving or starts increasing. The model is memorizing training data.

## Solutions: Regularization

### 1. Early Stopping (Simplest)

```python
best_val_loss = float('inf')
patience = 5
patience_counter = 0

for epoch in range(max_epochs):
    train_loss = train_one_epoch(model, train_loader)
    val_loss = evaluate(model, val_loader)

    if val_loss < best_val_loss:
        best_val_loss = val_loss
        patience_counter = 0
        torch.save(model.state_dict(), 'best_model.pt')
    else:
        patience_counter += 1

    if patience_counter >= patience:
        print(f"Early stopping at epoch {epoch}")
        break

# Load the best model
model.load_state_dict(torch.load('best_model.pt'))
```

### 2. Dropout

```python
import torch.nn as nn

class ModelWithDropout(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer1 = nn.Linear(784, 256)
        self.dropout1 = nn.Dropout(p=0.5)  # 50% of neurons disabled
        self.layer2 = nn.Linear(256, 128)
        self.dropout2 = nn.Dropout(p=0.3)  # 30%
        self.layer3 = nn.Linear(128, 10)

    def forward(self, x):
        x = F.relu(self.layer1(x))
        x = self.dropout1(x)  # Applied only in training
        x = F.relu(self.layer2(x))
        x = self.dropout2(x)
        x = self.layer3(x)
        return x

# Important: model.train() activates dropout, model.eval() disables it
model.train()  # For training
model.eval()   # For inference
```

### 3. Weight Decay (L2 Regularization)

```python
# Penalizes weights that are too large
optimizer = optim.AdamW(
    model.parameters(),
    lr=1e-4,
    weight_decay=0.01  # L2 regularization
)

# Equivalent to adding to loss: λ * Σ(w²)
```

### 4. Data Augmentation

```python
# For images
from torchvision import transforms

transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.RandomCrop(224, padding=4),
    transforms.ColorJitter(brightness=0.1),
    transforms.ToTensor(),
])

# For text
def augment_text(text):
    # Synonym replacement
    # Random insertion
    # Random swap
    # Random deletion
    pass
```

### 5. More Data

The best regularization is more data. Before optimizing the model, consider:

- Collecting more data
- Data augmentation
- Transfer learning (using a pre-trained model)

### 6. Simpler Model

```python
# Too complex
class OverlyComplexModel(nn.Module):
    # 10 layers, 1M parameters for a small dataset

# Simpler
class SimpleModel(nn.Module):
    # 3 layers, 100k parameters
```

## For LLMs

### Fine-tuning: High Overfitting Risk

LLMs have **billions of parameters** but often train on a **small fine-tuning dataset**.

### Specific Solutions

```python
# 1. LoRA (Low-Rank Adaptation) - Train only a small part
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=8,                     # Low rank
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
)
model = get_peft_model(model, config)

# 2. Few epochs (1-3 max)
num_epochs = 3

# 3. Very low learning rate
lr = 2e-5

# 4. Warmup
warmup_ratio = 0.1
```

## Anti-Overfitting Checklist

| Technique | When to Use | Impact |
|-----------|-------------|--------|
| Early Stopping | Always | Strong |
| Dropout | Classic networks | Medium |
| Weight Decay | Always for AdamW | Medium |
| Data Augmentation | Images, sometimes text | Strong |
| More data | If possible | Very strong |
| LoRA | Fine-tuning LLMs | Strong |
| Reduce model | If severe overfitting | Strong |

## Exercise: Diagnose Overfitting

Analyze these scenarios:

**Scenario 1:**
- train_acc = [0.5, 0.6, 0.7, 0.8, 0.9]
- val_acc = [0.5, 0.55, 0.58, 0.57, 0.55]

**Scenario 2:**
- train_acc = [0.5, 0.5, 0.51, 0.52, 0.53]
- val_acc = [0.5, 0.5, 0.5, 0.51, 0.51]

**Scenario 3:**
- train_acc = [0.5, 0.65, 0.75, 0.82, 0.85]
- val_acc = [0.5, 0.63, 0.72, 0.78, 0.80]

**Answers:**

**Scenario 1: OVERFITTING** – Train continues to increase while validation plateaus then decreases. Solution: Early stopping, more regularization.

**Scenario 2: UNDERFITTING** – Both are low and not improving. Solution: More complex model, more epochs, higher learning rate.

**Scenario 3: GOOD FIT** – Both increase together with a reasonable gap (around 5%). Continue training or apply early stopping.

## Summary

**Underfitting:** Model too simple, train and validation both poor.

**Solutions:** More complex model, more epochs, higher LR, more features.

**Overfitting:** Model too complex, train good but validation poor.

**Solutions:** Early stopping, dropout, weight decay, data augmentation, more data, LoRA (for LLMs).

---

*Phase 2 complete! Next phase: `docs/03-pytorch-amd/`*
