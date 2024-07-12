from abc import abstractmethod
from typing import Any, List

from modules.messages.domain.aggregate.message_history_model import HistoryMessage


class HistoryFormatter:
    @abstractmethod
    def format(self, message_history: List[HistoryMessage]) -> Any:
        pass
