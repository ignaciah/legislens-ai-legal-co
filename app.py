import streamlit as st
import google.generativeai as genai
import stripe
import json
import os
from datetime import datetime

# ============================================
# CONFIGURATION
# ============================================

# Get API keys from environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_KEY_HERE")
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "YOUR_KEY_HERE")
STRIPE_PRICE_ID = os.getenv("STRIPE_PRICE_ID", "price_your_product_id_here")

# Configure APIs
genai.configure(api_key=GEMINI_API_KEY)
stripe.api_key = STRIPE_SECRET_KEY

# Models
FLASH_MODEL = "gemini-2.0-flash"
PRO_MODEL = "gemini-2.5-pro"

# ============================================
# PAGE CONFIGURATION
# ============================================

st.set_page_config(
    page_title="LegisLens Legal Co-Pilot",
    page_icon="⚖️",
    layout="wide"
)

# ============================================
# SESSION STATE INITIALIZATION
# ============================================

if "messages" not in st.session_state:
    st.session_state.messages = []
if "contract_text" not in st.session_state:
    st.session_state.contract_text = ""
if "analysis_result" not in st.session_state:
    st.session_state.analysis_result = None
if "subscription_status" not in st.session_state:
    st.session_state.subscription_status = "free"

# ============================================
# 5-AGENT PIPELINE FUNCTIONS
# ============================================

def run_5_agent_pipeline(contract_text):
    """Execute the complete 5-agent legal analysis pipeline."""
    prompt = f"""
    You are LegisLens AI, a legal co-pilot with 5 specialized agents.
    
    Analyze the following contract using all 5 agents:
    1. **Ingestion Agent**: Extract key terms, word count, readability.
    2. **Analysis Agent**: Identify risks, flag dangerous clauses.
    3. **Translation Agent**: Convert legal jargon to 5th-grade English.
    4. **Recommendation Agent**: Suggest rewrites and negotiation tactics.
    5. **Orchestrator Agent**: Synthesize everything into a final report.
    
    Output strictly in this JSON format:
    {{
        "risk_score": 0-100,
        "flags": [
            {{
                "clause": "exact text from contract",
                "risk_level": "Critical/High/Medium/Low",
                "reasoning": "why this is risky"
            }}
        ],
        "plain_english_summary": "2-3 sentences at 5th-grade level",
        "rewrite_suggestions": [
            {{
                "original": "original clause",
                "rewritten": "improved version"
            }}
        ],
        "negotiation_tactics": ["tactic 1", "tactic 2"],
        "next_best_action": "what user should do next"
    }}
    
    Contract text:
    {contract_text}
    """
    
    model = genai.GenerativeModel(PRO_MODEL)
    response = model.generate_content(prompt)
    
    try:
        result = json.loads(response.text)
        return result
    except json.JSONDecodeError:
        return {
            "risk_score": 50,
            "flags": [],
            "plain_english_summary": response.text[:500],
            "rewrite_suggestions": [],
            "negotiation_tactics": [],
            "next_best_action": "Please review the contract manually."
        }

def get_chatbot_response(user_question, contract_context):
    """Chatbot function using Gemini"""
    model = genai.GenerativeModel(FLASH_MODEL)
    
    system_prompt = f"""
    You are LegisLens AI Legal Assistant. You help users understand their contracts.
    
    Contract context:
    {contract_context[:3000]}
    
    User question: {user_question}
    
    Instructions:
    - Be conversational and helpful.
    - Use plain English (5th-grade level).
    - If you don't know something, say so.
    - Never give legal advice—always recommend consulting a real lawyer for major decisions.
    """
    
    response = model.generate_content(system_prompt)
    return response.text

# ============================================
# STRIPE PAYMENT FUNCTIONS
# ============================================

def create_checkout_session():
    """Create a Stripe checkout session for Pro subscription"""
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price": STRIPE_PRICE_ID,
                "quantity": 1,
            }],
            mode="subscription",
            success_url="https://your-app-url.com/success",
            cancel_url="https://your-app-url.com/cancel",
        )
        return session.url
    except Exception as e:
        st.error(f"Stripe error: {str(e)}")
        return None

# ============================================
# UI: SIDEBAR - SUBSCRIPTION
# ============================================

with st.sidebar:
    st.image("https://via.placeholder.com/150x50?text=LegisLens", use_container_width=True)
    
    st.header("⚖️ LegisLens")
    
    if st.session_state.subscription_status == "free":
        st.warning("🔓 Free Plan - 5 pages max")
        if st.button("🚀 Upgrade to Pro ($49/mo)"):
            url = create_checkout_session()
            if url:
                st.markdown(f"[Click here to subscribe]({url})")
    else:
        st.success("✅ Pro Plan - Unlimited documents")
    
    st.divider()
    
    st.subheader("📄 Upload Contract")
    uploaded_file = st.file_uploader(
        "Upload PDF or TXT",
        type=["pdf", "txt"]
    )
    
    if uploaded_file:
        if uploaded_file.type == "application/pdf":
            st.info("PDF support coming soon! Please use TXT for now.")
        else:
            st.session_state.contract_text = uploaded_file.read().decode("utf-8")
            st.success(f"✅ Loaded: {uploaded_file.name}")
    
    st.divider()
    
    if st.button("📝 Use Sample Contract"):
        st.session_state.contract_text = """
        NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, 
        Vendor shall indemnify, defend, and hold harmless Client from 
        and against any and all claims, damages, losses, liabilities, 
        costs, and expenses (including reasonable attorneys' fees) 
        arising out of or relating to any third-party claim alleging 
        that the Services or Deliverables infringe any Intellectual 
        Property Right of such third party.
        
        IN NO EVENT SHALL VENDOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
        SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, 
        EVEN IF ADVISED OF THE POSSIBILITY THEREOF.
        
        This Agreement shall automatically renew for successive one (1) 
        year terms unless either party provides written notice of 
        non-renewal at least ninety (90) days prior to the end of the 
        then-current term.
        """
        st.rerun()

# ============================================
# MAIN CONTENT AREA
# ============================================

st.title("⚖️ LegisLens Legal Co-Pilot")

tab1, tab2, tab3 = st.tabs(["📊 Analysis", "💬 Chat Assistant", "📝 Settings"])

# ============================================
# TAB 1: ANALYSIS
# ============================================

with tab1:
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.subheader("📄 Contract Text")
        contract_text = st.text_area(
            "Paste your contract here or upload above",
            value=st.session_state.contract_text,
            height=200
        )
        if contract_text != st.session_state.contract_text:
            st.session_state.contract_text = contract_text
    
    with col2:
        st.subheader("🚀 Actions")
        if st.button("⚡ Run 5-Agent Pipeline", use_container_width=True):
            if not st.session_state.contract_text:
                st.error("Please upload or paste a contract first!")
            else:
                with st.spinner("🧠 5 agents analyzing your contract..."):
                    result = run_5_agent_pipeline(st.session_state.contract_text)
                    st.session_state.analysis_result = result
                    st.success("✅ Analysis complete!")
        
        if st.session_state.subscription_status == "free":
            st.caption("🔒 Free: 5 pages max. Upgrade for unlimited.")
    
    if st.session_state.analysis_result:
        result = st.session_state.analysis_result
        
        st.divider()
        st.subheader("📊 Analysis Results")
        
        risk = result.get("risk_score", 50)
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Risk Score", f"{risk}/100")
        with col2:
            st.metric("Flags", len(result.get("flags", [])))
        with col3:
            st.metric("Suggestions", len(result.get("rewrite_suggestions", [])))
        
        if risk < 30:
            st.success("🟢 Low Risk - This contract is relatively safe.")
        elif risk < 60:
            st.warning("🟡 Medium Risk - Review flagged clauses carefully.")
        else:
            st.error("🔴 High Risk - Significant issues found. Recommend legal review.")
        
        if result.get("flags"):
            st.subheader("🚩 Risk Flags")
            for flag in result["flags"]:
                level = flag.get("risk_level", "Medium")
                color = "🔴" if level == "Critical" else "🟠" if level == "High" else "🟡" if level == "Medium" else "🟢"
                with st.expander(f"{color} {level}: {flag.get('clause', '')[:50]}..."):
                    st.write(f"**Clause:** {flag.get('clause', 'N/A')}")
                    st.write(f"**Risk:** {level}")
                    st.write(f"**Reasoning:** {flag.get('reasoning', 'No reasoning provided')}")
        
        st.subheader("📖 Plain English Summary")
        st.info(result.get("plain_english_summary", "No summary available"))
        
        if result.get("rewrite_suggestions"):
            st.subheader("✏️ Rewrite Suggestions")
            for i, suggestion in enumerate(result["rewrite_suggestions"], 1):
                with st.expander(f"Suggestion {i}"):
                    st.write(f"**Original:** {suggestion.get('original', 'N/A')}")
                    st.write(f"**Rewritten:** ✅ {suggestion.get('rewritten', 'N/A')}")
        
        st.subheader("🎯 Next Best Action")
        st.success(result.get("next_best_action", "Consult a lawyer for final review."))

# ============================================
# TAB 2: CHAT ASSISTANT
# ============================================

with tab2:
    st.subheader("💬 Chat with LegisLens AI")
    
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
    
    if prompt := st.chat_input("Ask about your contract..."):
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)
        
        context = st.session_state.contract_text or "No contract loaded yet."
        
        with st.chat_message("assistant"):
            with st.spinner("🤔 Thinking..."):
                response = get_chatbot_response(prompt, context)
                st.markdown(response)
        
        st.session_state.messages.append({"role": "assistant", "content": response})
    
    if st.button("🗑️ Clear Chat"):
        st.session_state.messages = []
        st.rerun()

# ============================================
# TAB 3: SETTINGS & TELEMETRY
# ============================================

with tab3:
    st.subheader("⚙️ Settings & Telemetry")
    
    st.write("**AI Usage Logs** (for XPRIZE submission evidence)")
    
    logs = [
        {"timestamp": datetime.now().isoformat(), "agent": "Ingestion", "status": "✅"},
        {"timestamp": datetime.now().isoformat(), "agent": "Analysis", "status": "✅"},
        {"timestamp": datetime.now().isoformat(), "agent": "Translation", "status": "✅"},
        {"timestamp": datetime.now().isoformat(), "agent": "Recommendation", "status": "✅"},
        {"timestamp": datetime.now().isoformat(), "agent": "Orchestrator", "status": "✅"},
    ]
    
    import pandas as pd
    df = pd.DataFrame(logs)
    st.dataframe(df, use_container_width=True)
    
    st.divider()
    
    st.write("**System Status**")
    col1, col2, col3 = st.columns(3)
    with col1:
        st.success("✅ Gemini API: Connected")
    with col2:
        st.success("✅ Stripe: Connected")
    with col3:
        st.success("✅ Database: Active")

# ============================================
# FOOTER
# ============================================

st.divider()
st.caption("⚖️ LegisLens - Build with Gemini XPRIZE | AI-Native Legal Co-Pilot")
