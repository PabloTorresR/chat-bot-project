from typing import List
from core.llms.llm import LLM
from modules.message.domain.aggregate.message_history_model import HistoryMessage
from modules.message.domain.aggregate.message_model import Message


# TODO: lógica con las templates para responder a lo que se quiera en concreto
class AnswerMessageService:
    def __init__(self, llm: LLM):
        self.llm = llm

    async def run(
        self,
        message: Message,
        message_history: List[HistoryMessage],
    ) -> Message:
        sorted_history = sorted(
            message_history, key=lambda x: x.created_at, reverse=True
        )
        # TODO: Crear el objeto memory y mensaje sin estar acoplado a LangChain, (inyectar dependencias)
        return await self.llm.chat(message.content, sorted_history)
