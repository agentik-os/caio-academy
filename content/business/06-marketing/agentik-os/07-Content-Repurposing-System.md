# Content Repurposing System - Agentik OS

> [REALIGNEMENT CAIO ACADEMY -- Avril 2026]
> Ce document date de la phase pre-CAIO (janvier 2026) et cible l'audience indie hacker / solopreneur.
> Depuis fevrier 2026, Agentik OS est un outil interne de la CAIO Academy, pas un produit grand public.
> La strategie marketing active est desormais dans 01-Content-Strategy.md et 05-LinkedIn-Strategy.md.
> Les cinq avatars cibles sont : le CTO SaaS (CTO SaaS 37), le Consultant AI (consultant 38), la DG PME (DG PME 51),
> le Head of Digital (Head Digital 43), le Dev Ambitieux (dev/PM 28). Canal primaire : LinkedIn. Secondaire : YouTube.
> Ce fichier est conserve comme reference historique des tactiques marketing generiques.


> One YouTube video = 30+ pieces of content across all platforms.
> Systematic extraction, adaptation, and scheduling for maximum reach.
> Author: Gareth Simono | The Gentleman Builder

---

## 1. The Content Pyramid

### Visual Architecture

```
                         +-------------------------+
                         |                         |
                         |   YOUTUBE LONG-FORM     |
                         |   (10-20 min video)     |
                         |   The Source Content     |
                         |                         |
                         +------------+------------+
                                      |
                    +-----------------+-----------------+
                    |                 |                 |
              +-----+-----+   +------+------+   +-----+-----+
              |           |   |             |   |           |
              | BLOG POST |   | NEWSLETTER  |   |  PODCAST  |
              | (Medium/  |   | (Email to   |   | (Audio    |
              |  Website) |   |  list)      |   |  extract) |
              |           |   |             |   |           |
              +-----+-----+   +------+------+   +-----+-----+
                    |                 |                 |
         +----+----+----+     +------+------+     +----+----+
         |    |    |    |     |      |      |     |         |
        TW  TT  RL  SH      NL    LI    RD      QT       CM
        |    |    |    |     |      |      |     |         |
       twt  st  pin  st    eml   cmt   cmt    img       rep

LEGEND:
TW = Twitter Thread    TT = TikTok       RL = Reels
SH = YouTube Shorts    NL = Newsletter    LI = LinkedIn Post
RD = Reddit Post       QT = Quote Cards   CM = Community Posts
twt = Individual Tweets    st = Stories   pin = Pinterest Pins
eml = Email Sequences      cmt = Comments img = Quote Images
rep = Reply Content
```

### Output Per YouTube Video

| Content Type | Pieces | Platform | Effort |
|-------------|--------|----------|--------|
| YouTube Shorts | 3-5 | YouTube | Medium (editing) |
| TikTok Videos | 3-5 | TikTok | Low (repurpose Shorts) |
| Instagram Reels | 3-5 | Instagram | Low (repurpose TikToks) |
| Twitter Thread | 1-2 | Twitter/X | Medium (writing) |
| Individual Tweets | 5-10 | Twitter/X | Low (extract quotes) |
| LinkedIn Post | 1 | LinkedIn | Medium (adapt tone) |
| Reddit Post | 1 | Reddit | Medium (add depth) |
| Newsletter Issue | 1 | Email | Medium (curate + expand) |
| Blog Post | 1 | Website/Medium | Medium (from transcript) |
| Instagram Stories | 3-5 | Instagram | Low (quotes + clips) |
| Quote Cards | 3-5 | All platforms | Low (design in Canva) |
| Community Posts | 2-3 | YouTube + Discord | Low (discussion starters) |
| **TOTAL** | **30-47** | **8+ platforms** | **~4-6 hours** |

### ROI Calculation

```
WITHOUT REPURPOSING:
|-- 1 YouTube video = 8-12 hours production
|-- 1 piece of content
+-- Reach: YouTube audience only

WITH REPURPOSING:
|-- 1 YouTube video = 8-12 hours production
|-- +4-6 hours repurposing = 12-18 hours total
|-- 30-47 pieces of content
+-- Reach: 8+ platform audiences

EFFICIENCY GAIN:
|-- 50% more time invested
|-- 3000% more content output
+-- 500-1000% more total reach
```

---

## 2. Extraction Workflow

### Step-by-Step Process

```
+-- STEP 1: TRANSCRIBE (30 minutes) -------------------------------+
|                                                                    |
|  Input:  YouTube video (uploaded or raw file)                     |
|  Tool:   Descript or Whisper (local)                              |
|  Output: Full text transcript with timestamps                     |
|                                                                    |
|  Process:                                                          |
|  1. Upload video to Descript                                       |
|  2. Let AI transcribe (usually 95%+ accuracy)                    |
|  3. Manually correct AI/tech terms:                               |
|     |-- Agentik OS, Convex, Clerk, Ralph, MANIAC                 |
|     |-- Next.js, TypeScript, shadcn/ui                            |
|     +-- SaaS, ASAAS, MRR, NFT                                    |
|  4. Export as text file with timestamps                            |
|                                                                    |
+------------------------------------------------------------------+

+-- STEP 2: EXTRACT KEY QUOTES (20 minutes) -----------------------+
|                                                                    |
|  Input:  Transcript                                                |
|  Output: 5-10 standalone quotes                                    |
|                                                                    |
|  Selection Criteria:                                               |
|  [+] Surprising or counterintuitive                               |
|  [+] Actionable advice                                             |
|  [+] Emotionally resonant                                          |
|  [+] Controversial or debate-worthy                                |
|  [+] Quotable (under 280 characters for Twitter)                  |
|  [-] Generic platitudes                                            |
|  [-] Context-dependent (needs video to understand)                 |
|  [-] Technical jargon without explanation                          |
|                                                                    |
|  FORMAT EACH QUOTE:                                               |
|  "Quote text here." - [Timestamp in video]                        |
|  Platform tags: [Twitter] [LinkedIn] [Quote Card]                 |
|                                                                    |
+------------------------------------------------------------------+

+-- STEP 3: IDENTIFY CLIP-WORTHY MOMENTS (30 minutes) -------------+
|                                                                    |
|  Input:  Video + Transcript                                        |
|  Output: 3-5 clips with timestamps                                 |
|                                                                    |
|  Clip Types:                                                       |
|  |-- THE HOOK: First 30-60 seconds of the video                  |
|  |-- THE AHA: Biggest insight or revelation                       |
|  |-- THE DEMO: Most visual tool/code demonstration                |
|  |-- THE TAKE: Most controversial opinion                         |
|  +-- THE RESULT: Final outcome or metric reveal                   |
|                                                                    |
|  For each clip, note:                                              |
|  - Start timestamp                                                 |
|  - End timestamp                                                   |
|  - New hook needed? (yes/no)                                      |
|  - Vertical crop instructions                                      |
|  - Text overlay needed                                             |
|                                                                    |
+------------------------------------------------------------------+

+-- STEP 4: CREATE THREAD OUTLINE (20 minutes) --------------------+
|                                                                    |
|  Input:  Video structure + key points                              |
|  Output: Twitter thread outline (8-12 tweets)                      |
|                                                                    |
|  Thread Structure:                                                 |
|  Tweet 1: Hook (the most compelling insight from the video)       |
|  Tweet 2-3: Context (why this matters)                            |
|  Tweet 4-8: Key points (one per tweet, with examples)             |
|  Tweet 9-10: Practical takeaways                                   |
|  Tweet 11: Summary                                                 |
|  Tweet 12: CTA (link to YouTube video)                            |
|                                                                    |
|  RULES:                                                            |
|  |-- Each tweet must stand alone (people quote-tweet)             |
|  |-- Include at least 2 tweets with data/metrics                  |
|  |-- One tweet should be the "save this" moment                   |
|  +-- Thread should be valuable WITHOUT watching the video         |
|                                                                    |
+------------------------------------------------------------------+

+-- STEP 5: WRITE LINKEDIN POST (20 minutes) ----------------------+
|                                                                    |
|  Input:  Key insight from video                                    |
|  Output: LinkedIn post (1200-2000 characters)                      |
|                                                                    |
|  LinkedIn Post Structure:                                          |
|  Line 1: Hook (bold statement or question)                        |
|  Line 2: [empty line]                                              |
|  Lines 3-8: Story or context (personal experience)                |
|  Lines 9-12: Key insights (3-5 bullet points)                     |
|  Lines 13-15: Practical advice                                     |
|  Line 16: CTA (question to audience + video link)                 |
|                                                                    |
|  TONE ADJUSTMENT:                                                  |
|  YouTube: Casual, energetic, direct                                |
|  LinkedIn: Professional, insightful, thought-leadership            |
|                                                                    |
+------------------------------------------------------------------+

+-- STEP 6: CREATE CAROUSEL (30 minutes) --------------------------+
|                                                                    |
|  Input:  Numbered list or step-by-step from video                  |
|  Output: Instagram/LinkedIn carousel (8-12 slides)                 |
|  Tool:   Canva (use Agentik OS brand template)                    |
|                                                                    |
|  Carousel Structure:                                               |
|  Slide 1: Title + hook (attention-grabbing)                       |
|  Slide 2: Problem statement                                       |
|  Slides 3-9: One point per slide (visual + short text)            |
|  Slide 10: Summary or key takeaway                                 |
|  Slide 11: CTA (save + share + follow)                            |
|  Slide 12: Profile card (name, handle, what you do)               |
|                                                                    |
|  DESIGN RULES:                                                     |
|  |-- Consistent brand colors (terracotta + dark theme)            |
|  |-- Large text (readable on mobile without zooming)              |
|  |-- One idea per slide maximum                                    |
|  |-- Include page numbers (3/10, 4/10)                            |
|  +-- Swipe indicator on first slide                                |
|                                                                    |
+------------------------------------------------------------------+

+-- STEP 7: SCHEDULE NEWSLETTER (30 minutes) ----------------------+
|                                                                    |
|  Input:  Video summary + exclusive insights                        |
|  Output: Newsletter issue with video embed                         |
|                                                                    |
|  Newsletter Structure:                                             |
|  1. Subject line (curiosity-driven)                                |
|  2. Personal intro (1-2 sentences)                                 |
|  3. Video embed + "watch this week's video"                       |
|  4. 3 key takeaways (for those who won't watch)                   |
|  5. Exclusive insight (not in the video)                           |
|  6. Tool/resource recommendation                                   |
|  7. Question for reply engagement                                  |
|  8. Footer: social links, unsubscribe                              |
|                                                                    |
|  THE EXCLUSIVE RULE:                                               |
|  Every newsletter MUST have at least one thing                     |
|  that's NOT in the video. This rewards subscribers                 |
|  and gives them a reason to stay on the list.                      |
|                                                                    |
+------------------------------------------------------------------+
```

### Total Time Investment Per Video

```
EXTRACTION WORKFLOW:

Step 1: Transcribe          [====]             30 min
Step 2: Extract Quotes      [===]              20 min
Step 3: Identify Clips      [====]             30 min
Step 4: Thread Outline      [===]              20 min
Step 5: LinkedIn Post       [===]              20 min
Step 6: Carousel            [====]             30 min
Step 7: Newsletter          [====]             30 min
                            -----
                            TOTAL:             ~3 hours

+ Short-form editing (clips):                 ~1-2 hours
+ Scheduling across platforms:                ~30 min
                                              --------
GRAND TOTAL:                                  ~4.5-5.5 hours
```

---

## 3. Platform Adaptation Rules

### How the Same Content Changes

| Element | Twitter/X | LinkedIn | TikTok | Instagram | Reddit | Newsletter |
|---------|-----------|----------|--------|-----------|--------|------------|
| **Tone** | Sharp, witty, direct | Professional, insightful | Casual, energetic | Polished, aspirational | Detailed, helpful | Personal, exclusive |
| **Length** | 280 chars/tweet, 8-12 tweet threads | 1200-2000 chars | 30-60s video | 30-90s Reel, 2200 char caption | 500-2000 words | 500-1000 words |
| **Format** | Thread with line breaks | Story + bullets | Face cam or screen | Visual-first | Long-form text | Email with sections |
| **Hook Style** | "Controversial take:" | "After building 15 SaaS products, here's what I learned:" | "Watch this" (visual hook) | Visual thumbnail | "I built X. Here's what happened." | Subject line curiosity |
| **CTA** | "Follow + RT" | "Follow for more, link in comments" | "Follow for part 2" | "Save this, link in bio" | "AMA in comments" | "Reply to this email" |
| **Hashtags** | 1-2 max | 3-5 | 5-8 | 5-10 | Subreddit rules | None |
| **Media** | Screenshots, code snippets | Carousels, document posts | Vertical video | Reels, carousels, stories | Inline images optional | Embedded video, images |
| **Best Time** | 08:00-10:00, 17:00-19:00 CET | 07:00-09:00, 12:00-14:00 CET | 07:00-09:00, 18:00-20:00 CET | 11:00-13:00, 19:00-21:00 CET | 14:00-17:00 CET | Tuesday 10:00 CET |
| **Frequency** | 3-5 tweets/day, 2 threads/week | 3-5 posts/week | 1-2/day | 1 Reel + 1 carousel/day | 2-3 posts/week | 1/week |

### Adaptation Examples

**Original YouTube Quote:**
> "I replaced my entire QA team with MANIAC - an AI agent that thinks like a paranoid security researcher and tests every button, every form, every edge case in your app. It found 47 bugs in 6 hours that my manual testing missed for months."

**Twitter Version:**
```
I replaced my QA team with an AI agent.

It found 47 bugs in 6 hours.

Bugs I missed for months.

It tests like a paranoid security researcher:
- Every button
- Every form
- Every edge case

The tool is called MANIAC.

I built it. Thread on how it works:
```

**LinkedIn Version:**
```
After months of manual testing missing critical bugs,
I built something different.

MANIAC is an AI testing agent that approaches your app
like a paranoid security researcher. Not gentle. Not polite.
It tries to break everything.

In its first run on a client project, it found 47 bugs
in 6 hours - including 3 critical security issues that had
been live for months.

Here's what I learned about AI-powered QA:

- Manual testing catches the obvious. AI catches the invisible.
- Speed matters: 6 hours vs. weeks of manual review.
- The paranoid mindset is better than the optimistic one.

Building tools that replace entire departments isn't about
eliminating jobs. It's about making solo builders competitive
with funded startups.

What's the most bugs you've ever found in a single testing session?

Full breakdown in my latest video (link in comments)
```

**TikTok Version:**
```
[Face to camera, shirt on, good lighting]

"My AI agent found 47 bugs in 6 hours."

[Cut to screen recording of MANIAC running]

"It tests every button, every form, every edge case.
Like a paranoid security researcher on caffeine."

[Cut to results screen showing bugs found]

"Three of those bugs were critical security issues.
Live in production for months. Nobody caught them."

[Cut back to face]

"The tool is called MANIAC. I built it.
Full video on how - link in bio."
```

**Reddit Version (r/SaaS or r/webdev):**
```
Title: I built an AI agent that found 47 bugs in 6 hours
- here's the approach and what I learned

I've been building SaaS products for the past few years and
manual testing was always my weakest link. I'd ship features,
think they were solid, and then get user reports about edge
cases I never considered.

So I built MANIAC - an autonomous testing agent that approaches
your app with a paranoid security mindset.

**How it works:**
[Technical explanation, 3-5 paragraphs]

**Results on a real project:**
[Specific numbers, bug categories, time comparison]

**What I learned:**
[3-5 lessons with detail]

**Stack used:**
[Technical details the Reddit audience appreciates]

Happy to answer questions about the approach.
I'm not selling anything - just sharing what worked.
```

---

## 4. Tools and Automation

### Recommended Tool Stack

| Category | Tool | Use Case | Cost | Priority |
|----------|------|----------|------|----------|
| **Transcription** | Descript | Video to text, word-level timestamps | $24/month | [!] Essential |
| **Transcription** | Whisper (local) | Free alternative, runs on VPS | Free | [+] Backup |
| **Clip Extraction** | Opus Clip | AI finds best clip moments | $15/month | [+] Recommended |
| **Clip Extraction** | Manual (DaVinci) | Full control over clips | Free | [OK] Default |
| **Scheduling** | Buffer | Multi-platform scheduling | $15/month | [!] Essential |
| **Scheduling** | Tweet Hunter | Twitter-specific scheduling + analytics | $49/month | [+] When budget allows |
| **Design** | Canva Pro | Carousels, quote cards, thumbnails | $13/month | [!] Essential |
| **Design** | Figma | Custom brand templates | Free | [+] Already using |
| **AI Writing** | Claude | Adapt content per platform | Existing subscription | [!] Essential |
| **Email** | ConvertKit | Newsletter management | Free up to 1K subs | [!] Essential |
| **Analytics** | Platform native | Track per-platform metrics | Free | [!] Essential |

### Automation Opportunities

```
+-- WHAT CAN BE AUTOMATED -----------------------------------------+
|                                                                    |
|  [OK] Transcription         -- Descript auto-transcribes          |
|  [OK] Caption generation    -- CapCut auto-captions               |
|  [OK] Scheduling            -- Buffer queues posts                 |
|  [OK] Quote card design     -- Canva templates + batch create     |
|  [OK] Newsletter formatting -- ConvertKit templates               |
|  [+]  Cross-posting         -- Buffer handles most platforms      |
|                                                                    |
+-- WHAT NEEDS HUMAN TOUCH ----------------------------------------+
|                                                                    |
|  [!] Clip selection         -- AI misses nuance in "best" moments |
|  [!] Hook writing           -- AI hooks feel generic              |
|  [!] Platform tone adapt    -- Each platform has subtle norms     |
|  [!] Thread writing         -- Threads need narrative arc         |
|  [!] Reddit posting         -- Reddit detects and punishes AI     |
|  [!] Story content          -- Authenticity can't be automated    |
|                                                                    |
+------------------------------------------------------------------+
```

### AI-Assisted Repurposing with Claude

**Prompt Template for Platform Adaptation:**

```
I just published a YouTube video about [TOPIC].

Here's the transcript:
[PASTE TRANSCRIPT]

Please create:
1. A Twitter thread (10 tweets) - sharp, witty, direct
2. A LinkedIn post (1500 chars) - professional, insightful
3. 5 standalone tweet quotes from the video
4. A Reddit post title and outline for r/[SUBREDDIT]
5. A newsletter subject line and 3 key takeaways

My brand: The Gentleman Builder (Agentik OS)
My voice: Direct, confident but humble, technical when relevant
Never use: emojis, corporate jargon, hype language
```

---

## 5. Weekly Repurposing Schedule

### The Weekly Rhythm

```
+-- SUNDAY (FILMING DAY) ------------------------------------------+
|                                                                    |
|  10:00-14:00  Film YouTube long-form video                        |
|  14:00-15:00  Film 5-7 short-form videos (batch)                 |
|  15:00-18:00  Edit YouTube video in DaVinci Resolve              |
|                                                                    |
|  DELIVERABLES:                                                    |
|  [OK] YouTube video filmed and rough-edited                       |
|  [OK] 5-7 original short-form clips filmed                       |
|                                                                    |
+------------------------------------------------------------------+

+-- MONDAY (PUBLISH + TRANSCRIBE) ---------------------------------+
|                                                                    |
|  09:00-10:00  Finalize YouTube edit, upload, schedule              |
|  10:00-10:30  Transcribe video (Descript)                         |
|  10:30-11:00  Extract 5-10 key quotes                             |
|  11:00-12:00  Identify 3-5 clip moments, export clips             |
|                                                                    |
|  PUBLISH TODAY:                                                    |
|  [OK] YouTube video goes live                                      |
|  [OK] 1 TikTok (original, filmed Sunday)                          |
|  [OK] 1 Reel (adapted from last week's TikTok)                   |
|  [OK] 1 Short (teaser for today's YouTube)                        |
|  [OK] 3-5 tweets (announcement + quotes)                          |
|                                                                    |
+------------------------------------------------------------------+

+-- TUESDAY (THREAD + SHORTS) -------------------------------------+
|                                                                    |
|  09:00-10:00  Write Twitter thread from video content              |
|  10:00-11:00  Edit 2-3 Shorts from clips                         |
|  11:00-11:30  Schedule week's short-form content                   |
|                                                                    |
|  PUBLISH TODAY:                                                    |
|  [OK] Twitter thread (8-12 tweets)                                 |
|  [OK] 1 TikTok (original)                                         |
|  [OK] 1 Reel (adapted from Monday's TikTok)                      |
|  [OK] 1 Short (clip from YouTube)                                  |
|                                                                    |
+------------------------------------------------------------------+

+-- WEDNESDAY (LINKEDIN + NEWSLETTER) ------------------------------+
|                                                                    |
|  09:00-09:30  Write LinkedIn post                                  |
|  09:30-10:00  Draft newsletter with video embed                    |
|  10:00-10:30  Create 3-5 quote cards in Canva                     |
|                                                                    |
|  PUBLISH TODAY:                                                    |
|  [OK] LinkedIn post                                                |
|  [OK] 1 TikTok (original, hot take)                               |
|  [OK] 1 Reel (adapted from Tuesday's TikTok)                     |
|  [OK] 1 Short (clip from YouTube)                                  |
|  [OK] Quote cards to Instagram stories                             |
|                                                                    |
+------------------------------------------------------------------+

+-- THURSDAY (TIKTOK + REELS) -------------------------------------+
|                                                                    |
|  09:00-10:00  Edit remaining short-form content for the week       |
|  10:00-10:30  Schedule remaining posts                             |
|                                                                    |
|  PUBLISH TODAY:                                                    |
|  [OK] Newsletter sent (Tuesday 10AM scheduling)                    |
|  [OK] 1 TikTok (original, build clip)                             |
|  [OK] 1 Reel (adapted from Wednesday's TikTok)                   |
|  [OK] 1 Short (results/proof)                                     |
|                                                                    |
+------------------------------------------------------------------+

+-- FRIDAY (COMMUNITY + REDDIT) -----------------------------------+
|                                                                    |
|  09:00-10:00  Write Reddit post                                    |
|  10:00-11:00  Engage with comments across all platforms            |
|  11:00-11:30  YouTube community tab post                           |
|                                                                    |
|  PUBLISH TODAY:                                                    |
|  [OK] Reddit post (r/SaaS, r/webdev, or relevant sub)            |
|  [OK] YouTube community tab post                                   |
|  [OK] 1 TikTok (original, results/proof)                          |
|  [OK] 1 Reel (adapted from Thursday's TikTok)                    |
|  [OK] 1 Short (story hook for next week's video)                  |
|                                                                    |
+------------------------------------------------------------------+

+-- SATURDAY (PLAN + ENGAGE) --------------------------------------+
|                                                                    |
|  09:00-10:00  Review week's analytics across all platforms         |
|  10:00-11:00  Plan next week's content                             |
|  11:00-12:00  Batch respond to DMs and comments                    |
|                                                                    |
|  PUBLISH TODAY:                                                    |
|  [OK] 1 TikTok (BTS or teaser)                                    |
|  [OK] 1 Reel (adapted from Friday's TikTok)                      |
|  [OK] 1 Short (quick tip, batch-filmed)                            |
|                                                                    |
+------------------------------------------------------------------+
```

### Weekly Content Output Summary

```
+-- WEEKLY OUTPUT TOTALS -------------------------------------------+
|                                                                    |
|  YouTube Long-Form:     1 video                                    |
|  YouTube Shorts:        7 videos                                   |
|  TikTok:                7 videos (5 original + 2 repurposed)      |
|  Instagram Reels:       7 videos (all adapted from TikTok)        |
|  Twitter:               1 thread + 15-20 individual tweets        |
|  LinkedIn:              1 post + engagement                        |
|  Reddit:                1 post                                     |
|  Newsletter:            1 issue                                    |
|  Instagram Stories:     5-10 story cards                           |
|  YouTube Community:     1-2 posts                                  |
|  Quote Cards:           3-5 designed cards                         |
|                                                                    |
|  TOTAL PIECES:          ~40-50 per week                           |
|  TIME INVESTED:         ~12-15 hours (filming + repurposing)      |
|  COST PER PIECE:        ~15-20 minutes average                    |
|                                                                    |
+------------------------------------------------------------------+
```

---

## 6. Content Lifecycle

### Reviving Old Content

Not every piece of content dies after its first posting. The best content can be recycled, refreshed, and republished systematically.

### The 30-Day Republish Cycle

```
DAY 0:   Original YouTube video published
DAY 1-7: Full repurposing cycle (all platforms)
DAY 14:  Re-share thread on Twitter with new hook
DAY 21:  Post updated version on LinkedIn
DAY 30:  Reshare Short/Reel with different hook
DAY 60:  If evergreen, reshare with "X months later" angle
DAY 90:  Include in "Best of Q[X]" compilation
```

### Content Categories by Lifecycle

| Category | Shelf Life | Refresh Strategy |
|----------|-----------|-----------------|
| **Evergreen Tutorials** | 6-12 months | Update when stack changes, reshare quarterly |
| **Tool Reviews** | 3-6 months | Update when tool gets major update |
| **Hot Takes** | 1-2 weeks | Let them die or follow up if proven right/wrong |
| **Build Content** | 3-6 months | Reference in newer builds, "remember when..." |
| **Results/Proof** | Permanent | Update with new numbers, "6 months later" format |
| **Personal Stories** | Permanent | Reference in new content, become "lore" |

### Evergreen Content Refresh Protocol

```
WHEN TO REFRESH:
|-- Video still gets 50+ views/day after 3 months
|-- Topic is still relevant
|-- You have new data or insights to add
+-- Stack or tools mentioned have updated

HOW TO REFRESH:
|-- New Short with updated information
|-- Updated thread with "[UPDATED]" tag
|-- LinkedIn post: "6 months ago I shared X. Here's what changed."
|-- Newsletter: "Deep dive revisited" section
+-- YouTube community tab: Poll asking if viewers want an update

DO NOT REFRESH:
|-- Videos that never performed (let them go)
|-- Hot takes that aged badly (unless you own the L)
+-- Content tied to a specific date/event
```

### "Best Of" Compilations

**Monthly:** Identify the top 5 performing pieces across all platforms.

**Quarterly:** Create a compilation video or thread.

```
FORMAT OPTIONS:

1. YouTube Compilation
   "Top 10 AI building tips from Q1 2026"
   Stitch together best Short clips
   10-15 minutes, easy to produce

2. Twitter Mega-Thread
   "Everything I learned building SaaS products in Q1"
   Link to individual threads
   Pin to profile

3. Newsletter Special
   "The 5 most-read issues this quarter"
   Recap + exclusive new insight

4. Instagram Carousel
   "My best advice from 3 months of building"
   Top quotes, one per slide
```

---

## 7. Quality Gates

### Pre-Publish Checklist (All Platforms)

```
+-- UNIVERSAL QUALITY GATE ----------------------------------------+
|                                                                    |
|  CONTENT                                                          |
|  [ ] Hook grabs attention in first 2 seconds                      |
|  [ ] Delivers on the promise of the hook                          |
|  [ ] No factual errors                                             |
|  [ ] No sensitive/private information exposed                      |
|  [ ] Brand voice is consistent (confident, humble, direct)        |
|  [ ] No emojis (1-Life brand rule)                                |
|                                                                    |
|  TECHNICAL                                                        |
|  [ ] Audio is clear and normalized                                 |
|  [ ] Video is sharp (1080p minimum)                                |
|  [ ] Captions are accurate and readable                            |
|  [ ] Vertical format is properly framed (9:16 for short-form)    |
|  [ ] No unintended content visible on screen                      |
|                                                                    |
|  BRANDING                                                         |
|  [ ] Consistent with The Gentleman Builder persona                |
|  [ ] Professional appearance (shirt, clean desk)                   |
|  [ ] Handle/tag is visible or mentioned                            |
|  [ ] CTA is clear and appropriate for the platform                |
|                                                                    |
+------------------------------------------------------------------+
```

### Platform-Specific Gates

**Twitter/X:**

- [ ] Thread reads well as individual tweets (each stands alone)
- [ ] First tweet is strong enough to stop scrolling
- [ ] No tweet exceeds 280 characters
- [ ] Images are properly sized (1200x675 or 1:1)
- [ ] Hashtags: 1-2 max, relevant
- [ ] Tagged relevant accounts (not spam)

**LinkedIn:**

- [ ] Professional tone (not too casual)
- [ ] Line breaks for readability (every 1-2 sentences)
- [ ] Document/carousel is uploaded natively (not link)
- [ ] Link in comments, not in post body (algorithm penalty)
- [ ] Hashtags: 3-5, mix of broad and niche

**TikTok:**

- [ ] Trending sound added (if applicable)
- [ ] First frame is visually compelling
- [ ] Text overlays are readable on mobile
- [ ] Hashtags: 5-8, trending + niche mix
- [ ] Posted at optimal time for audience

**Instagram:**

- [ ] High visual quality (Instagram penalizes low-res)
- [ ] Caption is substantial (100+ words for Reels)
- [ ] Shared to Stories with engagement sticker
- [ ] Hashtags: 5-10 in caption or first comment
- [ ] Bio link updated if referenced

**Reddit:**

- [ ] Post follows subreddit rules exactly
- [ ] Title is descriptive, not clickbait
- [ ] Content provides genuine value (Reddit detects promotion)
- [ ] No direct self-promotion in first paragraph
- [ ] Prepared to engage in comments for 2+ hours

**Newsletter:**

- [ ] Subject line tested (would YOU open this?)
- [ ] Exclusive content included (not just video recap)
- [ ] Mobile rendering checked
- [ ] Links work correctly
- [ ] Unsubscribe link present and functional

---

## 8. ROI Tracking

### What to Measure

```
+-- REPURPOSING ROI METRICS ----------------------------------------+
|                                                                    |
|  TIER 1: REACH (how many people saw it)                           |
|  |-- Impressions per platform                                      |
|  |-- Total reach across all repurposed content                    |
|  |-- Reach multiplier (total reach / YouTube-only reach)          |
|  +-- New audience % (people who don't follow on YouTube)          |
|                                                                    |
|  TIER 2: ENGAGEMENT (how many people interacted)                  |
|  |-- Likes, comments, shares per piece                            |
|  |-- Save rate (indicates high value)                              |
|  |-- Thread/post completion rate                                   |
|  +-- Reply rate on newsletter                                      |
|                                                                    |
|  TIER 3: CONVERSION (what business impact)                        |
|  |-- YouTube subscribers gained from short-form                   |
|  |-- Newsletter signups from social                                |
|  |-- Website traffic from social                                   |
|  |-- Product signups attributed to content                         |
|  |-- Dafnck Studio inquiries from content                         |
|  +-- Revenue directly attributed to content                       |
|                                                                    |
|  TIER 4: EFFICIENCY (is repurposing worth the time)               |
|  |-- Time spent per content piece                                  |
|  |-- Cost per piece (tools + time)                                 |
|  |-- Reach per hour invested                                       |
|  +-- Revenue per hour of content creation                          |
|                                                                    |
+------------------------------------------------------------------+
```

### Weekly Tracking Template

```
+-- WEEK OF [DATE] - REPURPOSING REPORT ----------------------------+
|                                                                    |
|  SOURCE: YouTube video "[Title]"                                   |
|  YouTube Views: [X]                                                |
|                                                                    |
|  REPURPOSED CONTENT PERFORMANCE:                                  |
|                                                                    |
|  Platform      | Pieces | Total Reach | Engagement | Conversions |
|  ------------- | ------ | ----------- | ---------- | ----------- |
|  Shorts        |   5    |   12,000    |    450     |   +23 subs  |
|  TikTok        |   7    |   28,000    |  1,200     |   +85 foll  |
|  Reels         |   7    |   15,000    |    600     |   +42 foll  |
|  Twitter       |  12    |   45,000    |  2,100     |  +120 foll  |
|  LinkedIn      |   1    |    8,000    |    350     |   3 leads   |
|  Reddit        |   1    |   12,000    |    200     |   15 clicks |
|  Newsletter    |   1    |    2,500    |     45%    |   2 replies |
|  ------------- | ------ | ----------- | ---------- | ----------- |
|  TOTALS        |  34    |  122,500    |  4,945     |   mixed     |
|                                                                    |
|  MULTIPLIER: YouTube alone = 8,000 views                          |
|              With repurposing = 122,500 total reach                |
|              Multiplier = 15.3x                                    |
|                                                                    |
|  TIME: YouTube production = 12 hours                               |
|        Repurposing = 5 hours                                       |
|        Total = 17 hours for 122,500 reach                         |
|        = 7,206 reach per hour                                      |
|                                                                    |
+------------------------------------------------------------------+
```

### Monthly Dashboard

```
+-- MONTHLY REPURPOSING DASHBOARD ----------------------------------+
|                                                                    |
|  VIDEOS PUBLISHED:         4                                       |
|  TOTAL PIECES CREATED:     160                                     |
|  TOTAL REACH:              450,000                                 |
|  AVG MULTIPLIER:           12.5x                                   |
|                                                                    |
|  PLATFORM BREAKDOWN:                                              |
|                                                                    |
|  YouTube (total)  [===============-----] 75%   340K views         |
|  |-- Long-form    [==========----------] 50%   225K               |
|  +-- Shorts       [=====---------------] 25%   115K               |
|                                                                    |
|  TikTok           [=========-----------] 45%   200K reach         |
|  Twitter          [============--------] 60%   270K impressions   |
|  Instagram        [=======-----------]   35%   155K reach         |
|  LinkedIn         [====----------------] 20%    90K impressions   |
|  Reddit           [====-----------]      18%    80K views         |
|  Newsletter       [=======-------------] 35%    3.5K opens       |
|                                                                    |
|  GROWTH:                                                          |
|  YouTube Subs:     +450 (from short-form: +180)                   |
|  Twitter:          +800                                            |
|  TikTok:           +2,100                                          |
|  Instagram:        +600                                            |
|  LinkedIn:         +250                                            |
|  Newsletter:       +120                                            |
|                                                                    |
|  BUSINESS IMPACT:                                                 |
|  Dafnck Studio leads: 5 inquiries                                 |
|  Product signups: 45 (Kommu, LifePixels)                          |
|  Revenue attributed: TBD                                           |
|                                                                    |
|  EFFICIENCY:                                                      |
|  Hours creating: 50h (filming) + 20h (repurposing) = 70h         |
|  Reach/hour: 6,428                                                 |
|  Cost/piece: ~26 min average                                       |
|                                                                    |
+------------------------------------------------------------------+
```

### Attribution Model

Tracking which platform drives real business results:

```
ATTRIBUTION CHAIN:

Discovery           Engagement          Conversion
(where they find    (where they         (where they
you first)          follow/subscribe)    become a customer)

TikTok      -----> YouTube Sub  -----> Product Signup
Twitter     -----> Newsletter   -----> Dafnck Studio Lead
Reddit      -----> Website      -----> Community Member
LinkedIn    -----> DM/Email     -----> Client Call
Shorts      -----> Long-Form    -----> Course Purchase

TRACKING TOOLS:
|-- UTM parameters on all links (utm_source, utm_medium, utm_campaign)
|-- Google Analytics for website traffic sources
|-- ConvertKit tags for newsletter signup source
|-- Stripe metadata for purchase attribution
+-- Manual tracking: "How did you find me?" on intake forms
```

### Quarterly Review Questions

At the end of each quarter, answer these questions:

- [ ] Which platform drives the most YouTube subscribers?
- [ ] Which content category performs best when repurposed?
- [ ] Which platform has the best engagement-to-conversion ratio?
- [ ] Is the time spent on repurposing justified by the reach multiplier?
- [ ] Which tools should be added/removed from the stack?
- [ ] Are there platforms we should add or drop?
- [ ] What content types should we create more/less of?
- [ ] Is the weekly schedule sustainable?
- [ ] What's the single highest-ROI repurposing action we do?
- [ ] What would change if we had a content assistant?

---

## Appendix: Quick Reference Card

```
+-- REPURPOSING QUICK REFERENCE ------------------------------------+
|                                                                    |
|  1 YOUTUBE VIDEO = 30-47 PIECES                                  |
|                                                                    |
|  EXTRACTION TIME: ~3 hours                                        |
|  EDITING TIME: ~1-2 hours                                         |
|  SCHEDULING: ~30 minutes                                          |
|  TOTAL: ~4.5-5.5 hours additional                                 |
|                                                                    |
|  DAILY CADENCE:                                                   |
|  Mon: Publish YouTube + start extraction                          |
|  Tue: Thread + Shorts                                              |
|  Wed: LinkedIn + Newsletter                                        |
|  Thu: TikTok + Reels editing                                      |
|  Fri: Reddit + Community engagement                                |
|  Sat: Analytics + plan next week                                   |
|  Sun: FILMING DAY                                                  |
|                                                                    |
|  KEY TOOLS:                                                       |
|  Descript (transcription) | CapCut (short-form editing)           |
|  Buffer (scheduling) | Canva (design) | Claude (adaptation)      |
|                                                                    |
|  THE GOLDEN RULE:                                                 |
|  Every piece must provide standalone value.                        |
|  If it only makes sense with the video, rework it.                |
|                                                                    |
|  THE EXCLUSIVE RULE:                                              |
|  Every platform gets something unique.                             |
|  Newsletter = exclusive insight not in video.                      |
|  Reddit = deeper technical detail.                                 |
|  LinkedIn = professional framing.                                  |
|                                                                    |
+------------------------------------------------------------------+
```

---

*Last updated: February 2026*
*System version: 1.0*
*Author: Gareth Simono - The Gentleman Builder*
*Brand: Agentik OS*
