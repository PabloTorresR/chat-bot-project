# General Variables

variable "region" {
  description = "Default region for provider"
  type        = string
  default     = "eu-central-1"
}

variable "profile" {
  description = "AWS profile to use"
  type        = string
  default     = "terraform"
}

variable "app_name" {
  description = "Name of the web application"
  type        = string
  default     = "chat-app"
}

# variable "environment_name" {
#   description = "Deployment environment (dev/staging/production)"
#   type        = string
#   default     = "dev"
# }


# S3 Variables
variable "state_bucket_name" {
  description = "prefix of s3 bucket for state lock"
  type        = string
  default     = "chatapp-tf-state"
}



#Dynamo DB Variables

variable "dynamodb_state_table_name" {
  description = "Name of the dynamodb table for state locking"
  type        = string
  default     = "terraform-state-locking"
}
