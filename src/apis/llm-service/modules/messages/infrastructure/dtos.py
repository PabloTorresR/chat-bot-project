from langchain_core.pydantic_v1 import BaseModel, Field


class VocabularyWordDTO(BaseModel):
    foreign_word: str = Field(description="word in the foreign language")
    english_word: str = Field(description="word translated to English")
    foreign_example: int = Field(
        description="example sentence in the foreign language, not longer than 6 words"
    )
    english_example: str = Field(description="example sentence translated to English")
    synonyms: str = Field(
        description="synonyms of the word in the foreign language, minimum of 1 word"
    )
    foreign_example_in_culture: str = Field(
        description="example sentence in the foreign language of the word being used by characters in movies or books, songs lyrics, etc."
    )
