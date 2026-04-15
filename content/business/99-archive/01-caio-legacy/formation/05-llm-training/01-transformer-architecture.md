# Architecture Transformer

Le cœur de tous les LLMs modernes (GPT, BERT, Claude, Mistral, Llama...)

## Pourquoi les Transformers?

Avant l'arrivée des Transformers en 2017, les architectures dominantes étaient les RNN (Recurrent Neural Networks) et LSTM (Long Short-Term Memory). Ces architectures traitaient le texte séquentiellement, token par token, ce qui les rendait lentes à entraîner et limitait leur capacité à capturer les dépendances à longue distance dans le texte.

Les Transformers ont révolutionné le domaine avec trois innovations majeures : le traitement parallèle permettant de traiter tous les tokens simultanément, l'attention permettant à chaque token de "voir" tous les autres tokens, et une vitesse d'entraînement considérablement supérieure grâce au parallélisme.

## Vue d'Ensemble

Le pipeline complet d'un Transformer commence par la tokenization, qui convertit le texte (par exemple "Le chat dort") en identifiants numériques. Ces identifiants passent ensuite par une couche d'embedding qui les transforme en vecteurs continus, enrichis d'informations positionnelles pour préserver l'ordre des mots.

Ces embeddings traversent ensuite N blocs Transformer successifs, chacun composé de deux sous-modules principaux : une couche de Multi-Head Attention qui permet à chaque token d'interagir avec tous les autres, suivie d'un Feed-Forward Network qui transforme les représentations. Chaque sous-module utilise des connexions résiduelles et une normalisation par couche (LayerNorm) pour stabiliser l'entraînement.

Enfin, une couche de sortie (output head) convertit les représentations finales en probabilités sur le vocabulaire, permettant de prédire le prochain token.

## 1. Tokenization

La tokenization convertit du texte en nombres compréhensibles par le modèle.

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")

text = "Le chat dort"
tokens = tokenizer(text)
print(tokens)
# {'input_ids': [3123, 8537, 288, 419], 'attention_mask': [1, 1, 1, 1]}

# Décoder
decoded = tokenizer.decode(tokens['input_ids'])
print(decoded)  # "Le chat dort"
```

### Types de Tokenization

| Type | Exemple | Utilisé par |
|------|---------|-------------|
| Word | "hello" → 1 token | Ancien (aujourd'hui obsolète) |
| BPE | "hello" → "hel" + "lo" | GPT-2, GPT-3 |
| WordPiece | "hello" → "hel" + "##lo" | BERT |
| SentencePiece | "hello" → "▁hel" + "lo" | Llama, T5 |

Les approches modernes (BPE, WordPiece, SentencePiece) utilisent des sous-mots, ce qui permet de gérer efficacement les mots rares et de réduire la taille du vocabulaire.

## 2. Embeddings

Les embeddings convertissent les token IDs (nombres discrets) en vecteurs denses dans un espace continu de haute dimension.

```python
import torch.nn as nn

# Vocabulaire de 50k tokens, embeddings de dimension 768
embedding = nn.Embedding(50000, 768)

# Token IDs
input_ids = torch.tensor([123, 456, 789])

# Vecteurs
vectors = embedding(input_ids)  # Shape: (3, 768)
```

### Positional Encoding

Les Transformers n'ont pas de notion intrinsèque d'ordre, contrairement aux RNN. Il faut donc ajouter explicitement l'information de position via un encodage positionnel.

```python
class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000):
        super().__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len).unsqueeze(1).float()
        div_term = torch.exp(torch.arange(0, d_model, 2).float() *
                           (-math.log(10000.0) / d_model))

        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe)

    def forward(self, x):
        return x + self.pe[:x.size(1)]
```

L'encodage utilise des fonctions sinusoïdales de différentes fréquences, permettant au modèle d'apprendre facilement les positions relatives.

## 3. Self-Attention (Le Cœur)

Le mécanisme d'attention est l'innovation clé des Transformers. Il permet à chaque token de "regarder" tous les autres tokens et de comprendre le contexte global.

```python
def attention(Q, K, V, mask=None):
    """
    Q (Query): Ce qu'on cherche
    K (Key): Ce qu'on compare
    V (Value): Ce qu'on retourne

    Shapes: (batch, heads, seq_len, d_k)
    """
    d_k = K.size(-1)

    # Scores d'attention: similarité Q et K
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)

    # Masquer si nécessaire (pour génération autoregressive)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # Softmax → probabilités
    attention_weights = torch.softmax(scores, dim=-1)

    # Moyenne pondérée des values
    output = torch.matmul(attention_weights, V)
    return output, attention_weights
```

Le mécanisme fonctionne en trois étapes : calcul des scores de similarité entre Query et Key, application d'un softmax pour obtenir des poids d'attention normalisés, puis moyenne pondérée des Values selon ces poids.

### Multi-Head Attention

Plutôt qu'une seule attention, on utilise plusieurs "têtes" d'attention en parallèle, chacune apprenant à se concentrer sur des aspects différents du texte.

```python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, x, mask=None):
        batch_size = x.size(0)

        # Projections Q, K, V
        Q = self.W_q(x).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(x).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(x).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)

        # Attention
        attn_output, _ = attention(Q, K, V, mask)

        # Concat heads
        attn_output = attn_output.transpose(1, 2).contiguous().view(batch_size, -1, self.num_heads * self.d_k)

        return self.W_o(attn_output)
```

## 4. Feed-Forward Network

Après la couche d'attention, chaque position passe indépendamment par un réseau de neurones feed-forward, généralement avec une couche cachée de dimension plus grande que d_model.

```python
class FeedForward(nn.Module):
    def __init__(self, d_model, d_ff):
        super().__init__()
        self.linear1 = nn.Linear(d_model, d_ff)
        self.linear2 = nn.Linear(d_ff, d_model)
        self.activation = nn.GELU()

    def forward(self, x):
        return self.linear2(self.activation(self.linear1(x)))
```

L'activation GELU (Gaussian Error Linear Unit) est préférée à ReLU dans les Transformers modernes pour ses propriétés de gradient plus douces.

## 5. Transformer Block Complet

Un bloc Transformer combine l'attention, le feed-forward, et les éléments de stabilisation (LayerNorm et residual connections).

```python
class TransformerBlock(nn.Module):
    def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
        super().__init__()
        self.attention = MultiHeadAttention(d_model, num_heads)
        self.ff = FeedForward(d_model, d_ff)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        # Self-attention avec residual connection
        attn_out = self.attention(self.norm1(x), mask)
        x = x + self.dropout(attn_out)

        # Feed-forward avec residual connection
        ff_out = self.ff(self.norm2(x))
        x = x + self.dropout(ff_out)

        return x
```

Les connexions résiduelles (x + f(x)) permettent au gradient de se propager efficacement même dans des réseaux très profonds.

## 6. Types de Transformers

### Encoder-Only (BERT)

Les modèles encoder-only utilisent une attention bidirectionnelle, permettant à chaque token de voir tout le contexte (passé et futur). Ils sont particulièrement adaptés pour les tâches de classification, NER (Named Entity Recognition), et mesure de similarité.

### Decoder-Only (GPT, Llama, Mistral)

Les modèles decoder-only utilisent une attention causale (masked), où chaque token ne peut voir que les tokens précédents. Ils sont optimisés pour la génération de texte et constituent la base des chatbots modernes.

### Encoder-Decoder (T5, BART)

Les modèles encoder-decoder combinent les deux approches : un encoder lit le texte source avec attention bidirectionnelle, puis un decoder génère le texte cible avec attention causale. Ils excellent dans les tâches de traduction et de résumé.

## 7. Causal Attention Mask

Pour la génération autoregressive (decoder-only), chaque token ne doit voir que les tokens précédents, pas les suivants. Cela est implémenté via un masque causal.

```python
def create_causal_mask(seq_len):
    """
    Position i ne peut voir que positions 0 à i
    """
    mask = torch.tril(torch.ones(seq_len, seq_len))
    return mask

# Exemple pour seq_len=4:
# [[1, 0, 0, 0],
#  [1, 1, 0, 0],
#  [1, 1, 1, 0],
#  [1, 1, 1, 1]]
```

Ce masque triangulaire inférieur assure que lors du calcul des scores d'attention, les positions futures reçoivent un poids de -inf, qui devient 0 après le softmax.

## 8. Paramètres Typiques

| Modèle | Params | Layers | Heads | d_model | d_ff |
|--------|--------|--------|-------|---------|------|
| GPT-2 Small | 117M | 12 | 12 | 768 | 3072 |
| BERT Base | 110M | 12 | 12 | 768 | 3072 |
| Llama 7B | 7B | 32 | 32 | 4096 | 11008 |
| Llama 70B | 70B | 80 | 64 | 8192 | 28672 |

La dimension du feed-forward (d_ff) est généralement 4 fois plus grande que d_model. Le nombre de têtes divise exactement d_model.

## Résumé

Un Transformer se compose d'embeddings (token + position), suivis de N blocs identiques (Self-Attention + Feed-Forward + LayerNorm + Residual), et d'une couche de sortie.

Les innovations clés sont : le mécanisme de Self-Attention qui donne un contexte global, le Multi-Head permettant différents "points de vue", les connexions résiduelles et LayerNorm assurant la stabilité de l'entraînement, et le traitement parallèle offrant une vitesse exceptionnelle.

*Prochaine étape: `02-pretrained-models.md`*
