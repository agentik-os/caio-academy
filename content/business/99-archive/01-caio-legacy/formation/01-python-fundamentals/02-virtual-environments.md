# Virtual Environments Python

Python virtual environments serve the same purpose as `node_modules` in Node.js – they isolate dependencies for each project.

## Why Use Virtual Environments?

In Node.js, `node_modules` isolates packages per project. In Python, without a virtual environment, everything installs globally. This means every project on your machine shares the same package versions, and version conflicts are guaranteed.

With a virtual environment, packages install into a project-local directory (`./venv/lib/python3/site-packages`) instead of the global system path. Each project gets its own isolated set of dependencies with no conflicts.

## Available Options

| Tool | Usage | When to Use |
|------|-------|-------------|
| `venv` | Built-in Python | Simple projects |
| `conda` | Data Science | ML/AI with C++ dependencies |
| `poetry` | Modern Python | Projects with PyPI publishing |
| `uv` | Ultra-fast | Modern alternative to pip |

**For ML/AI, use `conda`** – it handles PyTorch, CUDA, and system-level dependencies better than pip.

## Option 1: venv (Built-in)

### Setup

```bash
# Create the environment
python3 -m venv venv

# Structure created:
# venv/
# ├── bin/           # Scripts (activate, pip, python)
# ├── lib/           # Installed packages
# └── pyvenv.cfg     # Configuration

# Activate (Linux/Mac)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Your prompt changes:
# (venv) hacker@server:~/project$
```

### Daily Usage

```bash
# Install packages
pip install numpy pandas torch

# View installed packages
pip list

# Save dependencies
pip freeze > requirements.txt

# Install from requirements.txt
pip install -r requirements.txt

# Deactivate
deactivate
```

### requirements.txt

```txt
# requirements.txt
numpy==1.24.0
pandas>=2.0.0
torch==2.1.0
transformers>=4.35.0
datasets>=2.14.0
```

## Option 2: Conda (Recommended for ML)

### Installation

```bash
# Install Miniconda (lightweight)
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

# Or Miniforge (better for ML)
wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh
bash Miniforge3-Linux-x86_64.sh
```

### Project Setup

```bash
# Create an environment
conda create -n denny python=3.11

# Activate
conda activate denny

# Install packages
conda install numpy pandas
conda install pytorch pytorch-cuda=12.1 -c pytorch -c nvidia  # NVIDIA
conda install pytorch-rocm -c pytorch  # AMD ROCm

# View packages
conda list

# Save environment
conda env export > environment.yml

# Recreate from file
conda env create -f environment.yml

# Deactivate
conda deactivate

# Remove an environment
conda env remove -n denny
```

### environment.yml

```yaml
name: denny
channels:
  - pytorch
  - conda-forge
  - defaults
dependencies:
  - python=3.11
  - pytorch=2.1
  - numpy
  - pandas
  - transformers
  - datasets
  - pip:
    - some-pip-only-package
```

## Option 3: Poetry (Modern)

### Installation

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

### Project Setup

```bash
# New project
poetry new my-project

# Or in existing project
poetry init

# Install dependencies
poetry add numpy pandas
poetry add torch --source pytorch

# Install from pyproject.toml
poetry install

# Activate the environment
poetry shell

# Run a command
poetry run python script.py
```

### pyproject.toml

```toml
[tool.poetry]
name = "denny"
version = "0.1.0"
description = "AI/ML Learning Project"
authors = ["You <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.11"
numpy = "^1.24.0"
pandas = "^2.0.0"
torch = "^2.1.0"
transformers = "^4.35.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.0.0"
black = "^23.0.0"
```

## Option 4: uv (Ultra-fast)

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create a venv
uv venv

# Install (10-100x faster than pip)
uv pip install numpy pandas torch

# From requirements.txt
uv pip install -r requirements.txt
```

## Recommendation for the Mission

For this ML/AI project, use Conda:

```bash
conda create -n denny python=3.11
conda activate denny

# Install PyTorch for AMD (ROCm)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm5.6

# Or via conda
conda install pytorch torchvision torchaudio pytorch-rocm -c pytorch
```

## Typical Project Structure

```
Denny/
├── venv/                  # If using venv (gitignore!)
├── environment.yml        # If using conda
├── pyproject.toml         # If using poetry
├── requirements.txt       # Always useful as backup
├── requirements-dev.txt   # Dev dependencies
├── .python-version        # Python version (pyenv)
└── ...
```

### .gitignore for Python

```gitignore
# Environments
venv/
.venv/
env/
.env/
ENV/

# Conda
*.conda

# Cache
__pycache__/
*.py[cod]
*$py.class
.pytest_cache/

# Jupyter
.ipynb_checkpoints/

# IDE
.idea/
.vscode/
*.swp

# Build
build/
dist/
*.egg-info/
```

## Practical Exercise

**Tasks:**
1. Create a conda environment named `denny`
2. Install: `numpy`, `pandas`, `jupyter`
3. Export to `environment.yml`
4. Delete the environment
5. Recreate it from `environment.yml`

**Solution:**

```bash
conda create -n denny python=3.11 -y
conda activate denny
conda install numpy pandas jupyter -y
conda env export > environment.yml
conda deactivate
conda env remove -n denny
conda env create -f environment.yml
conda activate denny
```

---

*Next step: `03-essential-libraries.md`*
