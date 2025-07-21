# ⚡️ RN AI Optimize

> Optimize the performance of your React Native screens with AI-powered suggestions.

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://npmjs.com/package/rn-ai-optimize)
[![Node](https://img.shields.io/badge/node-18%2B-green.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](LICENSE)

---

## ✨ What is it?

`rn-ai-optimize` is a CLI tool that analyzes `.tsx` screen files in React Native projects and suggests performance improvements using AI (e.g., GPT-4).

---

## 📦 Installation

With npm:

```bash
npm install -g rn-ai-optimize
```

Or with yarn:

```bash
yarn global add rn-ai-optimize
```

---

## 🚀 How to use

First, set your OpenAI API key:

```bash
export OPENAI_API_KEY=your_api_key_here
```

### Basic command

```bash
rn-ai-optimize src/screens/Home.tsx
```

### With options

```bash
rn-ai-optimize src/screens/Home.tsx \
  --model gpt-4 \
  --apiKey your_api_key \
  --format markdown \
  --output suggestions.md \
  --en \
  --projectType react-native \
  --version 0.74.4
```

---

## ⚙️ CLI Options

| Flag            | Description                                              |
| --------------- | -------------------------------------------------------- |
| `<file>`        | Path to the `.tsx` file to be analyzed                   |
| `--model`       | OpenAI model to use (`gpt-4`, `gpt-3.5-turbo`, etc.)     |
| `--apiKey`      | OpenAI API key (overrides `OPENAI_API_KEY` env variable) |
| `--pt` / `--en` | Language: Portuguese (`--pt`) or English (`--en`)        |
| `--no-report`   | Skip HTML/Markdown report generation                     |
| `--projectType` | Type of project: `react-native`, `expo`, etc.            |
| `--versionApp`  | Project version (e.g., `0.74.4`)                         |

---

## ✅ Features

- 📊 AI-powered performance analysis
- 🧠 Suggestions like `React.memo`, `FlatList`, caching, etc.
- 🌐 Multilingual support (EN/PT)
- 📁 Support for React Native and Expo projects
- 💡 Markdown and HTML export

---

## 📌 Requirements

- Node.js **18 or higher**
- OpenAI API key

---

## 🤝 Contributing

Contributions are welcome! Open an [issue](https://github.com/your-user/rn-ai-optimize/issues) or submit a PR 🚀

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
