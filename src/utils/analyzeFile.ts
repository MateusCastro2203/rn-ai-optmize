import fs from "fs";
import { buildPrompt, buildPromptTerminal } from "./prompt.js";
import { askAI } from "./openai.js";
import { t } from "../i18n/index.js";
import { AnalysisResult, generateReports } from "../reports/index.js";

export async function analyzeFile(
  filePath: string,
  model: string,
  apiKey: string,
  language: string,
  projectType: string,
  version: string,
  batchMode?: boolean
) {
  const generateReport: boolean = true;

  if (!fs.existsSync(filePath)) {
    console.error(`❌ ${t("not_found", { file: filePath })}`);
    return;
  }

  const code = fs.readFileSync(filePath, "utf-8");

  const prompt = buildPrompt(
    code,
    language,
    projectType,
    version,
    model,
    filePath
  );

  console.log(`\n🔍 ${t("analyzing", { file: filePath })}`);

  const result = await askAI(prompt, model, apiKey);

  const terminalResult = await askAI(
    buildPromptTerminal(result),
    model,
    apiKey
  );
  function extractJsonFromResponse(response: string): any {
    try {
      return JSON.parse(response);
    } catch (error) {
      // Extrair JSON de markdown
      const jsonMatch = response.match(/```(?:json)?\s*(\{.*?\})\s*```/s);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[1]);
        } catch (e) {
          // Fallback
          return { score: 5, issues: 0, improvement: 0 };
        }
      }
      return { score: 5, issues: 0, improvement: 0 };
    }
  }
  const { score, issues, improvement } =
    extractJsonFromResponse(terminalResult);
  console.log(`\n${terminalResult}\n`);
  console.log(`\n🚀  Code Quality Report`);
  console.log(`────────────────────────────`);
  console.log(`⭐  Score       : ${score}/10`);
  console.log(`🐛  Issues      : ${issues}`);
  console.log(`📈  Improvement : ${improvement}%`);
  console.log(`────────────────────────────`);

  if (generateReport) {
    await generateReports({
      filePath,
      analysis: result,
      timestamp: new Date().toISOString(),
      model,
      batchMode,
    });
  }
}
