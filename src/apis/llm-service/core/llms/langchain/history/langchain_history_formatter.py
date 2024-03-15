from typing import List
from langchain.memory import ChatMessageHistory

from core.llms.history_formatter import HistoryFormatter
from modules.message.domain.aggregate.message_history_model import HistoryMessage
from modules.message.domain.value_objects import MessageSenderValues


class LangChainHistoryFormatter(HistoryFormatter):
    def format(self, message_history: List[HistoryMessage]) -> ChatMessageHistory:
        chat_message_history = ChatMessageHistory()
        for message in message_history:
            if message.sender == MessageSenderValues.USER.value:
                chat_message_history.add_user_message(message.content)
            elif message.sender == MessageSenderValues.BOT.value:
                chat_message_history.add_ai_message(message.content)
        return chat_message_history
