variable "aws_region_name" {
  type        = string
  description = "AWS Region Name"
}

variable "account_id" {
  type        = string
  description = "AWS Account ID"
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

variable "get_pets_arn" {
  type        = string
  description = "ARN get pets lambda"
}

variable "post_pets_arn" {
  type        = string
  description = "ARN post pets lambda"
}

variable "get_pet_arn" {
  type        = string
  description = "ARN get pet lambda"
}

variable "get_apps_ong_arn" {
  type        = string
  description = "ARN get apps lambda"
}

variable "get_apps_adopter_arn" {
  type        = string
  description = "ARN get apps lambda"
}

variable "post_apps_arn" {
  type        = string
  description = "ARN post apps lambda"
}
variable "get_users_arn" {
  type        = string
  description = "ARN get user lambda"
}