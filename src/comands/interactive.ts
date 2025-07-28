import { Command } from "commander";
import { select, input, confirm } from "@inquirer/prompts";
import fs from "fs";
import path from "path";
import { analyzeFile } from "../utils/analyzeFile.js";
import { analyzeMultipleFiles } from "../utils/analyzeMultipleFiles.js";

interface Config {
  model: string;
  language: string;
  projectType: string;
  version: string;
  openInBrowser: boolean;
  defaultPaths: Record<string, string>;
  apiKey: {
    env: string;
    description: string;
  };
}

function loadConfig(): Config {
  const configPath = path.join(process.cwd(), ".rn-ai-optimize.json");

  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  }

  // Default configuration
  return {
    model: "gpt-4o",
    language: "en", // Changed default to English
    projectType: "React Native",
    version: "0.76.9",
    openInBrowser: true,
    defaultPaths: {
      screens: "src/screens",
      components: "src/components",
      services: "src/services",
      utils: "src/utils",
    },
    apiKey: {
      env: "OPENAI_API_KEY",
      description: "Put your OpenAI API key in the .env file",
    },
  };
}

function findFiles(
  directory: string,
  extensions: string[] = [".tsx", ".ts", ".jsx", ".js"]
): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs.readdirSync(directory, { withFileTypes: true });
  const result: string[] = [];

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      result.push(...findFiles(fullPath, extensions));
    } else if (extensions.some((ext) => file.name.endsWith(ext))) {
      result.push(fullPath);
    }
  }

  return result;
}

export function createInteractiveCommand(): Command {
  const interactiveCmd = new Command("analyze")
    .description("Interactive mode for code analysis")
    .action(async () => {
      try {
        const config = loadConfig();

        console.log("🤖 rn-ai-optimize - Interactive Mode");
        console.log("=".repeat(40));

        // Check API Key
        const apiKey = process.env[config.apiKey.env];
        if (!apiKey) {
          console.error(`❌ ${config.apiKey.description}`);
          console.error(
            `   Environment variable not found: ${config.apiKey.env}`
          );
          return;
        }

        const useDefaults = await confirm({
          message: `Use default settings? (${config.model}, English, ${config.projectType})`,
          default: true,
        });

        let model = config.model;
        let language = config.language;
        let projectType = config.projectType;
        let version = config.version;

        if (!useDefaults) {
          model = await select({
            message: "Choose the model:",
            choices: [
              { name: "GPT-4o (Recommended)", value: "gpt-4o" },
              { name: "GPT-4", value: "gpt-4" },
              { name: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
            ],
          });

          language = await select({
            message: "Choose the language:",
            choices: [
              { name: "English", value: "en" },
              { name: "Português", value: "pt" },
            ],
          });

          projectType = await input({
            message: "Project type:",
            default: config.projectType,
          });

          version = await input({
            message: "Project version:",
            default: config.version,
          });
        }

        // Choose analysis type
        const analysisType = await select({
          message: "What type of file do you want to analyze?",
          choices: [
            { name: "🖥️  Single Screen", value: "screens" },
            { name: "🧩 Component", value: "components" },
            { name: "📁 Multiple files", value: "multiple" },
            { name: "🔧 Service", value: "services" },
            { name: "🛠️  Utility", value: "utils" },
            { name: "📄 Specific file", value: "custom" },
          ],
        });

        if (analysisType === "multiple") {
          const directory = await input({
            message: "Enter directory to search for files:",
            default: "src/",
            validate: (input: string) => {
              console.log(input);
              if (!fs.existsSync(input)) return "Directory not found";
              return true;
            },
          });

          const files = findFiles(directory);

          if (files.length === 0) {
            console.error(`❌ No files found in ${directory}`);
            return;
          }

          const batchMode = await confirm({
            message:
              "Process all files in parallel? (faster, but uses more API calls)",
            default: false,
          });

          console.log(`\n📋 Found ${files.length} file(s) in ${directory}`);
          console.log(`🤖 Model: ${model}`);
          console.log(`🌍 Language: ${language}`);
          console.log(`📱 Project: ${projectType} v${version}`);
          console.log("=".repeat(40));

          await analyzeMultipleFiles(
            files,
            model,
            apiKey,
            language,
            projectType,
            version,
            batchMode
          );

          return;
        }

        let selectedFile: string;

        if (analysisType === "custom") {
          selectedFile = await input({
            message: "Enter the file path:",
            validate: (input: string) => {
              if (!input.trim()) return "Please enter a path";
              if (!fs.existsSync(input)) return "File not found";
              if (!/\.(tsx?|jsx?)$/.test(input))
                return "File must be .ts, .tsx, .js or .jsx";
              return true;
            },
          });
        } else {
          const directory = config.defaultPaths[analysisType];
          const files = findFiles(directory);

          if (files.length === 0) {
            console.error(`❌ No files found in ${directory}`);
            return;
          }

          selectedFile = await select({
            message: `Choose the file in ${directory}:`,
            choices: files.map((file) => ({
              name: path.relative(process.cwd(), file),
              value: file,
            })),
          });
        }

        console.log("\n🔄 Starting analysis...");
        console.log(`📄 File: ${selectedFile}`);
        console.log(`🤖 Model: ${model}`);
        console.log(`🌍 Language: ${language}`);
        console.log(`📱 Project: ${projectType} v${version}`);
        console.log("=".repeat(40));

        // Execute analysis
        await analyzeFile(
          selectedFile,
          model,
          apiKey,
          language,
          projectType,
          version
        );
      } catch (error) {
        console.error("❌ Error:", error);
      }
    });

  return interactiveCmd;
}
