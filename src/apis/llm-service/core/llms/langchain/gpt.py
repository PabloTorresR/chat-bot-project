import os

from typing import List, Optional
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from core.llms.history_formatter import HistoryFormatter
from core.llms.langchain.config import OPEN_AI_CONFIG
from core.llms.llm import LLM
from langchain.prompts.chat import ChatPromptTemplate

from modules.messages.domain.aggregate.message_history_model import HistoryMessage


class GptLLM(LLM):
    def __init__(
        self,
        chat_prompt: ChatPromptTemplate,
        history_formatter: Optional[HistoryFormatter] = None,
        format_instructions: Optional[str] = "",
        config: dict = OPEN_AI_CONFIG,
    ):
        super().__init__(history_formatter)
        self.chat_prompt = chat_prompt
        self.format_instructions = format_instructions
        self.config = config
        # TODO: cola de mensajes?

    async def chat(self, prompt: str, message_history: List[HistoryMessage]) -> str:
        memory = (
            self.history_formatter.format(message_history=message_history)
            if self.history_formatter
            else None
        )
        llm = ChatOpenAI(
            model=self.config["model"],
            temperature=self.config["temperature"],
            api_key=self.config["api_key"],  # type: ignore
            # TODO: cost calculator
            # callbacks=[CostCalcAsyncHandler("gpt-3.5-turbo", self.token_cost_process)],
        )
        chain = LLMChain(
            llm=llm,
            prompt=self.chat_prompt,
            memory=memory,
            verbose=False,
        )

        result: str = await chain.arun(
            {
                "text": prompt,
                "chat_history": memory,
                "format_instructions": self.format_instructions,
            }
        )
        return result
