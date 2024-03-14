from core.llms.llm import LLM


class FakeLLM(LLM):
    async def chat(self, prompt: str) -> str:
        return "Hola, soy un bot de prueba"
