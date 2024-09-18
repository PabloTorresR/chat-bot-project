from typing import List
from core.llms.llm import LLM
from modules.messages.domain.aggregate.message_history_model import HistoryMessage
from modules.messages.domain.aggregate.message_model import Message
from modules.users.domain.value_objects import UserLanguage


class AnswerMessageService:
    def __init__(self, llm: LLM):
        self.llm = llm

    async def run(
        self,
        message: Message,
        message_history: List[HistoryMessage],
        user_language: UserLanguage = UserLanguage(value="english"),
    ) -> str | dict:
        sorted_history = sorted(
            message_history, key=lambda x: x.created_at.value, reverse=False
        )
        self.llm.set_options({"user_language": user_language})
        response_content = await self.llm.chat(message.content, sorted_history)
        return response_content
