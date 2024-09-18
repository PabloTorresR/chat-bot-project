from pydantic import BaseModel


class UserLanguage(BaseModel):
    value: str

    @classmethod
    def create(cls, value: str) -> "UserLanguage":
        return cls(value=value)

    def __str__(self) -> str:
        return self.value
