data "aws_caller_identity" "current" {}

resource "aws_iam_role" "lamda_role" {
  name = "lambda_conversation_service_role"
  assume_role_policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Effect" : "Allow",
          "Principal" : {
            "Service" : "lambda.amazonaws.com"
          },
          "Action" : "sts:AssumeRole"
        }
      ]
    }
  )
}

locals {
  conversations_table = "conversations-table${var.environment_name == "prod" ? "" : "-${var.environment_name}"}"
  messages_table      = "messages-table${var.environment_name == "prod" ? "" : "-${var.environment_name}"}"
  domain_events_table = "domain-events-table${var.environment_name == "prod" ? "" : "-${var.environment_name}"}"
}

resource "aws_iam_policy" "iam_policy_lambda_dynamodb" {
  name = "lambda_dynamodb_policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      for table in [local.conversations_table, local.messages_table, local.domain_events_table] : {
        "Effect" : "Allow",
        "Action" : [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"
        ],
        "Resource" : "arn:aws:dynamodb:${var.region}:${data.aws_caller_identity.current.account_id}:table/${table}"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_dynamodb_policy_attachment" {
  role       = aws_iam_role.lamda_role.name
  policy_arn = aws_iam_policy.iam_policy_lambda_dynamodb.arn
}

resource "aws_iam_policy" "iam_policy_llm_service_apigateway" {
  name = "lambda_llm_apigateway_policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "execute-api:Invoke"
        ],
        "Resource" : "arn:aws:apigateway:eu-central-1::/apis/pxrlgcczvl"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_llm_service_apigateway_policy_attachment" {
  role       = aws_iam_role.lamda_role.name
  policy_arn = aws_iam_policy.iam_policy_llm_service_apigateway.arn
}
