# 🚀 RN AI Optimize

[![npm version](https://badge.fury.io/js/rn-ai-optimize.svg)](https://badge.fury.io/js/rn-ai-optimize)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

> **Analyze and optimize your React Native code with AI, generating detailed performance reports.**

A CLI tool that uses artificial intelligence to analyze React Native components, identify performance issues, and suggest specific improvements with practical code examples.

## ✨ Features

- 🤖 **AI-Powered Analysis**: Powered by GPT-4 and GPT-3.5 Turbo
- 📱 **React Native Specific**: Optimizations focused on RN and Expo
- 📊 **Scoring System**: 1-10 performance evaluation
- 📝 **Detailed Reports**: Automatic Markdown report generation
- 🌍 **Multilingual**: Support for Portuguese and English
- 🔧 **Configurable**: Multiple OpenAI models and options
- ⚡ **Fast**: Instant file analysis
- 📁 **Multi-File Analysis**: Analyze multiple files at once with batch processing
- 🎯 **Interactive Mode**: User-friendly interactive interface for complex analysis
- 🔀 **Batch Processing**: Choose between sequential or parallel processing
- 📂 **Smart Organization**: Reports organized by parent folder structure

## 📦 Installation

### Global (Recommended)

```bash
npm install -g rn-ai-optimize
# or
yarn global add rn-ai-optimize
```

### Local to project

```bash
npm install --save-dev rn-ai-optimize
# or
yarn add -D rn-ai-optimize
```

## 🔧 Setup

### 1. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Set up billing if needed (GPT-4 requires payment)

### 2. Configure API Key

**Option A: Environment variable (Recommended)**

```bash
export OPENAI_API_KEY=your_api_key_here
```

**Option B: .env file in project**

```env
OPENAI_API_KEY=your_api_key_here
```

**Option C: Command parameter**

```bash
rn-ai-optimize file.tsx --apiKey your_api_key_here
```

## 🎯 Usage

### Single File Analysis

```bash
# Analyze a component
rn-ai-optimize src/components/ProductCard.tsx

# Analyze a screen
rn-ai-optimize src/screens/HomeScreen.tsx

# Use cheaper model
rn-ai-optimize src/components/Header.tsx --model gpt-3.5-turbo
```

### Multi-File Analysis (New in v0.1.3)

```bash
# Analyze multiple files directly
rn-ai-optimize src/screens/Home.tsx src/screens/Profile.tsx src/components/Button.tsx

# Interactive mode for complex analysis
rn-ai-optimize analyze

# Batch mode with parallel processing (faster)
rn-ai-optimize src/screens/*.tsx --batch
```

### Interactive Mode

The interactive mode provides a user-friendly interface for complex analysis scenarios:

```bash
rn-ai-optimize analyze
```

**Interactive Flow:**

```
🤖 rn-ai-optimize - Interactive Mode
========================================
✔ Use default settings? (gpt-4o, en, React Native) › Yes
✔ What type of file do you want to analyze? ›
  🖥️  Single Screen
  🧩 Component
❯ 📁 Multiple files
  🔧 Service
  🛠️  Utility
  📄 Specific file

✔ Enter directory to search for files: › src/screens/
✔ Process all files in parallel? › No

📋 Found 5 file(s) in src/screens/
🤖 Model: gpt-4o
🌍 Language: en
📱 Project: React Native v0.76.9
```

### Available Options

```bash
rn-ai-optimize [options] <files...>

Arguments:
  files                   Path(s) to React Native file(s) to analyze

Commands:
  analyze                 Interactive mode for code analysis

Options:
  -V, --version          output version number
  --model <model>        OpenAI model (gpt-4, gpt-3.5-turbo) [default: gpt-4]
  --apiKey <key>         OpenAI API key (overrides .env)
  --language <language>  Use language (pt, en) [default: en]
  --projectType <type>   Project type (react-native, expo)
  --versionApp <version> Project version
  --batch                Process all files in parallel mode
  -h, --help            display help
```

## 💡 Practical Examples

### Example 1: Single Component Analysis

**File**: `src/components/ProductList.tsx`

```bash
rn-ai-optimize src/components/ProductList.tsx
```

**Output**:

```
🔍 Analyzing ProductList.tsx...

📈 Performance Suggestions:

## 📄 Summary
Component renders a list of products using ScrollView. Performance could be improved.

## 📊 Performance Rating
Score: 6/10

## 🛠️ Suggested Improvements

### Use FlatList instead of ScrollView for better performance

### 🔴 Before
```

```javascript
<ScrollView>
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</ScrollView>
```

```
### ✅ After
```

```javascript
<FlatList
  data={products}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ProductCard product={item} />}
  getItemLayout={(data, index) => ({ length: 120, offset: 120 * index, index })}
/>
```

```
📁 Report saved: ai-results/components/ProductList-2024-01-15T10-30-45.md
```

### Example 2: Multi-File Analysis (New)

**Directory**: `src/screens/FavoritesNews/`

```bash
rn-ai-optimize analyze
```

**Interactive Selection**:

```
✔ What type of file do you want to analyze? › 📁 Multiple files
✔ Enter directory to search for files: › src/screens/FavoritesNews/
✔ Process all files in parallel? › Yes

📋 Found 3 file(s) in src/screens/FavoritesNews/
🤖 Model: gpt-4o
🌍 Language: en
📱 Project: React Native v0.76.9
========================================

🔍 Analyzing 3 file(s)...

⚡ Batch mode activated - processing all files...

[1/3] 📄 FavoritesScreen.tsx
[2/3] 📄 styles.ts
[3/3] 📄 components/NewsCard.tsx

📊 Batch Analysis Complete!
════════════════════════
📁 Files analyzed: 3
⏰ Completed at: 2025-01-28, 15:30:45
📂 Reports: ai-results/FavoritesNews/2025-01-28T15-30-45-123Z/
════════════════════════
```

**Generated Structure**:

```
ai-results/
└── FavoritesNews/
    └── 2025-01-28T15-30-45-123Z/
        ├── FavoritesScreen-report.md
        ├── styles-report.md
        └── NewsCard-report.md
```

### Example 3: Direct Multi-File Command

```bash
# Analyze specific files directly
rn-ai-optimize src/screens/Home.tsx src/screens/Profile.tsx src/components/Header.tsx --batch
```

**Expected results**:

- Parallel processing for faster analysis
- Individual reports for each file
- Organized folder structure by parent directory
- Consolidated summary report

### Example 4: Complex Screen Analysis

**File**: `src/screens/ProfileScreen.tsx`

```bash
rn-ai-optimize src/screens/ProfileScreen.tsx --model gpt-4
```

**Expected results**:

- Detailed performance analysis
- React.memo memoization suggestions
- useCallback and useMemo optimizations
- Navigation improvements
- Complete Markdown report in `ai-results/screens/`

### Example 5: Expo Project

```bash
# In Expo project - Interactive mode
cd my-expo-project
rn-ai-optimize analyze

# Choose multiple files for comprehensive analysis
✔ What type of file do you want to analyze? › 📁 Multiple files
✔ Enter directory to search for files: › src/
```

The tool automatically detects Expo projects and provides specific suggestions for the entire source directory.

## 📊 Report Structure

### Single File Reports

```
ai-results/
├── components/
│   └── Button-2025-01-28.md
├── screens/
│   └── HomeScreen-2025-01-28.md
└── services/
    └── AuthService-2025-01-28.md
```

### Multi-File Batch Reports

```
ai-results/
├── components/
│   └── 2025-01-28T15-30-45-123Z/
│       ├── Button-report.md
│       ├── Modal-report.md
│       └── Card-report.md
└── screens/
    └── 2025-01-28T10-15-30-456Z/
        ├── HomeScreen-report.md
        ├── ProfileScreen-report.md
        └── SettingsScreen-report.md
```

## 🎛️ Advanced Configuration

### Model Selection

| Model             | Speed | Quality   | Cost | Recommendation    |
| ----------------- | ----- | --------- | ---- | ----------------- |
| **gpt-4**         | Slow  | Excellent | High | Detailed analysis |
| **gpt-3.5-turbo** | Fast  | Good      | Low  | Daily usage       |

```bash
# For critical analysis
rn-ai-optimize ImportantComponent.tsx --model gpt-4

# For daily usage
rn-ai-optimize Component.tsx --model gpt-3.5-turbo
```

### Script Integration

**package.json**:

```json
{
  "scripts": {
    "analyze": "rn-ai-optimize analyze",
    "analyze:single": "rn-ai-optimize",
    "analyze:screens": "rn-ai-optimize src/screens/*.tsx --batch",
    "analyze:components": "rn-ai-optimize src/components/*.tsx --batch",
    "analyze:all": "rn-ai-optimize src/screens/*.tsx src/components/*.tsx --batch",
    "analyze:interactive": "rn-ai-optimize analyze",
    "analyze:fast": "rn-ai-optimize src --model gpt-3.5-turbo --batch"
  }
}
```

**Usage Examples:**

```bash
# Interactive analysis
npm run analyze

# Analyze all screens in batch
npm run analyze:screens

# Analyze all components and screens
npm run analyze:all

# Fast analysis with cheaper model
npm run analyze:fast
```

## 🔍 Analysis Types

### Performance Checks

- ✅ React.memo usage
- ✅ useCallback/useMemo optimization
- ✅ FlatList vs ScrollView
- ✅ Image optimization
- ✅ State management efficiency

### React Native Specific

- ✅ StyleSheet vs inline styles
- ✅ Component size analysis
- ✅ Navigation performance
- ✅ Bundle impact assessment

### Expo Integration

- ✅ Expo SDK optimization
- ✅ Permission usage analysis
- ✅ Module import optimization
- ✅ Over-the-air update considerations

## 🚨 Troubleshooting

### Error 429: Quota Exceeded

```
Error: OpenAI API Error: 429 You exceeded your current quota
```

**Solutions:**

1. Check credits at [OpenAI Billing](https://platform.openai.com/account/billing)
2. Use cheaper model: `--model gpt-3.5-turbo`
3. Wait for limit reset (if free account)

### Command not found

```bash
# Reinstall globally
npm uninstall -g rn-ai-optimize
npm install -g rn-ai-optimize

# Check installation
rn-ai-optimize --version
```

### TypeScript import error

```bash
# Check if file exists
ls -la src/components/Component.tsx

# Check if it's a valid React Native file
rn-ai-optimize --help
```

## 📈 Roadmap

### ✅ Recently Added (v0.1.3)

- [x] **Multi-File Analysis**: Analyze multiple files simultaneously
- [x] **Interactive Mode**: User-friendly CLI interface with menu navigation
- [x] **Batch Processing**: Parallel and sequential processing options
- [x] **Smart Report Organization**: Reports organized by parent folder structure
- [x] **Enhanced Configuration**: Flexible model, language, and project settings
- [x] **Cross-Platform Compatibility**: Improved Windows, macOS, and Linux support

### 🔄 In Development

- [ ] **Project-wide Analysis**: Complete React Native project analysis with dependency mapping
- [ ] **Custom Report Templates**: Configurable output formats (HTML, JSON, PDF)
- [ ] **Analysis Cache System**: Cache results for unmodified files to improve performance
- [ ] **Performance Metrics Dashboard**: Detailed category scoring and trends
- [ ] **Configuration Presets**: Predefined configurations for different project types (Expo, RN CLI, etc.)

### 🎯 Future

- [ ] **VS Code Extension**: Integrated analysis directly in the editor
- [ ] **CI/CD Integration**: GitHub Actions, GitLab CI, and Jenkins plugins
- [ ] **Bundle Size Analysis**: Impact assessment on app bundle size
- [ ] **Automatic Refactoring**: AI-powered code refactoring suggestions
- [ ] **Team Dashboard**: Web interface for team collaboration and reporting
- [ ] **Performance Benchmarking**: Compare against industry standards and best practices

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. Fork the project
2. Create a branch: `git checkout -b feature/new-feature`
3. Commit: `git commit -m 'Add: new feature'`
4. Push: `git push origin feature/new-feature`
5. Open a Pull Request

### Local Development

```bash
# Clone
git clone https://github.com/your-username/rn-ai-optimize.git
cd rn-ai-optimize

# Install
npm install

# Build
npm run build

# Test locally
npm link
rn-ai-optimize --help
```

## 📜 License

MIT License © 2024 [Mateus Castro](https://github.com/MateusCastro2203)

## 📋 Changelog

For detailed information about changes in each version, see [CHANGELOG.md](./CHANGELOG.md).

### Latest Updates (v0.1.3)

- ✅ Multi-file analysis support
- ✅ Interactive mode with enhanced UX
- ✅ Batch processing (parallel/sequential)
- ✅ Smart report organization by folders
- ✅ Cross-platform compatibility improvements
- ✅ Full English translation

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for GPT API
- [React Native](https://reactnative.dev) community

## 💬 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/MateusCastro2203/rn-ai-optmize/issues)
- 📧 **Email**: mateustcastro@gmail.com
- **Linkedin**: [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mateus-castro-b49559169/)

---

<div align="center">

**Made with ❤️ for the React Native community**

[⭐ Star on GitHub](https://github.com/your-username/rn-ai-optimize) • [📦 NPM](https://npmjs.com/package/rn-ai-optimize) • [📖 Docs](https://github.com/MateusCastro2203/rn-ai-optmize?tab=readme-ov-file#readme)

</div>
