from dependency_injector import containers, providers


from core.llms.langchain.llms.multi_agent_vocabulary_chatbot import (
    MultiAgentVocabularyChatbot,
)
from modules.messages.application.answer_message.impl import AnswerMessageService


class Container(containers.DeclarativeContainer):

    # Answer Message

    answer_message_service_llm = providers.Factory(
        MultiAgentVocabularyChatbot,
    )
    answer_message_service = providers.Factory(
        AnswerMessageService, llm=answer_message_service_llm
    )

    # Generate Title
    # generate_conversation_title_prompt = providers.Factory(
    #     CustomChatPromptFactory.create,
    #     template=conversation_title_system_template,
    #     human_template=human_template,
    # )
    # generate_conversation_title_service_llm = providers.Factory(
    #     GptLLM,
    #     chat_prompt=generate_conversation_title_prompt,
    #     history_formatter=BufferMemoryHistoryFormatter(),
    #     # format_instructions=parser.get_format_instructions(),
    # )
    # generate_conversation_title_service = providers.Factory(
    #     GenerateTitleService, llm=generate_conversation_title_service_llm
    # )
