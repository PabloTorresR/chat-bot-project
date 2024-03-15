from pydantic import BaseModel, validator
from uuid import uuid4
from uuid import UUID


class InvalidArgumentError(Exception):
    pass


class Uuid(BaseModel):
    value: str

    @staticmethod
    def is_valid_uuid(value):
        try:
            uuid_obj = UUID(value)
            return str(uuid_obj) == value
        except (ValueError, AttributeError, TypeError):
            return False

    @validator("value")
    @classmethod
    def validate_uuid(cls, value):
        if not cls.is_valid_uuid(value):
            raise InvalidArgumentError(
                f"<{cls.value}> does not allow the value <{value}>"
            )
        return value

    @classmethod
    def random(cls):
        return cls(value=str(uuid4()))
