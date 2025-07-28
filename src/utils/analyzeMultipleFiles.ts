import { AnalysisResult } from "../reports/types.js";
import { analyzeFile } from "./analyzeFile.js";

export async function analyzeMultipleFiles(
  filePaths: string[],
  model: string,
  apiKey: string,
  language: string,
  projectType: string,
  version: string,
  batchMode: boolean = false
) {
  const results: AnalysisResult[] = [];

  console.log(`\n🔍 Analisando ${filePaths.length} arquivo(s)...\n`);

  if (batchMode) {
    console.log("⚡ Modo batch ativado - processando todos os arquivos...");

    const promises = filePaths.map(async (filePath, index) => {
      console.log(`\n[${index + 1}/${filePaths.length}] 📄 ${filePath}`);
      return await analyzeFile(
        filePath,
        model,
        apiKey,
        language,
        projectType,
        version,
        true
      );
    });

    await Promise.all(promises);
  } else {
    for (let i = 0; i < filePaths.length; i++) {
      const filePath = filePaths[i];
      console.log(
        `\n[${i + 1}/${filePaths.length}] 📄 Analisando: ${filePath}`
      );

      await analyzeFile(
        filePath,
        model,
        apiKey,
        language,
        projectType,
        version,
        true
      );

      // Adiciona uma pausa entre arquivos para não sobrecarregar a API
      if (i < filePaths.length - 1) {
        console.log("⏳ Aguardando 2 segundos...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  }

  // Gerar relatório consolidado
  await generateConsolidatedReport(filePaths, results);
}

async function generateConsolidatedReport(
  filePaths: string[],
  results: AnalysisResult[]
) {
  console.log(`\n📊 Relatório Consolidado`);
  console.log(`════════════════════════`);
  console.log(`📁 Arquivos analisados: ${filePaths.length}`);
  console.log(`⏰ Finalizado em: ${new Date().toLocaleString()}`);
  console.log(`════════════════════════\n`);
}
