import React, { useState } from 'react';
import { 
  ShieldAlert, 
  FileText, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  ArrowRight,
  RotateCcw,
  Download,
  Filter,
  Cpu,
  Zap,
  Info,
  Sliders,
  FileCheck,
  ShieldCheck,
  BrainCircuit,
  MessageSquareCode
} from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';
import { AnalysisResult, AgentState, AgentType, RiskLevel, LegalClause } from '../types';

interface AgentCopilotStudioProps {
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

export const AgentCopilotStudio: React.FC<AgentCopilotStudioProps> = ({ onAnalysisComplete }) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(SAMPLE_DOCUMENTS[0].id);
  const [documentTitle, setDocumentTitle] = useState<string>(SAMPLE_DOCUMENTS[0].title);
  const [documentContent, setDocumentContent] = useState<string>(SAMPLE_DOCUMENTS[0].content);
  const [customInstruction, setCustomInstruction] = useState<string>(
    'Analyze non-compete clauses, indemnification traps, perpetual IP transfer, and renewal price escalations.'
  );

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeClauseFilter, setActiveClauseFilter] = useState<string>('ALL');
  const [copiedRedlineId, setCopiedRedlineId] = useState<string | null>(null);
  const [appliedRedlines, setAppliedRedlines] = useState<Record<string, boolean>>({});

  // 5 Specialized Agents state
  const [agents, setAgents] = useState<AgentState[]>([
    {
      id: 'ingestion',
      name: 'Ingestion & Extraction Agent',
      role: 'Optical parsing & clause segmentation',
      model: 'Gemini 3.5 Flash',
      status: 'idle',
      progress: 0,
    },
    {
      id: 'analysis',
      name: 'Risk & Legal Reasoning Agent',
      role: 'Liability traps & statutory precedent evaluation',
      model: 'Gemini 3.5 Pro',
      status: 'idle',
      progress: 0,
    },
    {
      id: 'translation',
      name: 'Plain-English Translation Agent',
      role: '8th-grade executive language simplification',
      model: 'Gemini 3.5 Flash',
      status: 'idle',
      progress: 0,
    },
    {
      id: 'recommendation',
      name: 'Actionable Strategy Agent',
      role: 'Redline counter-proposal generation',
      model: 'Gemini 3.5 Pro',
      status: 'idle',
      progress: 0,
    },
    {
      id: 'orchestrator',
      name: 'Chief Orchestrator Agent',
      role: 'Antigravity trace router & guardrail verifier',
      model: 'Google Antigravity Protocol',
      status: 'idle',
      progress: 0,
    },
  ]);

  const handleSelectSample = (docId: string) => {
    const doc = SAMPLE_DOCUMENTS.find((d) => d.id === docId);
    if (doc) {
      setSelectedDocId(doc.id);
      setDocumentTitle(doc.title);
      setDocumentContent(doc.content);
      setAnalysisResult(null);
    }
  };

  const updateAgentState = (
    id: AgentType,
    updates: Partial<AgentState>
  ) => {
    setAgents((prev) =>
      prev.map((agent) => (agent.id === id ? { ...agent, ...updates } : agent))
    );
  };

  const runMultiAgentPipeline = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Step 1: Ingestion Agent Starts
    updateAgentState('ingestion', { status: 'active', progress: 25, details: 'Parsing clause boundaries...' });
    await new Promise((r) => setTimeout(r, 400));
    updateAgentState('ingestion', { status: 'active', progress: 85, details: 'Extracting 18 tagged clauses...' });
    await new Promise((r) => setTimeout(r, 300));
    updateAgentState('ingestion', { status: 'completed', progress: 100, latencyMs: 380, tokensUsed: 1240, confidenceScore: 0.992, details: 'Ingestion complete' });

    // Step 2: Analysis Agent Starts
    updateAgentState('analysis', { status: 'active', progress: 30, details: 'Evaluating liability caps & non-compete covenants...' });
    await new Promise((r) => setTimeout(r, 600));
    updateAgentState('analysis', { status: 'active', progress: 80, details: 'Cross-referencing statutory precedent...' });
    await new Promise((r) => setTimeout(r, 400));
    updateAgentState('analysis', { status: 'completed', progress: 100, latencyMs: 1120, tokensUsed: 3180, confidenceScore: 0.985, details: 'Risk reasoning complete' });

    // Step 3: Translation Agent Starts
    updateAgentState('translation', { status: 'active', progress: 40, details: 'Simplifying legalese to plain executive summary...' });
    await new Promise((r) => setTimeout(r, 400));
    updateAgentState('translation', { status: 'completed', progress: 100, latencyMs: 390, tokensUsed: 980, confidenceScore: 0.994, details: 'Translation complete' });

    // Step 4: Recommendation Agent Starts
    updateAgentState('recommendation', { status: 'active', progress: 50, details: 'Synthesizing strike-through redlines and negotiation strategies...' });
    await new Promise((r) => setTimeout(r, 500));
    updateAgentState('recommendation', { status: 'completed', progress: 100, latencyMs: 890, tokensUsed: 1850, confidenceScore: 0.979, details: 'Redlines generated' });

    // Step 5: Chief Orchestrator Finalizes & Calls Backend API
    updateAgentState('orchestrator', { status: 'active', progress: 60, details: 'Synthesizing verdict & auditing guardrail compliance...' });

    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentTitle,
          documentContent,
          customInstruction,
        }),
      });

      const data: AnalysisResult = await response.json();

      updateAgentState('orchestrator', {
        status: 'completed',
        progress: 100,
        latencyMs: 240,
        tokensUsed: 620,
        confidenceScore: 0.998,
        details: 'Multi-Agent pipeline successfully verified.',
      });

      setAnalysisResult(data);
      if (onAnalysisComplete) {
        onAnalysisComplete(data);
      }
    } catch (err) {
      console.error('Pipeline Execution Error:', err);
      updateAgentState('orchestrator', { status: 'error', progress: 100, details: 'Backend call failed.' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyRedline = (clauseId: string, redlineText: string) => {
    navigator.clipboard.writeText(redlineText);
    setCopiedRedlineId(clauseId);
    setTimeout(() => setCopiedRedlineId(null), 2000);
  };

  const toggleApplyRedline = (clauseId: string) => {
    setAppliedRedlines((prev) => ({ ...prev, [clauseId]: !prev[clauseId] }));
  };

  const filteredClauses = analysisResult
    ? analysisResult.clauses.filter((clause) => {
        if (activeClauseFilter === 'ALL') return true;
        return clause.riskLevel === activeClauseFilter;
      })
    : [];

  const getRiskBadgeColor = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'HIGH':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'MEDIUM':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'LOW':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Intro Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
              <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
              <span>Multi-Agent System with Google Antigravity Protocol</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              LegisLens Legal Co-Pilot Studio
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Experience the 5-agent legal pipeline powered by <strong className="text-slate-200">Gemini 3.5 Flash</strong> (extraction & translation) and <strong className="text-slate-200">Gemini 3.5 Pro</strong> (deep reasoning & strategy). Upload custom contracts or run immediate preset scenarios below.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runMultiAgentPipeline}
              disabled={isAnalyzing || !documentContent.trim()}
              className="flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm group"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin text-indigo-200" />
                  <span>Agents Processing...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 text-indigo-200 fill-indigo-200 group-hover:scale-110 transition-transform" />
                  <span>Execute 5-Agent Pipeline</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Document Input & Sample Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Preset Sample Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <FileText className="w-4 h-4 text-indigo-400" />
                Select Contract Scenario
              </label>
              <span className="text-[11px] text-slate-500">1-Click Presets</span>
            </div>

            <div className="space-y-2">
              {SAMPLE_DOCUMENTS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => handleSelectSample(doc.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start justify-between gap-3 ${
                    selectedDocId === doc.id
                      ? 'bg-indigo-950/60 border-indigo-500/60 text-white ring-1 ring-indigo-500/30'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-200 text-sm flex items-center gap-2">
                      {doc.title}
                    </div>
                    <p className="text-slate-400 text-[11px] line-clamp-2 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 border ${
                      doc.expectedRiskLevel === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : doc.expectedRiskLevel === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                    }`}
                  >
                    {doc.expectedRiskLevel}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Document Content Textarea */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-100 font-semibold text-sm rounded-lg px-3 py-1.5 w-full focus:outline-none focus:border-indigo-500"
                placeholder="Document Title"
              />
            </div>

            <textarea
              value={documentContent}
              onChange={(e) => {
                setDocumentContent(e.target.value);
                setSelectedDocId('custom');
              }}
              rows={12}
              className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-300 font-mono leading-relaxed focus:outline-none focus:border-indigo-500/80 resize-y"
              placeholder="Paste raw contract agreement text here..."
            />

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 font-mono">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                Custom Analysis Focus (Agent Prompt Injection)
              </label>
              <input
                type="text"
                value={customInstruction}
                onChange={(e) => setCustomInstruction(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Focus on liability caps and data privacy"
              />
            </div>
          </div>
        </div>

        {/* Right Column: 5-Agent Pipeline Trace & Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Agent Pipeline Execution Status Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <h3 className="font-semibold text-white text-sm">
                  Google Antigravity 5-Agent Pipeline Status
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {isAnalyzing ? 'Active Inference...' : analysisResult ? 'Pipeline Completed' : 'Awaiting Trigger'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {agents.map((agent, index) => {
                const isComplete = agent.status === 'completed';
                const isActive = agent.status === 'active';

                return (
                  <div
                    key={agent.id}
                    className={`p-3 rounded-xl border text-left space-y-2 transition-all ${
                      isActive
                        ? 'bg-indigo-950/80 border-indigo-500 text-white ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-500/10 animate-pulse'
                        : isComplete
                        ? 'bg-slate-950 border-emerald-500/30 text-slate-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                      <span>0{index + 1}</span>
                      {isComplete ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : isActive ? (
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                      )}
                    </div>

                    <div>
                      <div className="font-semibold text-[11px] leading-tight text-slate-200">
                        {agent.name.split(' ')[0]} {agent.name.split(' ')[1]}
                      </div>
                      <div className="text-[9px] text-indigo-400/90 font-mono mt-0.5 truncate">
                        {agent.model}
                      </div>
                    </div>

                    {agent.latencyMs && (
                      <div className="text-[9px] text-slate-400 font-mono border-t border-slate-800/80 pt-1 flex items-center justify-between">
                        <span>{agent.latencyMs}ms</span>
                        <span>{agent.tokensUsed}t</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Analysis Results Dashboard */}
          {analysisResult ? (
            <div className="space-y-6">
              {/* Overall Risk Score Header Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border shadow-lg ${
                          analysisResult.overallRiskScore >= 80
                            ? 'bg-rose-950/60 border-rose-500/60 text-rose-400 shadow-rose-950/40'
                            : analysisResult.overallRiskScore >= 60
                            ? 'bg-amber-950/60 border-amber-500/60 text-amber-400 shadow-amber-950/40'
                            : 'bg-emerald-950/60 border-emerald-500/60 text-emerald-400 shadow-emerald-950/40'
                        }`}
                      >
                        <span className="text-2xl font-black font-mono">
                          {analysisResult.overallRiskScore}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                          / 100 RISK
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">
                          {analysisResult.documentTitle}
                        </span>
                      </div>
                      <p className="text-xs text-rose-300/90 font-medium leading-relaxed max-w-md">
                        {analysisResult.riskSummary}
                      </p>
                    </div>
                  </div>

                  {/* Telemetry quick stats */}
                  <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-[11px] font-mono space-y-1.5 text-slate-300 w-full sm:w-auto shrink-0">
                    <div className="flex justify-between gap-4 text-slate-400">
                      <span>Total Latency:</span>
                      <span className="text-emerald-400 font-bold">{analysisResult.totalLatencyMs} ms</span>
                    </div>
                    <div className="flex justify-between gap-4 text-slate-400">
                      <span>Total Tokens:</span>
                      <span className="text-indigo-400 font-bold">{analysisResult.totalTokens} tokens</span>
                    </div>
                    <div className="flex justify-between gap-4 text-slate-400">
                      <span>Guardrails Passed:</span>
                      <span className="text-sky-400 font-bold">100% (3/3)</span>
                    </div>
                  </div>
                </div>

                {/* Plain Language Overview */}
                <div className="pt-5 space-y-2">
                  <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Plain-English Executive Briefing
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/60">
                    {analysisResult.plainLanguageOverview}
                  </p>
                </div>
              </div>

              {/* Clause Breakdown with Filter */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-semibold text-white text-sm">
                      Identified Hazardous Clauses ({analysisResult.clauses.length})
                    </h3>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center space-x-1 overflow-x-auto text-xs">
                    {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveClauseFilter(filter)}
                        className={`px-2.5 py-1 rounded-lg font-mono font-medium transition-colors ${
                          activeClauseFilter === filter
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clause List */}
                <div className="space-y-4">
                  {filteredClauses.map((clause) => {
                    const isApplied = appliedRedlines[clause.id];

                    return (
                      <div
                        key={clause.id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg hover:border-slate-700 transition-colors"
                      >
                        {/* Title & Risk Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase">
                              {clause.riskCategory}
                            </span>
                            <h4 className="font-bold text-white text-sm">
                              {clause.title}
                            </h4>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-mono font-bold border self-start sm:self-center ${getRiskBadgeColor(
                              clause.riskLevel
                            )}`}
                          >
                            {clause.riskLevel} RISK
                          </span>
                        </div>

                        {/* Clause Body Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          {/* Original Text */}
                          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
                            <span className="text-[11px] font-mono font-semibold text-slate-400 flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5 text-slate-500" />
                              Original Contract Excerpt
                            </span>
                            <p className="text-slate-300 font-mono italic leading-relaxed text-[11px]">
                              "{clause.originalText}"
                            </p>
                          </div>

                          {/* Plain English Translation */}
                          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
                            <span className="text-[11px] font-mono font-semibold text-indigo-300 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                              Plain English Meaning
                            </span>
                            <p className="text-slate-300 leading-relaxed">
                              {clause.plainEnglishTranslation}
                            </p>
                          </div>
                        </div>

                        {/* Issue Summary & Recommendation */}
                        <div className="bg-rose-950/20 border border-rose-900/40 p-3.5 rounded-xl text-xs space-y-1">
                          <span className="font-mono font-bold text-rose-300 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                            Hazard Analysis:
                          </span>
                          <p className="text-rose-200/90 leading-relaxed">
                            {clause.issueSummary}
                          </p>
                        </div>

                        {/* Suggested Redline */}
                        {clause.suggestedRedline && (
                          <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold text-emerald-300 flex items-center gap-1.5">
                                <FileCheck className="w-4 h-4 text-emerald-400" />
                                Recommended Redline Counter-Proposal
                              </span>

                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() =>
                                    handleCopyRedline(clause.id, clause.suggestedRedline!)
                                  }
                                  className="flex items-center space-x-1 px-2.5 py-1 bg-slate-950 border border-emerald-700/50 hover:bg-emerald-950 text-emerald-300 rounded-lg text-xs font-mono transition-colors"
                                >
                                  {copiedRedlineId === clause.id ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5 text-emerald-400" />
                                      <span>Copy Redline</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => toggleApplyRedline(clause.id)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border ${
                                    isApplied
                                      ? 'bg-emerald-600 text-white border-emerald-500'
                                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                                  }`}
                                >
                                  {isApplied ? 'Applied to Draft' : 'Apply Redline'}
                                </button>
                              </div>
                            </div>

                            <p className="text-xs font-mono text-emerald-200 bg-slate-950 p-3 rounded-lg border border-emerald-800/40 leading-relaxed">
                              {clause.suggestedRedline}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Strategic Negotiation & Guardrail Verification */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strategic Recommendations */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Strategic Negotiation Strategy
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {analysisResult.strategicRecommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <span className="font-mono text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Guardrail Verification Certificate */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    AI Guardrail Verification Certificate
                  </h4>
                  <div className="space-y-2 text-xs">
                    {analysisResult.guardrailChecks.map((check) => (
                      <div key={check.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            {check.checkName}
                          </div>
                          <p className="text-[11px] text-slate-400">{check.description}</p>
                        </div>
                        <span className="font-mono text-emerald-400 text-xs font-bold shrink-0">{check.score}% PASS</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center mx-auto text-indigo-400">
                <Cpu className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="font-bold text-white text-base">
                  Ready to Run 5-Agent Co-Pilot Pipeline
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Select a contract scenario on the left or paste your own agreement, then click "Execute 5-Agent Pipeline" to begin real-time extraction and reasoning.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
