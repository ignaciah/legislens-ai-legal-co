import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  Zap, 
  ShieldCheck, 
  Lock, 
  RefreshCw, 
  Terminal, 
  Code2, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ArrowRight,
  Send,
  Building2,
  DollarSign
} from 'lucide-react';
import { SubscriptionTier } from '../types';

export const StripeBillingOps: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<any | null>(null);

  // Webhook Simulator state
  const [webhookEvent, setWebhookEvent] = useState<string>('customer.subscription.created');
  const [webhookLog, setWebhookLog] = useState<any | null>(null);
  const [isFiringWebhook, setIsFiringWebhook] = useState<boolean>(false);

  const tiers: SubscriptionTier[] = [
    {
      id: 'starter',
      name: 'Starter Tier',
      tagline: 'Ideal for boutique law firms & early-stage startups',
      priceMonthly: 499,
      priceYearly: 399,
      features: [
        'Ingestion Agent (Gemini 3.5 Flash)',
        'Up to 100 contracts per month',
        'Standard Risk Analysis & Plain English Summaries',
        'Email Support (24h SLA)',
        'Standard Security & Single-User Access'
      ],
      agentLimits: '100 Document Runs/mo',
      slAs: '24-hour response time'
    },
    {
      id: 'pro',
      name: 'Professional Tier',
      tagline: 'For high-growth scaleups & busy legal departments',
      priceMonthly: 1499,
      priceYearly: 1199,
      popular: true,
      features: [
        'Full 5-Agent Pipeline (Gemini Flash + Pro)',
        'Unlimited Document Ingestion',
        'Actionable Redlines & Counter-Proposal Generation',
        'AI Guardrail Verification & Real-Time Telemetry Audit',
        'Priority SLA (1-hour response)',
        'Multi-User Team Workspaces & Export Tools'
      ],
      agentLimits: 'Unlimited Document Runs',
      slAs: '1-hour guaranteed SLA'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Tier',
      tagline: 'For global corporate enterprises & magic circle firms',
      priceMonthly: 4999,
      priceYearly: 3999,
      features: [
        'Dedicated Antigravity Agent Cluster on Cloud Run',
        'Custom Prompt Injection & Fine-Tuned Legal Models',
        'Isolated VPC Ingress & On-Premise Deployment Options',
        'Dedicated Account Manager & Legal Engineering Partner',
        'Custom SLA & 99.99% Uptime Guarantee',
        'SOC2 Type II & HIPAA Compliance Documentation'
      ],
      agentLimits: 'Dedicated VPC Microservices',
      slAs: '99.99% Uptime SLA'
    }
  ];

  const handleOpenCheckout = (planId: string) => {
    setSelectedPlan(planId);
    setPaymentSuccess(null);
    setIsCheckoutModalOpen(true);
  };

  const handleSimulatePayment = async () => {
    setIsProcessingPayment(true);
    try {
      const response = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          billingCycle,
          customerEmail: 'xprize-judge@google.com'
        })
      });

      const data = await response.json();
      setPaymentSuccess(data);
    } catch (e) {
      console.error('Stripe Simulation Error:', e);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleFireWebhook = async (eventType: string) => {
    setIsFiringWebhook(true);
    setWebhookEvent(eventType);
    try {
      const response = await fetch('/api/stripe/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType })
      });

      const data = await response.json();
      setWebhookLog(data);
    } catch (e) {
      console.error('Webhook error:', e);
    } finally {
      setIsFiringWebhook(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono mb-2">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Stripe Subscription & Business Operations MVP</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Tiered SaaS Monetization & Billing Engine
            </h1>
            <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
              LegisLens monetization infrastructure uses Stripe checkout and webhook events to process tiered SaaS subscriptions ($499 Starter, $1,499 Professional, $4,999 Enterprise) with automated token quota allocation.
            </p>
          </div>

          {/* Monthly / Yearly Toggle */}
          <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex items-center space-x-1 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1 ${
                billingCycle === 'yearly'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Yearly</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded font-bold border border-emerald-500/30">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const price = billingCycle === 'yearly' ? tier.priceYearly : tier.priceMonthly;

          return (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all relative ${
                tier.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/80 border-2 border-indigo-500 shadow-xl shadow-indigo-500/20'
                  : 'bg-slate-900 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white font-mono font-bold text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular for Enterprises
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-white text-lg">{tier.name}</h3>
                  <p className="text-slate-400 text-xs">{tier.tagline}</p>
                </div>

                <div className="flex items-baseline space-x-1 border-b border-slate-800 pb-4">
                  <span className="text-3xl font-black font-mono text-white">${price}</span>
                  <span className="text-xs font-mono text-slate-400">/ month</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleOpenCheckout(tier.id)}
                className={`w-full py-3 rounded-xl font-bold text-xs font-mono transition-all flex items-center justify-center space-x-2 shadow-md ${
                  tier.popular
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-indigo-500/25'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                <span>Subscribe via Stripe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Stripe Webhook Event Simulator & Active Subscription Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Webhook Simulator (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-white text-sm">
                Stripe Webhook Event Simulator
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">Endpoint Active</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Test firing live Stripe API webhooks to verify how the Antigravity billing agent automatically provisions user workspace quotas in real time.
          </p>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {[
              'customer.subscription.created',
              'invoice.payment_succeeded',
              'invoice.payment_failed',
              'customer.subscription.deleted'
            ].map((evt) => (
              <button
                key={evt}
                onClick={() => handleFireWebhook(evt)}
                disabled={isFiringWebhook}
                className={`px-3 py-1.5 rounded-lg border transition-colors ${
                  webhookEvent === evt
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {evt}
              </button>
            ))}
          </div>

          {/* Webhook Log Output */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Server Webhook Response JSON:</span>
              <span>HTTP 200 OK</span>
            </div>
            <pre className="text-[10px] font-mono text-emerald-300 max-h-52 overflow-y-auto leading-relaxed">
              {webhookLog
                ? JSON.stringify(webhookLog, null, 2)
                : '// Click any event above to simulate inbound Stripe webhook payload...'}
            </pre>
          </div>
        </div>

        {/* Right Active Account Quota Dashboard (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-white text-sm">
                Active Organization & Quota Dashboard
              </h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Active Pro Account
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Active Tier:</span>
              <p className="text-base font-bold text-white">Professional Plan</p>
              <p className="text-[10px] text-emerald-400">$1,499 / mo billed</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Monthly Runs:</span>
              <p className="text-base font-bold text-indigo-400">Unlimited</p>
              <p className="text-[10px] text-slate-500">247 contracts run</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-400 font-mono">
              <span>Gemini Token Bandwidth:</span>
              <span className="text-white">89,450 / 500,000 tokens</span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full w-[18%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Modal Simulator */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Stripe Checkout</h3>
                  <p className="text-[11px] text-slate-400">LegisLens {selectedPlan.toUpperCase()} Subscription</p>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-mono"
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">Payment Successful!</h4>
                  <p className="text-xs text-slate-400">
                    Subscription ID: <strong className="font-mono text-indigo-300">{paymentSuccess.subscriptionId}</strong>
                  </p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-left space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Plan:</span>
                    <span className="text-white">{paymentSuccess.planName}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Amount:</span>
                    <span className="text-emerald-400">${(paymentSuccess.amount / 100).toFixed(2)} USD</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs font-mono"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono">Email Address</label>
                  <input
                    type="email"
                    defaultValue="xprize-judge@google.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-mono">Card Details (Test Mode)</label>
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        defaultValue="4242 •••• •••• 4242"
                        className="bg-transparent font-mono text-slate-200 focus:outline-none w-full"
                      />
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <div className="flex gap-2 text-slate-400 font-mono text-[11px]">
                      <input type="text" defaultValue="12/28" className="bg-transparent w-12" />
                      <input type="text" defaultValue="123" className="bg-transparent w-12" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessingPayment}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-xs font-mono rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Authorizing with Stripe...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Process Stripe Subscription</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
