import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { AgentCopilotStudio } from './components/AgentCopilotStudio';
import { ArchitectureTopology } from './components/ArchitectureTopology';
import { StripeBillingOps } from './components/StripeBillingOps';
import { TelemetryAuditLogs } from './components/TelemetryAuditLogs';
import { XprizeMediaHub } from './components/XprizeMediaHub';
import { AnalysisResult } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('copilot');
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top Fixed Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'copilot' && (
          <AgentCopilotStudio onAnalysisComplete={(res) => setLastAnalysis(res)} />
        )}
        {activeTab === 'architecture' && <ArchitectureTopology />}
        {activeTab === 'stripe' && <StripeBillingOps />}
        {activeTab === 'telemetry' && <TelemetryAuditLogs />}
        {activeTab === 'xprize' && <XprizeMediaHub />}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/80 py-6 text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>LegisLens MVP • Built for Build with Gemini XPRIZE</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] text-slate-500">
            <span>Gemini 3.5 Flash & Pro</span>
            <span>Google Antigravity Protocol</span>
            <span>Cloud Run Service ID: 792d8f6b</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
