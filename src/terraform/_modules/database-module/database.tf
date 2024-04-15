
resource "aws_dynamodb_table" "conversations_table" {
  name         = "conversations-table${var.environment_name == "prod" ? "" : "-${var.environment_name}"}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "_id"
  attribute {
    name = "_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "messages_table" {
  name         = "messages-table${var.environment_name == "prod" ? "" : "-${var.environment_name}"}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "_id"
  attribute {
    name = "_id"
    type = "S"
  }
}
