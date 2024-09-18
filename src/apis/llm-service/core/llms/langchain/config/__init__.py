import os

OPEN_AI_CONFIG = {
    "api_key": os.environ.get("OPENAI_API_KEY", ""),
    "model": "gpt-4o",
    "temperature": 1,
}

OPEN_AI_LIGHT_CONFIG = {
    "api_key": os.environ.get("OPENAI_API_KEY", ""),
    "model": "gpt-4o-mini",
    "temperature": 0,
}

__all__ = ["OPEN_AI_CONFIG", "OPEN_AI_LIGHT_CONFIG"]
