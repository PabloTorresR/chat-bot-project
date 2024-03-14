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
    conversation_id: str
    user_id: str
    created_at: str
    sender: str

    @classmethod
    def create(
        cls,
        id: MessageId,
        content: MessageContent,
        conversation_id: ConversationId,
        user_id: UserId,
        created_at: MessageCreatedAt,
        sender: MessageSender,
    ) -> "Message":
        message = cls(
            id=id,
            content=content,
            conversationId=conversation_id,
            userId=user_id,
            createdAt=created_at,
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
            "conversationId": self.conversation_id,
            "userId": self.user_id,
            "createdAt": self.created_at,
            "sender": self.sender,
        }
