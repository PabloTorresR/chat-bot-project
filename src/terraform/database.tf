
#Dynamo DB Table for Terraform State Locking
resource "aws_dynamodb_table" "terraform_locks" {
  name         = var.dynamodb_state_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}

resource "aws_dynamodb_table" "conversations_table" {
  name         = "conversations_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "_id"
  attribute {
    name = "_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "messages_table" {
  name         = "messages_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "_id"
  attribute {
    name = "_id"
    type = "S"
  }
}
