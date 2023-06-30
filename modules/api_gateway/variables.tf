variable "aws_region_name" {
  type        = string
  description = "AWS Region Name"
}

variable "account_id" {
  type        = string
  description = "AWS Account ID"
}

variable "body" {
  type        = string
  description = "API Body"
}


variable "name" {
  type        = string
  description = "Name of the API"
}

variable "description" {
  type        = string
  description = "Description of the API"
}

variable "stage_name" {
  type        = string
  description = "Stage name to deploy this API-GW"
  default = "prod_stage"
}

variable "cognito_user_pool_arn" {
  type        = string
  description = "ARN Cognito"
}