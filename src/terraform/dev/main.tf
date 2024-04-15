terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.43.0"
    }
  }

  backend "s3" {
    bucket         = "chatapp-tf-state"
    key            = "dev/terraform.tfstate"
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

locals {
  environment_name = "dev"
}

module "auth" {
  source           = "../_modules/auth-module"
  environment_name = local.environment_name
}

module "database" {
  source           = "../_modules/database-module"
  environment_name = local.environment_name
}
