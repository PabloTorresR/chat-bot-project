import os

from typing import List, Optional
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from core.llms.history_formatter import HistoryFormatter
from core.llms.llm import LLM
from langchain.prompts.chat import ChatPromptTemplate

from modules.message.domain.aggregate.message_history_model import HistoryMessage


class GptLLM(LLM):
    def __init__(
        self,
        chat_prompt: ChatPromptTemplate,
        history_formatter: Optional[HistoryFormatter] = None,
        format_instructions: Optional[str] = "",
    ):
        super().__init__(history_formatter)
        self.chat_prompt = chat_prompt
        self.format_instructions = format_instructions
        # TODO: cola de mensajes?

    async def chat(self, prompt: str, message_history: List[HistoryMessage]) -> str:
        memory = (
            self.history_formatter.format(message_history=message_history)
            if self.history_formatter and message_history
            else None
        )
        api_key = os.environ.get("OPENAI_API_KEY", "")
        llm = ChatOpenAI(
            temperature=0,
            api_key=api_key,  # type: ignore
            # TODO: cost calculator
            # callbacks=[CostCalcAsyncHandler("gpt-3.5-turbo", self.token_cost_process)],
        )
        chain = LLMChain(
            llm=llm,
            prompt=self.chat_prompt,
            memory=memory,
            verbose=True,
        )

        result: str = await chain.arun(
            {
                "text": prompt,
                "chat_history": memory,
                "format_instructions": self.format_instructions,
            }
        )
        return result
