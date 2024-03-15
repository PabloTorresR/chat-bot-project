from dependency_injector import containers, providers

from core.llms.fake_llm.fake_llm import FakeLLM
from core.llms.langchain.chat_prompts.answer_message_prompt import (
    CustomChatPromptFactory,
)
from core.llms.langchain.gpt import GptLLM
from core.llms.langchain.history.langchain_history_formatter import (
    LangChainHistoryFormatter,
)
from core.llms.langchain.templates.human.message_human_template import (
    human_template as bad_bunny_human_template,
)
from core.llms.langchain.templates.system.message_system_template import (
    template as bad_bunny_system_template,
)
from modules.message.application.answer_message.impl import AnswerMessageService


class Container(containers.DeclarativeContainer):
    badbunny_chat_prompt = providers.Factory(
        CustomChatPromptFactory.create,
        template=bad_bunny_system_template,
        human_template=bad_bunny_human_template,
    )
    answer_message_service_llm = providers.Factory(
        GptLLM,
        chat_prompt=badbunny_chat_prompt,
        history_formatter=LangChainHistoryFormatter,
    )
    answer_message_service = providers.Factory(
        AnswerMessageService, llm=answer_message_service_llm
    )
