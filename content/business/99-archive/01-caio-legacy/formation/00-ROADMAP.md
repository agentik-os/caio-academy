# Roadmap -- De Developpeur Web a AI/ML Engineer

> Guide complet pour acquerir les competences ML/AI en partant d'un profil TypeScript/React

---

## Ou tu en es vs Ou tu dois aller

Your current profile as a TypeScript/JavaScript developer with React/Next.js, API calls to Claude, Convex/Supabase backends, Vercel deployment, and MCP usage needs to evolve into fluency with Python, PyTorch/JAX, model training, dataset engineering, GPU clusters (AMD), and deep MCP protocol mastery.

The gap is significant but structured. Each phase below builds directly on the previous one, creating a clear path from web developer to AI/ML engineer.

---

## Les 8 Phases

### Phase 1: Python Fundamentals (1-2 weeks)

**Objective:** Be as comfortable in Python as you are in TypeScript.

- `01-syntax-for-ts-devs.md` -- Python for TypeScript developers
- `02-virtual-environments.md` -- venv, conda, poetry
- `03-essential-libraries.md` -- numpy, pandas, requests
- `04-type-hints.md` -- Python typing (like TS)
- `05-async-python.md` -- asyncio vs Promise

### Phase 2: ML Basics (2-3 weeks)

**Objective:** Understand the foundational concepts of Machine Learning.

- `01-what-is-ml.md` -- Supervised, unsupervised, reinforcement learning
- `02-math-essentials.md` -- Linear algebra, calculus, statistics
- `03-neural-networks.md` -- Perceptrons, backpropagation, gradients
- `04-training-concepts.md` -- Loss, optimizer, epochs, batches
- `05-overfitting-regularization.md` -- Preventing models from memorizing

### Phase 3: PyTorch + AMD ROCm (2-3 weeks)

**Objective:** Master PyTorch on AMD GPUs (not NVIDIA).

- `01-pytorch-basics.md` -- Tensors, autograd
- `02-amd-rocm-setup.md` -- ROCm installation (not CUDA)
- `03-training-loop.md` -- Forward, backward, step
- `04-data-loaders.md` -- DataLoader, Dataset
- `05-distributed-training.md` -- Multi-GPU AMD

### Phase 4: Datasets (1-2 weeks)

**Objective:** Create, clean, and qualify datasets.

- `01-dataset-creation.md` -- Sources, formats, structuring
- `02-data-cleaning.md` -- Cleaning, normalization
- `03-data-qualification.md` -- Quality, reliability, bias
- `04-train-test-split.md` -- Split strategies

### Phase 5: LLM Training (3-4 weeks)

**Objective:** Train and fine-tune large language models.

- `01-transformer-architecture.md` -- Attention, encoders, decoders
- `02-pretrained-models.md` -- Hugging Face, model hub
- `03-fine-tuning-basics.md` -- Full fine-tuning
- `04-lora-qlora.md` -- Parameter-efficient fine-tuning
- `05-rlhf.md` -- Reinforcement Learning from Human Feedback

### Phase 6: Evaluation (1-2 weeks)

**Objective:** Measure model quality rigorously.

- `01-metrics-overview.md` -- Accuracy, F1, BLEU, ROUGE
- `02-llm-benchmarks.md` -- MMLU, HellaSwag, and others

### Phase 7: MCP Advanced (1 week)

**Objective:** Master the Model Context Protocol in depth.

- `01-mcp-protocol-deep-dive.md` -- Complete specification

### Phase 8: Project Setup (hands-on practice)

**Objective:** Apply everything on a real project.

- `01-project-structure.md` -- ML project structure

---

## Timeline Recommandee

| Period | Phase |
|--------|-------|
| Weeks 1-2 | Python Fundamentals |
| Weeks 3-5 | ML Basics |
| Weeks 6-8 | PyTorch + AMD |
| Weeks 9-10 | Datasets |
| Weeks 11-14 | LLM Training |
| Weeks 15-16 | Evaluation |
| Week 17 | MCP Advanced |
| Week 18+ | Practical project |

**Total: approximately 4-5 months** to be operational on the mission.

---

## Priorites selon la Mission

### Critical (without these, no mission)

1. Python fluency
2. PyTorch on AMD (ROCm)
3. Dataset creation and qualification
4. LLM fine-tuning

### Important

5. Evaluation metrics
6. MCP protocol
7. Chatbot integration

### Bonus

8. Distributed training
9. Advanced RLHF
10. MLOps

---

## Comment utiliser cette doc

1. **Read in order** -- Each phase builds on the previous one.
2. **Code in parallel** -- Create notebooks in `/notebooks` as you go.
3. **Practical projects** -- Apply each concept immediately.
4. **Iterate** -- Return to concepts as needed.

---

*Prochaine etape: `01-python-fundamentals/01-syntax-for-ts-devs.md`*
