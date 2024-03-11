from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from mangum import Mangum
from container import Container
from core.fastapi.routes import add_routes

app = FastAPI()

add_routes([], app)
container = Container()


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
