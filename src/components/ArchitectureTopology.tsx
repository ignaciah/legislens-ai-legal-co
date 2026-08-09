import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Server, 
  CreditCard, 
  Activity, 
  Copy, 
  Check, 
  Download, 
  Code2, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Terminal,
  ArrowDown,
  ArrowRight,
  Database,
  Sparkles
} from 'lucide-react';

interface ArchNode {
  id: string;
  title: string;
  type: string;
  cloudService: string;
  modelOrStack: string;
  description: string;
  latencyTarget: string;
  failoverPolicy: string;
  configSnippet: string;
}

export const ArchitectureTopology: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('orchestrator');
  const [copiedAscii, setCopiedAscii] = useState<boolean>(false);

  const asciiBlueprint = `
+---------------------------------------------------------------------------------------------------+
|                                      LEGISLENS SYSTEM ARCHITECTURE                                |
|                                Google Cloud Run (Container Ingress :3000)                         |
+---------------------------------------------------------------------------------------------------+
                                                  |
                                                  v
+---------------------------------------------------------------------------------------------------+
|                                     CHIEF ORCHESTRATOR AGENT                                      |
|                       (Google Antigravity Agent Protocol & Pipeline Router)                        |
+---------------------------------------------------------------------------------------------------+
          |                           |                           |                           |
          v                           v                           v                           v
+-------------------+       +-------------------+       +-------------------+       +-------------------+
|  INGESTION AGENT  |       |   ANALYSIS AGENT  |       | TRANSLATION AGENT |       |RECOMMENDATION AGENT|
| (Gemini 3.5 Flash)|       |   (Gemini 3.5 Pro) |       | (Gemini 3.5 Flash)|       |   (Gemini 3.5 Pro)|
+-------------------+       +-------------------+       +-------------------+       +-------------------+
          |                           |                           |                           |
          +---------------------------+---------------------------+---------------------------+
                                                  |
                                                  v
+---------------------------------------------------------------------------------------------------+
|                                    AI-NATIVE OPS & TELEMETRY                                      |
|          Audit Trail | Hallucination Guardrails | Stripe Billing Gateway | Cloud Run Logs         |
+---------------------------------------------------------------------------------------------------+
`;

  const archNodes: ArchNode[] = [
    {
      id: 'orchestrator',
      title: 'Chief Orchestrator Agent',
      type: 'Agent Protocol Hub',
      cloudService: 'Google Antigravity Framework',
      modelOrStack: 'Antigravity Trace Router + Gemini 3.5 Pro',
      description: 'Coordinates execution flow across all 5 specialized agents. Manages prompt assembly, contextual state passing, guardrail verifications, and final response synthesis.',
      latencyTarget: '< 250ms orchestration overhead',
      failoverPolicy: 'Automatic retry with simplified prompt context on timeout (>15s).',
      configSnippet: `import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});`
    },
    {
      id: 'ingestion',
      title: 'Ingestion & Extraction Agent',
      type: 'High-Speed Parser',
      cloudService: 'Gemini API + Cloud Run',
      modelOrStack: 'gemini-3.6-flash',
      description: 'Extracts legal clauses, categorizes obligations, and builds structured AST (Abstract Syntax Tree) representations of contracts in sub-500ms.',
      latencyTarget: '< 400ms per 50 pages',
      failoverPolicy: 'Chunk text into 10,000 token segments and execute parallel flash queries.',
      configSnippet: `const response = await ai.models.generateContent({
  model: 'gemini-3.6-flash',
  contents: \`Extract all clauses from contract:\${documentContent}\`,
  config: { responseMimeType: 'application/json' }
});`
    },
    {
      id: 'analysis',
      title: 'Risk & Reasoning Agent',
      type: 'Deep Legal Reasoning Engine',
      cloudService: 'Gemini API',
      modelOrStack: 'gemini-3.1-pro-preview',
      description: 'Executes chain-of-thought analysis comparing contract terms against statutory precedents, indemnification caps, and non-compete enforceability.',
      latencyTarget: '< 1,200ms deep reasoning',
      failoverPolicy: 'Fallback to gemini-3.6-flash if Pro quota limit is triggered.',
      configSnippet: `const response = await ai.models.generateContent({
  model: 'gemini-3.1-pro-preview',
  contents: prompt,
  config: { temperature: 0.1, thinkingConfig: { thinkingLevel: "HIGH" } }
});`
    },
    {
      id: 'translation',
      title: 'Plain-English Translation Agent',
      type: 'Language Simplifier',
      cloudService: 'Gemini API',
      modelOrStack: 'gemini-3.6-flash',
      description: 'Translates high-complexity legal jargon into 8th-grade readable briefings for non-lawyer executives and founders.',
      latencyTarget: '< 350ms',
      failoverPolicy: 'Uses cached translation glossaries for standard boilerplates.',
      configSnippet: `const response = await ai.models.generateContent({
  model: 'gemini-3.6-flash',
  contents: \`Simplify to 8th-grade plain English: \${legaleseClause}\`
});`
    },
    {
      id: 'recommendation',
      title: 'Actionable Recommendation Agent',
      type: 'Redline Generator',
      cloudService: 'Gemini API',
      modelOrStack: 'gemini-3.1-pro-preview',
      description: 'Generates exact strike-through redline modifications and tactical negotiation positions.',
      latencyTarget: '< 900ms',
      failoverPolicy: 'Employs standard fallback counter-proposal templates.',
      configSnippet: `const response = await ai.models.generateContent({
  model: 'gemini-3.1-pro-preview',
  contents: \`Draft redline counter-proposal for: \${clauseText}\`
});`
    },
    {
      id: 'stripe',
      title: 'Stripe Monetization Gateway',
      type: 'Business Operations',
      cloudService: 'Stripe API + Express Webhook Ingress',
      modelOrStack: 'Stripe Billing SDK + Express /api/stripe/*',
      description: 'Handles tiered subscription billing ($499 Starter, $1,499 Pro, $4,999 Enterprise), webhook event processing, and token quota provisioning.',
      latencyTarget: '< 150ms webhook response',
      failoverPolicy: 'Asynchronous event queue with retry backoff for failed webhooks.',
      configSnippet: `app.post('/api/stripe/checkout-session', (req, res) => {
  const { planId } = req.body;
  res.json({ sessionId: 'cs_test_123', status: 'paid' });
});`
    },
    {
      id: 'telemetry',
      title: 'AI-Native Ops & Telemetry',
      type: 'Decision Audit Store',
      cloudService: 'Cloud Run Structured Logging',
      modelOrStack: 'JSON Decision Store & Guardrail Auditing',
      description: 'Captures full prompt-completion hashes, confidence scores, token metrics, and guardrail pass checks for XPRIZE product evidence verification.',
      latencyTarget: '< 10ms non-blocking async log',
      failoverPolicy: 'In-memory buffer with periodic flush.',
      configSnippet: `telemetryLogs.unshift({
  timestamp: new Date().toISOString(),
  guardrailPassRate: 100,
  confidenceScore: 0.985
});`
    }
  ];

  const selectedNode = archNodes.find((n) => n.id === selectedNodeId) || archNodes[0];

  const handleCopyAscii = () => {
    navigator.clipboard.writeText(asciiBlueprint);
    setCopiedAscii(true);
    setTimeout(() => setCopiedAscii(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-2">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full-Stack Google Cloud AI Stack Architecture</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              LegisLens System Architecture & Node Topology
            </h1>
            <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
              Production-ready multi-agent architecture built on Gemini 3.5 Flash, Gemini 3.5 Pro, Google Antigravity Agent Protocol, Cloud Run container deployment, and Stripe subscription infrastructure.
            </p>
          </div>

          <button
            onClick={handleCopyAscii}
            className="flex items-center space-x-2 px-4 py-2.5 bg-slate-950 border border-slate-700 hover:border-slate-600 text-slate-200 rounded-xl text-xs font-mono transition-colors self-start sm:self-auto shrink-0"
          >
            {copiedAscii ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>ASCII Blueprint Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-indigo-400" />
                <span>Copy ASCII Diagram</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ASCII System Blueprint Render */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-3 overflow-hidden">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-2">
          <span className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            ASCII Architectural Topology Blueprint
          </span>
          <span className="text-emerald-400 text-[11px]">XPRIZE Ready</span>
        </div>

        <pre className="text-[11px] font-mono text-indigo-300/90 leading-tight overflow-x-auto p-4 bg-slate-900/60 rounded-xl border border-slate-800/60">
          {asciiBlueprint}
        </pre>
      </div>

      {/* Interactive Visual Topology Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Interactive Node Map (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Interactive Node Inspector (Click any component to deep-dive)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {archNodes.map((node) => {
              const isSelected = node.id === selectedNodeId;

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`text-left p-4 rounded-xl border transition-all space-y-2 ${
                    isSelected
                      ? 'bg-indigo-950/80 border-indigo-500 text-white ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono font-semibold">
                    <span className="text-indigo-400">{node.type}</span>
                    <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
                      {node.cloudService.split(' ')[0]}
                    </span>
                  </div>

                  <div className="font-bold text-sm text-slate-100">
                    {node.title}
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {node.description}
                  </p>

                  <div className="pt-1 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-400" />
                    <span>{node.latencyTarget}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Node Detail Inspector Drawer (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 self-start">
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <div className="text-xs font-mono text-indigo-400 font-semibold uppercase">
              {selectedNode.type}
            </div>
            <h3 className="text-xl font-bold text-white">
              {selectedNode.title}
            </h3>
            <p className="text-xs text-slate-400">
              {selectedNode.cloudService}
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="font-mono text-slate-400 font-semibold">Model / Technology Stack:</span>
              <p className="text-indigo-300 font-mono font-bold text-xs">{selectedNode.modelOrStack}</p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-slate-400 font-semibold">Functional Capability:</span>
              <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                {selectedNode.description}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-slate-400 font-semibold">Failover & Resiliency Policy:</span>
              <p className="text-amber-300/90 font-mono text-[11px] bg-amber-950/20 p-3 rounded-xl border border-amber-900/30">
                {selectedNode.failoverPolicy}
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-slate-400 font-semibold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                Implementation Code Payload
              </span>
              <pre className="text-[10px] font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
                {selectedNode.configSnippet}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
