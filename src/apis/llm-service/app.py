from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from mangum import Mangum
from container import Container
from core.fastapi.routes import add_routes
from modules.message.application.answer_message import api as answer_message_api
from modules.message.application import router as message_router

app = FastAPI()

add_routes([message_router], app)
container = Container()
container.wire(modules=[answer_message_api])


@app.get("/", include_in_schema=False)
def welcome():
    html_content = """
    <html>
        <head>
            <title>Welcome to the Integration API</title>
        </head>
        <body>
            <h1>Welcome to the Integration API</h1>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)


handler = Mangum(app)
