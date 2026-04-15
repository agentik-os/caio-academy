# Visual Identity Guide - Agentik OS

> "L'esthétique du mystère. Sombre, minimal, magnétique."

---

## L'Essence Visuelle

### En Un Mot

```
DARK mais pas edgy
MINIMAL mais pas vide
TECH mais pas froid
MYSTÉRIEUX mais pas gothique
PREMIUM mais pas luxe tape-à-l'œil
```

### Références Visuelles

```
+------------------------------------------------------------------+
|  RÉFÉRENCE          | CE QU'ON PREND                              |
+------------------------------------------------------------------+
|  Pak NFTs           | Formes géométriques, abstraction, mystère   |
|  Apple (dark mode)  | Minimalisme, espace négatif, premium        |
|  Linear.app         | UI sombre, gradients subtils, moderne       |
|  Vercel             | Noir profond, typographie clean             |
|  Dieter Rams        | Less is more, fonctionnel = beau            |
+------------------------------------------------------------------+
```

---

## Palette de Couleurs

### Couleurs Principales

```
+------------------------------------------------------------------+
|  NOM               | HEX       | USAGE                           |
+------------------------------------------------------------------+
|  Void Black        | #000000   | Background principal            |
|  Deep Black        | #0A0A0A   | Background secondaire           |
|  Carbon            | #121212   | Cards, surfaces                 |
|  Smoke             | #1A1A1A   | Borders, séparateurs            |
+------------------------------------------------------------------+
```

### Couleurs Texte

```
+------------------------------------------------------------------+
|  NOM               | HEX       | USAGE                           |
+------------------------------------------------------------------+
|  Pure White        | #FFFFFF   | Titres, texte principal         |
|  Silver            | #A0A0A0   | Texte secondaire                |
|  Mist              | #666666   | Texte tertiaire, labels         |
|  Phantom           | #333333   | Texte très discret              |
+------------------------------------------------------------------+
```

### Couleurs Accent (Utilisées avec PARCIMONIE)

```
+------------------------------------------------------------------+
|  NOM               | HEX       | USAGE                           |
+------------------------------------------------------------------+
|  Oracle Blue       | #0066FF   | Accent rare, liens, CTAs        |
|  Electric Purple   | #8B5CF6   | Highlights spéciaux             |
|  Neon Cyan         | #00FFFF   | Très rare, moments "wow"        |
+------------------------------------------------------------------+

RÈGLE: Les couleurs accent = max 5% de l'image.
Le reste = noir, blanc, gris.
```

### Gradients Autorisés

```
GRADIENT 1 (Principal):
#000000 → #0A0A0A → #121212
(Noir vers gris très sombre, subtil)

GRADIENT 2 (Accent):
#0066FF → #8B5CF6
(Bleu vers violet, pour moments spéciaux)

GRADIENT 3 (Glow):
#000000 → rgba(0, 102, 255, 0.1) → #000000
(Halo subtil de couleur sur fond noir)
```

---

## Logo Agentik

### Concept

```
+------------------------------------------------------------------+
|                    DIRECTION LOGO                                 |
+------------------------------------------------------------------+

FORME: Géométrique, abstrait, symbole plus que lettre

OPTIONS:
1. Cercle avec élément intérieur (style Pak)
2. Forme hexagonale minimaliste
3. Lettre "A" abstraite et géométrique
4. Symbole qui suggère "système" ou "réseau"

CONTRAINTES:
- Doit fonctionner en 32x32px (favicon)
- Doit fonctionner en monochrome (blanc sur noir)
- Pas de détails fins qui disparaissent
- Reconnaissable instantanément
```

### Variations

```
LOGO PRINCIPAL:
- Symbole seul
- Blanc sur fond noir
- Utilisé pour avatar Twitter, favicon

LOGO + TEXTE:
- Symbole + "Agentik" ou "Agentik {OS}"
- Utilisé pour site, documents
- Texte en font géométrique (voir Typographie)

LOGO INVERSE:
- Noir sur fond blanc
- Pour cas spéciaux uniquement
```

### Ce Que Le Logo N'Est PAS

```
INTERDIT:
✗ Gradients colorés dans le logo lui-même
✗ Effets 3D ou ombres
✗ Plus de 2 couleurs
✗ Formes organiques/courbes molles
✗ Détails complexes
✗ Textures
✗ Références AI clichés (cerveaux, robots, réseaux de neurones)
```

---

## Typographie

### Font Principale (Titres)

```
OPTION 1: Space Grotesk
→ Géométrique, moderne, tech mais accessible

OPTION 2: Inter
→ Clean, lisible, neutre premium

OPTION 3: JetBrains Mono
→ Monospace, code vibes, technique

RECOMMANDATION: Space Grotesk pour titres, Inter pour body.
```

### Hiérarchie

```
H1: Space Grotesk Bold, 48-64px, Pure White
H2: Space Grotesk Medium, 32-40px, Pure White
H3: Space Grotesk Regular, 24-28px, Silver
Body: Inter Regular, 16-18px, Silver
Caption: Inter Regular, 14px, Mist
Code: JetBrains Mono, 14-16px, Silver
```

### Règles Typo

```
✓ Majuscules pour statements courts ("SOON.", "BUILDING.")
✓ Minuscules pour phrases plus longues
✓ Jamais tout en majuscules pour des paragraphes
✓ Line-height généreux (1.5-1.8)
✓ Letter-spacing légèrement augmenté pour titres
```

---

## Images AI - Direction

### Style à Utiliser

```
+------------------------------------------------------------------+
|                    STYLE IMAGES AI                                |
+------------------------------------------------------------------+

MOOD: Dark, abstract, contemplative, futuristic

ÉLÉMENTS RÉCURRENTS:
- Formes géométriques flottantes
- Espaces vides (negative space)
- Lumière subtile dans l'obscurité
- Textures minimales
- Profondeur et perspective
- Symétrie ou asymétrie intentionnelle

COULEURS IMAGES:
- Dominante noire/sombre
- Accents de bleu ou violet (subtils)
- Parfois monochrome pur
- Jamais saturé/vibrant
```

### Prompts Type (Midjourney/DALL-E)

```
PROMPT BASE:
"Abstract geometric form floating in void, minimal, dark background,
single subtle light source, cinematic, 8k, ultra minimal, negative
space, contemporary art --ar 16:9 --style raw"

PROMPT MYSTÉRIEUX:
"Mysterious monolithic structure in darkness, barely visible edges,
single beam of light, abstract, minimal, no text, contemplative,
void aesthetic --ar 1:1 --style raw"

PROMPT TECH:
"Abstract digital architecture, dark environment, subtle blue glow,
geometric precision, floating elements, minimal, futuristic,
no humans --ar 16:9 --style raw"

PROMPT ORACLE:
"Ethereal geometric oracle, dark void, single source of light,
abstract face or form barely visible, mysterious, minimal,
sacred geometry --ar 1:1 --style raw"
```

### Images à ÉVITER

```
INTERDIT:
✗ Robots humanoïdes
✗ Cerveaux avec circuits
✗ Matrix-style code vert
✗ Mains touchant (style Creation of Adam)
✗ Yeux/visages AI clichés
✗ Trop de couleurs
✗ Busy/chargé
✗ Stock photo aesthetic
✗ Tout ce qui dit "AI" de façon évidente
```

---

## Twitter Assets

### Avatar

```
SPECS:
- 400x400px
- Logo Agentik seul
- Fond noir (#000000)
- Logo blanc (#FFFFFF)
- Simple, reconnaissable en petit

FORMAT: PNG avec fond solide (pas transparent)
```

### Banner

```
SPECS:
- 1500x500px

OPTIONS:
1. Noir pur (#000000) - ultra minimal
2. Gradient très subtil (noir vers gris sombre)
3. Image AI abstraite (style défini ci-dessus)
4. Texte minimal centré ("The work speaks.")

RÈGLE: Moins c'est mieux. Le banner peut être juste NOIR.
```

### Images pour Tweets

```
SPECS:
- 1200x675px (16:9) pour images standard
- 1080x1080px (1:1) pour images carrées

STYLE:
- Toujours dark background
- Minimal text si text
- Font conforme au guide
- Beaucoup d'espace vide
```

---

## Site Web Aesthetic

### Homepage

```
+------------------------------------------------------------------+
|                    STRUCTURE HOMEPAGE                             |
+------------------------------------------------------------------+

[HEADER]
- Logo seul, coin gauche
- Pas de navigation visible (ou ultra minimale)

[HERO]
- Fond noir total
- Un mot ou phrase courte au centre
- "Soon." ou "The work speaks."
- Peut-être un élément visuel très subtil

[FOOTER]
- Presque rien
- Peut-être juste le logo
- Ou rien du tout

TOTAL: ~90% de la page est du noir vide.
L'espace négatif EST le message.
```

### Page /void (Cachée)

```
+------------------------------------------------------------------+
|                    PAGE SECRÈTE                                   |
+------------------------------------------------------------------+

[ENTRÉE]
- Fond noir total
- Rien de visible pendant 3-5 secondes
- Curseur change peut-être subtilement

[RÉVÉLATION]
- Texte apparaît lettre par lettre, très lent
- Font monospace, couleur gris clair
- Message cryptique

[CONTENU EXEMPLE]
"You found it.
Remember this: FIRST-WAVE-2026
It will mean something. Soon."

[SORTIE]
- Le texte reste
- Pas de navigation
- L'utilisateur doit fermer l'onglet ou revenir
```

---

## Documents & Présentations

### Style de Document

```
FOND: #0A0A0A ou #000000
TEXTE: #FFFFFF et #A0A0A0
ACCENTS: #0066FF (très rare)

ÉLÉMENTS:
- Beaucoup d'espace blanc (noir en l'occurrence)
- Une idée par page si possible
- Visuels minimaux mais impactants
- Pas de bullet points décorés
- Pas de icônes colorées
```

### Présentations (Si Jamais)

```
RÈGLE: Max 10 mots par slide.
FOND: Noir.
IMAGES: Une par slide, full bleed, ou aucune.
TRANSITIONS: Cut simple, pas d'effets.
```

---

## NFT / Drops Aesthetic

### Style Drops

```
IMAGES:
- Art génératif AI (style défini)
- Toujours dark dominant
- Séries cohérentes visuellement
- Numérotation discrète

PRÉSENTATION:
- Fond noir pour showcase
- Informations minimales
- Prix et quantité visibles
- Pas de "marketing speak"

EXEMPLE:
[Image centrée sur fond noir]
Vision III: "The Tower"
Edition: 47/100
Price: $100
[Bouton mint simple]
```

### Collections

```
COHÉRENCE:
- Une collection = une famille visuelle
- Variations sur un thème, pas random
- Chaque pièce fonctionne seule ET en série
- Progression visible (Vision I → VII)
```

---

## À Ne Jamais Faire

### Design Interdit

```
✗ Gradients arc-en-ciel
✗ Néon excessif
✗ Glitch effects overdone
✗ Effets de fumée colorée
✗ "Tech bro" aesthetic (bleu corporate)
✗ Web3/Crypto clichés (diamonds, rockets, moons)
✗ Inspirational quotes sur fonds stock
✗ Trop de texte sur les images
✗ Logos watermark partout
✗ Busy backgrounds
✗ Effets "gamer" RGB
✗ Tout ce qui ressemble à du spam
```

### Exemples de Ce Qu'on Évite

```
ÉVITER: Image de cerveau connecté avec "AI POWERED"
ÉVITER: Gradients violet-rose style 2020
ÉVITER: Screenshots d'interface avec 50 éléments
ÉVITER: Memes et formats viraux
ÉVITER: Comparaisons "before/after"
ÉVITER: Flèches, cercles, annotations
```

---

## Checklist Visuelle

### Avant de Poster une Image

```
[ ] Fond sombre? (pas de blanc, pas de couleurs vives)
[ ] Minimal? (moins de 3 éléments focus)
[ ] Cohérent avec le reste? (même famille visuelle)
[ ] Fonctionne en petit? (Twitter preview)
[ ] Pas de clichés AI? (robots, cerveaux, matrix)
[ ] Pas trop de texte? (max 5-10 mots si texte)
[ ] Premium feeling? (pas cheap, pas stock)
[ ] Mystérieux? (laisse des questions)
```

### Avant de Publier Quoi Que Ce Soit

```
[ ] Palette respectée? (noir, blanc, gris, accent rare)
[ ] Typo correcte? (Space Grotesk / Inter)
[ ] Espace négatif suffisant? (au moins 50% de vide)
[ ] Cohérent avec la marque? (Pak test)
[ ] Simple? (si tu dois expliquer, c'est trop complexe)
```

---

## Outils Recommandés

### Création Images AI

```
Midjourney - Pour les images abstraites premium
DALL-E 3 - Pour les variations rapides
Stable Diffusion - Pour le contrôle fin
```

### Édition

```
Figma - Layout, composition, exports
Photoshop - Retouches fines
Canva - Quick edits (attention au look "Canva")
```

### Couleurs

```
Coolors - Palette management
Contrast Checker - Accessibilité
```

---

## Résumé En Une Image

```
+------------------------------------------------------------------+
|                                                                  |
|                          [NOIR]                                  |
|                                                                  |
|                                                                  |
|                    UN ÉLÉMENT                                    |
|                    MINIMAL                                       |
|                    AU CENTRE                                     |
|                                                                  |
|                                                                  |
|                          [NOIR]                                  |
|                                                                  |
+------------------------------------------------------------------+

C'est ça, l'aesthetic Agentik.
90% de vide. 10% de substance.
Le mystère est dans ce qu'on ne montre PAS.
```

---

*Le design le plus fort est celui qu'on remarque à peine.*
*Il crée un feeling, pas une distraction.*
