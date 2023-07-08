resource "aws_api_gateway_rest_api" "this" {
  name  = "AdoptemosTodos"

}

resource "aws_api_gateway_deployment" "this" {
  rest_api_id = aws_api_gateway_rest_api.this.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.this.body))
  }

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [aws_api_gateway_method.get_pets,
  aws_api_gateway_integration.post_pets, aws_api_gateway_integration.get_pet, aws_api_gateway_integration.get_ongs,
  aws_api_gateway_integration.post_ongs, aws_api_gateway_integration.get_applications, aws_api_gateway_integration.post_applications]
}

resource "aws_api_gateway_stage" "production" {
  deployment_id = aws_api_gateway_deployment.this.id
  rest_api_id   = aws_api_gateway_rest_api.this.id
  stage_name    = var.stage_name
}


resource "aws_api_gateway_authorizer" "api_cognito" {
  name        = "api_cognito"
  rest_api_id = aws_api_gateway_rest_api.this.id
  type        = "COGNITO_USER_POOLS"

  provider_arns = [
    var.cognito_user_pool_arn
  ]
}

### Pets ###

resource "aws_api_gateway_resource" "pets" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "pets"
}

### GET

resource "aws_api_gateway_method" "get_pets" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.pets.id
  http_method   = "GET"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.api_cognito.id
}

resource "aws_api_gateway_integration" "get_pets" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.pets.id
  http_method             = aws_api_gateway_method.get_pets.http_method
  request_parameters = {}
  request_templates       = {}
  content_handling        = "CONVERT_TO_TEXT"
  integration_http_method = "POST"
  type                    = "AWS_PROXY" # NOTE: we could try with AWS_PROXY too
  uri                     = var.get_pets_arn
}

## POST

resource "aws_api_gateway_method" "post_pets" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.pets.id
  http_method   = "POST"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.api_cognito.id
}

resource "aws_api_gateway_integration" "post_pets" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.pets.id
  http_method             = aws_api_gateway_method.post_pets.http_method
  request_parameters = {}
  request_templates       = {}
  content_handling        = "CONVERT_TO_TEXT"
  integration_http_method = "POST"
  type                    = "AWS_PROXY" # NOTE: we could try with AWS_PROXY too
  uri                     = var.post_pets_arn
}

### Pet ###

resource "aws_api_gateway_resource" "pet" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "pet"
}

### GET

resource "aws_api_gateway_method" "get_pet" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.pet.id
  http_method   = "GET"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.api_cognito.id
}

resource "aws_api_gateway_integration" "get_pet" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.pet.id
  http_method             = aws_api_gateway_method.get_pet.http_method
  request_parameters = {}
  request_templates       = {}
  content_handling        = "CONVERT_TO_TEXT"
  integration_http_method = "POST"
  type                    = "AWS_PROXY" # NOTE: we could try with AWS_PROXY too
  uri                     = var.get_pet_arn
}

### ONGS ###

resource "aws_api_gateway_resource" "ongs" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "ongs"
}

### GET

resource "aws_api_gateway_method" "get_ongs" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.ongs.id
  http_method   = "GET"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.api_cognito.id
}

resource "aws_api_gateway_integration" "get_ongs" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.ongs.id
  http_method             = aws_api_gateway_method.get_ongs.http_method
  request_parameters = {}
  request_templates       = {}
  content_handling        = "CONVERT_TO_TEXT"
  integration_http_method = "POST"
  type                    = "AWS_PROXY" # NOTE: we could try with AWS_PROXY too
  uri                     = var.get_ongs_arn
}

### POST

resource "aws_api_gateway_method" "post_ongs" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.ongs.id
  http_method   = "POST"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.api_cognito.id
}

resource "aws_api_gateway_integration" "post_ongs" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.ongs.id
  http_method             = aws_api_gateway_method.post_ongs.http_method
  request_parameters = {}
  request_templates       = {}
  content_handling        = "CONVERT_TO_TEXT"
  integration_http_method = "POST"
  type                    = "AWS_PROXY" # NOTE: we could try with AWS_PROXY too
  uri                     = var.post_ongs_arn
}

### APPLICATIONS ###

resource "aws_api_gateway_resource" "applications" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "applications"
}

### GET

resource "aws_api_gateway_method" "get_applications" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.applications.id
  http_method   = "GET"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.api_cognito.id
}

resource "aws_api_gateway_integration" "get_applications" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.applications.id
  http_method             = aws_api_gateway_method.get_applications.http_method
  request_parameters = {}
  request_templates       = {}
  content_handling        = "CONVERT_TO_TEXT"
  integration_http_method = "POST"
  type                    = "AWS_PROXY" # NOTE: we could try with AWS_PROXY too
  uri                     = var.get_apps_arn
}

### POST

resource "aws_api_gateway_method" "post_applications" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.applications.id
  http_method   = "POST"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.api_cognito.id
}

resource "aws_api_gateway_integration" "post_applications" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.applications.id
  http_method             = aws_api_gateway_method.post_applications.http_method
  request_parameters = {}
  request_templates       = {}
  content_handling        = "CONVERT_TO_TEXT"
  integration_http_method = "POST"
  type                    = "AWS_PROXY" # NOTE: we could try with AWS_PROXY too
  uri                     = var.post_apps_arn
}

### IMAGEs ###

resource "aws_api_gateway_resource" "image" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "image"
}

### GET

resource "aws_api_gateway_method" "get_image" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.image.id
  http_method   = "GET"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.api_cognito.id
}

resource "aws_api_gateway_integration" "get_image" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.image.id
  http_method             = aws_api_gateway_method.get_image.http_method
  request_parameters = {}
  request_templates       = {}
  content_handling        = "CONVERT_TO_TEXT"
  integration_http_method = "POST"
  type                    = "AWS_PROXY" # NOTE: we could try with AWS_PROXY too
  uri                     = var.get_image_arn
}

### POST

resource "aws_api_gateway_method" "post_image" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.image.id
  http_method   = "POST"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.api_cognito.id
}

resource "aws_api_gateway_integration" "post_image" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.image.id
  http_method             = aws_api_gateway_method.post_image.http_method
  request_parameters = {}
  request_templates       = {}
  content_handling        = "CONVERT_TO_TEXT"
  integration_http_method = "POST"
  type                    = "AWS_PROXY" # NOTE: we could try with AWS_PROXY too
  uri                     = var.post_image_arn
}