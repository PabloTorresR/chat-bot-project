from typing import List, Optional
from langchain.memory import ConversationBufferMemory

from core.llms.history_formatter import HistoryFormatter
from modules.messages.domain.aggregate.message_history_model import HistoryMessage
from modules.messages.domain.value_objects import (
    MessageSenderValues,
)


class LangChainHistoryFormatter(HistoryFormatter):
    def __init__(self, default_message: Optional[str] = ""):
        self.default_message = default_message

    def format(
        self,
        message_history: List[HistoryMessage],
    ) -> ConversationBufferMemory:
        chat_message_history = ConversationBufferMemory(
            input_key="text", memory_key="chat_history"
        )

        if self.default_message:
            chat_message_history.chat_memory.add_ai_message(self.default_message)

        for message in message_history:
            if message.sender.value == MessageSenderValues.USER.value:
                chat_message_history.chat_memory.add_user_message(  # pylint: disable=no-member©
                    message.content
                )
            elif message.sender.value == MessageSenderValues.BOT.value:
                chat_message_history.chat_memory.add_ai_message(  # pylint: disable=no-member©
                    message.content
                )

        return chat_message_history
