import { SampleDocument } from '../types';

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: 'doc-nda-aggressive',
    title: 'Mutual Non-Disclosure & Non-Compete Agreement',
    category: 'Corporate Legal & IP',
    description: 'A heavily skewed NDA containing hidden non-solicit, non-compete, and perpetual IP assignment clauses.',
    expectedRiskLevel: 'CRITICAL',
    content: `MUTUAL NON-DISCLOSURE AND RESTRICTIVE COVENANT AGREEMENT

This Agreement is entered into by and between Alpha Corp ("Disclosing Party") and LegisLens Partner ("Receiving Party").

1. CONFIDENTIAL INFORMATION
Confidential Information includes all technical data, trade secrets, algorithms, source code, financial projections, customer lists, and business strategies disclosed by Disclosing Party.

2. OBLIGATIONS & NON-COMPETE
Receiving Party agrees to hold all Confidential Information in strict confidence for a period of perpetual duration. Furthermore, Receiving Party agrees that for a period of five (5) years following termination of this Agreement, Receiving Party shall not directly or indirectly engage in, advise, invest in, or operate any enterprise competing with Disclosing Party anywhere globally.

3. INTELLECTUAL PROPERTY ASSIGNMENT
Any improvements, derivatives, works of authorship, inventions, or patents conceived or created by Receiving Party during or as a result of evaluating Confidential Information shall instantly and automatically become the exclusive, sole property of Disclosing Party without additional compensation.

4. INDEMNIFICATION & UNLIMITED LIABILITY
Receiving Party agrees to defend, indemnify, and hold harmless Disclosing Party, its executives, and affiliates against any and all claims, losses, legal fees, or damages arising out of any alleged breach. Receiving Party's liability under this Agreement shall be unlimited and subject to immediate injunctive relief without the requirement of posting a bond.

5. GOVERNING LAW & ARBITRATION
This Agreement shall be governed by the laws of the Cayman Islands. Any disputes shall be settled via binding mandatory arbitration in Grand Cayman, with Receiving Party bearing all legal and administrative costs regardless of outcome.`
  },
  {
    id: 'doc-saas-terms',
    title: 'Enterprise B2B SaaS Master Services Agreement',
    category: 'Commercial Contracts',
    description: 'An enterprise SaaS agreement featuring auto-renewal escalation, data ownership ambiguity, and 12-month notice requirements.',
    expectedRiskLevel: 'HIGH',
    content: `MASTER SERVICES AGREEMENT (MSA) - CLOUD PLATFORM

1. SERVICE PROVISION & AUTORENEWAL
This Agreement commences on the Effective Date for an initial term of 36 months ("Initial Term"). This Agreement shall automatically renew for successive 24-month periods unless Customer provides written notice of non-renewal at least one hundred eighty (180) days prior to the expiration of the current term. Pricing upon renewal shall automatically increase by 20% over the previous rate.

2. DATA OWNERSHIP & DERIVATIVE AI MODELS
Customer retains ownership of raw Customer Data uploaded to the Platform. However, Customer hereby grants Provider a perpetual, irrevocable, worldwide, royalty-free license to parse, aggregate, analyze, and utilize Customer Data to train, refine, and commercialize Provider's artificial intelligence models and derivative machine learning assets without attribution or compensation.

3. LIMITATION OF LIABILITY
PROVIDER'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL BE STRICTLY LIMITED TO THE LESSER OF $500 OR THE FEES PAID BY CUSTOMER IN THE ONE (1) MONTH PRECEDING THE CLAIM. PROVIDER EXPRESSLY DISCLAIMS ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.

4. SLA & DOWNTIME CREDITS
Provider targets 99.5% service uptime excluding scheduled maintenance. Service credits for failure to meet SLA are capped at 2% of monthly invoice value and constitute Customer's sole and exclusive remedy for service interruptions.`
  },
  {
    id: 'doc-ai-compliance',
    title: 'High-Risk AI System Compliance & Governance Policy',
    category: 'Regulatory & AI Governance',
    description: 'Draft regulatory compliance disclosure for an enterprise deploying automated decision-making systems under global AI legislation.',
    expectedRiskLevel: 'MEDIUM',
    content: `ENTERPRISE ARTIFICIAL INTELLIGENCE GOVERNANCE & COMPLIANCE FRAMEWORK

1. SCOPE AND CLASSIFICATION
This Policy governs all Machine Learning, Large Language Models (LLMs), and automated inference engines used within automated credit scoring, talent recruitment, and legal review workflows. The system is provisionally classified as a High-Risk AI System under applicable framework rules.

2. HUMAN OVERSIGHT & HALT CONTROLS
High-risk inference runs shall operate with human-in-the-loop oversight. However, automated batch operations processing under 50,000 requests per hour may execute autonomously without real-time human verification, provided post-hoc sampling occurs within 30 days.

3. DATA BIAS & AUDITABILITY
Training sets must undergo statistical bias audits bi-annually. System logs, model weights, and prompt-completion hashes shall be retained in encrypted storage for a minimum of 24 months. Data subjects may request explanation of automated decisions within 14 business days of decision issuance.`
  }
];
