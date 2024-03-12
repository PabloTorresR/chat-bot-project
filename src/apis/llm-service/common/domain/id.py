from pydantic import BaseModel, validator
from uuid import uuid4
from uuid import UUID


class InvalidArgumentError(Exception):
    pass


class Uuid(BaseModel):
    value: str

    @validator("value")
    def validate_uuid(self, value):
        if not self.is_valid_uuid(value):
            raise InvalidArgumentError(
                f"<{self.__name__}> does not allow the value <{value}>"
            )
        return value

    @staticmethod
    def is_valid_uuid(value):
        try:
            uuid_obj = UUID(value)
            return str(uuid_obj) == value
        except (ValueError, AttributeError, TypeError):
            return False

    @classmethod
    def random(cls):
        return cls(value=str(uuid4()))
