import os

OPEN_AI_CONFIG = {
    "api_key": os.environ.get("OPENAI_API_KEY", ""),
    "model": "gpt-4o",
    "temperature": 1,
}
