resource "aws_cognito_user_pool" "this" {
  name = "user-pool"

  alias_attributes = [
    "email",
  "preferred_username", ]

  password_policy {
    minimum_length                   = 8
    require_lowercase                = false
    require_symbols                  = false
    require_numbers                  = true
    require_uppercase                = false
    temporary_password_validity_days = 7
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  username_configuration {
    case_sensitive = false
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  auto_verified_attributes = ["email"]

}

resource "aws_cognito_user_pool_client" "this" {
  name         = "user-pool-client"
  user_pool_id = aws_cognito_user_pool.this.id

  callback_urls = ["https://${module.cdn.cdn_domain_name}/"]

  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["email", "openid", "phone"]
  supported_identity_providers         = ["COGNITO"]
  id_token_validity                    = "60"
  access_token_validity                = "60"
  explicit_auth_flows                  = ["ALLOW_CUSTOM_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_SRP_AUTH", "ALLOW_ADMIN_USER_PASSWORD_AUTH"]
  prevent_user_existence_errors        = "ENABLED"
  read_attributes                      = ["address", "birthdate", "email", "email_verified", "family_name", "gender", "given_name", "locale", "middle_name", "name", "nickname", "phone_number", "phone_number_verified", "picture", "preferred_username", "profile", "updated_at", "website", "zoneinfo"]

  token_validity_units {
    access_token  = "minutes"
    id_token      = "minutes"
    refresh_token = "days"
  }

  write_attributes = ["address", "birthdate", "email", "family_name", "gender", "given_name", "locale", "middle_name", "name", "nickname", "phone_number", "picture", "preferred_username", "profile", "updated_at", "website", "zoneinfo"]

}

resource "aws_cognito_user_pool_domain" "this" {
  domain       = "adoptemos-todos"
  user_pool_id = aws_cognito_user_pool.this.id
}