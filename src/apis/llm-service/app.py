from fastapi import FastAPI
from mangum import Mangum
from container import Container
from core.fastapi.routes import add_routes
from modules.message.application.answer_message import api as answer_message_api
from modules.message.application import router as message_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

add_routes([message_router], app)
container = Container()
container.wire(modules=[answer_message_api])

handler = Mangum(app)
