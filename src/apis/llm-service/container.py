from dependency_injector import containers, providers

from core.llms.langchain.chat_prompts.answer_message_prompt import (
    CustomChatPromptFactory,
)
from core.llms.langchain.gpt import GptLLM
from core.llms.langchain.history.langchain_history_formatter import (
    LangChainHistoryFormatter,
)
from core.llms.langchain.templates.human.message_human_template import human_template

from langchain.output_parsers import PydanticOutputParser
from core.llms.langchain.templates.system.vocabulary_system_template import (
    vocabulary_system_template,
)
from modules.message.application.answer_message.impl import AnswerMessageService
from modules.message.infrastructure.dtos import VocabularyWordDTO


class Container(containers.DeclarativeContainer):
    chat_prompt = providers.Factory(
        CustomChatPromptFactory.create,
        template=vocabulary_system_template,
        human_template=human_template,
    )
    parser = PydanticOutputParser(pydantic_object=VocabularyWordDTO)
    answer_message_service_llm = providers.Factory(
        GptLLM,
        chat_prompt=chat_prompt,
        history_formatter=LangChainHistoryFormatter(),
        format_instructions=parser.get_format_instructions(),
    )
    answer_message_service = providers.Factory(
        AnswerMessageService, llm=answer_message_service_llm
    )
