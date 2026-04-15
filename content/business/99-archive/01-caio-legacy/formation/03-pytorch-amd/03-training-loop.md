# Training Loop PyTorch

> La boucle d'entraînement complète, étape par étape

---

## La Boucle Standard

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from tqdm import tqdm

def train(
    model: nn.Module,
    train_loader: DataLoader,
    val_loader: DataLoader,
    num_epochs: int = 10,
    learning_rate: float = 1e-4,
    device: str = 'cuda'
):
    # Setup
    model = model.to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.AdamW(model.parameters(), lr=learning_rate)

    # Training loop
    for epoch in range(num_epochs):
        # ===== TRAINING =====
        model.train()  # Mode entraînement (dropout actif, etc.)
        train_loss = 0.0
        correct = 0
        total = 0

        for batch in tqdm(train_loader, desc=f"Epoch {epoch+1}/{num_epochs}"):
            # 1. Get data
            inputs, labels = batch
            inputs = inputs.to(device)
            labels = labels.to(device)

            # 2. Zero gradients
            optimizer.zero_grad()

            # 3. Forward pass
            outputs = model(inputs)

            # 4. Compute loss
            loss = criterion(outputs, labels)

            # 5. Backward pass
            loss.backward()

            # 6. Update weights
            optimizer.step()

            # 7. Track metrics
            train_loss += loss.item()
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()

        train_loss /= len(train_loader)
        train_acc = 100. * correct / total

        # ===== VALIDATION =====
        model.eval()  # Mode évaluation
        val_loss = 0.0
        correct = 0
        total = 0

        with torch.no_grad():  # Pas de calcul de gradient
            for batch in val_loader:
                inputs, labels = batch
                inputs = inputs.to(device)
                labels = labels.to(device)

                outputs = model(inputs)
                loss = criterion(outputs, labels)

                val_loss += loss.item()
                _, predicted = outputs.max(1)
                total += labels.size(0)
                correct += predicted.eq(labels).sum().item()

        val_loss /= len(val_loader)
        val_acc = 100. * correct / total

        # ===== LOGGING =====
        print(f"Epoch {epoch+1}/{num_epochs}")
        print(f"  Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.2f}%")
        print(f"  Val Loss:   {val_loss:.4f} | Val Acc:   {val_acc:.2f}%")

    return model
```

---

## Chaque Étape Expliquée

### 1. model.train() vs model.eval()

```python
# TRAINING MODE
model.train()
# - Dropout activé
# - BatchNorm utilise les stats du batch courant
# - Gradient tracking activé

# EVALUATION MODE
model.eval()
# - Dropout désactivé
# - BatchNorm utilise les stats accumulées
# - Toujours utiliser avec torch.no_grad() pour l'inférence
```

### 2. optimizer.zero_grad()

```python
# Les gradients s'ACCUMULENT par défaut
# Il faut les remettre à zéro avant chaque step

optimizer.zero_grad()  # Reset des gradients

# Ou avec set_to_none (légèrement plus rapide)
optimizer.zero_grad(set_to_none=True)
```

### 3. Forward Pass

```python
outputs = model(inputs)
# Équivalent à: outputs = model.forward(inputs)

# outputs.shape dépend du modèle:
# Classification: (batch_size, num_classes)
# Régression: (batch_size, 1) ou (batch_size, output_dim)
# LLM: (batch_size, seq_len, vocab_size)
```

### 4. Loss Computation

```python
# Classification multi-classe
criterion = nn.CrossEntropyLoss()
loss = criterion(outputs, labels)  # labels: indices des classes

# Classification binaire
criterion = nn.BCEWithLogitsLoss()
loss = criterion(outputs, labels.float())  # labels: 0 ou 1

# Régression
criterion = nn.MSELoss()
loss = criterion(outputs, targets)

# Pour LLMs (next token prediction)
criterion = nn.CrossEntropyLoss(ignore_index=-100)  # Ignore padding
```

### 5. Backward Pass

```python
loss.backward()
# Calcule ∂loss/∂param pour tous les paramètres avec requires_grad=True
# Les gradients sont stockés dans param.grad
```

### 6. Optimizer Step

```python
optimizer.step()
# Applique: param = param - lr * param.grad
# (plus sophistiqué pour Adam: momentum, adaptive lr, etc.)
```

---

## Améliorations Importantes

### Learning Rate Scheduler

```python
from torch.optim.lr_scheduler import CosineAnnealingLR, OneCycleLR

scheduler = CosineAnnealingLR(optimizer, T_max=num_epochs)

for epoch in range(num_epochs):
    train_one_epoch(...)
    scheduler.step()  # Update LR après chaque epoch

# Ou per-step scheduler
scheduler = OneCycleLR(optimizer, max_lr=1e-3, total_steps=total_steps)

for batch in train_loader:
    ...
    optimizer.step()
    scheduler.step()  # Update LR après chaque step
```

### Gradient Clipping (Stabilité)

```python
# Évite l'explosion des gradients
loss.backward()
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
optimizer.step()
```

### Mixed Precision (Performance)

```python
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()

for batch in train_loader:
    optimizer.zero_grad()

    # Forward en mixed precision
    with autocast():
        outputs = model(inputs)
        loss = criterion(outputs, labels)

    # Backward avec scaling
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()
```

### Gradient Accumulation (Gros Batches)

```python
accumulation_steps = 4
effective_batch_size = batch_size * accumulation_steps

for i, batch in enumerate(train_loader):
    outputs = model(inputs)
    loss = criterion(outputs, labels)
    loss = loss / accumulation_steps  # Normaliser

    loss.backward()  # Accumule les gradients

    if (i + 1) % accumulation_steps == 0:
        optimizer.step()
        optimizer.zero_grad()
```

---

## Training Loop Complet avec Best Practices

```python
import torch
import torch.nn as nn
from torch.cuda.amp import autocast, GradScaler
from torch.utils.data import DataLoader
from tqdm import tqdm
import os

def train_advanced(
    model: nn.Module,
    train_loader: DataLoader,
    val_loader: DataLoader,
    num_epochs: int = 10,
    learning_rate: float = 1e-4,
    weight_decay: float = 0.01,
    warmup_steps: int = 100,
    gradient_accumulation_steps: int = 1,
    max_grad_norm: float = 1.0,
    use_amp: bool = True,
    save_dir: str = "./checkpoints",
    device: str = 'cuda'
):
    os.makedirs(save_dir, exist_ok=True)

    model = model.to(device)
    optimizer = torch.optim.AdamW(
        model.parameters(),
        lr=learning_rate,
        weight_decay=weight_decay
    )

    # Scheduler avec warmup
    total_steps = len(train_loader) * num_epochs // gradient_accumulation_steps
    scheduler = get_linear_schedule_with_warmup(
        optimizer,
        num_warmup_steps=warmup_steps,
        num_training_steps=total_steps
    )

    criterion = nn.CrossEntropyLoss()
    scaler = GradScaler() if use_amp else None

    best_val_loss = float('inf')
    global_step = 0

    for epoch in range(num_epochs):
        # ===== TRAINING =====
        model.train()
        train_loss = 0.0
        optimizer.zero_grad()

        pbar = tqdm(train_loader, desc=f"Epoch {epoch+1}/{num_epochs}")
        for step, batch in enumerate(pbar):
            inputs, labels = batch
            inputs = inputs.to(device)
            labels = labels.to(device)

            # Forward with AMP
            if use_amp:
                with autocast():
                    outputs = model(inputs)
                    loss = criterion(outputs, labels)
                    loss = loss / gradient_accumulation_steps
                scaler.scale(loss).backward()
            else:
                outputs = model(inputs)
                loss = criterion(outputs, labels)
                loss = loss / gradient_accumulation_steps
                loss.backward()

            train_loss += loss.item() * gradient_accumulation_steps

            # Gradient accumulation step
            if (step + 1) % gradient_accumulation_steps == 0:
                if use_amp:
                    scaler.unscale_(optimizer)

                # Gradient clipping
                torch.nn.utils.clip_grad_norm_(model.parameters(), max_grad_norm)

                if use_amp:
                    scaler.step(optimizer)
                    scaler.update()
                else:
                    optimizer.step()

                scheduler.step()
                optimizer.zero_grad()
                global_step += 1

            pbar.set_postfix({'loss': f'{loss.item():.4f}'})

        train_loss /= len(train_loader)

        # ===== VALIDATION =====
        model.eval()
        val_loss = 0.0

        with torch.no_grad():
            for batch in val_loader:
                inputs, labels = batch
                inputs = inputs.to(device)
                labels = labels.to(device)

                if use_amp:
                    with autocast():
                        outputs = model(inputs)
                        loss = criterion(outputs, labels)
                else:
                    outputs = model(inputs)
                    loss = criterion(outputs, labels)

                val_loss += loss.item()

        val_loss /= len(val_loader)

        # ===== LOGGING & CHECKPOINTING =====
        print(f"\nEpoch {epoch+1}/{num_epochs}")
        print(f"  Train Loss: {train_loss:.4f}")
        print(f"  Val Loss:   {val_loss:.4f}")
        print(f"  LR:         {scheduler.get_last_lr()[0]:.2e}")

        # Save best model
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save({
                'epoch': epoch,
                'model_state_dict': model.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'scheduler_state_dict': scheduler.state_dict(),
                'val_loss': val_loss,
            }, os.path.join(save_dir, 'best_model.pt'))
            print(f"  ✓ Saved best model (val_loss: {val_loss:.4f})")

        # Save checkpoint every epoch
        torch.save({
            'epoch': epoch,
            'model_state_dict': model.state_dict(),
            'optimizer_state_dict': optimizer.state_dict(),
            'scheduler_state_dict': scheduler.state_dict(),
            'val_loss': val_loss,
        }, os.path.join(save_dir, f'checkpoint_epoch_{epoch+1}.pt'))

    return model


# Helper function for warmup scheduler
def get_linear_schedule_with_warmup(optimizer, num_warmup_steps, num_training_steps):
    from torch.optim.lr_scheduler import LambdaLR

    def lr_lambda(current_step):
        if current_step < num_warmup_steps:
            return float(current_step) / float(max(1, num_warmup_steps))
        return max(0.0, float(num_training_steps - current_step) /
                   float(max(1, num_training_steps - num_warmup_steps)))

    return LambdaLR(optimizer, lr_lambda)
```

---

## Résumé: Les Best Practices

| Practice | Pourquoi |
|----------|----------|
| `model.train()` / `model.eval()` | Comportement correct de dropout/batchnorm |
| `torch.no_grad()` | Économise mémoire en validation |
| Gradient clipping | Stabilité de l'entraînement |
| Mixed precision (AMP) | 2x plus rapide, moins de mémoire |
| Gradient accumulation | Simule de gros batches |
| LR scheduler avec warmup | Meilleure convergence |
| Checkpointing | Reprendre si crash |
| Early stopping | Éviter l'overfitting |

---

*Prochaine étape: `04-data-loaders.md`*
