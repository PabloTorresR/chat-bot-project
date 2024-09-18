from core.llms.langchain.chat_prompts.prompt_factory import CustomChatPromptFactory
from langchain_openai import ChatOpenAI

from core.llms.langchain.multi_agents.memory.vocabulary_state import GeneratedWords
from core.llms.langchain.templates.human.human_template import human_template
from core.llms.langchain.templates.system.vocabulary_generation.word_generator import (
    template,
)


class WordGeneratorAgent:
    def __init__(self, llm: ChatOpenAI):
        self.chat_prompt = CustomChatPromptFactory.create(
            template=template,
            human_template=human_template,
        )
        self.llm = llm
        self.number = 5

    async def generate(self, topics, language, native_language):
        chat_prompt = self.chat_prompt.format(
            text=topics,
            language=language,
            native_language=native_language,
            number=self.number,
        )
        structured_llm = self.llm.with_structured_output(GeneratedWords)
        return await structured_llm.ainvoke(chat_prompt)

    async def run(self, state):
        words = await self.generate(
            topics=state["topics"],
            language=state["language"],
            native_language=state["native_language"],
        )
        return {
            "words": words["words"],
        }
