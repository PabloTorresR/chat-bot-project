from langchain_openai import ChatOpenAI
from core.llms.langchain.chat_prompts.prompt_factory import CustomChatPromptFactory
from core.llms.langchain.templates.human.human_template_with_history import (
    human_template_with_history,
)


class SummarizerAgent:
    def __init__(self, llm: ChatOpenAI):
        self.chat_prompt = CustomChatPromptFactory.create(
            template="Summarize the following conversation given the last message: {text}",
            human_template=human_template_with_history,
        )
        self.llm = llm

    async def summarize(self, prompt, messages):
        chat_prompt = self.chat_prompt.format(text=prompt, chat_history=messages)
        return await self.llm.ainvoke(chat_prompt)

    async def run(self, state):
        response = await self.summarize(
            prompt=state["prompt"],
            messages=state["messages"],
        )
        return {
            "summary": response,
        }
