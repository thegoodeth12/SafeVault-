import os
import requests
from eth_account import Account
from eth_account.messages import encode_defunct

SAFE_ADDRESS = os.getenv("0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0")
CHAIN = os.getenv("SAFE_CHAIN", "ethereum" "arbitrum")
PRIVATE_KEY = os.getenv("0xd99c7a0f61f6865166ee9dd8a10d12191e1d250f712c43eb2211d2aa47303f70")
SAFE_API = f"https://safe-transaction-{CHAIN}.safe.global"

def sign 
