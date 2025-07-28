# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3] - 2025-01-28

### 🚀 Added

#### Multi-File Analysis Support

- **Interactive Multi-File Mode**: Added comprehensive support for analyzing multiple files through the interactive command `rn-ai-optimize analyze`
- **Batch Processing Options**: Users can choose between sequential processing (API-friendly) or parallel processing (faster execution)
- **Smart Directory Scanning**: Automatically discovers and processes `.ts`, `.tsx`, `.js`, `.jsx` files in specified directories with recursive search
- **Enhanced CLI Arguments**: Support for multiple file arguments: `rn-ai-optimize file1.tsx file2.tsx file3.tsx`
- **Batch Mode Flag**: New `--batch` flag for enabling parallel processing mode

#### Interactive Experience Improvements

- **Comprehensive Interactive Menu**: Enhanced user interface with clear navigation and intuitive options
- **Flexible Analysis Types**: Choose from single screen, component, multiple files, service, utility, or specific file analysis
- **Configuration Flexibility**: Option to use default settings or customize model, language, project type, and version
- **Real-time Validation**: Input validation for file paths and directory existence

#### Advanced Report Organization

- **Directory-Based Organization**: Reports are now organized by parent folder names for better project structure reflection
- **Batch Report Structure**: Organized folder hierarchy for multi-file analysis sessions
- **Consolidated Reporting**: Summary reports for batch operations with timestamp-based organization
- **Cross-Platform Compatibility**: Fixed Windows path and timestamp issues

### 🔧 Changed

#### Code Architecture

- **Modular Structure**: Reorganized codebase with files moved to `src/utils/` for improved maintainability
- **Enhanced Import System**: Fixed ES module compatibility issues across all platforms
- **Improved Error Handling**: Better validation and error messages throughout the application

#### User Interface

- **Internationalization**: Interactive mode fully translated to English with Portuguese support maintained
- **Default Language**: Changed default language from Portuguese to English for broader accessibility
- **Enhanced Prompts**: More descriptive and helpful user prompts and validation messages

#### Report Generation

- **Smart Folder Creation**: Reports organized by parent directory names
- **Timestamp Sanitization**: Fixed Windows compatibility with proper timestamp formatting for folder names
- **Report Structure**: Improved organization with clear separation between single-file and multi-file reports

### 🛠️ Technical Improvements

#### Performance

- **Parallel Processing**: Optional parallel execution for significantly faster batch analysis
- **Rate Limiting**: Built-in delays between API calls to prevent rate limiting issues
- **Memory Optimization**: Efficient file processing for large batch operations

#### Platform Support

- **Windows Compatibility**: Resolved path separator and timestamp formatting issues
- **Cross-Platform Paths**: Consistent path handling across Windows, macOS, and Linux
- **File System Safety**: Improved file and directory handling with proper validation

### 📊 Usage Examples

#### Single File Analysis (Existing)

```bash
rn-ai-optimize src/screens/HomeScreen.tsx
```

#### Multiple Files Analysis (New)

```bash
# Direct file specification
rn-ai-optimize src/screens/Home.tsx src/screens/Profile.tsx

# Interactive mode
rn-ai-optimize analyze

# Batch mode with parallel processing
rn-ai-optimize src/screens/*.tsx --batch
```

#### Interactive Mode Flow

```
🤖 rn-ai-optimize - Interactive Mode
========================================
✔ Use default settings? (gpt-4o, en, React Native) › Yes
✔ What type of file do you want to analyze? › 📁 Multiple files
✔ Enter directory to search for files: › src/screens/
✔ Process all files in parallel? › No
```

### 📁 Report Structure Changes

#### Single File Mode

```
ai-results/
└── ScreenName/
    └── ComponentName-2025-01-28.md
```

#### Multi-File Batch Mode

```
ai-results/
└── FolderName/
    └── 2025-01-28T15-30-45-123Z/
        ├── Component1-2025-01-28.md
        ├── Component2-2025-01-28.md
        └── Component3-2025-01-28.md
```

### 🐛 Fixed

- **Windows Path Issues**: Resolved path separator inconsistencies on Windows systems
- **Timestamp Formatting**: Fixed invalid characters in folder names (colons and dots)
- **ES Module Imports**: Corrected import statement issues causing module resolution errors
- **Directory Validation**: Improved validation for directory existence and accessibility
- **Error Messages**: Enhanced error reporting with more descriptive and actionable messages

### 🔄 Migration Guide

#### From v0.1.2 to v0.1.3

- ✅ **Fully Backward Compatible**: All existing commands and workflows remain unchanged
- ✅ **New Interactive Command**: Access new features via `rn-ai-optimize analyze`
- ✅ **Enhanced Reports**: Reports now organized by parent folder for better structure
- ✅ **Same Configuration**: Existing `.env` and configuration files work without changes

### 📋 Requirements

- Node.js 18+ (unchanged)
- OpenAI API Key (unchanged)
- Supported file types: `.ts`, `.tsx`, `.js`, `.jsx` (unchanged)

### 🎯 Coming Soon

- **Project-wide Analysis**: Complete React Native project analysis
- **Custom Report Templates**: Configurable output formats and templates
- **Performance Metrics**: Detailed performance analysis and recommendations
- **CI/CD Integration**: GitHub Actions and pipeline integration
- **Configuration Presets**: Predefined configurations for different project types

---

## [0.1.2] - Previous Release

### Added

- Basic single file analysis
- OpenAI integration
- Report generation
- Internationalization support (Portuguese/English)

### Fixed

- Initial bug fixes and stability improvements

---

## [0.1.1] - Initial Release

### Added

- Core analysis functionality
- CLI interface
- Basic report generation

---

**Full Changelog**: https://github.com/MateusCastro2203/rn-ai-optimize/releases

**Contributors**: [@MateusCastro2203](https://github.com/MateusCastro2203)

**License**: MIT

---

_For detailed usage instructions, please refer to the [README.md](./README.md)_
