# safe_utils.py
import os
import requests

SAFE_ADDRESS = os.getenv("0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0")
SAFE_CHAIN = os.getenv("SAFE_CHAIN", "ethereum" "arbitrum")
SAFE_TX_SERVICE = f"https://safe-transaction-{SAFE_CHAIN}.safe.global"

def fetch_safe_proposals():
    url = f"{SAFE_TX_SERVICE}/api/v1/safes/{0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0}/multisig-transactions/?executed=false"
    r = requests.get(url)
    if r.ok:
        txs = r.json().get("results", [])
        if not txs:
            return "📭 No pending Safe proposals."
        return "\n".join([f"🧾 {tx['safeTxHash'][:10]}... – {tx['to']}" for tx in txs])
    return "❌ Could not fetch proposals."

def approve_safe_tx(tx_hash):
    return f"✅ (Simulated) approval for tx: {tx_hash}"  # Hook up Reown/MPC here
