from modules.messages.domain.value_objects import (
    MessageContent,
    MessageCreatedAt,
    MessageSender,
    MessageSenderValues,
)


class HistoryMessage:
    content: MessageContent
    created_at: MessageCreatedAt
    sender: MessageSender

    def __init__(
        self,
        content: MessageContent,
        created_at: MessageCreatedAt,
        sender: MessageSender,
    ):
        self.content = content
        self.created_at = created_at
        self.sender = sender

    @staticmethod
    def from_primitives(
        content: str,
        created_at: str,
        sender: str,
        **kwargs,
    ) -> "HistoryMessage":
        return HistoryMessage(
            content=MessageContent(content),
            created_at=MessageCreatedAt.create_from_string(created_at),
            sender=MessageSender.create(MessageSenderValues(sender)),
        )

    def to_primitives(self) -> dict:
        return {
            "content": self.content,
            "createdAt": self.created_at.value,
            "sender": self.sender.value,
        }
