from modules.message.domain.value_objects import (
    ConversationId,
    MessageContent,
    MessageCreatedAt,
    MessageSender,
    MessageSenderValues,
    UserId,
)
from modules.message.domain.aggregate.id import MessageId


class Message:
    id: MessageId
    content: MessageContent
    conversation_id: ConversationId
    user_id: UserId
    created_at: MessageCreatedAt
    sender: MessageSender

    def __init__(
        self,
        id: MessageId,
        content: MessageContent,
        conversation_id: ConversationId,
        user_id: UserId,
        created_at: MessageCreatedAt,
        sender: MessageSender,
    ):
        self.id = id
        self.content = content
        self.conversation_id = conversation_id
        self.user_id = user_id
        self.created_at = created_at
        self.sender = sender

    @staticmethod
    def from_primitives(
        id: str,
        content: str,
        conversation_id: str,
        user_id: str,
        created_at: str,
        sender: str,
    ) -> "Message":
        """
        Create a new message.
        """
        message = Message(
            id=MessageId(value=id),
            content=MessageContent(content),
            conversation_id=ConversationId(value=conversation_id),
            user_id=UserId(value=user_id),
            created_at=MessageCreatedAt.create_from_string(created_at),
            sender=MessageSender.create(MessageSenderValues(sender)),
        )
        return message

    def to_primitives(self) -> dict:
        return {
            "id": self.id,
            "content": self.content,
            "conversationId": self.conversation_id,
            "userId": self.user_id,
            "createdAt": self.created_at.value,
            "sender": self.sender.value,
        }
