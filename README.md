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

### Basic Analysis

```bash
# Analyze a component
rn-ai-optimize src/components/ProductCard.tsx

# Analyze a screen
rn-ai-optimize src/screens/HomeScreen.tsx

# Use cheaper model
rn-ai-optimize src/components/Header.tsx --model gpt-3.5-turbo
```

### Available Options

```bash
rn-ai-optimize [options] <file>

Arguments:
  file                    Path to the React Native file

Options:
  -V, --version          output version number
  --model <model>        OpenAI model (gpt-4, gpt-3.5-turbo) [default: gpt-4]
  --apiKey <key>         OpenAI API key (overrides .env)
  --no-report           Skip generating markdown report
  -h, --help            display help
```

## 💡 Practical Examples

### Example 1: Component with List

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
📁 Report saved: ai-results/ProductList-2024-01-15T10-30-45.md
```

### Example 2: Complex Screen

**File**: `src/screens/ProfileScreen.tsx`

```bash
rn-ai-optimize src/screens/ProfileScreen.tsx --model gpt-4
```

**Expected results**:

- Detailed performance analysis
- React.memo memoization suggestions
- useCallback and useMemo optimizations
- Navigation improvements
- Complete Markdown report

### Example 3: Expo Project

```bash
# In Expo project
cd my-expo-project
rn-ai-optimize App.tsx
rn-ai-optimize src/screens/CameraScreen.tsx
```

The tool automatically detects Expo projects and provides specific suggestions.

## 📊 Report Example

rn-ai-optimize generates detailed reports in `ai-results/`:

```markdown
# 🚀 Performance Analysis - React Native

**File:** src/components/ChatBubble.tsx
**Model:** gpt-4
**Date:** 01/15/2024, 10:30:45 AM

---

## 📄 Summary

Component renders chat messages with avatar and timestamp. Contains optimization opportunities.

## 📊 Performance Rating

Score: 7/10

- Component rendering efficiency: 8/10
- Image handling: 6/10
- State management: 7/10
- Memory leak risks: 8/10

## 🛠️ Suggested Improvements

### Optimize Image Loading

Use Image caching and proper resizeMode for better performance.

### Memoize Component

Wrap component with React.memo to prevent unnecessary re-renders.

### Use useCallback for Functions

Memoize callback functions to improve performance.
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
    "analyze": "rn-ai-optimize",
    "analyze:all": "find src -name '*.tsx' -exec rn-ai-optimize {} \\;",
    "analyze:screens": "rn-ai-optimize src/screens/*.tsx"
  }
}
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

### 🔄 In Development

- [ ] Multiple file analysis simultaneously
- [ ] Custom configuration system
- [ ] Analysis cache for unmodified files
- [ ] HTML report generation
- [ ] Detailed category scoring

### 🎯 Future

- [ ] VS Code Extension
- [ ] CI/CD Integration (GitHub Actions)
- [ ] Bundle size analysis
- [ ] Automatic refactoring suggestions
- [ ] Web dashboard for teams

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

MIT License © 2024 [Mateus Castro](https://github.com/your-username)

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for GPT API
- [React Native](https://reactnative.dev) community
- All [contributors](https://github.com/your-username/rn-ai-optimize/contributors)

## 💬 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/rn-ai-optimize/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/rn-ai-optimize/discussions)
- 📧 **Email**: your-email@example.com

---

<div align="center">

**Made with ❤️ for the React Native community**

[⭐ Star on GitHub](https://github.com/your-username/rn-ai-optimize) • [📦 NPM](https://npmjs.com/package/rn-ai-optimize) • [📖 Docs](https://github.com/your-username/rn-ai-optimize#readme)

</div>
