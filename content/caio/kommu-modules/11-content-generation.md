---
title: "Content Generation : Image, Video, Audio, Web"
summary: "Maitriser tous les formats de creation avec l'IA : images professionnelles, videos marketing, musique et podcasts, sites web complets. Le createur solo avec les pouvoirs d'un studio entier."
track: content
number: "T3-02"
duration: "30-40h"
audience: "Createurs, entrepreneurs, marketeurs, freelances, filmmakers, podcasters, designers"
---

# Content Generation : Image, Video, Audio, Web

Maitriser tous les formats de creation avec l'IA : images professionnelles, videos marketing, musique et podcasts, sites web complets. Ce module fait de vous un createur multi-format capable de produire du contenu de qualite studio dans chaque medium — image, video, audio, texte et web — en une fraction du temps et du cout traditionnels.

---

## Objectif du module

A l'issue de ce module, vous maitriserez les outils de generation IA pour chaque format de contenu : images (Midjourney, DALL-E, Flux), videos (Runway, Sora, Kling), audio (Suno, ElevenLabs), texte (Claude, GPT-4o) et web (Claude Code). Vous saurez choisir le bon outil pour chaque besoin, produire du contenu professionnel, et integrer ces outputs dans vos pipelines de publication.

---

## Lecon 1 — Generation d'images : Midjourney, DALL-E, Gemini Imagen, Flux

### Ce que vous allez apprendre

Comparer les 4 grands generateurs d'images IA, maitriser le prompt engineering visuel, et produire des images de qualite professionnelle pour chaque usage : marketing, branding, social media, illustration.

### Contenu detaille

**Comparatif des generateurs d'images (2026) :**

| Critere | Midjourney v7 | DALL-E 3 | Gemini Imagen 3 | Flux Pro 1.1 |
|---------|--------------|----------|-----------------|-------------|
| Qualite artistique | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★★★ |
| Precision du prompt | ★★★★☆ | ★★★★★ | ★★★★★ | ★★★★☆ |
| Texte dans l'image | ★★★☆☆ | ★★★★★ | ★★★★★ | ★★★★☆ |
| Photoréalisme | ★★★★★ | ★★★★☆ | ★★★★★ | ★★★★★ |
| Vitesse | Moyenne | Rapide | Rapide | Tres rapide |
| API disponible | Non (Discord) | Oui (OpenAI) | Oui (Google) | Oui (BFL/Replicate) |
| Prix par image | ~$0.04 | ~$0.04-0.08 | ~$0.03-0.07 | ~$0.03-0.06 |
| Licence commerciale | Oui (plan payant) | Oui | Oui | Oui |

**Le framework SACS pour le prompt engineering visuel :**

1. **S**ujet — Quoi ? (une femme entrepreneur, un dashboard, un paysage urbain)
2. **A**mosphere — Mood ? (cinematique, minimaliste, energique, sombre)
3. **C**omposition — Comment ? (plan large, gros plan, vue aerienne, symetrique)
4. **S**tyle — Reference ? (photorealistic, illustration editorial, 3D render, flat design)

**Exemples de prompts structures :**

```
# Marketing SaaS — Hero image
Sujet: A modern SaaS dashboard floating in space
Atmosphere: Clean, professional, premium tech
Composition: 3/4 angle, shallow depth of field, centered
Style: 3D render, dark background, blue and purple accent lights
Parametres: --ar 16:9 --v 7 --q 2

# LinkedIn post — Thought leadership
Sujet: A person standing at the edge of a data visualization cliff
Atmosphere: Inspirational, futuristic, warm golden light
Composition: Wide shot, rule of thirds, person on the left
Style: Cinematic photography, lens flare, high contrast
Parametres: --ar 4:5 --v 7 --s 750
```

**Workflow de production d'images en batch :**

```python
import anthropic
import requests

# Generer les prompts d'images via Claude
def generate_image_prompts(theme: str, count: int = 5) -> list[str]:
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        messages=[{
            "role": "user",
            "content": f"Genere {count} prompts d'image pour le theme: {theme}. "
                       f"Utilise le framework SACS. Format: un prompt par ligne."
        }]
    )
    return response.content[0].text.strip().split("\n")

# Generer les images via DALL-E 3
def generate_images(prompts: list[str]) -> list[str]:
    urls = []
    for prompt in prompts:
        response = openai.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1792x1024",
            quality="hd",
            n=1
        )
        urls.append(response.data[0].url)
    return urls
```

**Les erreurs fatales a eviter :**

- Ne PAS utiliser de noms de personnes reelles ou de marques deposees
- Ne PAS generer d'images avec du texte important (le texte IA est souvent deforme)
- Ne PAS utiliser une image IA brute sans retouche pour un usage premium
- Toujours verifier la coherence anatomique (mains, doigts, yeux)
- Toujours conserver les prompts utilises (reproductibilite)

### Exercice pratique

Creez 5 images pour une campagne LinkedIn sur le theme "L'IA transforme le marketing". Utilisez 2 outils differents. Comparez les resultats sur : qualite, fidelite au prompt, temps de generation, et cout. Documentez vos prompts et les iterations necessaires.

---

## Lecon 2 — Generation de video : Runway, Sora, Kling, Hailuo

### Ce que vous allez apprendre

Maitriser les 4 plateformes majeures de generation video IA. Produire des clips marketing, des demos produit, et des contenus social media de qualite professionnelle sans camera ni equipe de tournage.

### Contenu detaille

**Comparatif des generateurs video (2026) :**

| Critere | Runway Gen-3 Alpha | Sora | Kling 2.0 | Hailuo MiniMax |
|---------|-------------------|------|-----------|----------------|
| Duree max | 16 sec | 60 sec | 10 sec | 6 sec |
| Resolution max | 4K | 1080p | 1080p | 1080p |
| Coherence temporelle | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★☆☆ |
| Controle camera | Excellent | Bon | Bon | Basique |
| Image-to-video | Oui | Oui | Oui | Oui |
| Text-to-video | Oui | Oui | Oui | Oui |
| Video-to-video (style) | Oui | Non | Oui | Non |
| API | Oui | Oui (OpenAI) | Oui | Non |
| Prix / seconde | ~$0.25 | ~$0.15-0.50 | ~$0.10 | Gratuit (limites) |

**Les 5 types de videos IA pour le marketing :**

1. **Hero video** — Clip cinematique 10-15s pour landing page. Style : image-to-video avec Runway sur une image Midjourney.
2. **Product demo** — Screencast augmente. Enregistrement ecran + overlays IA + voiceover.
3. **Social clip** — 5-15s format vertical pour Reels/TikTok/Shorts. Impact visuel maximal.
4. **Explainer** — 30-60s avec narration. Combine generation IA + montage traditionnel.
5. **Testimonial** — Video d'avatar parlant (HeyGen, Synthesia). Attention a l'authenticite.

**Workflow de production video IA :**

```
[1. STORYBOARD]     [2. ASSETS]           [3. GENERATION]      [4. POST-PROD]
Script scene par → Images de base      → Runway/Sora/Kling → CapCut/DaVinci
scene (Claude)     (Midjourney/DALL-E)   generation video     montage + audio
                   + references visuelles                      + sous-titres
```

**Techniques de prompt video avancees :**

```
# Runway Gen-3 — Prompt structure
Camera: [dolly forward / pan left / static / crane up]
Subject: [description precise du sujet]
Action: [ce qui se passe dans la scene]
Style: [cinematique / documentaire / editorial]
Lighting: [naturel / studio / neon / golden hour]

# Exemple concret
Camera: slow dolly forward through a modern office space
Subject: a holographic AI dashboard floating above a wooden desk
Action: data visualizations morphing and expanding
Style: cinematic, shallow depth of field, anamorphic lens
Lighting: soft blue ambient with warm desk lamp accent
```

**Le pipeline video automatise :**

```python
# Pipeline complet : sujet → video finale
async def video_pipeline(topic: str):
    # 1. Generer le script (Claude)
    script = await generate_video_script(topic, duration=15)
    
    # 2. Generer les images de base (DALL-E)
    keyframes = await generate_keyframes(script.scenes)
    
    # 3. Animer chaque scene (Runway API)
    clips = []
    for scene, keyframe in zip(script.scenes, keyframes):
        clip = await runway_generate(
            image=keyframe,
            prompt=scene.motion_prompt,
            duration=scene.duration
        )
        clips.append(clip)
    
    # 4. Assembler + audio (FFmpeg)
    final = await assemble_video(clips, script.voiceover)
    return final
```

**Couts de production — comparatif :**

| Type de video | Production traditionnelle | Production IA | Ratio |
|-------------- |--------------------------|---------------|-------|
| Clip social 15s | $500-2000 | $5-20 | 100x |
| Demo produit 60s | $2000-5000 | $20-50 | 100x |
| Explainer 2min | $5000-15000 | $50-150 | 100x |
| Hero video 30s | $10000-50000 | $30-100 | 300x |

### Exercice pratique

Creez une video de 15 secondes pour presenter un produit (reel ou fictif). Pipeline : (1) ecrivez le script avec Claude, (2) generez 3 keyframes avec DALL-E ou Midjourney, (3) animez avec Runway ou Kling, (4) assemblez avec CapCut et ajoutez de la musique. Publiez sur LinkedIn et mesurez l'engagement vs un post texte classique.

---

## Lecon 3 — Audio et musique IA : Suno, Udio, ElevenLabs, TTS

### Ce que vous allez apprendre

Produire du contenu audio professionnel avec l'IA : musique originale pour videos, podcasts automatises, voix off de qualite studio, et jingles de marque. Transformer du texte en experience audio immersive.

### Contenu detaille

**L'ecosysteme audio IA en 2026 :**

| Outil | Specialite | Qualite | Prix | API | Cas d'usage |
|-------|-----------|---------|------|-----|-------------|
| Suno v4 | Musique complete | ★★★★★ | $10-30/mois | Oui | Jingles, fond musical, chansons |
| Udio | Musique (haute fidelite) | ★★★★★ | $10-30/mois | Non | Musique de production |
| ElevenLabs | Voix synthetique | ★★★★★ | $5-99/mois | Oui | Voiceover, doublage, podcast |
| OpenAI TTS | Text-to-speech | ★★★★☆ | ~$0.015/1K car. | Oui | Narration, accessibilite |
| Whisper | Speech-to-text | ★★★★★ | Gratuit (local) | Oui | Transcription, sous-titres |
| NotebookLM | Podcast IA | ★★★★☆ | Gratuit | Non | Podcasts conversationnels |

**Creer un podcast automatise — pipeline complet :**

```
[1. SUJET]         [2. SCRIPT]          [3. AUDIO]           [4. POST-PROD]
Veille IA       → Script dialogue    → ElevenLabs/OpenAI  → Montage + intro
(RSS + scraping)  (2 voix, 10 min)    TTS multi-voix        + outro + jingle
                  Claude generation    generation audio       FFmpeg assembly
```

**Script de generation podcast :**

```bash
#!/bin/zsh
# Pipeline podcast automatise
TOPIC="$1"
OUTPUT="./podcasts/$(date +%Y-%m-%d)"
mkdir -p "$OUTPUT"

# 1. Generer le script (format dialogue)
curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 8000,
    "messages": [{"role": "user", "content": "Ecris un script de podcast de 10 minutes sur: '"$TOPIC"'. Format: HOST: ... / EXPERT: ... Ton conversationnel, engageant."}]
  }' | jq -r '.content[0].text' > "$OUTPUT/script.md"

# 2. Separer les voix
grep "^HOST:" "$OUTPUT/script.md" | sed 's/^HOST: //' > "$OUTPUT/host.txt"
grep "^EXPERT:" "$OUTPUT/script.md" | sed 's/^EXPERT: //' > "$OUTPUT/expert.txt"

# 3. Generer l'audio (OpenAI TTS)
generate_tts "$OUTPUT/host.txt" "alloy" "$OUTPUT/host.mp3"
generate_tts "$OUTPUT/expert.txt" "nova" "$OUTPUT/expert.mp3"

# 4. Assembler
ffmpeg -i "$OUTPUT/host.mp3" -i "$OUTPUT/expert.mp3" \
  -filter_complex "[0:a][1:a]amix=inputs=2" \
  "$OUTPUT/podcast-final.mp3"
```

**ElevenLabs — les parametres cles :**

| Parametre | Valeur recommandee | Effet |
|-----------|-------------------|-------|
| Stability | 0.5-0.7 | Equilibre naturel/coherence |
| Similarity boost | 0.7-0.9 | Fidelite a la voix clonee |
| Style | 0.3-0.5 | Expressivite emotionnelle |
| Speaker boost | Actif | Separation voix/bruit |
| Model | Eleven Multilingual v2 | Meilleur pour le francais |

**Musique IA avec Suno — guide des genres :**

```
# Prompt Suno structure
[Genre]: cinematic ambient electronic
[Mood]: inspirational, uplifting, forward-looking
[Tempo]: 100-120 BPM
[Instruments]: synthesizer pads, subtle piano, electronic drums
[Duration]: 2 minutes
[Structure]: intro(15s) → build(30s) → chorus(30s) → bridge(20s) → outro(25s)

# Resultat : musique de fond parfaite pour video corporate
```

**Droits et licences audio IA :**

| Source | Licence commerciale | Attribution requise | Exclusivite |
|--------|-------------------|--------------------|----|
| Suno (plan payant) | Oui | Non | Non |
| ElevenLabs (plan payant) | Oui | Non | Non |
| OpenAI TTS | Oui | Disclosure obligatoire | Non |
| Udio (plan payant) | Oui | Non | Non |
| Voix clonee (la votre) | Oui | Non | Oui |

### Exercice pratique

Creez un episode de podcast de 5 minutes sur un sujet de votre choix. Pipeline : (1) generez le script avec Claude (format dialogue 2 voix), (2) synthetisez l'audio avec ElevenLabs ou OpenAI TTS (2 voix differentes), (3) ajoutez un jingle d'intro genere avec Suno, (4) assemblez le tout avec FFmpeg ou Audacity. Publiez sur une plateforme de podcast.

---

## Lecon 4 — Redaction IA avancee : blog, newsletter, copywriting

### Ce que vous allez apprendre

Depasser le simple "ecris-moi un article" pour maitriser les techniques de redaction IA avancees : chaines de prompts, brand voice calibration, A/B testing de titres, et production de contenu long-form de qualite editoriale.

### Contenu detaille

**Les 4 niveaux de redaction IA :**

| Niveau | Methode | Qualite | Temps | Quand l'utiliser |
|--------|---------|---------|-------|-----------------|
| 1. One-shot | 1 prompt → 1 output | ★★☆☆☆ | 2 min | Jamais en production |
| 2. Template | Prompt structure + template | ★★★☆☆ | 5 min | Posts sociaux, emails courts |
| 3. Chain | Multi-prompt sequentiel | ★★★★☆ | 15 min | Articles, newsletters |
| 4. Orchestrated | Pipeline multi-agent | ★★★★★ | 30 min | Long-form, whitepaper, ebook |

**La chaine de prompts editoriale (niveau 3) :**

```
Prompt 1 : RESEARCH
"Recherche les 5 dernieres tendances sur {sujet}. Sources fiables uniquement.
 Pour chaque tendance : fait cle, chiffre, implication business."

Prompt 2 : OUTLINE  
"A partir de cette recherche, cree un plan d'article de 2000 mots.
 Structure : H1, 4-6 H2, 2-3 H3 par H2. Angle : {angle editorial}."

Prompt 3 : DRAFT
"Ecris l'article complet a partir de ce plan.
 Brand voice : {descripteurs}. Ton : {formel/conversationnel/provocateur}.
 Inclus des exemples concrets et des donnees chiffrees."

Prompt 4 : EDIT
"Relis cet article en mode editeur senior.
 Verifie : clarte, flow, repetitions, jargon inutile, factual accuracy.
 Suggere 3 titres alternatifs avec analyse de clickability."

Prompt 5 : SEO
"Optimise cet article pour le SEO.
 Mot-cle principal : {keyword}. 
 Ajoute : meta description, balises alt, liens internes suggeres."
```

**Brand Voice Calibration — le framework VTP :**

| Dimension | Spectre | Exemple |
|-----------|---------|---------|
| **V**oix | Formelle ←→ Conversationnelle | "Nous observons" vs "On a remarque" |
| **T**on | Serieux ←→ Humoristique | "Analyse critique" vs "Spoiler alert" |
| **P**erspective | Expert ←→ Pair | "Il convient de" vs "Entre nous" |

```json
{
  "brand_voice": {
    "voice": "conversational-professional",
    "tone": "confident-but-not-arrogant",
    "perspective": "experienced-peer",
    "vocabulary": {
      "prefer": ["concretement", "en pratique", "resultat", "impact"],
      "avoid": ["il convient de", "force est de constater", "paradigme", "synergie"],
      "signature_phrases": ["Le truc que personne ne dit", "Les chiffres parlent"]
    },
    "formatting": {
      "paragraphs": "courts (2-3 phrases max)",
      "lists": "frequentes, actionables",
      "headers": "questions ou affirmations directes"
    }
  }
}
```

**Templates de contenu par format :**

| Format | Structure | Longueur | Hook | CTA |
|--------|----------|----------|------|-----|
| Blog SEO | Probleme → Solution → How-to → FAQ | 1500-3000 mots | Question/stat | Lien interne |
| Newsletter | Accroche → 3 insights → Ressource | 500-800 mots | Anecdote perso | Reply/share |
| Landing page | Hero → Benefices → Preuves → CTA | 800-1500 mots | Proposition de valeur | Signup/achat |
| Email cold | Pain point → Solution → Credibilite | 100-200 mots | Personnalisation | Meeting CTA |
| Thread LinkedIn | Hook → 5 points → Lecon → Question | 1000-1500 car. | Stat choc / contrarian | Follow/comment |

**A/B testing de titres avec l'IA :**

```python
def generate_title_variants(article_summary: str) -> dict:
    """Genere 5 titres + prediction de CTR"""
    prompt = f"""
    Pour cet article : {article_summary}
    
    Genere 5 titres avec des angles differents :
    1. Curiosite (question ouverte)
    2. Chiffre (stat impressionnante)
    3. Contrarian (opinion controversee)
    4. How-to (promesse pratique)
    5. Urgence (time-sensitive)
    
    Pour chaque titre, estime le CTR relatif (1-10).
    Format : TITRE | ANGLE | CTR_ESTIMATE
    """
    # ... appel API
```

### Exercice pratique

Creez un document de "Brand Voice" pour votre marque (ou une marque fictive) en utilisant le framework VTP. Puis ecrivez le meme article de 1500 mots en utilisant les 4 niveaux de redaction IA. Comparez la qualite, le temps, et l'authenticite de chaque version. Gardez le workflow de niveau 3 ou 4 comme votre standard de production.

---

## Lecon 5 — Branding et identite visuelle avec l'IA

### Ce que vous allez apprendre

Construire une identite visuelle complete avec l'IA : logo, palette de couleurs, typographie, guidelines, templates, et assets de marque. Du concept a la charte graphique en quelques heures au lieu de plusieurs semaines.

### Contenu detaille

**Les composants d'une identite visuelle :**

| Composant | Outil IA | Methode | Livrable |
|-----------|----------|---------|----------|
| Logo | Midjourney + Vectorizer.ai | Generation + vectorisation | SVG + variantes |
| Palette couleurs | Claude + Coolors | Analyse sectorielle → palette | 5-7 couleurs (hex/rgb) |
| Typographie | Claude + Google Fonts | Analyse de personnalite → pairing | 2-3 fonts (heading/body/accent) |
| Iconographie | Midjourney / DALL-E | Style coherent, batch de 20+ | Set d'icones SVG |
| Photography style | Midjourney | Style guide + images de reference | Mood board + 10 images |
| Templates | Canva / Figma | Application de la charte | 10+ templates |

**Le processus de creation de logo IA :**

```
Etape 1 — Brief (Claude)
"Analyse le secteur {secteur} et suggere 5 directions creatives pour un logo.
 Pour chaque direction : concept, style visuel, emotion cible, reference existante."

Etape 2 — Generation (Midjourney)
"minimal logo design for {brand}, {concept}, vector style, flat design,
 single color, white background, no text --v 7 --s 250"
 × 20 variations minimum

Etape 3 — Selection (humain)
Top 3 → test en noir et blanc, petit format, sur fond sombre

Etape 4 — Vectorisation
Vectorizer.ai ou Adobe Illustrator → SVG propre

Etape 5 — Declinaisons
Logo principal + favicon + monochrome + sur fond sombre + version compacte
```

**Framework de palette de couleurs par secteur :**

| Secteur | Couleur primaire | Secondaire | Accent | Emotion cible |
|---------|-----------------|------------|--------|---------------|
| Tech/SaaS | Bleu profond (#1a1a2e) | Gris (#e0e0e0) | Violet (#6c63ff) | Confiance, innovation |
| Sante | Vert (#2d6a4f) | Blanc (#fefefe) | Bleu clair (#48cae4) | Soin, serenite |
| Finance | Bleu marine (#003049) | Or (#fca311) | Gris (#8d99ae) | Autorite, prosperite |
| Education | Orange (#e76f51) | Creme (#fefae0) | Bleu (#264653) | Energie, accessibilite |
| Luxe | Noir (#0a0a0a) | Or (#c9a227) | Blanc (#f8f8f8) | Exclusivite, elegance |
| Alimentaire | Rouge (#d62828) | Jaune (#fcbf49) | Vert (#606c38) | Appetit, fraicheur |

**Typographie — les pairings qui marchent :**

```
# Modern Tech
Heading: Inter Bold (sans-serif, geometrique)
Body: Inter Regular
Accent: JetBrains Mono (code, donnees)

# Editorial Premium
Heading: Playfair Display Bold (serif, elegant)
Body: Source Sans 3 Regular
Accent: Playfair Display Italic

# Creative / Startup
Heading: Plus Jakarta Sans ExtraBold
Body: Plus Jakarta Sans Regular
Accent: Space Grotesk Medium

# Corporate / Enterprise  
Heading: DM Sans Bold
Body: DM Sans Regular
Accent: IBM Plex Mono
```

**Generer une charte graphique complete avec Claude :**

```
Prompt : "Genere une charte graphique complete pour la marque {nom}.

Secteur : {secteur}
Personnalite : {3 adjectifs}
Cible : {audience}
Concurrents : {3 concurrents}

Inclure :
1. Mission statement (1 phrase)
2. Palette de couleurs (primaire, secondaire, accent, neutre, danger/succes)
3. Typographie (heading, body, accent) avec tailles recommandees
4. Style d'iconographie (ligne, rempli, style)
5. Style photographique (5 descripteurs + do/don't)
6. Ton de voix (formel/informel, technique/accessible, serieux/leger)
7. Regles de spacing et grille
8. Exemples de do et don't visuels"
```

**Automatiser la production d'assets de marque :**

| Asset | Outil | Automatisable | Template |
|-------|-------|---------------|----------|
| Posts sociaux | Canva API + Claude | 95% | Oui |
| Presentations | Google Slides API | 85% | Oui |
| Email templates | MJML + Claude | 90% | Oui |
| Business cards | Canva API | 80% | Oui |
| Favicons / app icons | DALL-E + resize script | 95% | Oui |
| OG images (partage social) | Vercel OG / Satori | 100% | Oui |

### Exercice pratique

Creez l'identite visuelle complete d'une marque fictive. Delivrables : (1) un logo avec 3 variantes, (2) une palette de 6 couleurs avec justification, (3) un pairing typographique, (4) un mood board de 5 images, (5) un mini-guide de style d'une page. Temps cible : 3-4 heures. Comparez avec le cout d'un designer freelance (~$2000-5000).

---

## Lecon 6 — Construction de sites web avec Claude Code

### Ce que vous allez apprendre

Construire un site web complet — de la landing page au SaaS — en utilisant Claude Code comme developpeur principal. Scaffolding, composants, deploiement, et iteration rapide sans ecrire une seule ligne de code manuellement.

### Contenu detaille

**Ce que Claude Code peut construire (2026) :**

| Type de site | Complexite | Temps moyen | Stack recommandee |
|-------------|-----------|-------------|-------------------|
| Landing page | ★★☆☆☆ | 1-3h | Next.js + Tailwind + Vercel |
| Blog / portfolio | ★★★☆☆ | 3-6h | Next.js + MDX + Vercel |
| E-commerce simple | ★★★★☆ | 8-15h | Next.js + Stripe + Supabase |
| SaaS MVP | ★★★★★ | 20-40h | Next.js + Convex + Clerk + Stripe |
| Dashboard | ★★★★☆ | 10-20h | Next.js + shadcn/ui + API |

**Le workflow Claude Code pour un site :**

```
[1. VISION]          [2. SCAFFOLD]        [3. BUILD]           [4. DEPLOY]
Definir le produit → Creer le projet  → Construire page   → Vercel deploy
(brief, personas,    (Next.js, deps,     par page, composant  + domaine custom
 wireframes)          structure)          par composant        + analytics
```

**Prompts efficaces pour Claude Code :**

```
# Scaffold initial
"Cree un projet Next.js 15 avec App Router, Tailwind CSS 4, shadcn/ui.
 Structure : landing page + pricing + blog. 
 Design : minimaliste, dark mode par defaut, palette bleu/violet."

# Composant specifique
"Cree un composant PricingTable avec 3 plans (Free, Pro, Enterprise).
 Style : cartes avec hover effect, plan Pro mis en avant.
 Donnees : prop plans[] avec name, price, features[], cta."

# Page complete
"Construis la page /about avec :
 - Hero section avec photo equipe + mission statement
 - Timeline de l'histoire de l'entreprise (5 dates)
 - Section valeurs (4 cards avec icones)
 - CTA vers /contact
 Design coherent avec le reste du site."
```

**Les composants indispensables (shadcn/ui) :**

| Composant | Usage marketing | Personnalisation |
|-----------|----------------|-----------------|
| `Hero` | Accroche principale | Titre, sous-titre, CTA, image/video |
| `FeatureGrid` | Presentation produit | Icones, titres, descriptions |
| `PricingTable` | Conversion | Plans, toggle mensuel/annuel |
| `Testimonials` | Preuve sociale | Carousel, photos, citations |
| `FAQ` | Reponses objections | Accordion, schema markup |
| `CTA` | Conversion | Formulaire, bouton, urgence |
| `Footer` | Navigation + legal | Links, social, newsletter |
| `Navbar` | Navigation | Logo, links, CTA, mobile menu |

**Deploiement automatise avec Vercel :**

```bash
# Deployer en une commande
vercel --prod --token=$VERCEL_TOKEN

# Pipeline complet
npm run build         # Verifier que tout compile
vercel --prod         # Deployer
vercel domains add    # Ajouter le domaine custom

# Variables d'environnement
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add STRIPE_SECRET_KEY production
```

**Checklist de lancement d'un site :**

1. **Performance** — Lighthouse score >90 sur les 4 axes
2. **SEO** — Meta tags, sitemap, robots.txt, schema markup
3. **Mobile** — Responsive testé sur 3 tailles (375px, 768px, 1440px)
4. **Accessibilite** — Navigation clavier, contrastes, ARIA labels
5. **Analytics** — Google Analytics 4 ou Plausible installe
6. **Legal** — Mentions legales, politique de confidentialite, cookies
7. **Favicon** — Toutes les tailles (16, 32, 180, 192, 512)
8. **OG Images** — Preview correcte sur LinkedIn, Twitter, Facebook
9. **404** — Page d'erreur personnalisee avec redirection
10. **Vitesse** — First Contentful Paint <1.5s, LCP <2.5s

**Iteration rapide — le cycle de 30 minutes :**

```
[Feedback utilisateur]
  → Claude Code : "Modifie le hero : titre plus court, CTA plus visible"
  → Build + test local (2 min)
  → Deploy Vercel (1 min)
  → Verifier en production (1 min)
  → Cycle suivant
```

Chaque iteration prend 5-10 minutes au lieu de 2-4 heures avec un developpeur traditionnel. Un site peut evoluer 10x plus vite.

### Exercice pratique

Construisez une landing page complete pour un produit fictif (ou reel) en utilisant Claude Code. Objectif : de zero a deploye sur Vercel en moins de 3 heures. La page doit inclure : hero, 3 features, pricing (3 plans), testimonials (3), FAQ (5 questions), et footer. Mesurez votre temps et documentez les prompts les plus efficaces.

---

## Ce que cette formation apporte

- Maitrise des 4 grands generateurs d'images IA et du prompt engineering visuel
- Capacite a produire des videos marketing de qualite sans camera ni equipe
- Competences en production audio : podcasts automatises, voix off, musique originale
- Techniques de redaction IA avancees avec chaines de prompts et brand voice calibration
- Savoir-faire en creation d'identite visuelle complete (logo, palette, typographie, charte)
- Capacite a construire et deployer des sites web complets avec Claude Code en quelques heures

---

## Ressources complementaires

- Module prerequis : Content Automation — Systemes & Pipelines (T3-01)
- Module connexe : Stack System Builder — MCP & API Mastery (T1-02)
- Galerie de prompts visuels Midjourney/DALL-E (Notion partagee)
- Templates de brand voice et charte graphique (Google Docs)
- Communaute Kommu pour partager vos creations et obtenir des feedbacks
- Guide de deploiement Vercel pour debutants (PDF)
