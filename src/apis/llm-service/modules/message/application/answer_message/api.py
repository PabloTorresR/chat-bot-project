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
    body: dict = Depends(),
    service: AnswerMessageService = Depends(Provide[Container.answer_message_service]),
):
    message = Message(**body.get("message", {}))
    # TODO: cada mensaje debe mapearse como un HistoryMessage en un array
    message_history = HistoryMessage(**body.get("message_history", {}))
    return await service.run(message, message_history)
