module "apigw" {
  source = "../modules/api_gateway"

  name            = local.apigw.name
  description     = local.apigw.description
  aws_region_name = data.aws_region.current.name
  account_id      = data.aws_caller_identity.current.account_id

  body = jsonencode({
    openapi = "3.0.1",
    info    = {
      title   = local.apigw.name
      version = "1.0.0"
    }
    paths = {
      "/pets" = {
        get = {
          x-amazon-apigateway-integration = {
            uri        = module.lambda["get_pets"].invoke_arn
            httpMethod = "POST"
            type       = "aws_proxy"
          }
        }
        post = {
          x-amazon-apigateway-integration = {
            uri        = module.lambda["post_pet"].invoke_arn
            httpMethod = "POST"
            type       = "aws_proxy"
          }
        }
      }
      "/pet" = {
        get = {
          x-amazon-apigateway-integration = {
            uri        = module.lambda["get_pet"].invoke_arn
            httpMethod = "POST"
            type       = "aws_proxy"
          }
        }
      }
      "/ongs" = {
        get = {
          x-amazon-apigateway-integration = {
            uri        = module.lambda["get_ong"].invoke_arn
            httpMethod = "POST"
            type       = "aws_proxy"
          }
        }
        post = {
          x-amazon-apigateway-integration = {
            uri        = module.lambda["post_ong"].invoke_arn
            httpMethod = "POST"
            type       = "aws_proxy"
          }
        }
      },
      "/applications" = {
        get = {
          x-amazon-apigateway-integration = {
            uri        = module.lambda["get_applications"].invoke_arn
            httpMethod = "POST"
            type       = "aws_proxy"
          }
        }
        post = {
          x-amazon-apigateway-integration = {
            uri        = module.lambda["post_application"].invoke_arn
            httpMethod = "POST"
            type       = "aws_proxy"
          }
        }
      },
    }

  })
}