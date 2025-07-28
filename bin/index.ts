#!/usr/bin/env node
import { Command } from "commander";
import { analyzeFile, analyzeMultipleFiles } from "../src/utils/index.js";
import { createInteractiveCommand } from "../src/comands/index.js";

const program = new Command();

program
  .name("rn-ai-optimize")
  .description(
    "Analyzes a React Native screen and suggests performance improvements using AI"
  )
  .version("0.1.0-beta.1");

program
  .argument("[file]", "File to analyze")
  .option(
    "--model <model>",
    "OpenAI model to use (e.g.: gpt-4, gpt-3.5-turbo)",
    "gpt-4"
  )
  .option("--apiKey <key>", "OpenAI API key (overrides .env)")
  .option("--language <language>", "Use language (e.g.: pt, en)")
  .option("--projectType <type>", "Project type (e.g.: react-native, expo)")
  .option("--versionApp <version>", "Project version (e.g.: 0.1.0)")
  .option("--batch", "Process all files in batch mode")
  .action(async (files: string[], options: any) => {
    if (!files) {
      console.log("💡 Use 'rn-ai-optimize analyze' for interactive mode");
      console.log("📚 Or use: rn-ai-optimize <file>");
      program.help();
      return;
    }

    const apiKey = options.apiKey || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("❌ OPENAI_API_KEY not found");
      console.error("💡 Configure in .env or use --apiKey");
      return;
    }
    if (files.length > 1) {
      await analyzeMultipleFiles(
        files,
        options.model,
        apiKey,
        options.language,
        options.projectType,
        options.versionApp,
        options.batch
      );
    } else {
      await analyzeFile(
        files[0],
        options.model,
        apiKey,
        options.language,
        options.projectType,
        options.versionApp
      );
    }
  });

program.addCommand(createInteractiveCommand());

program.parse();
