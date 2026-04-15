# Python pour Developpeurs TypeScript

> Transition rapide de TypeScript a Python -- les equivalences directes

---

## Philosophie

The philosophical differences between TypeScript and Python set the tone for everything that follows. TypeScript demands explicit types everywhere, requires compilation, uses `npm` or `bun` for packages, stores dependencies in `node_modules`, treats semicolons as optional, and uses curly braces for blocks. Python takes the opposite approach: types are optional (duck typing prevails), code is interpreted directly, packages are managed via `pip`, `poetry`, or `conda`, dependencies live in `venv`/`site-packages`, semicolons do not exist, and indentation (spaces) defines code blocks.

---

## Syntaxe de Base

### Variables

```typescript
// TypeScript
const name: string = "John";
let age: number = 30;
const isActive: boolean = true;
```

```python
# Python
name: str = "John"      # Type hint optionnel
age: int = 30
is_active: bool = True  # snake_case, pas camelCase!

# Sans type hints (plus commun en Python)
name = "John"
age = 30
is_active = True
```

### Fonctions

```typescript
// TypeScript
function greet(name: string, age?: number): string {
  return `Hello ${name}, you are ${age ?? 'unknown'} years old`;
}

const greetArrow = (name: string): string => `Hello ${name}`;
```

```python
# Python
def greet(name: str, age: int = None) -> str:
    return f"Hello {name}, you are {age or 'unknown'} years old"

# Lambda (pour les fonctions simples uniquement)
greet_lambda = lambda name: f"Hello {name}"
```

### Conditions

```typescript
// TypeScript
if (condition) {
  // code
} else if (other) {
  // code
} else {
  // code
}

const result = condition ? "yes" : "no";
```

```python
# Python
if condition:
    # code (INDENTATION obligatoire!)
elif other:
    # code
else:
    # code

result = "yes" if condition else "no"
```

### Boucles

```typescript
// TypeScript
for (let i = 0; i < 10; i++) { }
for (const item of items) { }
items.forEach(item => { });
```

```python
# Python
for i in range(10):
    pass

for item in items:
    pass

# List comprehension (tres Python!)
[process(item) for item in items]
```

---

## Structures de Donnees

### Arrays / Lists

```typescript
// TypeScript
const arr: number[] = [1, 2, 3];
arr.push(4);
arr.map(x => x * 2);
arr.filter(x => x > 2);
const [first, ...rest] = arr;
```

```python
# Python
arr: list[int] = [1, 2, 3]
arr.append(4)
[x * 2 for x in arr]           # List comprehension
[x for x in arr if x > 2]      # Filter avec comprehension
first, *rest = arr             # Unpacking
```

### Objects / Dictionaries

```typescript
// TypeScript
const obj: { name: string; age: number } = {
  name: "John",
  age: 30
};
obj.name;
obj["age"];
const { name, age } = obj;
```

```python
# Python
obj: dict[str, any] = {
    "name": "John",
    "age": 30
}
obj["name"]        # Acces par cle uniquement
obj.get("name")    # Avec default si absent
name, age = obj["name"], obj["age"]

# Pour acces par attribut, utiliser une classe ou dataclass
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int

person = Person(name="John", age=30)
person.name  # Acces par attribut
```

### Sets

```typescript
// TypeScript
const set = new Set([1, 2, 3]);
set.add(4);
set.has(2);
```

```python
# Python
s = {1, 2, 3}      # Notation directe!
s.add(4)
2 in s            # Operateur 'in'
```

### Tuples

```typescript
// TypeScript
const tuple: [string, number] = ["hello", 42];
```

```python
# Python
t: tuple[str, int] = ("hello", 42)
# Les tuples sont immutables en Python
```

---

## Classes

```typescript
// TypeScript
class Animal {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): string {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak(): string {
    return `${this.name} barks`;
  }
}
```

```python
# Python
class Animal:
    def __init__(self, name: str):
        self._name = name  # Convention: _ = private

    def speak(self) -> str:
        return f"{self._name} makes a sound"

class Dog(Animal):
    def speak(self) -> str:
        return f"{self._name} barks"
```

### Dataclasses (recommended for data objects)

```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    id: int
    name: str
    email: str
    age: Optional[int] = None

# Automatiquement: __init__, __repr__, __eq__
user = User(id=1, name="John", email="john@example.com")
```

---

## Async/Await

```typescript
// TypeScript
async function fetchData(url: string): Promise<Data> {
  const response = await fetch(url);
  return response.json();
}

// Promise.all
const results = await Promise.all([fetch(url1), fetch(url2)]);
```

```python
# Python
import asyncio
import aiohttp

async def fetch_data(url: str) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

# asyncio.gather = Promise.all
results = await asyncio.gather(fetch_data(url1), fetch_data(url2))

# Executer une fonction async
asyncio.run(fetch_data("https://api.example.com"))
```

---

## Imports

```typescript
// TypeScript
import { something } from './module';
import * as utils from './utils';
import defaultExport from './default';
```

```python
# Python
from module import something
import utils
from module import default_export  # Pas de "default" en Python

# Import relatif
from . import sibling_module
from ..parent import something
```

---

## Error Handling

```typescript
// TypeScript
try {
  throw new Error("Something went wrong");
} catch (error) {
  console.error(error);
} finally {
  cleanup();
}
```

```python
# Python
try:
    raise ValueError("Something went wrong")
except ValueError as error:
    print(error)
except Exception as e:  # Catch-all
    print(f"Unexpected: {e}")
finally:
    cleanup()
```

---

## Null/None Handling

```typescript
// TypeScript
const value = maybeNull ?? "default";
const length = maybeNull?.length;
if (value !== null && value !== undefined) { }
```

```python
# Python
value = maybe_none or "default"      # Attention: 0 et "" sont aussi falsy!
value = maybe_none if maybe_none is not None else "default"  # Plus precis

# Pas d'optional chaining natif, mais:
length = maybe_none.length if maybe_none else None

# getattr pour acces securise
length = getattr(maybe_none, 'length', None)

if value is not None:
    pass
```

---

## String Operations

```typescript
// TypeScript
const str = `Hello ${name}`;
str.includes("llo");
str.split(" ");
str.replace("old", "new");
```

```python
# Python
s = f"Hello {name}"       # f-strings!
"llo" in s                # Operateur 'in'
s.split(" ")
s.replace("old", "new")

# Multi-line strings
long_string = """
This is a
multi-line string
"""
```

---

## Conventions de Nommage

| TypeScript | Python |
|------------|--------|
| `camelCase` | `snake_case` |
| `PascalCase` (classes) | `PascalCase` (classes) |
| `UPPER_CASE` (const) | `UPPER_CASE` (const) |
| `_private` | `_private` |
| `#private` (ES2022) | `__private` (name mangling) |

---

## Exercice Pratique

Translate this TypeScript code into Python:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

async function getUsers(apiUrl: string): Promise<User[]> {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data: User[] = await response.json();
  return data.filter(user => user.name.length > 3);
}

const users = await getUsers("https://api.example.com/users");
console.log(users.map(u => u.name));
```

<details>
<summary>Solution</summary>

```python
from dataclasses import dataclass
import aiohttp
import asyncio

@dataclass
class User:
    id: int
    name: str
    email: str

async def get_users(api_url: str) -> list[User]:
    async with aiohttp.ClientSession() as session:
        async with session.get(api_url) as response:
            if not response.ok:
                raise Exception(f"HTTP error: {response.status}")
            data = await response.json()
            users = [User(**u) for u in data]
            return [user for user in users if len(user.name) > 3]

async def main():
    users = await get_users("https://api.example.com/users")
    print([u.name for u in users])

asyncio.run(main())
```
</details>

---

*Prochaine etape: `02-virtual-environments.md`*
