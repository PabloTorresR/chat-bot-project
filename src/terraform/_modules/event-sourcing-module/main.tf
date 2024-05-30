locals {
  environment_suffix = var.environment_name == "prod" ? "" : "-${var.environment_name}"
}

resource "aws_cloudwatch_event_bus" "eventbus" {
  name = "chatapp${local.environment_suffix}.domain_events"
}

resource "aws_cloudwatch_event_rule" "rule-chatapp-conversation-all" {
  name           = "rule.chatapp.conversation.all${local.environment_suffix}"
  event_bus_name = aws_cloudwatch_event_bus.eventbus.name
  event_pattern  = <<PATTERN
    {"detail-type": [{"prefix": "chatapp.conversation."}]}
PATTERN
}

resource "aws_cloudwatch_event_rule" "rule-chatapp-conversation-created" {
  name           = "rule.chatapp.conversation.created${local.environment_suffix}"
  event_bus_name = aws_cloudwatch_event_bus.eventbus.name
  event_pattern  = <<PATTERN
    {"detail-type": ["chatapp.conversation.created"]}
PATTERN
}

resource "aws_cloudwatch_event_rule" "rule-chatapp-message-all" {
  name           = "rule.chatapp.message.all${local.environment_suffix}"
  event_bus_name = aws_cloudwatch_event_bus.eventbus.name
  event_pattern  = <<PATTERN
    {"detail-type": [{"prefix": "chatapp.message."}]}
PATTERN
}

resource "aws_cloudwatch_event_rule" "rule-chatapp-message-created" {
  name           = "rule.chatapp.message.created${local.environment_suffix}"
  event_bus_name = aws_cloudwatch_event_bus.eventbus.name
  event_pattern  = <<PATTERN
    {"detail-type": ["chatapp.message.created"]}
PATTERN
}

resource "aws_cloudwatch_event_rule" "rule-chatapp-user-all" {
  name           = "rule.chatapp.user.all${local.environment_suffix}"
  event_bus_name = aws_cloudwatch_event_bus.eventbus.name
  event_pattern  = <<PATTERN
    {"detail-type": [{"prefix": "chatapp.user."}]}
PATTERN
}

resource "aws_cloudwatch_event_rule" "rule-chatapp-user-created" {
  name           = "rule.chatapp.user.created${local.environment_suffix}"
  event_bus_name = aws_cloudwatch_event_bus.eventbus.name
  event_pattern  = <<PATTERN
    {"detail-type": ["chatapp.user.created"]}
PATTERN
}
