from dependency_injector.wiring import Provide, inject
from fastapi import Depends
from container import Container

from modules.message.application import router
from modules.message.domain.aggregate.model import Message


@router.post(path="/answer", name="Answer Message")
@inject
async def answer_message(
    message: Message,
    message_history: MessageHistory,
    uc: AnswerMessageService = Depends(Provide[Container.answer_message_service]),
):
    return await uc.invoke(message, message_history)
