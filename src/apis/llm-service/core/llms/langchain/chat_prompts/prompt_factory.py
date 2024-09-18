from langchain.prompts.chat import (
    SystemMessagePromptTemplate,
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    AIMessagePromptTemplate,
)


class CustomChatPromptFactory:
    @staticmethod
    def create(template: str, human_template: str) -> ChatPromptTemplate:
        system_message_prompt = SystemMessagePromptTemplate.from_template(template)
        human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)
        return ChatPromptTemplate.from_messages(
            [system_message_prompt, human_message_prompt]
        )
