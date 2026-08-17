
# ⚖️ LegisLens – AI-Native Legal Co-Pilot

**Winner – Build with Gemini XPRIZE**

LegisLens democratizes legal access using 5 specialized Gemini agents.

## Features
- 📄 Upload & analyze contracts
- 🧠 5-agent pipeline (Ingestion, Analysis, Translation, Recommendation, Orchestrator)
- 💬 AI chatbot for follow-up questions
- 💳 Stripe subscription payments

## Tech Stack
- Streamlit (UI)
- Google Gemini API (AI)
- Stripe (Payments)
- Render (Hosting)

## Setup
1. Clone the repo
2. Install dependencies: `pip install -r requirements.txt`
3. Set API keys as environment variables
4. Run: `streamlit run app.py`

## Environment Variables
- `GEMINI_API_KEY` – from Google AI Studio
- `STRIPE_SECRET_KEY` – from Stripe Dashboard
- `STRIPE_PRICE_ID` – from Stripe Products
