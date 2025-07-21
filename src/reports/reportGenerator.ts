import fs from "fs";
import path from "path";
import { AnalysisResult } from "./types.js";
import http from "http";
import MarkdownIt from "markdown-it";
import open from "open";

export async function generateReport(
  result: AnalysisResult,
  resultsDir: string,
  fileName: string,
  timestamp: string
): Promise<void> {
  const markdownPath = path.join(resultsDir, `${fileName}-${timestamp}.md`);
  console.log(`\n🔍 Writing report to ${markdownPath}`);
  fs.writeFileSync(markdownPath, result.analysis, "utf-8");
}
