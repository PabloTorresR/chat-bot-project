# generic interface for the llm logic

from abc import ABC


class LLM(ABC):
    async def chat(self, prompt: str) -> str:
        raise NotImplementedError("chat method must be implemented")
