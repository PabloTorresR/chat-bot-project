from typing import List, Optional

from core.llms.history_formatter import HistoryFormatter
from modules.messages.domain.aggregate.message_history_model import HistoryMessage
from modules.messages.domain.value_objects import (
    MessageSenderValues,
)
from langchain_community.chat_message_histories import ChatMessageHistory


class ChatMessageHistoryFormatter(HistoryFormatter):
    def __init__(self, default_message: Optional[str] = ""):
        self.default_message = default_message

    def format(
        self,
        message_history: List[HistoryMessage],
    ) -> ChatMessageHistory:
        chat_message_history = ChatMessageHistory()
        if self.default_message:
            chat_message_history.add_ai_message(self.default_message)

        for message in message_history:
            if message.sender.value == MessageSenderValues.USER.value:
                chat_message_history.add_user_message(message.content)
            elif message.sender.value == MessageSenderValues.BOT.value:
                chat_message_history.add_ai_message(message.content)

        return chat_message_history
