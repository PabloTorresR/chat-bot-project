from message.domain.value_objects import (
    MessageContent,
    MessageCreatedAt,
    MessageSender,
)


class HistoryMessage:
    id: str
    content: str
    created_at: str
    sender: str

    @classmethod
    def create(
        cls,
        content: MessageContent,
        created_at: MessageCreatedAt,
        sender: MessageSender,
    ) -> "HistoryMessage":
        message = cls(
            content=content,
            createdAt=created_at,
            sender=sender,
        )
        return message

    @classmethod
    def from_primitives(cls, plain_data: dict) -> "HistoryMessage":
        return cls(**plain_data)

    def to_primitives(self) -> dict:
        return {
            "content": self.content,
            "createdAt": self.created_at,
            "sender": self.sender,
        }
