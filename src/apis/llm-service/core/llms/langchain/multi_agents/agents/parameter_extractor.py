from typing import List
from typing_extensions import Annotated, TypedDict, Optional
from core.llms.langchain.chat_prompts.prompt_factory import CustomChatPromptFactory
from core.llms.langchain.templates.human.human_template_with_history import (
    human_template_with_history,
)
from langchain_openai import ChatOpenAI
from core.llms.langchain.templates.system.vocabulary_generation.parameter_extractor import (
    template,
)


class ParameterExtractorAgent:
    def __init__(self, llm: ChatOpenAI):
        self.chat_prompt = CustomChatPromptFactory.create(
            template=template,
            human_template=human_template_with_history,
        )
        self.llm = llm

    async def extract(self, prompt, messages):
        chat_prompt = self.chat_prompt.format(
            text=prompt,
            chat_history=messages,
        )
        structured_llm = self.llm.with_structured_output(
            TypedDict(
                "parameters",
                {
                    "language": Annotated[Optional[str], "language to learn"],
                    "topics": Annotated[
                        Optional[List[str]], "topics the user is interested in"
                    ],
                },
            )
        )
        return await structured_llm.ainvoke(chat_prompt)

    async def run(self, state):
        extracted = await self.extract(
            prompt=state["prompt"],
            messages=state["messages"],
        )

        return {
            "language": extracted.get("language"),
            "topics": extracted.get("topics"),
        }
