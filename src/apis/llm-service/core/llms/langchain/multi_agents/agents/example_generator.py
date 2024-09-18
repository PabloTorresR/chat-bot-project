from core.llms.langchain.chat_prompts.prompt_factory import CustomChatPromptFactory
from langchain_openai import ChatOpenAI

from core.llms.langchain.multi_agents.memory.vocabulary_state import GeneratedExamples
from core.llms.langchain.templates.human.human_template import human_template
from core.llms.langchain.templates.system.vocabulary_generation.example_generator import (
    template,
)


class ExamplesGeneratorAgent:
    def __init__(self, llm: ChatOpenAI):
        self.chat_prompt = CustomChatPromptFactory.create(
            template=template,
            human_template=human_template,
        )
        self.llm = llm

    async def generate(self, words, language, native_language) -> dict:
        chat_prompt = self.chat_prompt.format(
            text=words, language=language, native_language=native_language
        )
        structured_llm = self.llm.with_structured_output(GeneratedExamples)
        return await structured_llm.ainvoke(chat_prompt)

    async def run(self, state):
        examples: dict = await self.generate(
            words=state["words"],
            language=state["language"],
            native_language=state["native_language"],
        )
        return {
            "examples": examples,
        }
