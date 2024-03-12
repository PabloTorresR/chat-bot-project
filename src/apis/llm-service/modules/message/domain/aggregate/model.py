from message.domain.value_objects import (
    ConversationId,
    MessageContent,
    MessageCreatedAt,
    MessageSender,
    UserId,
)
from modules.message.domain.aggregate.id import MessageId


class Message:
    id: str
    content: str
    conversationId: str
    userId: str
    createdAt: str
    sender: str

    @classmethod
    def create(
        cls,
        id: MessageId,
        content: MessageContent,
        conversationId: ConversationId,
        userId: UserId,
        createdAt: MessageCreatedAt,
        sender: MessageSender,
    ) -> "Message":
        message = cls(
            id=id,
            content=content,
            conversationId=conversationId,
            userId=userId,
            createdAt=createdAt,
            sender=sender,
        )
        return message

    @classmethod
    def from_primitives(cls, plain_data: dict) -> "Message":
        return cls(**plain_data)

    def to_primitives(self) -> dict:
        return {
            "id": self.id,
            "content": self.content,
            "conversationId": self.conversationId,
            "userId": self.userId,
            "createdAt": self.createdAt,
            "sender": self.sender,
        }
