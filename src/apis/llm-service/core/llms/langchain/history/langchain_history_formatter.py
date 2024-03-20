from typing import List
from langchain.memory import ConversationBufferMemory

from core.llms.history_formatter import HistoryFormatter
from modules.message.domain.aggregate.message_history_model import HistoryMessage
from modules.message.domain.value_objects import MessageSenderValues


class LangChainHistoryFormatter(HistoryFormatter):
    def format(self, message_history: List[HistoryMessage]) -> ConversationBufferMemory:
        chat_message_history = ConversationBufferMemory(
            input_key="text", memory_key="chat_history"
        )
        for message in message_history:
            if message.sender.value == MessageSenderValues.USER.value:
                chat_message_history.chat_memory.add_user_message(message.content)
            elif message.sender.value == MessageSenderValues.BOT.value:
                chat_message_history.chat_memory.add_ai_message(  # pylint: disable=no-member©
                    message.content
                )
        return chat_message_history
