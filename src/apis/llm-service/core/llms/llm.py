# generic interface for the llm logic

from abc import ABC
from typing import List, Optional

from core.llms.history_formatter import HistoryFormatter
from modules.messages.domain.aggregate.message_history_model import HistoryMessage


class LLM(ABC):
    def __init__(self, history_formatter: Optional[HistoryFormatter]):
        self.history_formatter = history_formatter

    async def chat(
        self, prompt: str, message_history: Optional[List[HistoryMessage]]
    ) -> str:
        raise NotImplementedError("chat method must be implemented")
