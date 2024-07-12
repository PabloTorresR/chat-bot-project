from dotenv import load_dotenv
from fastapi import FastAPI
from mangum import Mangum
from container import Container
from core.fastapi.routes import add_routes
from modules.messages.application.answer_message import api as answer_message_api
from modules.conversations.application.generate_title import (
    api as generate_conversation_title_api,
)
from modules.messages.application import router as messages_router
from modules.conversations.application import router as conversations_router

load_dotenv()

app = FastAPI()

add_routes(
    [
        conversations_router,
        messages_router,
    ],
    app,
)
container = Container()
container.wire(modules=[answer_message_api, generate_conversation_title_api])
handler = Mangum(app)
