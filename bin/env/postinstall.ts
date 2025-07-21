#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PackageJson {
  name?: string;
  scripts?: Record<string, string>;
  [key: string]: any;
}

function createDefaultConfig() {
  const configPath = path.join(process.cwd(), ".rn-ai-optimize.json");

  if (fs.existsSync(configPath)) {
    console.log("⚠️  Arquivo de configuração já existe, pulando...");
    return;
  }

  const defaultConfig = {
    model: "gpt-3.5-turbo",
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

  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  console.log("✅ Arquivo de configuração criado: .rn-ai-optimize.json");
}

function createEnvExample() {
  const envPath = path.join(process.cwd(), ".env.example");

  if (fs.existsSync(envPath)) {
    // Adicionar apenas se não existir
    const envContent = fs.readFileSync(envPath, "utf-8");
    if (!envContent.includes("OPENAI_API_KEY")) {
      fs.appendFileSync(
        envPath,
        "\n# rn-ai-optimize\nOPENAI_API_KEY=sua_chave_aqui\n"
      );
      console.log("✅ Variável OPENAI_API_KEY adicionada ao .env.example");
    }
  } else {
    fs.writeFileSync(
      envPath,
      "# rn-ai-optimize\nOPENAI_API_KEY=sua_chave_aqui\n"
    );
    console.log("✅ Arquivo .env.example criado");
  }
}

function addScriptsToPackageJson() {
  const packagePath = path.join(process.cwd(), "package.json");

  if (!fs.existsSync(packagePath)) {
    console.log("⚠️  package.json não encontrado, pulando adição de scripts");
    return;
  }

  const packageJson: PackageJson = JSON.parse(
    fs.readFileSync(packagePath, "utf-8")
  );

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  // Scripts pré-configurados
  const newScripts = {
    "ai:screen": "rn-ai-optimize src/screens/NOME_DO_ARQUIVO.tsx",
    "ai:component": "rn-ai-optimize src/components/NOME_DO_ARQUIVO.tsx",
    "ai:service": "rn-ai-optimize src/services/NOME_DO_ARQUIVO.ts",
    "ai:util": "rn-ai-optimize src/utils/NOME_DO_ARQUIVO.ts",
    "ai:analyze": "rn-ai-optimize",
    "ai:help": "rn-ai-optimize --help",
  };

  let added = false;
  for (const [key, value] of Object.entries(newScripts)) {
    if (!packageJson.scripts[key]) {
      packageJson.scripts[key] = value;
      added = true;
    }
  }

  if (added) {
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log("✅ Scripts adicionados ao package.json");
  } else {
    console.log("⚠️  Scripts já existem no package.json");
  }
}

function showWelcomeMessage() {
  console.log(`
🚀 rn-ai-optimize instalado com sucesso!

📦 Scripts adicionados ao seu package.json:
   • npm run ai:screen NOME_DO_ARQUIVO.tsx    - Analisar tela
   • npm run ai:component NOME_DO_ARQUIVO.tsx - Analisar componente  
   • npm run ai:service NOME_DO_ARQUIVO.ts    - Analisar serviço
   • npm run ai:util NOME_DO_ARQUIVO.ts       - Analisar utility
   • npm run ai:analyze                       - Comando interativo
   • npm run ai:help                          - Ajuda

⚙️  Configuração:
   • Arquivo criado: .rn-ai-optimize.json
   • Configure sua OPENAI_API_KEY no .env

🎯 Exemplos de uso:
   npm run ai:screen HomeScreen.tsx
   npm run ai:component Button.tsx
   npx rn-ai-optimize src/screens/Profile.tsx

📚 Documentação: https://github.com/seu-usuario/rn-ai-optimize
`);
}

// Executar setup
async function main() {
  try {
    console.log("🔄 Configurando rn-ai-optimize...");

    createDefaultConfig();
    createEnvExample();
    addScriptsToPackageJson();
    showWelcomeMessage();
  } catch (error) {
    console.error("❌ Erro durante a configuração:", error);
  }
}

main();
