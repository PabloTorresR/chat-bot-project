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
