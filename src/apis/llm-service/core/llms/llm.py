# generic interface for the llm logic

from abc import ABC
from typing import List, Optional

from modules.messages.domain.aggregate.message_history_model import HistoryMessage


class LLM(ABC):
    def __init__(self, options: Optional[dict]):
        self.options = options or {}
        pass

    def set_options(self, options):
        self.options.update(options)

    async def chat(
        self, prompt: str, message_history: Optional[List[HistoryMessage]]
    ) -> str | dict:
        raise NotImplementedError("chat method must be implemented")
