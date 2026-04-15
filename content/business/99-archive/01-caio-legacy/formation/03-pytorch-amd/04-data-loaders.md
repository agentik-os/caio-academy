# Data Loaders PyTorch

Efficiently loading and preprocessing data for training.

## The Concept

The data flow follows this pattern: Dataset defines how to access a single sample, DataLoader groups samples into batches with shuffling, parallel loading, and prefetching. The batches are then fed to the model.

The Dataset component defines how to access one sample, while the DataLoader handles batching (grouping samples), shuffling (randomization), parallel loading (multi-threading), and prefetching (loading while GPU works).

## Dataset: Accessing Data

### Option 1: Map-style Dataset (Most Common)

```python
from torch.utils.data import Dataset

class MyDataset(Dataset):
    def __init__(self, data, labels, transform=None):
        self.data = data
        self.labels = labels
        self.transform = transform

    def __len__(self):
        """Returns total number of samples"""
        return len(self.data)

    def __getitem__(self, idx):
        """Returns ONE sample (called by DataLoader)"""
        sample = self.data[idx]
        label = self.labels[idx]

        if self.transform:
            sample = self.transform(sample)

        return sample, label

# Usage
dataset = MyDataset(data, labels)
sample, label = dataset[0]  # Access by index
print(len(dataset))          # Number of samples
```

### Option 2: Iterable Dataset (Streaming)

```python
from torch.utils.data import IterableDataset

class StreamingDataset(IterableDataset):
    def __init__(self, file_path):
        self.file_path = file_path

    def __iter__(self):
        """Yield samples one by one"""
        with open(self.file_path, 'r') as f:
            for line in f:
                yield self.process_line(line)

    def process_line(self, line):
        # Parse the line
        return data, label

# Useful for:
# - Very large files that don't fit in memory
# - Streaming data
```

## DataLoader: Creating Batches

```python
from torch.utils.data import DataLoader

train_loader = DataLoader(
    dataset,
    batch_size=32,           # Batch size
    shuffle=True,            # Shuffle each epoch
    num_workers=4,           # Parallel loading threads
    pin_memory=True,         # Speeds up transfer to GPU
    drop_last=True,          # Ignore incomplete last batch
    collate_fn=None,         # Custom function to assemble samples
)

# Iterate over batches
for batch_idx, (inputs, labels) in enumerate(train_loader):
    # inputs: (batch_size, ...)
    # labels: (batch_size, ...)
    pass
```

### Important Parameters

| Parameter | Effect | Typical Value |
|-----------|--------|---------------|
| `batch_size` | Number of samples per batch | 16-256 |
| `shuffle` | Shuffle data | True (train), False (val/test) |
| `num_workers` | Loading threads | 4-8 |
| `pin_memory` | Paged memory for GPU | True if GPU |
| `drop_last` | Ignore partial last batch | True (train) |

## Collate Function: Assembling Samples

When samples have different sizes, you need a custom collate function:

```python
def collate_fn(batch):
    """
    batch = [(sample1, label1), (sample2, label2), ...]
    """
    samples, labels = zip(*batch)

    # Padding for same length
    max_len = max(len(s) for s in samples)
    padded_samples = []
    attention_masks = []

    for sample in samples:
        padding = max_len - len(sample)
        padded = torch.cat([sample, torch.zeros(padding)])
        mask = torch.cat([torch.ones(len(sample)), torch.zeros(padding)])
        padded_samples.append(padded)
        attention_masks.append(mask)

    return {
        'input_ids': torch.stack(padded_samples),
        'attention_mask': torch.stack(attention_masks),
        'labels': torch.tensor(labels)
    }

loader = DataLoader(dataset, batch_size=32, collate_fn=collate_fn)
```

## Complete Example: NLP Dataset

```python
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import AutoTokenizer

class TextClassificationDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_length=512):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_length = max_length

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = self.texts[idx]
        label = self.labels[idx]

        # Tokenization
        encoding = self.tokenizer(
            text,
            truncation=True,
            max_length=self.max_length,
            padding='max_length',
            return_tensors='pt'
        )

        return {
            'input_ids': encoding['input_ids'].squeeze(0),
            'attention_mask': encoding['attention_mask'].squeeze(0),
            'label': torch.tensor(label)
        }

# Usage
tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')

train_dataset = TextClassificationDataset(
    texts=["Hello world", "Goodbye world", ...],
    labels=[0, 1, ...],
    tokenizer=tokenizer
)

train_loader = DataLoader(
    train_dataset,
    batch_size=16,
    shuffle=True,
    num_workers=4
)

for batch in train_loader:
    input_ids = batch['input_ids']        # (batch_size, max_length)
    attention_mask = batch['attention_mask']
    labels = batch['label']                # (batch_size,)
```

## With Hugging Face Datasets

```python
from datasets import load_dataset
from transformers import AutoTokenizer

# Load a dataset
dataset = load_dataset("imdb")

# Tokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

def tokenize_function(examples):
    return tokenizer(
        examples["text"],
        truncation=True,
        padding="max_length",
        max_length=512
    )

# Apply tokenizer
tokenized = dataset.map(tokenize_function, batched=True)

# Keep only necessary columns
tokenized = tokenized.remove_columns(["text"])
tokenized = tokenized.rename_column("label", "labels")

# PyTorch format
tokenized.set_format("torch")

# DataLoader
from torch.utils.data import DataLoader

train_loader = DataLoader(
    tokenized["train"],
    batch_size=16,
    shuffle=True
)
```

## Data Augmentation (NLP)

```python
import random

class AugmentedTextDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, augment=True):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.augment = augment

    def __getitem__(self, idx):
        text = self.texts[idx]

        if self.augment:
            text = self.random_augment(text)

        encoding = self.tokenizer(text, ...)
        return encoding

    def random_augment(self, text):
        """Simple text augmentation"""
        words = text.split()

        # Random deletion (10% of words)
        if random.random() < 0.3:
            words = [w for w in words if random.random() > 0.1]

        # Random swap (swap 2 adjacent words)
        if random.random() < 0.3 and len(words) > 1:
            idx = random.randint(0, len(words) - 2)
            words[idx], words[idx + 1] = words[idx + 1], words[idx]

        return ' '.join(words)
```

## Optimizations

### 1. Prefetching

Parallel loading with `num_workers > 0` activates automatic prefetching. The CPU prepares the next batches while the GPU works.

```python
loader = DataLoader(dataset, num_workers=4)
```

### 2. Pin Memory

Speeds up CPU to GPU transfer if you have enough RAM:

```python
loader = DataLoader(dataset, pin_memory=True)
```

### 3. Persistent Workers (PyTorch 1.7+)

Keeps workers between epochs to avoid recreation cost:

```python
loader = DataLoader(
    dataset,
    num_workers=4,
    persistent_workers=True
)
```

### 4. Non-blocking Transfer

```python
for batch in loader:
    # Asynchronous transfer
    inputs = batch['input_ids'].to(device, non_blocking=True)
    labels = batch['labels'].to(device, non_blocking=True)

    # Transfer continues in background
    # Make sure it's finished before using
```

## Split Train/Val/Test

```python
from torch.utils.data import random_split

# Random split
train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size
train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

# Or with seed for reproducibility
generator = torch.Generator().manual_seed(42)
train_dataset, val_dataset = random_split(
    dataset,
    [train_size, val_size],
    generator=generator
)

# DataLoaders
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)
```

## Summary

| Component | Role |
|-----------|------|
| `Dataset` | Defines access to ONE sample |
| `DataLoader` | Creates batches, shuffles, parallelizes |
| `collate_fn` | Handles samples of different sizes |
| `num_workers` | Parallel loading |
| `pin_memory` | Speeds up GPU transfer |

---

*Next step: `05-distributed-training.md`*
