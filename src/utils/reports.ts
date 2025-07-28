import fs from "fs";
import path from "path";
import { t } from "../i18n/index.js";

interface AnalysisResult {
  filePath: string;
  analysis: string;
  timestamp: Date;
  model: string;
}

export async function generateReports(result: AnalysisResult): Promise<void> {
  const resultsDir = path.join(process.cwd(), "ai-results");

  // Criar pasta ai-results se não existir
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const fileName = path.basename(
    result.filePath,
    path.extname(result.filePath)
  );
  const timestamp = result.timestamp.toISOString().replace(/[:.]/g, "-");

  // Gerar HTML
  await generateHTMLReport(result, resultsDir, fileName, timestamp);

  // Gerar Markdown
  await generateMarkdownReport(result, resultsDir, fileName, timestamp);

  console.log(`\n📁 ${t("reports.saved_in")}:`);
  console.log(`   📄 ai-results/${fileName}-${timestamp}.html`);
  console.log(`   📝 ai-results/${fileName}-${timestamp}.md`);
}

function parseMarkdownToHTML(markdown: string): string {
  let html = markdown;

  // Processar blocos Before/After especiais
  html = html.replace(
    /### 🔴 Before\s*\n```(\w+)?\n([\s\S]*?)\n```\s*\n### ✅ After\s*\n```(\w+)?\n([\s\S]*?)\n```/g,
    (match, lang1, beforeCode, lang2, afterCode) => {
      return `
        <div class="code-comparison">
          <div class="before-after-container">
            <div class="code-block before">
              <div class="code-header">
                <span class="status-icon">🔴</span>
                <span class="status-text">${t("reports.before")}</span>
              </div>
              <div class="code-content">
                <pre><code class="language-${
                  lang1 || "javascript"
                }">${escapeHtml(beforeCode.trim())}</code></pre>
              </div>
            </div>
            <div class="code-block after">
              <div class="code-header">
                <span class="status-icon">✅</span>
                <span class="status-text">${t("reports.after")}</span>
              </div>
              <div class="code-content">
                <pre><code class="language-${
                  lang2 || "javascript"
                }">${escapeHtml(afterCode.trim())}</code></pre>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  );

  // Processar outros blocos de código
  html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, lang, code) => {
    return `
      <div class="code-block single">
        <div class="code-header">
          <span class="language-tag">${lang || t("reports.code")}</span>
        </div>
        <div class="code-content">
          <pre><code class="language-${lang || "javascript"}">${escapeHtml(
      code.trim()
    )}</code></pre>
        </div>
      </div>
    `;
  });

  // Processar títulos
  html = html.replace(/### (.*)/g, "<h3>$1</h3>");
  html = html.replace(/## (.*)/g, "<h2>$1</h2>");
  html = html.replace(/# (.*)/g, "<h1>$1</h1>");

  // Processar texto em negrito
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Processar listas
  html = html.replace(/^- (.*)/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

  // Processar quebras de linha
  html = html.replace(/\n\n/g, "</p><p>");
  html = html.replace(/\n/g, "<br>");

  // Envolver em parágrafos
  html = `<p>${html}</p>`;

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function generateHTMLReport(
  result: AnalysisResult,
  resultsDir: string,
  fileName: string,
  timestamp: string
): Promise<void> {
  const analysisHTML = parseMarkdownToHTML(result.analysis);

  const htmlContent = `<!DOCTYPE html>
<html lang="${getCurrentLanguage()}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t("reports.title")} - ${fileName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .meta {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            backdrop-filter: blur(10px);
        }
        
        .meta-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 0.9rem;
        }
        
        .meta-item:last-child {
            margin-bottom: 0;
        }
        
        .content {
            padding: 40px;
        }
        
        .content h1, .content h2, .content h3 {
            color: #2d3748;
            margin: 30px 0 15px 0;
        }
        
        .content h1 {
            font-size: 2rem;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }
        
        .content h2 {
            font-size: 1.5rem;
            color: #4a5568;
        }
        
        .content h3 {
            font-size: 1.2rem;
            color: #718096;
        }
        
        .content p {
            margin-bottom: 15px;
            text-align: justify;
        }
        
        .content ul {
            margin: 15px 0;
            padding-left: 20px;
        }
        
        .content li {
            margin-bottom: 8px;
        }
        
        .code-comparison {
            margin: 30px 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .before-after-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
        }
        
        .code-block {
            background: #1a202c;
            color: #e2e8f0;
            overflow: hidden;
        }
        
        .code-block.single {
            margin: 20px 0;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .code-block.before {
            border-right: 2px solid #e53e3e;
        }
        
        .code-block.after {
            border-left: 2px solid #38a169;
        }
        
        .code-header {
            background: #2d3748;
            padding: 12px 20px;
            border-bottom: 1px solid #4a5568;
            display: flex;
            align-items: center;
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .code-block.before .code-header {
            background: #742a2a;
        }
        
        .code-block.after .code-header {
            background: #22543d;
        }
        
        .status-icon {
            margin-right: 8px;
            font-size: 1.1rem;
        }
        
        .language-tag {
            background: #4a5568;
            color: #e2e8f0;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .code-content {
            padding: 20px;
            overflow-x: auto;
        }
        
        .code-content pre {
            margin: 0;
            font-family: 'Fira Code', 'Monaco', 'Consolas', 'Ubuntu Mono', monospace;
            font-size: 0.9rem;
            line-height: 1.4;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        
        .code-content code {
            color: #e2e8f0;
        }
        
        /* Syntax highlighting */
        .language-javascript .keyword,
        .language-typescript .keyword,
        .language-react-native .keyword {
            color: #f687b3;
        }
        
        .language-javascript .string,
        .language-typescript .string,
        .language-react-native .string {
            color: #68d391;
        }
        
        .language-javascript .function,
        .language-typescript .function,
        .language-react-native .function {
            color: #90cdf4;
        }
        
        .footer {
            background: #f7fafc;
            padding: 30px 40px;
            text-align: center;
            color: #718096;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer a {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 768px) {
            .before-after-container {
                grid-template-columns: 1fr;
            }
            
            .code-block.before {
                border-right: none;
                border-bottom: 2px solid #e53e3e;
            }
            
            .code-block.after {
                border-left: none;
                border-top: 2px solid #38a169;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 ${t("reports.title")}</h1>
            <div class="meta">
                <div class="meta-item">
                    <span><strong>📄 ${t("reports.file")}:</strong></span>
                    <span>${result.filePath}</span>
                </div>
                <div class="meta-item">
                    <span><strong>🤖 ${t("reports.model")}:</strong></span>
                    <span>${result.model}</span>
                </div>
                <div class="meta-item">
                    <span><strong>📅 ${t("reports.date")}:</strong></span>
                    <span>${result.timestamp.toLocaleString(
                      getCurrentLanguage() === "pt" ? "pt-BR" : "en-US"
                    )}</span>
                </div>
                <div class="meta-item">
                    <span><strong>🛠️ ${t("reports.tool")}:</strong></span>
                    <span>rn-ai-optimize</span>
                </div>
            </div>
        </div>
        
        <div class="content">
            ${analysisHTML}
        </div>
        
        <div class="footer">
            <p>${t(
              "reports.footer_text"
            )} <strong>rn-ai-optimize</strong> | <a href="https://github.com/seu-usuario/rn-ai-optimize" target="_blank">GitHub</a></p>
            <p style="margin-top: 10px; font-size: 0.8rem;">${t(
              "reports.footer_love"
            )}</p>
        </div>
    </div>
</body>
</html>`;

  const htmlPath = path.join(resultsDir, `${fileName}-${timestamp}.html`);
  fs.writeFileSync(htmlPath, htmlContent, "utf-8");
}

async function generateMarkdownReport(
  result: AnalysisResult,
  resultsDir: string,
  fileName: string,
  timestamp: string
): Promise<void> {
  // Criar lista de próximos passos baseada no idioma
  const nextSteps = getNextStepsList()
    .map((step, index) => `${index + 1}. ${step}`)
    .join("\n");

  const markdownContent = `# 🚀 ${t("reports.title")}

## 📋 ${t("reports.file")} Information

- **${t("reports.file")}:** \`${result.filePath}\`
- **${t("reports.model")}:** ${result.model}
- **${t("reports.date")}:** ${result.timestamp.toLocaleString(
    getCurrentLanguage() === "pt" ? "pt-BR" : "en-US"
  )}
- **${t("reports.tool")}:** rn-ai-optimize

---

## 📈 ${t("reports.analysis_suggestions")}

${result.analysis}

---

## 🔧 ${t("reports.next_steps")}

${nextSteps}

---

*${t(
    "reports.footer_text"
  )} **rn-ai-optimize** | [GitHub](https://github.com/seu-usuario/rn-ai-optimize)*
`;

  const markdownPath = path.join(resultsDir, `${fileName}-${timestamp}.md`);
  fs.writeFileSync(markdownPath, markdownContent, "utf-8");
}

function getCurrentLanguage(): string {
  return process.env.LANG?.startsWith("pt") ? "pt" : "en";
}

function getNextStepsList(): string[] {
  const currentLang = getCurrentLanguage();

  if (currentLang === "pt") {
    return [
      "Revisar as sugestões acima",
      "Implementar as melhorias prioritárias",
      "Testar a performance após as mudanças",
      "Executar nova análise para verificar melhorias",
    ];
  } else {
    return [
      "Review the suggestions above",
      "Implement priority improvements",
      "Test performance after changes",
      "Run new analysis to verify improvements",
    ];
  }
}
