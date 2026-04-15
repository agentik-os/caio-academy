# Training Concepts

Understanding loss functions, optimizers, epochs, and batches – everything that makes a model learn.

## The Training Pipeline

The training loop iterates over the entire dataset multiple times (epochs). Within each epoch, data is processed in batches. For every batch, four steps occur in sequence:

1. **Forward Pass** – The model produces a prediction from the batch input.
2. **Compute Loss** – The loss function measures how far the prediction is from the target.
3. **Backward Pass** – `loss.backward()` computes gradients for every parameter.
4. **Update Parameters** – The optimizer adjusts parameters using those gradients, then gradients are zeroed for the next iteration.

## 1. Loss Functions

### What is Loss?

Loss measures **how wrong the model is**. The objective is to **minimize the loss**.

### For Classification

```python
import torch.nn as nn

# Cross-Entropy Loss (multi-class)
criterion = nn.CrossEntropyLoss()

# Example
predictions = torch.tensor([[2.0, 1.0, 0.1]])  # Logits (not softmax!)
targets = torch.tensor([0])  # Class 0

loss = criterion(predictions, targets)
print(loss)  # tensor(0.4170) - low because predicts class 0 well
```

### For Regression

```python
# Mean Squared Error (MSE)
criterion = nn.MSELoss()

predictions = torch.tensor([2.5, 3.0, 4.5])
targets = torch.tensor([2.0, 3.0, 5.0])

loss = criterion(predictions, targets)
# (0.5² + 0² + 0.5²) / 3 = 0.167
```

### For LLMs (Language Modeling)

Cross-Entropy is applied to predict the next token at each position. If the sequence is "The cat sat", the input is "The cat" and the target is "cat sat". The criterion is applied at each position in the sequence.

```python
criterion = nn.CrossEntropyLoss()
# Applied on each position of the sequence
```

## 2. Optimizers

### What is an Optimizer?

The optimizer decides **how to update parameters** based on gradients.

### SGD (Stochastic Gradient Descent)

```python
import torch.optim as optim

optimizer = optim.SGD(model.parameters(), lr=0.01)

# Update: param = param - lr * gradient
```

### Adam (Most Popular)

```python
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Combines:
# - Momentum (average of past gradients)
# - Adaptive learning rate (adjusts per parameter)
```

### AdamW (For LLMs)

```python
optimizer = optim.AdamW(
    model.parameters(),
    lr=1e-5,            # Low learning rate for fine-tuning
    weight_decay=0.01   # L2 regularization
)
```

### Comparison

| Optimizer | When to Use |
|-----------|-------------|
| SGD | Rarely alone, educational baseline |
| Adam | Default for most cases |
| AdamW | **LLMs and Transformers** |
| Adafactor | Large models (saves memory) |

## 3. Learning Rate

### The Most Important Parameter

```python
# Too large: diverges, loss explodes
optimizer = optim.Adam(model.parameters(), lr=1.0)  # Bad

# Too small: converges very slowly
optimizer = optim.Adam(model.parameters(), lr=1e-10)  # Bad

# Just right: depends on the problem
optimizer = optim.Adam(model.parameters(), lr=1e-4)  # Typical
```

### Learning Rate Schedulers

```python
from torch.optim.lr_scheduler import (
    StepLR,
    CosineAnnealingLR,
    LinearLR,
    OneCycleLR
)

# Decrease LR every 10 epochs
scheduler = StepLR(optimizer, step_size=10, gamma=0.1)

# Cosine annealing (popular for LLMs)
scheduler = CosineAnnealingLR(optimizer, T_max=100)

# Linear warmup then decay (standard for LLMs)
scheduler = get_linear_schedule_with_warmup(
    optimizer,
    num_warmup_steps=1000,
    num_training_steps=10000
)
```

### Warmup (Important for LLMs)

The learning rate starts from a low value (warmup phase), increases to a maximum, maintains during training, then decays toward the end. This pattern helps stabilize training and prevents early instability.

## 4. Batches and Epochs

### Vocabulary

| Term | Definition |
|------|------------|
| **Sample** | One data example |
| **Batch** | Group of samples processed together |
| **Epoch** | One complete pass over the entire dataset |
| **Iteration/Step** | One parameter update (1 batch) |

### Example

```python
dataset_size = 10000  # 10k examples
batch_size = 32
num_epochs = 3

iterations_per_epoch = dataset_size // batch_size  # 312
total_iterations = iterations_per_epoch * num_epochs  # 936
```

### Why Batches?

**Option 1:** Entire dataset (Batch Gradient Descent) – Too much memory, no beneficial noise.

**Option 2:** One sample at a time (Stochastic GD) – Too much noise, no GPU parallelization.

**Option 3:** Mini-batches (the standard) – Good compromise between memory and stability.

```python
batch_size = 32  # Typical
batch_size = 8   # If GPU memory limited
batch_size = 256 # If many GPUs/memory
```

### DataLoader PyTorch

```python
from torch.utils.data import DataLoader, Dataset

train_loader = DataLoader(
    dataset,
    batch_size=32,
    shuffle=True,      # Shuffle each epoch
    num_workers=4,     # Parallel loading
    pin_memory=True    # Speeds up CPU→GPU transfer
)

for epoch in range(num_epochs):
    for batch in train_loader:
        inputs, targets = batch
        # Training step...
```

## 5. Gradient Accumulation

When batch size is too small (limited memory), accumulate gradients to simulate a larger batch:

```python
accumulation_steps = 4  # Simulates batch_size * 4

for i, batch in enumerate(dataloader):
    outputs = model(batch.input)
    loss = criterion(outputs, batch.target)
    loss = loss / accumulation_steps  # Normalize

    loss.backward()  # Accumulate gradients

    if (i + 1) % accumulation_steps == 0:
        optimizer.step()
        optimizer.zero_grad()
```

## 6. Complete Training Code

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from tqdm import tqdm

def train(model, train_loader, val_loader, num_epochs=10):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = model.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.AdamW(model.parameters(), lr=1e-4)
    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=num_epochs)

    best_val_loss = float('inf')

    for epoch in range(num_epochs):
        # Training
        model.train()
        train_loss = 0

        for batch in tqdm(train_loader, desc=f"Epoch {epoch+1}/{num_epochs}"):
            inputs = batch['input'].to(device)
            targets = batch['target'].to(device)

            optimizer.zero_grad()

            outputs = model(inputs)
            loss = criterion(outputs, targets)

            loss.backward()
            optimizer.step()

            train_loss += loss.item()

        train_loss /= len(train_loader)

        # Validation
        model.eval()
        val_loss = 0

        with torch.no_grad():
            for batch in val_loader:
                inputs = batch['input'].to(device)
                targets = batch['target'].to(device)

                outputs = model(inputs)
                loss = criterion(outputs, targets)

                val_loss += loss.item()

        val_loss /= len(val_loader)

        # Learning rate step
        scheduler.step()

        # Logging
        print(f"Epoch {epoch+1}: Train Loss = {train_loss:.4f}, Val Loss = {val_loss:.4f}")

        # Save best model
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save(model.state_dict(), 'best_model.pt')

    return model
```

## 7. Typical Hyperparameters

### For Standard Classification

```python
batch_size = 32
learning_rate = 1e-3
num_epochs = 20
optimizer = Adam
```

### For Fine-tuning LLMs

```python
batch_size = 8          # Small (memory)
learning_rate = 2e-5    # Very small
num_epochs = 3          # Few epochs
warmup_ratio = 0.1      # 10% warmup
weight_decay = 0.01     # Regularization
optimizer = AdamW
```

## Summary

| Concept | Typical Values | Notes |
|---------|----------------|-------|
| Loss | CrossEntropy (classif), MSE (reg) | What we minimize |
| Optimizer | AdamW for LLMs | How we update |
| Learning Rate | 1e-3 to 1e-5 | Most important |
| Batch Size | 8-256 | Limited by memory |
| Epochs | 3-20 | Fewer for fine-tuning |
| Gradient Accumulation | 4-8 | If memory limited |

---

*Next step: `05-overfitting-regularization.md`*
