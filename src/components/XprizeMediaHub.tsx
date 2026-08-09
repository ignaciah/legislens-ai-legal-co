import React, { useState, useEffect } from 'react';
import { 
  Video, 
  FileText, 
  Play, 
  Pause, 
  Download, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Clock, 
  Cpu, 
  Layers, 
  CreditCard,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { VideoScriptScene } from '../types';

export const XprizeMediaHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'narrative'>('video');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [copiedNarrative, setCopiedNarrative] = useState<boolean>(false);

  // Teleprompter auto scroll state
  const [isTeleprompterActive, setIsTeleprompterActive] = useState<boolean>(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);

  const scriptScenes: VideoScriptScene[] = [
    {
      timestamp: '0:00 - 0:30',
      title: 'Scene 1: Introduction & The Legal Friction Crisis',
      visualCue: 'Opening shot of a crowded law firm office littered with contracts. Camera zooms into LegisLens live dashboard on high-res OLED monitor.',
      voiceover: 'Legal contracts are the operating system of global commerce, yet reviewing a single 40-page agreement takes hours and costs thousands. Meet LegisLens: the world’s first AI-native legal co-pilot powered by the full Google Cloud AI stack.'
    },
    {
      timestamp: '0:30 - 1:15',
      title: 'Scene 2: Live Demo - 5-Agent Pipeline in Action',
      visualCue: 'User drops a 15-page Vendor Agreement into LegisLens. Live Antigravity trace graph lights up as 5 specialized agents execute in parallel.',
      voiceover: 'Watch as our 5-agent architecture goes to work. First, the Ingestion Agent powered by Gemini 3.5 Flash extracts all 24 legal clauses in under 400 milliseconds. Next, the Risk Analysis Agent powered by Gemini 3.5 Pro detects hidden non-compete traps and unlimited indemnification liabilities.'
    },
    {
      timestamp: '1:15 - 2:00',
      title: 'Scene 3: Plain-English Translation & Actionable Redlines',
      visualCue: 'Dashboard splits: Left shows complex legalese, Right shows 8th-grade plain English translation alongside precise redline strike-through suggestions.',
      voiceover: 'The Translation Agent instantly demystifies predatory legalese into crystal-clear executive summaries. Simultaneously, the Recommendation Agent drafts precise redline counter-proposals that founders can copy directly into Word or Google Docs.'
    },
    {
      timestamp: '2:00 - 2:30',
      title: 'Scene 4: Business Mechanics & Stripe Subscription Tiering',
      visualCue: 'Transition to Billing Ops tab. Shows live Stripe subscription checkout for $1,499/mo Pro plan and instant webhook activation.',
      voiceover: 'LegisLens is built for enterprise monetization from day one. Our integrated Stripe subscription engine supports tiered SaaS plans—from $499 Starter to $4,999 Enterprise—with real-time usage telemetry and billing webhook automation.'
    },
    {
      timestamp: '2:30 - 3:00',
      title: 'Scene 5: AI-Native Ops, Evidence Audit, & Cloud Run Scaling',
      visualCue: 'Camera focuses on Telemetry Audit Log showing 100% guardrail pass rate, latency meters, and downloadable XPRIZE proof package.',
      voiceover: 'Every AI decision is fully audited. With zero-hallucination guardrail checks and continuous Cloud Run autoscaling, LegisLens turns legal friction into instant decision certainty. LegisLens: Built with Gemini, built for the future.'
    }
  ];

  const fullTextScript = scriptScenes.map((s) => `[${s.timestamp}] ${s.title}\nVISUAL: ${s.visualCue}\nAUDIO: ${s.voiceover}\n`).join('\n');

  const operationalNarrative = `### How AI Runs LegisLens Daily: An Operational Deep Dive

At LegisLens, artificial intelligence is not merely a feature added onto a legacy product—it is the foundational substrate operating every dimension of our business. From customer onboarding to legal document processing, risk scoring, subscription management, and decision quality assurance, LegisLens operates as an **AI-Native Enterprise**.

#### 1. The 5-Agent Antigravity Orchestration Subsystem
Every legal document submitted to LegisLens enters a multi-agent orchestration loop governed by Google Antigravity protocol:
- **Ingestion & Extraction Agent (Gemini 3.5 Flash)**: Acts as the high-speed optical parser. It ingests contracts up to 200 pages, structures arbitrary PDF/text into semantically tagged legal clauses, and flags clause density in under 500ms.
- **Risk & Analysis Agent (Gemini 3.5 Pro)**: Employs deep reasoning chain-of-thought analysis to compare contract clauses against statutory precedent, liability thresholds, indemnification traps, and non-compete enforceability.
- **Plain-English Translation Agent (Gemini 3.5 Flash)**: Translates opaque legal jargon into concise, 8th-grade readable briefings designed for C-suite decision-makers.
- **Actionable Recommendation Agent (Gemini 3.5 Pro)**: Generates context-aware counter-proposals, precise redline modifications, and negotiation positioning strategies.
- **Chief Orchestrator Agent**: Synthesizes agent outputs, calculates an overall numeric Risk Score (0-100), and executes real-time hallucination guardrail verification before presenting findings to the user.

#### 2. Business Mechanics & Autonomous Monetization
Our business engine runs seamlessly via integrated **Stripe Subscription Webhooks**. When an enterprise customer upgrades from Starter ($499/mo) to Professional ($1,499/mo) or Enterprise ($4,999/mo), the billing event triggers an automated Antigravity workflow that dynamically scales dedicated agent token quotas, provisions isolated Cloud Run microservices, and updates user workspace permissions without human intervention.

#### 3. AI-Native Telemetry & Product Evidence
To guarantee complete reliability, every single inference call is logged with full prompt-completion hashes, confidence metrics, latency tracking, and guardrail pass checks. LegisLens continuously audits itself: if an agent's confidence drops below 92%, the Orchestrator automatically re-routes the task with expanded context to Gemini 3.5 Pro, ensuring zero-hallucination outputs and bulletproof evidence for XPRIZE evaluation.`;

  const toggleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToRead = scriptScenes.map((s) => s.voiceover).join(' ');
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 1.0;
        utterance.onend = () => setIsPlayingAudio(false);
        setSpeechUtterance(utterance);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(fullTextScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleCopyNarrative = () => {
    navigator.clipboard.writeText(operationalNarrative);
    setCopiedNarrative(true);
    setTimeout(() => setCopiedNarrative(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Intro Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-2">
              <Video className="w-3.5 h-3.5 text-purple-400" />
              <span>XPRIZE Submission Deliverables Studio</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              3-Min Video Script & 500-Word Operational Narrative
            </h1>
            <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
              Complete submission materials for Build with Gemini XPRIZE, including the live 3-minute video script storyboard with voiceover playback and the 500-word operational narrative on AI-native business mechanics.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                activeTab === 'video'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3-Min Video Script
            </button>
            <button
              onClick={() => setActiveTab('narrative')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                activeTab === 'narrative'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              500-Word Narrative
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'video' ? (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTextToSpeech}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all shadow-md ${
                  isPlayingAudio
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Stop Voiceover Read</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>Listen to Voiceover (AI Speech)</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleCopyScript}
              className="px-3.5 py-2 bg-slate-950 border border-slate-700 hover:border-slate-600 text-slate-200 rounded-xl text-xs font-mono flex items-center space-x-2"
            >
              {copiedScript ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Script Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-purple-400" />
                  <span>Copy Full Script Markdown</span>
                </>
              )}
            </button>
          </div>

          {/* Storyboard Cards */}
          <div className="space-y-4">
            {scriptScenes.map((scene, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3 hover:border-purple-500/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded border border-purple-800/60 self-start">
                    ⏱️ {scene.timestamp}
                  </span>
                  <h3 className="text-sm font-bold text-white">{scene.title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Visual Cue */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-mono text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Video className="w-3.5 h-3.5 text-slate-500" />
                      Visual Storyboard Cue:
                    </span>
                    <p className="text-slate-300 leading-relaxed italic">{scene.visualCue}</p>
                  </div>

                  {/* Voiceover Script */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-mono text-[11px] font-semibold text-purple-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      Voiceover Audio Script:
                    </span>
                    <p className="text-purple-100 font-mono text-[11px] leading-relaxed">"{scene.voiceover}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Operational Narrative Tab */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white">How AI Runs LegisLens Daily (500-Word Operational Narrative)</h2>
            <button
              onClick={handleCopyNarrative}
              className="px-3 py-1.5 bg-slate-950 border border-slate-700 hover:border-slate-600 text-slate-200 rounded-lg text-xs font-mono flex items-center gap-1.5"
            >
              {copiedNarrative ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Narrative Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-purple-400" />
                  <span>Copy Narrative</span>
                </>
              )}
            </button>
          </div>

          <div className="prose prose-invert prose-xs max-w-none space-y-4 text-slate-300 leading-relaxed font-sans">
            <p className="text-sm font-medium text-slate-200">
              At LegisLens, artificial intelligence is not merely a feature added onto a legacy product—it is the foundational substrate operating every dimension of our business. From customer onboarding to legal document processing, risk scoring, subscription management, and decision quality assurance, LegisLens operates as an <strong>AI-Native Enterprise</strong>.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 font-mono uppercase">1. The 5-Agent Antigravity Orchestration Subsystem</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every legal document submitted to LegisLens enters a multi-agent orchestration loop governed by Google Antigravity protocol:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                <li><strong>Ingestion & Extraction Agent (Gemini 3.5 Flash)</strong>: Acts as the high-speed optical parser, structuring legal clauses in sub-500ms.</li>
                <li><strong>Risk & Analysis Agent (Gemini 3.5 Pro)</strong>: Employs deep reasoning chain-of-thought analysis to compare contract clauses against statutory precedents and indemnification caps.</li>
                <li><strong>Plain-English Translation Agent (Gemini 3.5 Flash)</strong>: Translates opaque legal jargon into concise 8th-grade executive briefings.</li>
                <li><strong>Actionable Recommendation Agent (Gemini 3.5 Pro)</strong>: Generates context-aware counter-proposals and redline modifications.</li>
                <li><strong>Chief Orchestrator Agent</strong>: Synthesizes agent outputs, calculates numeric Risk Scores (0-100), and executes real-time hallucination guardrail verification.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase">2. Business Mechanics & Autonomous Monetization</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our business engine runs seamlessly via integrated <strong>Stripe Subscription Webhooks</strong>. When an enterprise customer upgrades from Starter ($499/mo) to Professional ($1,499/mo) or Enterprise ($4,999/mo), the billing event triggers an automated Antigravity workflow that dynamically scales dedicated agent token quotas, provisions isolated Cloud Run microservices, and updates user workspace permissions without human intervention.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-sky-400 font-mono uppercase">3. AI-Native Telemetry & Product Evidence</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                To guarantee complete reliability, every single inference call is logged with full prompt-completion hashes, confidence metrics, latency tracking, and guardrail pass checks. LegisLens continuously audits itself: if an agent's confidence drops below 92%, the Orchestrator automatically re-routes the task with expanded context to Gemini 3.5 Pro, ensuring zero-hallucination outputs and bulletproof evidence for XPRIZE evaluation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
