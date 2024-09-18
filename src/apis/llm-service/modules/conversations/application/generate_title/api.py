from dependency_injector.wiring import Provide, inject
from fastapi import Depends
from container import Container

from modules.conversations.application.generate_title.impl import GenerateTitleService
from modules.conversations.application import router
from modules.messages.domain.aggregate.message_model import Message
from modules.messages.domain.aggregate.message_history_model import HistoryMessage


# @router.post(path="/generate-title", name="Generate Title for Conversation")
# @inject
# async def generate_title(
#     body: dict,
#     service: GenerateTitleService = Depends(
#         Provide[Container.generate_conversation_title_service]
#     ),
# ):
#     message = Message.from_primitives(
#         created_at=body.get("message", {}).get("createdAt"),
#         user_id=body.get("message", {}).get("userId"),
#         conversation_id=body.get("message", {}).get("conversationId"),
#         **body.get("message", {}),
#     )
#     message_history = [
#         HistoryMessage.from_primitives(created_at=message["createdAt"], **message)
#         for message in body.get("messageHistory", [])
#     ]

#     return await service.run(message, message_history)


# @router.get(path="/", name="Status")
# async def status():
#     return {"status": "ok"}
