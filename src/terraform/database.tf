
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
