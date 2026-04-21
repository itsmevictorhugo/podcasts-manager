<div align="center">

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/tsup-building-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />

# 🎙 Podcasts Manager

**A Netflix-inspired podcast manager built with pure Node.js and TypeScript - no frameworks - exposing a REST Web API to list and filter video podcast episodes by category.**

</div>

---

## 📌 About

This project centralizes podcast video episodes in a single place, organized by category - much like Netflix does with its content. Users can retrieve all episodes or filter them by podcast name, with each entry carrying everything needed for frontend consumption: podcast name, episode title, video ID, and categories. The `videoId` alone is enough to derive both the YouTube URL and the thumbnail on the frontend, keeping the API response lean.

The main focus is on **N-Layer Architecture and TypeScript structure**: typed interfaces, enums to control floating texts and magic numbers, and a clear separation of responsibilities across layers - all built without any external frameworks, using only Node.js native modules. Endpoints were tested and validated with **Postman**.

---

## 🏗 Architecture

The project follows an N-Layer structure orchestrated by a single entry point:

```
src/
├── app.ts                          # App setup - wires the HTTP server with the router
├── server.ts                       # Entry point - reads .env port and starts the server
├── controllers/
│   └── podcasts-controller.ts      # Request/response logic - calls services and returns JSON
├── models/
│   ├── podcast-model.ts            # Interface for the raw podcast episode data shape
│   └── podcast-transfer-model.ts   # Interface for the data shape transferred to the client
├── repositories/
│   ├── podcasts-repository.ts      # Data access layer - reads and maps episodes from JSON
│   └── podcasts.json               # Local data source - registered podcast episodes
├── routes/
│   └── routes.ts                   # Route definitions - maps paths and methods to controllers
├── services/
│   ├── filter-episodes-service.ts  # Business logic - filters episodes by podcast name
│   └── list-episodes-service.ts    # Business logic - returns the full episodes list
└── utils/
    ├── content-type.ts             # Enum for HTTP Content-Type header values
    ├── http-methods.ts             # Enum for HTTP method names (GET, POST…)
    └── status-code.ts              # Enum for HTTP status codes (200, 204, 404…)
```

| File                          | Responsibility                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| `server.ts`                   | Starts the HTTP server, reads port from `.env`, delegates requests to the app           |
| `app.ts`                      | Wires up the server instance with the router                                            |
| `routes.ts`                   | Matches URL paths and HTTP methods to their respective controllers                      |
| `podcasts-controller.ts`      | Handles request/response - reads query params, calls services, sends JSON back          |
| `list-episodes-service.ts`    | Returns all registered episodes according to the promised interface with podcast info   |
| `filter-episodes-service.ts`  | Filters the episodes list by podcast name - returns `204 No Content` if none found      |
| `podcasts-repository.ts`      | Imports `podcasts.json` as a module and maps data into typed models - no `fs` or `path` needed |
| `podcasts.json`               | Local data source - all registered podcast episodes                                     |
| `podcast-model.ts`            | TypeScript interface for the raw episode data shape                                     |
| `podcast-transfer-model.ts`   | TypeScript interface for the data shape returned to the client                          |
| `content-type.ts`             | Enum for HTTP Content-Type header values                                                |
| `http-methods.ts`             | Enum for HTTP method names, avoiding hardcoded strings                                  |
| `status-code.ts`              | Enum for HTTP status codes - including `204 No Content` for empty filter results        |

---

## ✨ Features

- 📂 List all podcast episodes organized by category (`desenvolvimento`, `tecnologia`, `AI`, `bem-estar`, `saúde`)
- 🔍 Filter episodes by podcast name via query string (`/api/podcasts?p=flow`)
- 🎬 Each episode includes podcast name, episode title, video ID, and categories - the `videoId` is enough to build both the YouTube URL and thumbnail on the frontend
- 🚫 Returns `204 No Content` when a searched podcast name has no matching episodes - no empty objects, no misleading `200`
- 🔒 Fully typed with TypeScript interfaces and enums throughout the entire stack
- 🧩 Enums split by concern (`content-type`, `http-methods`, `status-code`) to eliminate magic numbers and floating strings

---

## 🌐 Endpoints

### `GET /api/list`
Returns all registered podcast episodes.

**Example response:**
```json
[
  {
    "podcastName": "flow",
    "episode": "FABIO AKITA - Flow #588",
    "videoId": "4c7pbOxYn_A",
    "categories": ["tecnologia", "AI"]
  },
  {
    "podcastName": "inteligencialtda",
    "episode": "SUPERINTELIGÊNCIA ARTIFICIAL - AKITA, ROBERTA E CAVALLINI - Inteligência Ltda.Podcast #1583",
    "videoId": "_Hl9wiLkns4",
    "categories": ["tecnologia", "AI"]
  },
  {
    "podcastName": "jotajotapodcast",
    "episode": "Como a Fé e a Consistência MUDAM Vidas (PODEROSÍSSIMO NINJA) | JOTA JOTA PODCAST #212",
    "videoId": "tB--iIKTU8c",
    "categories": ["desenvolvimento", "bem-estar", "saúde"]
  }
]
```

### `GET /api/podcasts?p={podcastName}`
Returns all episodes from a specific podcast filtered by name.

**Example request:**
```
GET /api/podcasts?p=flow
```

> If no episodes are found for the given name, the API returns `204 No Content` - no empty array, no misleading success response.

---

## ⚙️ Environment Setup

The server port is defined via environment variable. Create a `.env` file at the root of the project:

```env
PORT=3333
```

> The `.env` file is listed in `.gitignore` and must be created manually before running the project.

---

## 🛠 Technologies

| Package          | Role                                                              |
| ---------------- | ----------------------------------------------------------------- |
| `typescript`     | Typed superset of JavaScript - interfaces, enums, and type safety |
| `tsx`            | TypeScript executor - runs `.ts` files directly with `--env-file` support |
| `tsup`           | Bundler - compiles TypeScript into production-ready JavaScript    |
| `@types/node`    | Type definitions for Node.js built-in modules                     |

> No web frameworks were used. All HTTP handling is done through Node.js native `http` module.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/itsmevictorhugo/podcasts-manager.git

# Navigate to the project
cd podcasts-manager

# Install dependencies
npm install
```

### Scripts

| Script          | Command                                          | Description                                      |
| --------------- | ------------------------------------------------ | ------------------------------------------------ |
| `start:dev`     | `tsx --env-file=.env src/server.ts`              | Runs the server in development mode              |
| `start:watch`   | `tsx watch --env-file=.env src/server.ts`        | Runs with auto-reload on file changes            |
| `dist`          | `tsup src`                                       | Compiles the project into the `dist/` folder     |
| `start:dist`    | `npm run dist && node --env-file=.env dist/server.js` | Builds and runs the compiled production bundle   |

```bash
# Development
npm run start:dev

# Development with watch mode
npm run start:watch

# Production build
npm run dist
npm run start:dist
```

### Access the API

```
http://localhost:3333/api/list
http://localhost:3333/api/podcasts?p=flow
```

---

## 🧠 Concepts Demonstrated

- **N-Layer Architecture** - clear separation between server, routing, controllers, services, repositories, models, and utils
- **REST Web API** - structured routes and JSON responses built without any web framework
- **TypeScript** - typed interfaces (`podcast-model`, `podcast-transfer-model`) and enums across all layers
- **Native Node.js HTTP** - raw `http` module handles all server logic, routing, and responses
- **Enums by concern** - `content-type`, `http-methods`, and `status-code` split into dedicated files, eliminating magic numbers and floating strings
- **Error handling** - `204 No Content` returned when a podcast filter yields no results, avoiding empty objects with misleading `200` status
- **Query string filtering** - URL parameters parsed manually to filter episodes by podcast name
- **Environment variables** - server port configured via `.env` for flexibility across environments
- **Postman** - endpoints tested and validated throughout development

---
## 🐛 Bug Fixes
### 1. **`start:dist` - Missing node keyword and wrong output path**

**Problem**: Running npm run start:dist completed the build successfully but threw the following error: 

`'--env-file' is not recognized as an internal or external command, operable program or batch file.`

**Root cause**: The script was missing the node keyword before the flag, and the output path was pointing to node/server.js instead of the correct dist/ folder generated by tsup.
```json
// ❌ Before
"start:dist": "npm run dist && --env-file=.env node/server.js"

// ✅ After
"start:dist": "npm run dist && node --env-file=.env dist/server.js"
```

### 2. **Runtime ENOENT - JSON data source path resolution**

**Problem**: The API worked perfectly in development (`tsx`) but crashed after being compiled to JavaScript with the error: 

`Error: ENOENT: no such file or directory, open './repositories/podcasts.json'.`

**Root cause**: Using fs.readFileSync with relative paths depends on the current working directory (CWD) of the terminal. When the project was bundled into the dist/ folder, the relative path no longer matched the physical file location.

**Solution**: Enabled resolveJsonModule in tsconfig.json and replaced fs with a direct import. This allows the bundler to include the JSON data as a typed module, eliminating pathing issues entirely.

```ts
// ❌ Before
const rawData = fs.readFileSync("./repositories/podcasts.json", "utf-8");

// ✅ After
import podcastData from "../repositories/podcasts.json";
```

---

## 👨‍💻 Author

**Victor Hugo**  
Frontend Engineer · [GitHub](https://github.com/itsmevictorhugo) · [LinkedIn](https://linkedin.com/in/itsmevictorhugo)
