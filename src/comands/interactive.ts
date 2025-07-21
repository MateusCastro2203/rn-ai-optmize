import { Command } from "commander";
import { select, input, confirm } from "@inquirer/prompts";
import fs from "fs";
import path from "path";
import { analyzeFile } from "../analyzeFile.js";

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

  // Configuração padrão
  return {
    model: "gpt-4o",
    language: "pt",
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
      description: "Coloque sua chave da OpenAI no arquivo .env",
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
    .description("Modo interativo para análise de código")
    .action(async () => {
      try {
        const config = loadConfig();

        console.log("🤖 rn-ai-optimize - Modo Interativo");
        console.log("=".repeat(40));

        // Verificar API Key
        const apiKey = process.env[config.apiKey.env];
        if (!apiKey) {
          console.error(`❌ ${config.apiKey.description}`);
          console.error(`   Variável não encontrada: ${config.apiKey.env}`);
          return;
        }

        // Escolher tipo de análise
        const analysisType = await select({
          message: "Que tipo de arquivo você quer analisar?",
          choices: [
            { name: "🖥️  Tela (Screen)", value: "screens" },
            { name: "🧩 Componente", value: "components" },
            { name: "🔧 Serviço", value: "services" },
            { name: "🛠️  Utilitário", value: "utils" },
            { name: "📁 Arquivo específico", value: "custom" },
          ],
        });

        let selectedFile: string;

        if (analysisType === "custom") {
          selectedFile = await input({
            message: "Digite o caminho do arquivo:",
            validate: (input: string) => {
              if (!input.trim()) return "Por favor, digite um caminho";
              if (!fs.existsSync(input)) return "Arquivo não encontrado";
              if (!/\.(tsx?|jsx?)$/.test(input))
                return "Arquivo deve ser .ts, .tsx, .js ou .jsx";
              return true;
            },
          });
        } else {
          const directory = config.defaultPaths[analysisType];
          const files = findFiles(directory);

          if (files.length === 0) {
            console.error(`❌ Nenhum arquivo encontrado em ${directory}`);
            return;
          }

          selectedFile = await select({
            message: `Escolha o arquivo em ${directory}:`,
            choices: files.map((file) => ({
              name: path.relative(process.cwd(), file),
              value: file,
            })),
          });
        }

        // Confirmar configurações
        const useDefaults = await confirm({
          message: `Usar configurações padrão? (${config.model}, ${config.language}, ${config.projectType})`,
          default: true,
        });

        let model = config.model;
        let language = config.language;
        let projectType = config.projectType;
        let version = config.version;

        if (!useDefaults) {
          model = await select({
            message: "Escolha o modelo:",
            choices: [
              { name: "GPT-4o (Recomendado)", value: "gpt-4o" },
              { name: "GPT-4", value: "gpt-4" },
              { name: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
            ],
          });

          language = await select({
            message: "Escolha o idioma:",
            choices: [
              { name: "Português", value: "pt" },
              { name: "English", value: "en" },
            ],
          });

          projectType = await input({
            message: "Tipo do projeto:",
            default: config.projectType,
          });

          version = await input({
            message: "Versão do projeto:",
            default: config.version,
          });
        }

        console.log("\n🔄 Iniciando análise...");
        console.log(`📄 Arquivo: ${selectedFile}`);
        console.log(`🤖 Modelo: ${model}`);
        console.log(`🌍 Idioma: ${language}`);
        console.log(`📱 Projeto: ${projectType} v${version}`);
        console.log("=".repeat(40));

        // Executar análise
        await analyzeFile(
          selectedFile,
          model,
          apiKey,
          language,
          projectType,
          version
        );
      } catch (error) {
        console.error("❌ Erro:", error);
      }
    });

  return interactiveCmd;
}
