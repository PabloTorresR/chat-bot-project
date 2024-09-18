# generic interface for the llm logic

from typing import List, Optional


from core.llms.langchain.default_messages.vocabulary_first_message import FIRST_MESSAGE
from core.llms.langchain.history.chat_message_history_formatter import (
    ChatMessageHistoryFormatter,
)
from core.llms.langchain.multi_agents.agent_teams.vocabulary_agent_team import (
    VocabularyAgentTeam,
)
from core.llms.langchain.multi_agents.memory.vocabulary_state import (
    VocabularyGeneratorState,
)
from core.llms.llm import LLM
from modules.messages.domain.aggregate.message_history_model import HistoryMessage


class MultiAgentVocabularyChatbot(LLM):
    def __init__(self, options: Optional[dict] = {}):
        super().__init__(options)
        self.history_formatter = ChatMessageHistoryFormatter(
            default_message=FIRST_MESSAGE
        )
        self.vocabulary_agent_team = VocabularyAgentTeam()

    async def chat(
        self, prompt: str, message_history: Optional[List[HistoryMessage]]
    ) -> dict:

        messages = (
            await self.history_formatter.format(
                message_history=message_history
            ).aget_messages()
            if self.history_formatter and message_history
            else None
        )
        state = VocabularyGeneratorState(
            prompt=prompt,
            messages=messages if messages else [],
            topics="",
            native_language=self.options.get("user_language", "english"),
            language="",
            words=[],
            examples={"sentence_examples": [], "movie_examples": []},
            response="",
            difficulty=[],
        )
        agent_response = await self.vocabulary_agent_team.generate_vocabulary(state)
        return self.__map_agent_response_to_words__(agent_response)

    def __map_agent_response_to_words__(self, agent_response) -> dict:
        words = self.__get_words__(agent_response)
        response = agent_response["response"]
        topics = agent_response["topics"]
        language = agent_response["language"]
        native_language = agent_response["native_language"]

        return {
            "words": words,
            "response": response,
            "topics": topics,
            "language": language,
            "nativeLanguage": native_language,
        }

    def __get_words__(self, agent_response):
        words = []
        for index, word in enumerate(agent_response.get("words", [])):
            word_entry = self.__get_word_entry__(agent_response, index)
            words.append(word_entry)
        return words

    def __get_word_entry__(self, agent_response, index):
        word = agent_response.get("words", [])[index].get("word")
        native_word = agent_response.get("words", [])[index].get("native_word")
        difficulty = self.__get_difficulty__(agent_response, index)
        examples = self.__get_examples__(agent_response, index)

        return {
            "word": word,
            "nativeWord": native_word,
            "difficulty": difficulty,
            "examples": examples,
        }

    def __get_difficulty__(self, agent_response, index):
        difficulty_list = agent_response.get("difficulty", [])
        if len(difficulty_list) > index:
            return difficulty_list[index]
        else:
            return None

    def __get_examples__(self, agent_response, index):
        sentence_examples = agent_response.get("examples", {}).get(
            "sentence_examples", []
        )
        movie_examples = agent_response.get("examples", {}).get("movie_examples", [])

        example = self.__get_example__(sentence_examples, index)
        native_example = self.__get_native_example__(sentence_examples, index)
        movie_example = self.__get_example__(movie_examples, index)
        native_movie_example = self.__get_native_example__(movie_examples, index)

        return {
            "example": example,
            "nativeExample": native_example,
            "movieExample": movie_example,
            "nativeMovieExample": native_movie_example,
        }

    def __get_example__(self, examples, index):
        if len(examples) > index:
            return examples[index].get("example")
        else:
            return None

    def __get_native_example__(self, examples, index):
        if len(examples) > index:
            return examples[index].get("native_example")
        else:
            return None
