import fs from "fs";
import path from "path";
import { t } from "../i18n/index.js";
import { AnalysisResult } from "./types.js";
import { generateReport } from "./reportGenerator.js";

export async function generateReports(result: AnalysisResult): Promise<void> {
  const resultsDir = path.join(process.cwd(), "ai-results");
  const fileDir = path.dirname(result.filePath);
  const parentFolderName = path.basename(fileDir);
  let targetDir: string;

  if (result.batchMode) {
    const folderDir = path.join(resultsDir, parentFolderName);
    targetDir = folderDir;

    console.log(`\n🔍 Checking reports directory (batch mode)...`);
    console.log(`   📂  Base: ${resultsDir}`);
    console.log(`   📁  File folder: ${parentFolderName}`);
    console.log(`   📂  Target: ${targetDir}`);
  } else {
    // MODO ARQUIVO ÚNICO: Direto na pasta ai-results
    targetDir = path.join(resultsDir, parentFolderName);

    console.log(`\n🔍 Checking reports directory (single file)...`);
    console.log(`   📂  Target: ${targetDir}`);
    console.log(`   📁  File folder: ${parentFolderName}`);
  }

  // Criar a estrutura de pastas
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`   ✔️  Created directory structure`);
  } else {
    console.log(`   ✔️  Directory already exists`);
  }

  const fileName = path.basename(
    result.filePath,
    path.extname(result.filePath)
  );
  console.log(`\n✂️  Base filename: ${fileName}`);

  const timestamp = result.timestamp.replace(/[:.]/g, "-");
  await generateReport(result, targetDir, fileName, timestamp);

  console.log(`
    🚀  Report Generation Complete!
    ───────────────────────────────────
    📁  Reports Folder : ${targetDir}
    📄  Report File    : ${fileName}-${timestamp}.md
    📅  Timestamp      : ${result.timestamp}
    📂  Mode           : ${result.batchMode ? "Multiple Files" : "Single File"}
    ───────────────────────────────────
    `);
}

export * from "./types.js";
