export type AgentType = 
  | 'ingestion'
  | 'analysis'
  | 'translation'
  | 'recommendation'
  | 'orchestrator';

export type AgentStatus = 'idle' | 'active' | 'completed' | 'error';

export interface AgentState {
  id: AgentType;
  name: string;
  role: string;
  model: string;
  status: AgentStatus;
  progress: number; // 0 to 100
  latencyMs?: number;
  tokensUsed?: number;
  confidenceScore?: number;
  lastOutput?: string;
  details?: string;
}

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';

export interface LegalClause {
  id: string;
  title: string;
  originalText: string;
  riskLevel: RiskLevel;
  riskCategory: string; // e.g. 'Indemnification', 'IP Rights', 'Liability Cap', 'Termination'
  issueSummary: string;
  plainEnglishTranslation: string;
  actionableRecommendation: string;
  suggestedRedline?: string;
}

export interface GuardrailCheck {
  id: string;
  checkName: string;
  passed: boolean;
  score: number; // 0-100
  description: string;
}

export interface AnalysisResult {
  documentId: string;
  documentTitle: string;
  documentType: string;
  overallRiskScore: number; // 0-100
  riskSummary: string;
  clauses: LegalClause[];
  plainLanguageOverview: string;
  strategicRecommendations: string[];
  guardrailChecks: GuardrailCheck[];
  orchestrationSummary: string;
  totalTokens: number;
  totalLatencyMs: number;
  modelBreakdown: {
    flashTokens: number;
    proTokens: number;
  };
  timestamp: string;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  documentTitle: string;
  agentId: AgentType;
  model: string;
  promptTokens: number;
  completionTokens: number;
  latencyMs: number;
  confidenceScore: number;
  guardrailPassRate: number;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  decisionSummary: string;
}

export interface SubscriptionTier {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  agentLimits: string;
  slAs: string;
  popular?: boolean;
}

export interface VideoScriptScene {
  timestamp: string;
  title: string;
  visualCue: string;
  voiceover: string;
  agentHighlight?: AgentType;
}

export interface SampleDocument {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  expectedRiskLevel: 'HIGH' | 'CRITICAL' | 'MEDIUM';
}
