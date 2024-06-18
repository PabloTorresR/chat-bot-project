resource "aws_api_gateway_rest_api" "api_gateway" {
  name        = "API GATEWAY"
  description = "API GATEWAY FOR MY APP"
  endpoint_configuration {
    types = ["REGIONAL"]
  }

}

resource "aws_api_gateway_authorizer" "cognito_authorizer" {
  name            = "cognito-authorizer"
  rest_api_id     = aws_api_gateway_rest_api.api_gateway.id
  type            = "COGNITO_USER_POOLS"
  identity_source = "method.request.header.Authorization"
  provider_arns   = [var.user_pool_arn]
}

resource "aws_api_gateway_resource" "conversation_service_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part   = "conversation-service"
}

resource "aws_api_gateway_method" "conversations_service_method" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.conversation_service_resource.id
  http_method   = "ANY"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cognito_authorizer.id
}

resource "aws_api_gateway_integration" "conversations_service_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.conversation_service_resource.id
  http_method             = aws_api_gateway_method.conversations_service_method.http_method
  integration_http_method = "ANY"
  type                    = "HTTP_PROXY"
  uri                     = var.conversation_service_uri
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  stage_name  = var.environment_name
}

module "apigateway-cors" {
  source  = "mewa/apigateway-cors/aws"
  version = "2.0.1"
  # insert the 3 required variables here
  api      = aws_api_gateway_rest_api.api_gateway.id
  resource = aws_api_gateway_resource.conversation_service_resource.id

  methods = ["GET", "POST"]
  origin  = "*"
  headers = ["Authorization", "Content-Type", "Accept", "Origin"]
}
