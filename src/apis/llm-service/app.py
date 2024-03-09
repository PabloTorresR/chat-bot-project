from core.fastapi.routes import add_routes
from fastapi import FastAPI


app = FastAPI()

add_routes([], app)
container = Container()
