from langchain_openai import ChatOpenAI
from core.llms.langchain.chat_prompts.prompt_factory import CustomChatPromptFactory
from core.llms.langchain.templates.human.human_template_with_history import (
    human_template_with_history,
)
from core.llms.langchain.templates.system.vocabulary_generation.response import (
    template,
)


class ResponseAgent:
    def __init__(self, llm: ChatOpenAI):
        self.chat_prompt = CustomChatPromptFactory.create(
            template=template,
            human_template=human_template_with_history,
        )
        self.llm = llm

    async def generate(
        self, words, topics, language, native_language, messages, prompt
    ):
        chat_prompt = self.chat_prompt.format(
            words=words,
            topics=topics,
            language=language,
            native_language=native_language,
            chat_history=messages,
            text=prompt,
        )
        return await self.llm.ainvoke(chat_prompt)

    async def run(self, state):
        response = await self.generate(
            words=state["words"],
            topics=state["topics"],
            language=state["language"],
            native_language=state["native_language"],
            messages=state["messages"],
            prompt=state["prompt"],
        )
        return {
            "response": response,
        }
