from typing import List
from langchain.memory import ChatMessageHistory

from modules.message.domain.aggregate.message_history_model import HistoryMessage
from modules.message.domain.value_objects import MessageSenderValues


class LangChainMessageHistory(ChatMessageHistory):
    def __init__(self, message_history: List[HistoryMessage]):
        self.__map_messages_to_history__(message_history)

    def __map_messages_to_history__(self, message_history: List[HistoryMessage]):
        for message in message_history:
            if message.sender == MessageSenderValues.USER.value:
                self.add_user_message(message.content)
            elif message.sender == MessageSenderValues.BOT.value:
                self.add_ai_message(message.content)
