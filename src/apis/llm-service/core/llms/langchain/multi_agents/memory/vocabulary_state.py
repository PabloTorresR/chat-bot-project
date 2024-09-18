from typing import List
from typing_extensions import TypedDict, Annotated
from langchain_core.messages import BaseMessage


class Example(TypedDict):
    example: Annotated[
        str, "example of the word used in a sentence in learning language"
    ]
    native_example: Annotated[
        str,
        "example of the word used in a sentence in native language",
    ]


class MovieExamples(TypedDict):
    example: Annotated[
        str,
        "example of the word used in a sentence in the popular culture (movies, songs, etc.) in learning language",
    ]
    native_example: Annotated[
        str,
        "example of the word used in a sentence in the popular culture (movies, songs, etc.) in native language",
    ]


class Word(TypedDict):
    word: Annotated[str, "word in the learning language"]
    native_word: Annotated[str, "word in the native language"]


class GeneratedExamples(TypedDict):
    sentence_examples: List[Example]
    movie_examples: List[MovieExamples]


class GeneratedWords(TypedDict):
    words: List[Word]


class Difficulty(TypedDict):
    difficulty: List[int]


class VocabularyGeneratorState(TypedDict):
    prompt: str
    messages: List[BaseMessage]
    topics: str
    native_language: str
    language: str
    examples: GeneratedExamples
    words: List[Word]
    response: str
    difficulty: List[int]
