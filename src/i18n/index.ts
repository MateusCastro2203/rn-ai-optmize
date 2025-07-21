import i18next from "i18next";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const language = process.env.LANG?.startsWith("pt") ? "pt" : "en";

await i18next.init({
  lng: language,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: JSON.parse(
        fs.readFileSync(path.join(__dirname, "en.json"), "utf8")
      ),
    },
    pt: {
      translation: JSON.parse(
        fs.readFileSync(path.join(__dirname, "pt.json"), "utf8")
      ),
    },
  },
});

export const t = i18next.t;
