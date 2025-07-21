import fs from "fs";
import path from "path";
import { t } from "../i18n/index.js";
import { AnalysisResult } from "./types.js";
import { generateReport } from "./reportGenerator.js";

export async function generateReports(result: AnalysisResult): Promise<void> {
  const resultsDir = path.join(process.cwd(), "ai-results");

  // Criar pasta ai-results se não existir
  console.log(`\n🔍 Checking reports directory...`);
  console.log(`   📂  ${resultsDir}`);

  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
    console.log(`   ✔️  Created directory`);
  } else {
    console.log(`   ✔️  Directory already exists`);
  }

  const fileName = path.basename(
    result.filePath,
    path.extname(result.filePath)
  );

  console.log(`\n✂️  Base filename: ${fileName}`);

  const timestamp = result.timestamp.replace(/[:.]/g, "-");

  await generateReport(result, resultsDir, fileName, timestamp);

  console.log(`
    🚀  Report Generation Complete!
    ───────────────────────────────────
    📁  Reports Folder : ${resultsDir}
    📄  Report File    : ${fileName}-${result.timestamp}.md
    📅  Timestamp      : ${result.timestamp}
    ───────────────────────────────────
    `);
}

export * from "./types.js";
