# To Do App

This project was created using [Vite](https://vitejs.dev/) as the bundler and [Bun](https://bun.sh/) as the JavaScript runtime.

## Requirements

- [Node.js](https://nodejs.org/) (latest LTS version recommended)
- [Bun](https://bun.sh/) (you can install it with `curl -fsSL https://bun.sh/install | bash`)

## Installation

### 1. Clone this repository:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Install dependencies using Bun:

```bash
bun install
```

Alternatively, you can install dependencies with npm:

```bash
npm install
```

### 3. Environment Variables

Create a .env-cmdrc.json file in the root of the project and define your environment variables there. For example:

```json
{
  "dev-local": {
    "REACT_APP_API_URL": "http://localhost:8000"
  }
}
```

Make sure to restart the development server after adding or changing the environment variables.

### 4. Development

```bash
bun run dev:local
```

or

```bash
npm run dev:local
```