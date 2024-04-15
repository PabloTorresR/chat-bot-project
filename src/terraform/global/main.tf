terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.43.0"
    }
  }

  backend "s3" {
    bucket         = "chatapp-tf-state"
    key            = "terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-state-locking"
    encrypt        = true
    profile        = "terraform"
  }
}
provider "aws" {
  profile = var.profile
  region  = var.region
}
