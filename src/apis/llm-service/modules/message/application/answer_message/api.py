from dependency_injector.wiring import Provide, inject
from fastapi import Depends
from container import Container

from modules.message.application import router
from modules.message.application.answer_message.impl import AnswerMessageService
from modules.message.domain.aggregate.message_model import Message
from modules.message.domain.aggregate.message_history_model import HistoryMessage


@router.post(path="/answer", name="Answer Message")
@inject
async def answer_message(
    body: dict,
    service: AnswerMessageService = Depends(Provide[Container.answer_message_service]),
):
    message = Message.from_primitives(
        created_at=body.get("message", {}).get("createdAt"),
        user_id=body.get("message", {}).get("userId"),
        conversation_id=body.get("message", {}).get("conversationId"),
        **body.get("message", {}),
    )
    message_history = [
        HistoryMessage.from_primitives(created_at=message["createdAt"], **message)
        for message in body.get("messageHistory", [])
    ]

    return await service.run(message, message_history)


@router.get(path="/", name="Status")
async def status():
    return {"status": "ok"}
