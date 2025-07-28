export interface AnalysisResult {
  filePath: string;
  analysis: string;
  timestamp: string;
  model: string;
  batchMode?: boolean;
}
