from langchain_openai import ChatOpenAI
from langchain.memory import ChatMessageHistory
from core.llms.llm import LLM
from langchain.prompts.chat import ChatPromptTemplate


class GptLLM(LLM):
    def __init__(self, chat_prompt: ChatPromptTemplate):
        self.chat_prompt = chat_prompt
        # TODO: cola de mensajes?
        return

    async def chat(self, prompt: str, history: ChatMessageHistory) -> str:
        llm = ChatOpenAI(
            temperature=0,
            callbacks=[CostCalcAsyncHandler("gpt-3.5-turbo", self.token_cost_process)],
        )

        chain = LLMChain(llm=llm, prompt=self.chat_prompt, memory=history, verbose=True)

        result: str = await chain.arun({"text": prompt})

        return result
