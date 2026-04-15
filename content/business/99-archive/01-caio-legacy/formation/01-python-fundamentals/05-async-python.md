# Async Python

> De Promise/async-await en TypeScript à asyncio en Python

---

## Différences Clés

| TypeScript | Python |
|------------|--------|
| `Promise<T>` | `Coroutine` / `Awaitable[T]` |
| `Promise.all()` | `asyncio.gather()` |
| `Promise.race()` | `asyncio.wait(..., return_when=FIRST_COMPLETED)` |
| Event loop implicite | Event loop explicite |
| Top-level await | `asyncio.run()` nécessaire |

---

## Syntaxe de Base

### TypeScript vs Python

```typescript
// TypeScript
async function fetchData(url: string): Promise<Data> {
  const response = await fetch(url);
  return response.json();
}

// Appel direct (top-level await)
const data = await fetchData("https://api.example.com");
```

```python
# Python
import aiohttp
import asyncio

async def fetch_data(url: str) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

# OBLIGATOIRE: wrapper pour exécuter
async def main():
    data = await fetch_data("https://api.example.com")
    print(data)

# Point d'entrée
asyncio.run(main())
```

---

## Concepts Fondamentaux

### Coroutine

```python
# Une fonction async retourne une coroutine, pas une valeur
async def say_hello() -> str:
    return "Hello"

# Ceci ne l'exécute PAS
coro = say_hello()  # <coroutine object say_hello at 0x...>

# Il faut await ou asyncio.run
result = asyncio.run(say_hello())  # "Hello"
```

### Event Loop

```python
import asyncio

# Créer et gérer manuellement (rare)
loop = asyncio.get_event_loop()
result = loop.run_until_complete(some_coroutine())
loop.close()

# Méthode moderne (recommandée)
asyncio.run(main())  # Crée un loop, exécute, ferme
```

---

## Patterns Communs

### Exécution Parallèle

```typescript
// TypeScript
const [user, posts, comments] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchComments(id)
]);
```

```python
# Python
user, posts, comments = await asyncio.gather(
    fetch_user(id),
    fetch_posts(id),
    fetch_comments(id)
)
```

### Premier Résultat (Race)

```typescript
// TypeScript
const fastest = await Promise.race([fetch1(), fetch2()]);
```

```python
# Python
done, pending = await asyncio.wait(
    [fetch1(), fetch2()],
    return_when=asyncio.FIRST_COMPLETED
)
fastest = done.pop().result()

# Annuler les autres
for task in pending:
    task.cancel()
```

### Timeout

```typescript
// TypeScript (avec Promise.race)
const result = await Promise.race([
  fetchData(),
  new Promise((_, reject) => setTimeout(() => reject('Timeout'), 5000))
]);
```

```python
# Python
try:
    result = await asyncio.wait_for(fetch_data(), timeout=5.0)
except asyncio.TimeoutError:
    print("Timeout!")
```

---

## HTTP Requests Async

### aiohttp (équivalent de fetch)

```python
import aiohttp
import asyncio

async def fetch_json(url: str) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            response.raise_for_status()
            return await response.json()

async def post_data(url: str, data: dict) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data) as response:
            return await response.json()

# Plusieurs requêtes en parallèle
async def fetch_all(urls: list[str]) -> list[dict]:
    async with aiohttp.ClientSession() as session:
        tasks = [
            session.get(url)
            for url in urls
        ]
        responses = await asyncio.gather(*tasks)
        return [await r.json() for r in responses]
```

### httpx (plus moderne, sync + async)

```python
import httpx

# Async
async def fetch_data():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.example.com")
        return response.json()

# Sync (pratique pour debug)
def fetch_data_sync():
    response = httpx.get("https://api.example.com")
    return response.json()
```

---

## Async Context Managers

```python
# Équivalent de try-finally automatique
class AsyncDatabase:
    async def __aenter__(self):
        await self.connect()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.disconnect()

    async def connect(self):
        print("Connected")

    async def disconnect(self):
        print("Disconnected")

# Usage
async def main():
    async with AsyncDatabase() as db:
        # Utiliser db...
        pass
    # Automatiquement déconnecté
```

---

## Async Generators

```python
async def fetch_pages(base_url: str, max_pages: int):
    """Génère des pages une par une"""
    async with aiohttp.ClientSession() as session:
        for page in range(1, max_pages + 1):
            url = f"{base_url}?page={page}"
            async with session.get(url) as response:
                data = await response.json()
                yield data
                if not data.get('has_next'):
                    break

# Usage avec async for
async def main():
    async for page_data in fetch_pages("https://api.example.com/items", 10):
        process(page_data)
```

---

## Tasks et Concurrence

### Créer des Tasks

```python
async def main():
    # Créer une task (s'exécute en background)
    task1 = asyncio.create_task(long_operation_1())
    task2 = asyncio.create_task(long_operation_2())

    # Faire autre chose pendant ce temps...
    print("Tasks started")

    # Attendre les résultats
    result1 = await task1
    result2 = await task2
```

### TaskGroup (Python 3.11+)

```python
async def main():
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(operation1())
        task2 = tg.create_task(operation2())
        task3 = tg.create_task(operation3())

    # Toutes les tasks sont complétées ici
    # Si une échoue, toutes sont annulées
```

---

## Semaphore (Limiter la Concurrence)

```python
import asyncio
import aiohttp

# Limiter à 10 requêtes simultanées
semaphore = asyncio.Semaphore(10)

async def fetch_with_limit(session: aiohttp.ClientSession, url: str) -> dict:
    async with semaphore:  # Attend si 10 requêtes en cours
        async with session.get(url) as response:
            return await response.json()

async def fetch_all(urls: list[str]) -> list[dict]:
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_with_limit(session, url) for url in urls]
        return await asyncio.gather(*tasks)
```

---

## Queues Async

```python
import asyncio

async def producer(queue: asyncio.Queue):
    for i in range(10):
        await queue.put(f"item-{i}")
        print(f"Produced item-{i}")
        await asyncio.sleep(0.1)

    # Signal de fin
    await queue.put(None)

async def consumer(queue: asyncio.Queue):
    while True:
        item = await queue.get()
        if item is None:
            break
        print(f"Consumed {item}")
        queue.task_done()

async def main():
    queue = asyncio.Queue()

    await asyncio.gather(
        producer(queue),
        consumer(queue)
    )
```

---

## Mixing Sync et Async

### Appeler du sync depuis async

```python
import asyncio
from concurrent.futures import ThreadPoolExecutor

def blocking_io_operation(path: str) -> str:
    with open(path, 'r') as f:
        return f.read()

async def main():
    loop = asyncio.get_event_loop()

    # Exécuter dans un thread pool
    with ThreadPoolExecutor() as pool:
        result = await loop.run_in_executor(
            pool,
            blocking_io_operation,
            "/path/to/file"
        )
```

### Appeler du async depuis sync (rare)

```python
import asyncio

async def async_operation():
    await asyncio.sleep(1)
    return "done"

def sync_function():
    # Créer un nouveau event loop
    result = asyncio.run(async_operation())
    return result
```

---

## Exercice Pratique

Convertis ce code TypeScript en Python async:

```typescript
async function fetchUserWithPosts(userId: number) {
  const [user, posts] = await Promise.all([
    fetch(`/api/users/${userId}`).then(r => r.json()),
    fetch(`/api/users/${userId}/posts`).then(r => r.json())
  ]);

  return { ...user, posts };
}

async function fetchMultipleUsers(userIds: number[]) {
  const users = await Promise.all(
    userIds.map(id => fetchUserWithPosts(id))
  );
  return users;
}

// Rate limit: max 5 concurrent requests
async function fetchWithRateLimit(urls: string[]) {
  const results = [];
  for (let i = 0; i < urls.length; i += 5) {
    const batch = urls.slice(i, i + 5);
    const batchResults = await Promise.all(
      batch.map(url => fetch(url).then(r => r.json()))
    );
    results.push(...batchResults);
  }
  return results;
}
```

<details>
<summary>Solution</summary>

```python
import asyncio
import aiohttp
from typing import Any

async def fetch_json(session: aiohttp.ClientSession, url: str) -> dict:
    async with session.get(url) as response:
        return await response.json()

async def fetch_user_with_posts(
    session: aiohttp.ClientSession,
    user_id: int
) -> dict:
    user, posts = await asyncio.gather(
        fetch_json(session, f"/api/users/{user_id}"),
        fetch_json(session, f"/api/users/{user_id}/posts")
    )
    return {**user, "posts": posts}

async def fetch_multiple_users(user_ids: list[int]) -> list[dict]:
    async with aiohttp.ClientSession() as session:
        tasks = [
            fetch_user_with_posts(session, user_id)
            for user_id in user_ids
        ]
        return await asyncio.gather(*tasks)

# Rate limit avec semaphore (plus élégant)
async def fetch_with_rate_limit(urls: list[str]) -> list[dict]:
    semaphore = asyncio.Semaphore(5)

    async def fetch_limited(session: aiohttp.ClientSession, url: str) -> dict:
        async with semaphore:
            return await fetch_json(session, url)

    async with aiohttp.ClientSession() as session:
        tasks = [fetch_limited(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Ou avec batching comme en TS
async def fetch_with_batching(urls: list[str]) -> list[dict]:
    results = []
    async with aiohttp.ClientSession() as session:
        for i in range(0, len(urls), 5):
            batch = urls[i:i + 5]
            batch_results = await asyncio.gather(
                *[fetch_json(session, url) for url in batch]
            )
            results.extend(batch_results)
    return results

# Main
async def main():
    users = await fetch_multiple_users([1, 2, 3])
    print(users)

asyncio.run(main())
```
</details>

---

*Phase 1 complète! Prochaine phase: `docs/02-ml-basics/`*
