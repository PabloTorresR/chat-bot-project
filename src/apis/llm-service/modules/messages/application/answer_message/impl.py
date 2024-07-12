from typing import List
from core.llms.llm import LLM
from modules.messages.domain.aggregate.message_history_model import HistoryMessage
from modules.messages.domain.aggregate.message_model import Message


class AnswerMessageService:
    def __init__(self, llm: LLM):
        self.llm = llm

    async def run(
        self,
        message: Message,
        message_history: List[HistoryMessage],
    ) -> str:
        sorted_history = sorted(
            message_history, key=lambda x: x.created_at.value, reverse=False
        )
        response_content = await self.llm.chat(message.content, sorted_history)
        return response_content
