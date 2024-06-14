
variable "environment_name" {
  description = "Deployment environment (dev/staging/production)"
  type        = string
  default     = "dev"
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-central-1"
}

variable "user_pool_arn" {
  description = "ARN of the user pool"
}

variable "conversation_service_uri" {
  description = "URI of the conversation service"
}
