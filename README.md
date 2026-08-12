 LegisLens – AI-Native Legal Co-Pilot

Build with Gemini XPRIZE
Democratizing professional legal access for small businesses and individuals



 Table of Contents

· Overview
· Why LegisLens Wins the XPRIZE
· Key Features
· Architecture
· Tech Stack
· Installation & Setup
· Running the App
· Testing the 5-Agent Pipeline
· Project Structure
· Deployment
· Submission Checklist
· Live Demo
· License
· Contact



 Overview

LegisLens is an AI-native legal co-pilot that makes legal documents accessible to everyone. Using a swarm of 5 specialized Gemini agents, it transforms complex legal jargon into plain English, identifies risks, suggests rewrites, and provides negotiation strategies – all in seconds.

The Problem: Over 80% of small businesses and individuals cannot afford legal help for everyday needs like contract review, compliance, or IP protection.

The Solution: LegisLens democratizes access to professional legal guidance. Upload any contract (PDF/TXT) and get:

·  Plain-English translation (5th-grade reading level)
·  Risk score & flagged problematic clauses
·  Rewrite suggestions for negotiation
·  Actionable next steps



  Why LegisLens Wins the XPRIZE

1. Business Viability (Real Revenue)

· Tiered SaaS Model: Free (5 pages) → Pro ($49/mo) → Business ($199/mo)
· Stripe Integration: Live payment processing with subscription management
· Go-to-Market: Target 100 small businesses in 90 days → $4,900 MRR

2. AI-Native Operations (Multi-Agent Orchestration)

· 5 Specialized Gemini Agents:
  ·  Ingestion Agent (Gemini 2.5 Flash) – Extracts & structures text
  ·  Analysis Agent (Gemini 3.5 Pro) – Legal reasoning & risk detection
  ·  Translation Agent – Converts legalese to 5th-grade English
  ·  Recommendation Agent – Suggests rewrites & negotiation tactics
  ·  Orchestrator Agent – Routes tasks & ensures quality control

3. Category Impact (Professional Services Access)

· Moves legal from high-cost/opaque to on-demand/transparent
· Empowers millions of small businesses priced out of the justice system
· Saves users $500–$2,000 per contract in legal fees



 Key Features

Feature Description
 Contract Upload Upload PDF/TXT files or paste text directly
 5-Agent Pipeline AI analyzes, translates, and recommends improvements
 Risk Dashboard Visual risk score, flags, and detailed explanations
 Chat Assistant Ask questions about your contract in plain English
 Stripe Payments Subscription management with free & pro tiers
 AI Telemetry Real-time logs of all agent decisions
 Deployable Ready for Google Cloud Run deployment



 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    LegisLens UI                         │
│              (Streamlit Dashboard)                      │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│              Orchestrator Agent                         │
│          (Routes tasks to specialists)                  │
└─────────┬─────────────────┬─────────────────┬─────────┘
          │                 │                 │
┌─────────▼─────────┐ ┌─────▼──────┐ ┌───────▼──────────┐
│  Ingestion Agent   │ │ Analysis   │ │ Translation      │
│ (Extract & parse)  │ │ Agent      │ │ Agent            │
│ Gemin. 2.5 Flash   │ │ Gem. 3.5   │ │ Gem. 2.5 Flash   │
└────────────────────┘ └────────────┘ └──────────────────┘
          │                 │                 │
┌─────────▼─────────────────▼─────────────────▼─────────┐
│              Recommendation Agent                       │
│    (Rewrite suggestions & negotiation tactics)         │
│                 Gem. 3.5 Pro                           │
└─────────────────────────────────────────────────────────┘
```



 Tech Stack

Layer Technology
Frontend Streamlit (Python)
Backend Python 3.11+
LLM Google Gemini API (Flash + Pro)
Payments Stripe API
Deployment Google Cloud Run
Version Control GitHub
Containerization Docker
API Management Google AI Studio



 Installation & Setup

Prerequisites

· Python 3.11+ installed
· Git Bash (Windows) or Terminal (Mac/Linux)
· Gemini API Key from Google AI Studio
· Stripe Account for payment processing

Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/legislens-xprize.git
cd legislens-xprize
```

Step 2: Create Virtual Environment

```bash
python -m venv venv

# Activate on Git Bash (Windows):
source venv/Scripts/activate

# Activate on Mac/Linux:
source venv/bin/activate
```

Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

Step 4: Set Up Environment Variables

Create a .env file in the root directory:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PRICE_ID=price_your_product_id_here
```

How to get each key:

· Gemini API Key: AI Studio → Get API Key
· Stripe Secret Key: Stripe Dashboard → Developers → API Keys
· Stripe Price ID: Stripe Dashboard → Products → Create Product



 Running the App

For Local Testing

```bash
streamlit run app.py
```

The app will open at http://localhost:8501

Quick Test Commands

```bash
# Check if Streamlit is installed
streamlit --version

# If you get 'command not found', try:
python -m streamlit run app.py

# On Git Bash (Windows), use winpty if app freezes:
winpty streamlit run app.py
```



 Testing the 5-Agent Pipeline

Sample Contract to Test Copy & Paste this into the upload box:

```
NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, 
Vendor shall indemnify, defend, and hold harmless Client from 
and against any and all claims, damages, losses, liabilities, 
costs, and expenses (including reasonable attorneys' fees) 
arising out of or relating to any third-party claim alleging 
that the Services or Deliverables infringe any Intellectual 
Property Right of such a third party.

IN NO EVENT SHALL VENDOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, 
EVEN IF ADVISED OF THE POSSIBILITY THEREOF.

This Agreement shall automatically renew for successive one (1) 
year terms unless either party provides written notice of 
non-renewal at least ninety (90) days prior to the end of the 
then-current term.
```

Expected Output:

·  Risk Score: 75/100 (High)
·  Critical Flag: 90-day auto-renewal clause (predatory)
·  Plain English: "You must pay the vendor if someone sues you over their work. You cannot sue them for lost profits. Most dangerously, your contract renews automatically for a whole year unless you cancel 3 months early—which is easy to miss."
·  Rewrite: Change auto-renewal to 30-day notice



 Project Structure

```
legislens-xprize/
│
├── app.py                  # Main Streamlit application
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (DO NOT SHARE)
├── .gitignore              # Git ignore file
├── Dockerfile              # Containerization for Cloud Run
├── README.md               # This file
│
├── docs/                   # Documentation for XPRIZE submission
│   ├── product_evidence.json
│   ├── customer_testimonials.md
│   └── architecture_diagram.png
│
└── tests/                  # Test scripts
    └── test_pipeline.py
```



 Deployment

Deploy to Google Cloud Run (Free Tier)

```bash
# 1. Build Docker image
docker build -t legislens .

# 2. Deploy to Cloud Run
gcloud run deploy legislens \
  --source . \
  --allow-unauthenticated \
  --region us-central1
```

Your app will be live at: https://legislens-xxx-uc.a.run.app

Environment Variables on Cloud Run

```bash
gcloud run deploy legislens \
  --set-env-vars="GEMINI_API_KEY=your_key" \
  --set-env-vars="STRIPE_SECRET_KEY=your_key" \
  --set-env-vars="STRIPE_PRICE_ID=your_price_id"
```

---

 XPRIZE Submission Checklist

☐ GitHub Repo: Public, clean code with documentation
☐ 3-Minute Video: Show AI agents making live decisions
☐ Narrative: 500–1000 words on human vs. AI roles & impact
☐ Revenue Evidence: Stripe dashboard showing real transactions
☐ Product Evidence: Logs & API usage of Gemini in continuous operation
☐ Customer Evidence: Testimonials from real users
☐ Google Cloud Deployment: Live URL for judges
☐ README.md: Complete documentation (this file!)

---

🎥 Live Demo

· Deployed URL: [Add your Cloud Run URL here]
· Video Submission: [Add YouTube link]
· GitHub Repo: https://github.com/your-username/legislens-xprize



  License

MIT License – free for educational and hackathon use.



 Contact

· Team Name: [Your Team Name]
· Project Lead: Ignacia Heyer
· Email: [Your Email]
· LinkedIn: [Your Profile]



 Acknowledgments

· Google Gemini XPRIZE for inspiring this project
· Google AI Studio for prototyping
· Stripe for payment infrastructure
· Streamlit for making AI apps beautiful

 LegisLens – Built with Gemini, for the world.
Democratizing legal access, one contract at a time.
