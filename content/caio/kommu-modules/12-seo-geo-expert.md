---
title: "SEO & GEO : AI Expert en Visibilite"
summary: "Maitriser le SEO traditionnel ET le nouveau paysage de recherche IA (Google AI Overviews, ChatGPT search, Perplexity). Construire des systemes qui generent, optimisent et distribuent du contenu a grande echelle pour dominer les deux."
track: content
number: "T3-03"
duration: "25-35h"
audience: "Marketeurs, professionnels du SEO, createurs de contenu, fondateurs, freelances, agences"
---

# SEO & GEO : AI Expert en Visibilite

Le SEO tel qu'on le connaissait est mort. En 2026, la moitie des recherches ne generent plus de clic — les reponses sont directement dans les AI Overviews, les resultats Perplexity, ou les reponses ChatGPT. Ce module vous transforme en expert des deux mondes : le SEO technique traditionnel ET la Generative Engine Optimization (GEO), la nouvelle discipline qui determine si votre contenu est cite par les IA.

---

## Objectif du module

A l'issue de ce module, vous saurez construire une strategie de visibilite complete couvrant le SEO classique et le GEO, deployer des pipelines de contenu automatises par IA, et mesurer le ROI de chaque canal de recherche — humain ou generatif.

---

## Lecon 1 — Le nouveau paysage de la recherche en 2026

### Ce que vous allez apprendre

L'evolution des moteurs de recherche, l'impact des AI Overviews sur le trafic organique, et pourquoi la strategie SEO doit desormais integrer les moteurs de recherche generatifs. Comprendre les metriques qui comptent vraiment.

### Contenu detaille

**L'evolution des sources de trafic de recherche (2020-2026) :**

| Annee | Google classique | AI Overviews | ChatGPT Search | Perplexity | Autres IA |
|-------|-----------------|--------------|----------------|------------|-----------|
| 2020 | 92% | 0% | 0% | 0% | 8% |
| 2023 | 88% | 2% | 1% | 0.5% | 8.5% |
| 2024 | 78% | 10% | 4% | 3% | 5% |
| 2025 | 65% | 18% | 8% | 5% | 4% |
| 2026 | 52% | 22% | 12% | 8% | 6% |

**Les 3 types de moteurs de recherche en 2026 :**

1. **Moteurs traditionnels** (Google, Bing) — Resultats indexes, liens bleus, snippets. Le trafic baisse mais la conversion reste elevee. SEO technique + contenu toujours essentiels.
2. **Moteurs generatifs** (Google AI Overviews, SearchGPT, Perplexity) — Reponses synthetisees a partir de plusieurs sources. Pas de clic necessaire. La citation = la nouvelle visibilite.
3. **Assistants IA** (ChatGPT, Claude, Gemini) — Recommandations directes dans les conversations. Reputation = decouverte. Pas de SEO possible, mais GEO oui.

**Le zero-click problem en chiffres :**
- 58% des recherches Google ne generent aucun clic en 2026
- Les AI Overviews apparaissent sur 40% des requetes commerciales
- Le CTR moyen du premier resultat organique est passe de 28% (2020) a 14% (2026)
- Mais : les sites cites dans les AI Overviews voient +35% de trafic qualifie

**Le framework SEO+GEO :**

```
SEO (indexation, ranking)     +     GEO (citation, synthese)
         ↓                                    ↓
   Trafic organique                    Visibilite IA
         ↓                                    ↓
   Conversions directes              Autorite & confiance
         ↓                                    ↓
              → ROI total de la visibilite ←
```

### Exercice pratique

Analysez les 20 mots-cles principaux de votre site. Pour chacun, verifiez : (1) votre position Google classique, (2) si un AI Overview apparait, (3) si vous etes cite dans cet Overview. Calculez votre "GEO coverage rate" (nombre de citations / nombre d'Overviews).

---

## Lecon 2 — Fondations du SEO technique

### Ce que vous allez apprendre

Les fondamentaux techniques qui permettent aux moteurs de recherche de crawler, indexer et comprendre votre site. L'audit technique comme point de depart obligatoire de toute strategie SEO.

### Contenu detaille

**La checklist SEO technique (les 5 piliers) :**

| Pilier | Elements cles | Outils de verification |
|--------|---------------|----------------------|
| **Crawlability** | robots.txt, sitemap.xml, architecture URL | Screaming Frog, Google Search Console |
| **Indexability** | Meta robots, canonical, hreflang, pagination | GSC Coverage, Ahrefs Site Audit |
| **Renderability** | JavaScript rendering, Core Web Vitals, mobile | Lighthouse, PageSpeed Insights, Chrome DevTools |
| **Securite** | HTTPS, mixed content, headers securite | SSL Labs, Security Headers |
| **Structure** | Schema markup, heading hierarchy, internal linking | Schema Validator, Sitebulb |

**Architecture URL optimale :**

```
❌ Mauvais :
example.com/p?id=12345
example.com/blog/2024/03/15/mon-article-seo-2024-guide-complet-debutant

✅ Bon :
example.com/guide-seo-debutant
example.com/blog/seo-technique-2026

Regles :
- Longueur : 3-5 mots max dans le slug
- Separateur : tirets (-)
- Pas de dates dans l'URL (contenu evergreen)
- Hierarchie claire : /categorie/sous-categorie/page
- Pas de parametres dynamiques visibles
```

**Core Web Vitals — seuils 2026 :**

| Metrique | Bon | A ameliorer | Mauvais | Impact SEO |
|----------|-----|-------------|---------|-----------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5-4s | > 4s | Elevee |
| INP (Interaction to Next Paint) | < 200ms | 200-500ms | > 500ms | Elevee |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1-0.25 | > 0.25 | Moyenne |
| TTFB (Time to First Byte) | < 800ms | 800ms-1.8s | > 1.8s | Moyenne |

**Audit technique automatise avec l'IA :**

```bash
# Pipeline d'audit SEO technique automatise
# 1. Crawler le site
npx screaming-frog-cli --crawl https://example.com --output /tmp/crawl.csv

# 2. Analyser les Core Web Vitals via l'API PageSpeed
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&strategy=mobile&key=$API_KEY"

# 3. Verifier l'indexation via Search Console API
python3 scripts/gsc-index-check.py --site https://example.com --days 30

# 4. Generer le rapport d'audit avec Claude
cat /tmp/crawl.csv | claude "Analyse ce crawl SEO et identifie les 10 problemes prioritaires"
```

### Exercice pratique

Realisez un audit technique complet de votre site en utilisant Screaming Frog (ou un outil gratuit equivalent). Identifiez les 5 problemes techniques les plus critiques et redigez un plan de correction avec priorites et estimations de temps.

---

## Lecon 3 — GEO : Generative Engine Optimization

### Ce que vous allez apprendre

Les principes de la Generative Engine Optimization — comment optimiser votre contenu pour etre cite par les IA generatives. Les differents moteurs, leurs algorithmes de citation, et les strategies qui fonctionnent.

### Contenu detaille

**Qu'est-ce que le GEO ?**

Le GEO (Generative Engine Optimization) est la discipline qui vise a maximiser la probabilite que votre contenu soit cite, reference ou recommande par les moteurs de recherche generatifs (Google AI Overviews, ChatGPT, Perplexity, Claude).

**Les 7 facteurs de citation GEO :**

| Facteur | Poids estime | Ce que les IA privilegient |
|---------|-------------|--------------------------|
| **Autorite du domaine** | 25% | Backlinks, anciennete, mentions, E-E-A-T |
| **Qualite du contenu** | 20% | Profondeur, originalite, donnees uniques |
| **Structure semantique** | 15% | Headers clairs, listes, tableaux, schema markup |
| **Fraicheur** | 15% | Date de publication, mises a jour regulieres |
| **Citations et sources** | 10% | References, etudes, donnees primaires |
| **Consensus web** | 10% | Coherence avec d'autres sources fiables |
| **Format reponse-ready** | 5% | Paragraphes concis, definitions directes |

**Strategies GEO par moteur :**

1. **Google AI Overviews** :
   - Privilegier les formats "definition + explication + exemple"
   - Structurer avec des H2/H3 en questions naturelles
   - Inclure des donnees chiffrees sourcees
   - Optimiser le schema markup (FAQ, HowTo, Article)

2. **Perplexity** :
   - Citations academiques et rapports officiels
   - Donnees recentes (< 6 mois)
   - Format journalistique : fait → source → analyse
   - URLs courtes et descriptives

3. **ChatGPT Search** :
   - Contenu conversationnel et pedagogique
   - Listes a puces avec points actionnables
   - Pas de clickbait — repondre directement a la question
   - Expertise demontree (auteur identifiable, credentials)

**Le template de contenu GEO-optimise :**

```markdown
# [Question exacte que l'utilisateur pose]

[Reponse directe en 1-2 phrases — la "featured answer"]

## Contexte et definition

[Paragraphe d'explication — 50-100 mots]

## [Sous-question 1]

[Reponse structuree avec donnees]

| Critere | Detail | Source |
|---------|--------|--------|
| ...     | ...    | ...    |

## Points cles a retenir

- Point 1 (actionnable)
- Point 2 (actionnable)
- Point 3 (actionnable)

## Sources

1. [Source primaire — rapport, etude, donnees]
2. [Source secondaire — article d'expert]
```

### Exercice pratique

Prenez un de vos articles existants et reecrivez-le en appliquant les 7 facteurs GEO. Comparez la version originale et la version optimisee en verifiant : (1) presence de reponse directe, (2) structure semantique, (3) citations, (4) donnees chiffrees. Soumettez les deux versions a Perplexity pour voir laquelle est citee.

---

## Lecon 4 — Keyword research et strategie de contenu propulsees par l'IA

### Ce que vous allez apprendre

Comment utiliser l'IA pour identifier les opportunites de mots-cles a fort potentiel, creer des clusters de contenu strategiques, et construire un calendrier editorial data-driven. La methode pour passer de 0 a 100 articles cibles.

### Contenu detaille

**Le pipeline de keyword research IA :**

```
1. Seed keywords (brainstorm + concurrents)
     ↓
2. Expansion IA (Claude + Ahrefs/SEMrush API)
     ↓
3. Clustering semantique (embeddings)
     ↓
4. Scoring et priorisation (volume × difficulte × intent)
     ↓
5. Mapping de contenu (cluster → pillar → articles)
     ↓
6. Calendrier editorial automatise
```

**Les 4 types d'intention de recherche :**

| Intent | Exemple | Format optimal | Taux de conversion |
|--------|---------|----------------|-------------------|
| **Informationnelle** | "qu'est-ce que le GEO" | Guide, definition, tutoriel | 1-3% |
| **Navigationnelle** | "Ahrefs login" | Page de marque | 5-10% |
| **Commerciale** | "meilleur outil SEO 2026" | Comparatif, review | 8-15% |
| **Transactionnelle** | "acheter Ahrefs" | Landing page, pricing | 15-30% |

**Prompt Claude pour la recherche de mots-cles :**

```
Tu es un expert SEO. Pour le domaine [NICHE], genere :

1. 50 mots-cles informationnels (questions que les debutants posent)
2. 20 mots-cles commerciaux (comparaisons, "meilleur X")
3. 10 mots-cles transactionnels (avec intention d'achat)

Pour chaque mot-cle, estime :
- Volume de recherche mensuel (faible/moyen/eleve)
- Difficulte (facile/moyen/difficile)
- Potentiel GEO (oui/non — ce mot-cle declenche-t-il un AI Overview ?)

Organise en clusters thematiques de 5-8 mots-cles.
```

**La methode Topic Cluster :**

```
                    ┌─ Article satellite 1
                    ├─ Article satellite 2
Pillar Page ────────┼─ Article satellite 3
(3000+ mots)        ├─ Article satellite 4
                    └─ Article satellite 5
                    
Liens internes bidirectionnels entre pillar et satellites.
Chaque satellite cible un mot-cle longue traine specifique.
Le pillar cible le mot-cle principal (head term).
```

**Scoring de priorisation ICE pour les mots-cles :**

| Mot-cle | Volume | Difficulte | GEO potentiel | ICE Score | Priorite |
|---------|--------|-----------|---------------|-----------|----------|
| "geo optimization" | Moyen | Facile | Oui | 810 | P1 |
| "seo vs geo" | Eleve | Facile | Oui | 900 | P1 |
| "ai overview optimization" | Faible | Facile | Oui | 720 | P2 |
| "programmatic seo guide" | Moyen | Moyen | Non | 480 | P3 |

### Exercice pratique

Utilisez Claude pour generer 50 mots-cles dans votre niche. Organisez-les en 5 clusters thematiques. Pour chaque cluster, identifiez la pillar page et les 5 articles satellites. Creez un calendrier editorial de 3 mois avec 2 publications par semaine.

---

## Lecon 5 — Content creation a l'echelle : programmatic SEO

### Ce que vous allez apprendre

Comment produire des centaines de pages de contenu optimise SEO en utilisant le programmatic SEO et l'IA generative. Les templates, les pipelines de generation, et les garde-fous qualite pour eviter le contenu "thin".

### Contenu detaille

**Qu'est-ce que le programmatic SEO ?**

Le programmatic SEO consiste a creer des pages a grande echelle en combinant des templates avec des donnees structurees. Chaque page cible un mot-cle longue traine specifique.

**Exemples de succes :**
- **Zapier** : 25 000+ pages "Comment connecter X a Y" → 5M visites/mois
- **Nomadlist** : 1 500+ pages ville → 1M visites/mois
- **Wise** : 10 000+ pages "Envoyer de l'argent de X a Y" → 8M visites/mois

**Le pipeline de generation de contenu IA :**

```python
import anthropic
import json

client = anthropic.Anthropic()

def generate_seo_article(keyword: str, template: str, data: dict) -> str:
    """Genere un article SEO optimise a partir d'un template et de donnees."""
    
    prompt = f"""
    Tu es un redacteur SEO expert. Genere un article complet pour le mot-cle : "{keyword}"
    
    Template a suivre :
    {template}
    
    Donnees a integrer :
    {json.dumps(data, ensure_ascii=False)}
    
    Regles :
    - Titre H1 avec le mot-cle exact
    - Introduction de 50-100 mots avec le mot-cle dans les 50 premiers mots
    - 5-8 sous-sections H2 avec des variations du mot-cle
    - 1 tableau de donnees minimum
    - 1 liste a puces minimum
    - FAQ schema-ready (3-5 questions)
    - Meta description de 155 caracteres
    - Ton : expert mais accessible
    - Longueur : 1500-2500 mots
    """
    
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4000,
        messages=[{"role": "user", "content": prompt}]
    )
    
    return response.content[0].text

# Exemple : generer 100 pages "Meilleur [outil] pour [usage]"
tools = ["Ahrefs", "SEMrush", "Screaming Frog", "Surfer SEO"]
usages = ["debutant", "agence", "e-commerce", "SaaS", "local"]

for tool in tools:
    for usage in usages:
        keyword = f"meilleur {tool} pour {usage}"
        article = generate_seo_article(keyword, template, {"tool": tool, "usage": usage})
        save_article(keyword, article)
```

**Les garde-fous qualite pour le contenu programmatique :**

| Garde-fou | Pourquoi | Comment |
|-----------|----------|---------|
| **Unicite** | Google penalise le contenu duplique | Chaque page doit avoir >70% de contenu unique |
| **Profondeur** | Le thin content ne ranke pas | Minimum 1500 mots, 3 tableaux, 5 sous-sections |
| **E-E-A-T** | Autorite et expertise | Auteur identifie, sources citees, date de MAJ |
| **Actualisation** | La fraicheur est un signal | Pipeline de mise a jour trimestriel automatise |
| **Canonicalisation** | Eviter la cannibalisation | Un mot-cle principal = une seule page |

**Le workflow complet :**

```
Donnees (CSV/API) → Template (Markdown) → IA (Claude) → Revue humaine (10%) → Publication (CMS) → Monitoring (GSC)
                                                              ↑
                                                    Scoring qualite > 80/100
                                                    sinon → regeneration
```

### Exercice pratique

Creez un template de contenu programmatique pour votre niche. Generez 10 articles avec Claude en variant les donnees. Evaluez chaque article avec la grille de garde-fous qualite (unicite, profondeur, E-E-A-T, structure). Publiez les 5 meilleurs.

---

## Lecon 6 — Schema markup, structured data et SEO technique avance

### Ce que vous allez apprendre

Comment implementer les donnees structurees (JSON-LD) pour maximiser votre visibilite dans les SERP et les AI Overviews. Les schemas essentiels, les rich snippets, et l'automatisation de l'implementation.

### Contenu detaille

**Les 10 schemas les plus impactants pour le SEO/GEO :**

| Schema | Impact SEO | Impact GEO | Utilisation |
|--------|-----------|-----------|-------------|
| **Article** | Eleve | Eleve | Blog, guides, actualites |
| **FAQ** | Eleve | Tres eleve | Pages produit, guides |
| **HowTo** | Eleve | Eleve | Tutoriels, processus |
| **Product** | Eleve | Moyen | E-commerce, SaaS |
| **Review** | Eleve | Moyen | Comparatifs, avis |
| **Organization** | Moyen | Eleve | Page d'accueil, a propos |
| **BreadcrumbList** | Moyen | Faible | Navigation, toutes pages |
| **VideoObject** | Moyen | Moyen | Pages avec video |
| **LocalBusiness** | Eleve (local) | Moyen | Entreprises locales |
| **SpeakableSpecification** | Faible | Tres eleve | Contenu voice/IA |

**Implementation JSON-LD pour un article GEO-optimise :**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Guide complet du GEO en 2026",
  "description": "Maitriser la Generative Engine Optimization...",
  "author": {
    "@type": "Person",
    "name": "Votre Nom",
    "url": "https://example.com/auteur",
    "sameAs": ["https://linkedin.com/in/votre-profil"]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Votre Entreprise",
    "logo": { "@type": "ImageObject", "url": "https://example.com/logo.png" }
  },
  "datePublished": "2026-04-01",
  "dateModified": "2026-04-15",
  "mainEntityOfPage": "https://example.com/guide-geo-2026",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".article-summary", ".key-takeaways"]
  }
}
```

**Le schema SpeakableSpecification — le secret GEO :**

```json
{
  "@type": "SpeakableSpecification",
  "cssSelector": [".answer-box", ".definition", ".summary"]
}
```

Ce schema indique aux IA quelles parties de votre contenu sont "lisibles" — directement citables dans une reponse vocale ou generative. C'est le signal le plus direct pour le GEO.

**Pipeline d'automatisation du schema markup :**

```python
def generate_schema(page_type: str, content: dict) -> dict:
    """Genere le schema JSON-LD adapte au type de page."""
    schemas = {
        "article": build_article_schema(content),
        "faq": build_faq_schema(content),
        "howto": build_howto_schema(content),
        "product": build_product_schema(content),
    }
    schema = schemas.get(page_type, {})
    schema["speakable"] = {
        "@type": "SpeakableSpecification",
        "cssSelector": [".answer-box", ".key-points", ".summary"]
    }
    return schema
```

### Exercice pratique

Implementez 3 types de schema markup sur votre site : Article (sur un blog post), FAQ (sur une page produit), et Organization (sur la page d'accueil). Validez avec le Rich Results Test de Google. Verifiez que SpeakableSpecification est present sur chaque page.

---

## Lecon 7 — Link building et autorite avec l'IA

### Ce que vous allez apprendre

Les strategies de link building qui fonctionnent en 2026, comment l'IA peut accelerer la prospection et la creation de contenu linkable, et les metriques d'autorite qui comptent pour le SEO et le GEO.

### Contenu detaille

**Les 5 strategies de link building les plus efficaces en 2026 :**

| Strategie | Difficulte | ROI | Temps | Scalable avec IA ? |
|-----------|-----------|-----|-------|-------------------|
| **Digital PR / Data studies** | Elevee | Tres eleve | 2-4 semaines | Oui (analyse + redaction) |
| **Guest posting strategique** | Moyenne | Eleve | 1-2 semaines | Oui (prospection + contenu) |
| **Broken link building** | Faible | Moyen | 3-5 jours | Oui (detection + outreach) |
| **Resource page outreach** | Moyenne | Moyen | 1-2 semaines | Oui (prospection) |
| **HARO / Connectively** | Faible | Moyen-eleve | 30 min/jour | Oui (veille + reponses) |

**Pipeline de prospection outreach automatise :**

```
1. Identifier les sites cibles (Ahrefs API → DR > 40, trafic > 10K)
     ↓
2. Trouver les contacts (Hunter.io API → email du redacteur)
     ↓
3. Personnaliser le pitch (Claude → contexte site + proposition de valeur)
     ↓
4. Envoyer la sequence (outil d'email outreach → 3 follow-ups)
     ↓
5. Tracker les resultats (spreadsheet → taux de reponse, liens obtenus)
```

**Le content linkable — ce qui attire naturellement des backlinks :**

1. **Etudes originales** — Sondages, analyses de donnees, rapports avec des chiffres exclusifs
2. **Outils gratuits** — Calculateurs, templates, generateurs (ex: "Generateur de meta descriptions IA")
3. **Infographies data-driven** — Visualisations de donnees complexes
4. **Guides definitifs** — Le contenu le plus complet sur un sujet (5000+ mots)
5. **Statistiques compilees** — "50 statistiques SEO en 2026" avec sources primaires

**Prompt Claude pour le digital PR :**

```
Analyse cette base de donnees [CSV avec donnees de l'industrie].
Identifie les 5 insights les plus surprenants ou contre-intuitifs.
Pour chaque insight, redige :
1. Un titre accrocheur pour un communique de presse
2. Un paragraphe de 100 mots avec le chiffre cle
3. Une citation d'expert attribuable
4. 3 angles pour des medias differents (tech, business, grand public)
```

**Metriques d'autorite a suivre :**

| Metrique | Outil | Seuil "bon" | Impact GEO |
|----------|-------|-------------|-----------|
| Domain Rating (DR) | Ahrefs | > 50 | Eleve |
| Domain Authority (DA) | Moz | > 40 | Moyen |
| Trust Flow | Majestic | > 30 | Eleve |
| Referring Domains | Ahrefs | > 500 | Eleve |
| Brand Mentions | Brand24 | Croissance | Tres eleve |

### Exercice pratique

Creez une "data study" dans votre niche : collectez des donnees (sondage, scraping, analyse), identifiez 3 insights surprenants avec Claude, redigez un communique de presse, et identifiez 20 journalistes/blogueurs cibles avec Hunter.io. Envoyez les pitchs et trackez les resultats sur 30 jours.

---

## Lecon 8 — Analytics et mesure du ROI SEO/GEO

### Ce que vous allez apprendre

Comment mesurer l'impact reel de vos efforts SEO et GEO, construire des dashboards automatises, et calculer le ROI de chaque action. Les metriques specifiques au GEO qui n'existaient pas avant 2025.

### Contenu detaille

**Le framework de mesure SEO+GEO :**

```
                    ┌── SEO Metrics ──────────────────┐
                    │ Positions, trafic, CTR, backlinks │
                    └────────────┬───────────────────┘
                                 │
Dashboard unifie ◄───────────────┼───────────────────────► ROI total
                                 │
                    ┌── GEO Metrics ──────────────────┐
                    │ Citations, mentions, AI referrals │
                    └────────────────────────────────┘
```

**Les KPIs essentiels par categorie :**

| Categorie | KPI | Source | Frequence |
|-----------|-----|--------|-----------|
| **Visibilite SEO** | Impressions, positions moyennes | Google Search Console | Hebdomadaire |
| **Trafic SEO** | Sessions organiques, pages/session | GA4 | Hebdomadaire |
| **Visibilite GEO** | Citations AI Overview, mentions Perplexity | Outil de monitoring GEO | Quotidienne |
| **Trafic GEO** | Referrals depuis chatgpt.com, perplexity.ai | GA4 (source/medium) | Hebdomadaire |
| **Conversion** | Leads, ventes, revenue par canal | GA4 + CRM | Mensuelle |
| **Autorite** | DR, backlinks, brand mentions | Ahrefs + Brand24 | Mensuelle |
| **ROI** | Revenue / cout par canal | Custom dashboard | Mensuelle |

**Tracker les referrals IA dans GA4 :**

```javascript
// Ajouter dans Google Tag Manager
// Detecter les referrals depuis les moteurs IA
const aiReferrers = [
  'chatgpt.com',
  'perplexity.ai',
  'you.com',
  'bing.com/chat',
  'bard.google.com',
  'claude.ai'
];

const referrer = document.referrer;
const isAIReferral = aiReferrers.some(ai => referrer.includes(ai));

if (isAIReferral) {
  gtag('event', 'ai_referral', {
    'ai_source': referrer,
    'landing_page': window.location.pathname,
    'timestamp': new Date().toISOString()
  });
}
```

**Calcul du ROI SEO/GEO :**

```
ROI SEO = (Revenue SEO - Cout SEO) / Cout SEO × 100

Couts SEO typiques :
- Outils (Ahrefs, SEMrush...) : $200-500/mois
- Contenu (redaction IA + revue humaine) : $500-2000/mois
- Technique (dev SEO) : $500-1500/mois
- Link building : $500-2000/mois
Total : $1700-6000/mois

Revenue SEO typique (e-commerce moyen) :
- Trafic organique : 50 000 visites/mois
- Taux de conversion : 2%
- Panier moyen : $80
- Revenue : $80 000/mois

ROI = ($80,000 - $4,000) / $4,000 × 100 = 1900%
```

**Le dashboard SEO/GEO automatise :**

| Section | Donnees | Source API | Actualisation |
|---------|---------|-----------|---------------|
| Score de sante SEO | Erreurs, warnings, opportunites | Screaming Frog API | Hebdomadaire |
| Positions top 10 | Mots-cles en page 1, evolution | GSC API | Quotidienne |
| Citations GEO | Nombre de citations AI, sources | Monitoring GEO | Quotidienne |
| Trafic par source | SEO vs GEO vs Paid vs Direct | GA4 API | Quotidienne |
| ROI par canal | Revenue / cout par source | Custom | Mensuelle |

### Exercice pratique

Configurez un dashboard GA4 avec les segments suivants : trafic SEO classique, referrals depuis les IA (ChatGPT, Perplexity, etc.), et trafic direct marque. Ajoutez le tracking JavaScript des AI referrals. Calculez votre ROI SEO sur les 3 derniers mois et projetez le ROI GEO attendu a 6 mois.

---

## Ce que cette formation apporte

- Maitrise complete du SEO technique et du GEO en 2026
- Capacite a auditer et optimiser n'importe quel site pour les moteurs classiques ET generatifs
- Pipelines de contenu programmatique a grande echelle avec garde-fous qualite
- Strategies de link building automatisees par IA
- Framework de mesure unifie SEO+GEO avec dashboards automatises
- Competence en schema markup avance (SpeakableSpecification pour le GEO)
- Methode de keyword research et clustering semantique propulsee par l'IA
- ROI mesurable et reportable pour justifier l'investissement SEO/GEO

---

## Ressources complementaires

- Module precedent : Content & Branding avec l'IA
- Module suivant : Formation avancee sur les agents de contenu
- Communaute Kommu pour echanger sur vos strategies SEO/GEO
- Template de dashboard GA4 SEO+GEO (Google Data Studio)
- Grille d'audit technique SEO (spreadsheet)
- Collection de prompts Claude pour la creation de contenu SEO
- Guide des schemas JSON-LD les plus impactants (PDF)
