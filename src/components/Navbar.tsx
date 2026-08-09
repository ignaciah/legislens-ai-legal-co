import React from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  Layers, 
  CreditCard, 
  Activity, 
  Video, 
  FileText,
  Sparkles,
  CheckCircle2,
  Server
} from 'lucide-react';

export type ActiveTab = 'copilot' | 'architecture' | 'stripe' | 'telemetry' | 'xprize';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isAnalyzing?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isAnalyzing }) => {
  return (
    <header className="bg-slate-950 text-slate-100 border-b border-slate-800 sticky top-0 z-50 shadow-xl backdrop-blur-md bg-opacity-95">
      {/* Top Banner for XPRIZE Submission Context */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 border-b border-indigo-500/30 px-4 py-1.5 text-xs text-indigo-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-mono font-semibold border border-indigo-400/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            BUILD WITH GEMINI XPRIZE
          </span>
          <span className="hidden sm:inline text-slate-300">
            Official Production MVP Submission: AI-Native Legal Co-Pilot
          </span>
        </div>
        <div className="flex items-center space-x-4 font-mono text-[11px]">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cloud Run Live
          </span>
          <span className="hidden md:flex items-center gap-1 text-sky-300">
            <Server className="w-3 h-3" />
            Gemini 3.5 Flash + Pro
          </span>
          <span className="hidden lg:flex items-center gap-1 text-purple-300">
            <Cpu className="w-3 h-3" />
            Antigravity Protocol
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveTab('copilot')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-sky-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-indigo-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  Legis<span className="text-indigo-400">Lens</span>
                </span>
                <span className="bg-indigo-950 text-indigo-300 text-[10px] font-mono px-1.5 py-0.5 rounded border border-indigo-800/60 font-semibold">
                  MVP v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                AI-Native Legal Co-Pilot System
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('copilot')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'copilot'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span className="hidden md:inline">5-Agent Co-Pilot</span>
              <span className="md:hidden">Co-Pilot</span>
              {isAnalyzing && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'architecture'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden md:inline">Architecture Topology</span>
              <span className="md:hidden">Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab('stripe')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'stripe'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden md:inline">Stripe Billing Ops</span>
              <span className="md:hidden">Stripe</span>
            </button>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'telemetry'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span className="hidden md:inline">AI Telemetry</span>
              <span className="md:hidden">Telemetry</span>
            </button>

            <button
              onClick={() => setActiveTab('xprize')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'xprize'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-purple-300 hover:text-white hover:bg-purple-950/60 border border-purple-800/40'
              }`}
            >
              <Video className="w-4 h-4 text-purple-300" />
              <span className="hidden md:inline">XPRIZE Studio</span>
              <span className="md:hidden">Media</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
