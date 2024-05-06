from pydantic import BaseModel
from common.domain.id import Uuid

from core.pydantic import ConStr
from datetime import datetime
from pydantic import BaseModel
from enum import Enum


class MessageContent(ConStr):
    min_length = 1
    max_length = 1000


class MessageCreatedAtIncorrectDateString(Exception):
    pass


class MessageCreatedAt(BaseModel):
    value: datetime

    @classmethod
    def create_from_string(cls, date_string: str) -> "MessageCreatedAt":
        try:
            date = cls._parse_date_string(date_string)
            return cls(value=date)
        except ValueError:
            raise MessageCreatedAtIncorrectDateString("Invalid date string")

    @staticmethod
    def _parse_date_string(date_string: str) -> datetime:
        if date_string.endswith("Z"):
            date_string = date_string[:-1]
        return datetime.fromisoformat(date_string)

    def __str__(self) -> str:
        return self.value.isoformat()

    @classmethod
    def create_now(cls) -> "MessageCreatedAt":
        now = datetime.now()
        return cls(value=now)


class MessageSenderValues(str, Enum):
    BOT = "bot"
    USER = "user"


class MessageSender(BaseModel):
    value: MessageSenderValues

    @classmethod
    def create(cls, value: MessageSenderValues) -> "MessageSender":
        return cls(value=value)

    def __str__(self) -> str:
        return self.value


class ConversationId(Uuid):
    pass


class UserId(Uuid):
    pass
