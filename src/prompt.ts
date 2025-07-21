export function buildPrompt(
  code: string,
  language: string,
  projectType: string,
  version: string,
  model: string,
  filename: string
): string {
  const languagePrompt = language === "pt" ? "pt-BR" : "en-US";

  return `
  You are a code‐quality expert in ${projectType}, using ${language} (v${version}) on the ${model} model.  
  Analyze the file named “${filename}” between the markers below and return in Markdown:

  --- CODE START ---
  ${code}
  --- CODE END ---

  **1. File Overview**  
  - One‑sentence summary of what this file does.

  **2. Quality Metrics**  
  Provide a value (e.g. “▶ Readability: 7/10”) for _each_ of:
  - Readability  
  - Maintainability  
  - Complexity  
  - Conformance to ${projectType} best practices  
  - Performance  
  - Security  

  **3. Overall Score**  
  - Overall rating (0–10) with a one‑sentence justification.

  **4. Issues Found**  
  _Find at least **3 distinct issues**._  
  For each issue, include:
  - **Title** (e.g. “Inefficient re‑rendering”)  
  - **Severity**: Low / Medium / High  
  - **Lines**: <code>Lines X–Y</code>  
  - **Original snippet**:  <code> // snippet here </code> 
  - **Problem**: one‑sentence explanation 
  - **Refactored snippet**:  <code> // improved code here </code>  
  - **Improvement rationale**: one‑sentence why this fixes it
    
   **5. Recommendations & Next Steps** 
    - List any tools or docs to measure and enforce these improvements.

  **Additional Instructions:**  
  -Do not rewrite the entire file—only the minimal snippets needed. Return in ${languagePrompt}.
  - Do NOT include:
  - markdown code blocks ('\`\`\`')
  
  `;
}

export const buildPromptTerminal = (result: string): string => `
You are a code quality and performance expert.
Analyze the following report and return ONLY a valid JSON object (no markdown, no code blocks, no explanations).

CRITICAL: Return ONLY the JSON object without any markdown formatting or code blocks.

Required format (exactly like this):
{"score": X, "issues": Y, "improvement": Z}

Where:
- score: overall score (0–10)
- issues: number of issues found  
- improvement: average improvement potential as percentage (without % sign)

Do NOT include:
- markdown code blocks ('\`\`\`json')
- any explanations
- any text before or after the JSON
- any formatting except the raw JSON

Report to analyze:
${result}
`;
