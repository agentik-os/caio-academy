# Type Hints en Python

> Typage optionnel comme TypeScript, mais avec des différences importantes

---

## Différence Fondamentale

| TypeScript | Python |
|------------|--------|
| Types vérifiés à la compilation | Types JAMAIS vérifiés à runtime |
| Obligatoires en strict mode | Toujours optionnels |
| Erreurs bloquent le build | Seulement des hints pour l'IDE |

```python
# Ce code FONCTIONNE même avec des types "faux"
def add(a: int, b: int) -> int:
    return a + b

add("hello", "world")  # Pas d'erreur! Retourne "helloworld"
```

Pour vérifier les types, il faut utiliser un outil externe: **mypy**, **pyright**, ou **ruff**.

---

## Syntaxe de Base

### Variables

```python
# Simple
name: str = "John"
age: int = 30
price: float = 19.99
is_active: bool = True

# Sans valeur initiale
name: str  # Déclaration seulement
```

### Fonctions

```python
def greet(name: str) -> str:
    return f"Hello, {name}"

def process(data: list[int]) -> None:  # Pas de return
    for item in data:
        print(item)

def maybe_find(items: list[str], target: str) -> str | None:
    for item in items:
        if item == target:
            return item
    return None
```

---

## Types Complexes

### Collections

```python
from typing import Dict, List, Set, Tuple

# Python 3.9+: types natifs en minuscule
names: list[str] = ["Alice", "Bob"]
ages: dict[str, int] = {"Alice": 25, "Bob": 30}
unique: set[int] = {1, 2, 3}
coords: tuple[float, float] = (1.0, 2.0)

# Tuple de longueur variable
numbers: tuple[int, ...] = (1, 2, 3, 4, 5)

# Dict avec plusieurs types de valeurs
config: dict[str, str | int | bool] = {
    "name": "app",
    "port": 8080,
    "debug": True
}
```

### Union et Optional

```python
from typing import Optional, Union

# Union: plusieurs types possibles
value: str | int = "hello"  # Python 3.10+
value: Union[str, int] = "hello"  # Python 3.9

# Optional: peut être None
name: str | None = None  # Python 3.10+
name: Optional[str] = None  # Équivalent
```

### Callable (fonctions comme type)

```python
from typing import Callable

# Fonction qui prend (int, int) et retourne int
def apply_operation(
    a: int,
    b: int,
    operation: Callable[[int, int], int]
) -> int:
    return operation(a, b)

# Usage
add: Callable[[int, int], int] = lambda x, y: x + y
result = apply_operation(5, 3, add)
```

### Any

```python
from typing import Any

def process_anything(data: Any) -> Any:
    # Aucune vérification de type
    return data
```

---

## Generics (comme TypeScript)

### Classes génériques

```python
from typing import TypeVar, Generic

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

# Usage
int_stack: Stack[int] = Stack()
int_stack.push(1)
int_stack.push(2)

str_stack: Stack[str] = Stack()
str_stack.push("hello")
```

### Fonctions génériques

```python
from typing import TypeVar

T = TypeVar('T')

def first(items: list[T]) -> T | None:
    return items[0] if items else None

# Le type est inféré
result = first([1, 2, 3])  # int | None
result = first(["a", "b"])  # str | None
```

---

## TypedDict (comme interfaces TS)

```python
from typing import TypedDict, Required, NotRequired

# Équivalent de interface en TypeScript
class User(TypedDict):
    id: int
    name: str
    email: str
    age: NotRequired[int]  # Optionnel

# Usage
user: User = {
    "id": 1,
    "name": "John",
    "email": "john@example.com"
}

# Avec total=False: tous les champs optionnels
class PartialUser(TypedDict, total=False):
    id: int
    name: str
```

---

## Literal (valeurs exactes)

```python
from typing import Literal

# Seulement ces valeurs sont acceptées
Status = Literal["pending", "approved", "rejected"]

def update_status(status: Status) -> None:
    print(f"Status updated to {status}")

update_status("pending")  # OK
update_status("invalid")  # Erreur mypy
```

---

## Protocol (Duck Typing structurel)

```python
from typing import Protocol

# Comme une interface, mais basée sur la structure
class Drawable(Protocol):
    def draw(self) -> None: ...

class Circle:
    def draw(self) -> None:
        print("Drawing circle")

class Square:
    def draw(self) -> None:
        print("Drawing square")

def render(shape: Drawable) -> None:
    shape.draw()

# Circle et Square implémentent Drawable implicitement
render(Circle())  # OK
render(Square())  # OK
```

---

## Dataclasses avec Types

```python
from dataclasses import dataclass, field
from typing import Optional

@dataclass
class User:
    id: int
    name: str
    email: str
    age: Optional[int] = None
    tags: list[str] = field(default_factory=list)

# Automatiquement typé
user = User(id=1, name="John", email="john@example.com")
user.name  # str
user.age   # Optional[int]
```

---

## Pydantic (Validation runtime)

Si tu veux une validation de types à runtime (comme Zod en TS):

```python
from pydantic import BaseModel, Field, validator

class User(BaseModel):
    id: int
    name: str = Field(..., min_length=1, max_length=100)
    email: str
    age: int | None = Field(None, ge=0, le=150)

# Validation automatique
user = User(id=1, name="John", email="john@example.com", age=25)

# Erreur si invalide
try:
    user = User(id="not_an_int", name="", email="invalid")
except ValidationError as e:
    print(e)

# Parse depuis dict/JSON
user = User.model_validate({"id": 1, "name": "John", "email": "j@e.com"})
user = User.model_validate_json('{"id": 1, "name": "John", "email": "j@e.com"}')
```

---

## Vérification des Types

### mypy

```bash
# Installation
pip install mypy

# Vérifier un fichier
mypy script.py

# Vérifier un projet
mypy src/

# Configuration dans pyproject.toml
```

```toml
# pyproject.toml
[tool.mypy]
python_version = "3.11"
strict = true
warn_return_any = true
warn_unused_ignores = true
```

### pyright (plus rapide)

```bash
pip install pyright
pyright script.py
```

---

## Bonnes Pratiques

### 1. Typer les fonctions publiques

```python
# Public: typé
def process_data(data: list[dict[str, Any]]) -> pd.DataFrame:
    ...

# Interne: optionnel
def _helper(x):
    ...
```

### 2. Utiliser les type aliases

```python
# Type alias pour lisibilité
UserId = int
UserDict = dict[str, str | int]
Callback = Callable[[int], None]

def get_user(user_id: UserId) -> UserDict:
    ...
```

### 3. Annoter les variables ambiguës

```python
# Ambigu
data = []  # list[Any]

# Clair
data: list[User] = []
```

---

## Exercice Pratique

Ajoute des type hints à ce code:

```python
def load_config(path):
    import yaml
    with open(path) as f:
        return yaml.safe_load(f)

def process_users(users, min_age=18):
    return [u for u in users if u.get('age', 0) >= min_age]

class DataProcessor:
    def __init__(self, config):
        self.config = config
        self.results = []

    def process(self, data):
        for item in data:
            result = self._transform(item)
            self.results.append(result)
        return self.results

    def _transform(self, item):
        return item * 2
```

<details>
<summary>Solution</summary>

```python
from typing import Any, TypedDict

class Config(TypedDict):
    name: str
    settings: dict[str, Any]

class User(TypedDict, total=False):
    name: str
    age: int
    email: str

def load_config(path: str) -> Config:
    import yaml
    with open(path) as f:
        return yaml.safe_load(f)

def process_users(
    users: list[User],
    min_age: int = 18
) -> list[User]:
    return [u for u in users if u.get('age', 0) >= min_age]

class DataProcessor:
    def __init__(self, config: Config) -> None:
        self.config: Config = config
        self.results: list[int] = []

    def process(self, data: list[int]) -> list[int]:
        for item in data:
            result = self._transform(item)
            self.results.append(result)
        return self.results

    def _transform(self, item: int) -> int:
        return item * 2
```
</details>

---

*Prochaine étape: `05-async-python.md`*
