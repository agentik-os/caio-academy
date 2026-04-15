# MCP (Model Context Protocol) - Deep Dive

Tu utilises déjà MCP quotidiennement - maintenant comprends-le en profondeur

## Qu'est-ce que MCP?

MCP (Model Context Protocol) est un protocole standardisé pour connecter des LLMs à des outils et contextes externes. Il agit comme une couche d'abstraction entre le LLM et les systèmes externes.

L'architecture se compose de trois niveaux. Au sommet, le LLM (comme Claude) génère du texte et prend des décisions. Au milieu, la couche MCP gère les connexions et les communications. En bas, les différents outils fournissent des capacités spécifiques : un outil navigateur pour interagir avec des pages web, un outil base de données pour requêter des données, et des outils API pour accéder à des services externes.

## Architecture MCP

### Composants

L'architecture MCP se compose de trois éléments principaux.

**1. Host (Client)**

Le Host est l'application qui utilise le LLM, par exemple Claude Code. Il est responsable de gérer les connexions aux serveurs MCP et de coordonner les interactions entre le LLM et les outils.

**2. Server (MCP Server)**

Un serveur MCP fournit des tools (actions), resources (données), et prompts (templates réutilisables). Des exemples incluent Playwright pour l'automatisation de navigateur, Chrome DevTools pour le debugging, Convex pour les bases de données, et Stripe pour les paiements.

**3. Protocol**

Le protocole utilise JSON-RPC 2.0 over stdio ou HTTP. Les messages sont standardisés pour assurer l'interopérabilité entre différentes implémentations.

### Message Types

Voici un exemple de communication MCP. Un appel de tool ressemble à ceci :

```typescript
// Tool Call
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "browser_navigate",
    "arguments": {
      "url": "https://example.com"
    }
  },
  "id": 1
}

// Tool Response
{
  "jsonrpc": "2.0",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Navigated to https://example.com"
      }
    ]
  },
  "id": 1
}
```

Le client envoie une requête avec un ID unique, le serveur traite l'action, puis retourne un résultat avec le même ID pour permettre la corrélation.

## Tools vs Resources vs Prompts

### Tools

Les tools sont des actions que le LLM peut exécuter. Par exemple, un tool de recherche de base de données :

```json
{
  "name": "search_database",
  "description": "Search the database for records",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {"type": "string"},
      "limit": {"type": "number", "default": 10}
    },
    "required": ["query"]
  }
}
```

Le schéma d'entrée définit précisément les paramètres attendus, permettant au LLM de construire des appels valides.

### Resources

Les resources sont des données que le LLM peut lire. Par exemple, un fichier de configuration :

```json
{
  "uri": "file:///config/settings.json",
  "name": "Application Settings",
  "mimeType": "application/json"
}
```

Les resources sont généralement en lecture seule et fournissent du contexte au LLM.

### Prompts

Les prompts sont des templates réutilisables. Par exemple, un prompt de revue de code :

```json
{
  "name": "code_review",
  "description": "Review code for issues",
  "arguments": [
    {"name": "code", "required": true},
    {"name": "language", "required": false}
  ]
}
```

Les prompts standardisent les interactions courantes et assurent la cohérence.

## Serveurs MCP que tu utilises déjà

Dans ton environnement, plusieurs serveurs MCP sont déjà configurés :

**mcp__playwright__*** fournit des outils pour l'automatisation de navigateur : browser_navigate, browser_snapshot, browser_click, et bien d'autres.

**mcp__chrome-devtools__*** offre des capacités de debugging avancées : navigate_page, take_screenshot, list_console_messages, et plus.

**mcp__convex__*** permet d'interagir avec les bases de données Convex : status, data, tables, run.

**mcp__stripe__*** gère les paiements : create_customer, list_products, etc.

**mcp__github__*** interagit avec GitHub : create_issue, list_pull_requests.

**mcp__firecrawl__*** pour le scraping web : firecrawl_scrape, firecrawl_search.

## Configuration MCP

### Dans .mcp.json (projet)

La configuration au niveau projet se fait via le fichier .mcp.json :

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-playwright"],
      "env": {}
    },
    "database": {
      "command": "python",
      "args": ["-m", "my_mcp_server"],
      "env": {
        "DATABASE_URL": "postgresql://..."
      }
    }
  }
}
```

Chaque serveur spécifie une commande d'exécution, des arguments, et des variables d'environnement.

### Dans settings.json (global)

La configuration globale dans settings.json s'applique à tous les projets :

```json
{
  "mcpServers": {
    "global-server": {
      "command": "...",
      "args": [...]
    }
  }
}
```

## Créer un MCP Server Simple

### Python (avec mcp package)

Voici un exemple de serveur MCP en Python :

```python
# my_mcp_server.py
from mcp.server import Server, NotificationOptions
from mcp.server.models import InitializationOptions
import mcp.server.stdio
import mcp.types as types

# Créer le serveur
server = Server("my-server")

# Définir un tool
@server.list_tools()
async def list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="search_knowledge_base",
            description="Search the company knowledge base",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Search query"}
                },
                "required": ["query"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[types.TextContent]:
    if name == "search_knowledge_base":
        query = arguments["query"]
        # Ta logique de recherche
        results = search_kb(query)
        return [types.TextContent(type="text", text=str(results))]

    raise ValueError(f"Unknown tool: {name}")

# Lancer
async def main():
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="my-server",
                server_version="1.0.0"
            )
        )

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```

Ce serveur expose un tool de recherche dans une base de connaissances. Le décorateur `@server.list_tools()` enregistre les tools disponibles, et `@server.call_tool()` gère leur exécution.

### Configurer dans Claude Code

Pour utiliser ce serveur, ajoutez-le à .mcp.json :

```json
// .mcp.json
{
  "mcpServers": {
    "knowledge-base": {
      "command": "python",
      "args": ["/path/to/my_mcp_server.py"],
      "env": {
        "KB_API_KEY": "..."
      }
    }
  }
}
```

## Use Case pour la Mission

### MCP pour le Chatbot Interne

Pour la mission, un serveur MCP connectera le LLM fine-tuné aux données internes de l'entreprise :

```python
# Serveur MCP qui connecte le LLM aux données internes

@server.list_tools()
async def list_tools():
    return [
        types.Tool(
            name="query_product_database",
            description="Get product information",
            inputSchema={...}
        ),
        types.Tool(
            name="check_order_status",
            description="Check status of an order",
            inputSchema={...}
        ),
        types.Tool(
            name="search_documentation",
            description="Search internal docs",
            inputSchema={...}
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "query_product_database":
        # Requête vers DB interne
        return await query_products(arguments)

    if name == "check_order_status":
        # API interne
        return await check_order(arguments)

    if name == "search_documentation":
        # Recherche vectorielle
        return await search_docs(arguments)
```

### Architecture Complète

L'architecture complète pour la mission ressemblerait à ceci :

Au sommet, l'interface utilisateur du chatbot permet aux employés d'interagir avec le système. Cette UI communique avec le LLM fine-tuné qui génère les réponses. Le LLM utilise la couche MCP pour accéder aux données. La couche MCP se connecte ensuite à quatre systèmes backend : la base de données produits pour les informations catalogue, l'API commandes pour vérifier les statuts, le système de recherche documentaire pour trouver des procédures internes, et les données de marché pour les informations concurrentielles.

Cette architecture permet au chatbot de combiner la compréhension du langage naturel du LLM avec l'accès en temps réel aux données business critiques.

## Bonnes Pratiques MCP

**1. Descriptions claires**

Le LLM doit comprendre précisément quand utiliser chaque tool. Des descriptions ambiguës conduisent à des appels inappropriés.

**2. Schémas stricts**

Valider rigoureusement les inputs évite les erreurs et améliore la fiabilité.

**3. Gestion d'erreurs**

Retourner des messages d'erreur clairs et actionnables aide le LLM à récupérer gracieusement.

**4. Logging**

Tracer tous les appels de tools facilite le debugging et l'audit.

**5. Rate limiting**

Protéger les APIs internes contre les appels excessifs, intentionnels ou accidentels.

## Résumé

MCP pour la mission permettra de : connecter le LLM fine-tuné aux données internes de l'entreprise, permettre des requêtes en temps réel (prix, stock, commandes), enrichir les réponses avec du contexte actualisé, et créer un chatbot qui peut non seulement répondre mais aussi agir sur les systèmes internes.

Cette architecture découple la logique du LLM (compréhension et génération) de l'accès aux données (via MCP), rendant le système plus maintenable et évolutif.

*Phase 7 complète! Prochaine phase: `docs/08-project-setup/`*
