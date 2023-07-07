locals {
  # VPC LOCALS
  vpc_cidr = "10.0.0.0/16"


  # LAMBDAS
  path = "../resources"
  lambdas = {
    "get_pets" = {
      filename      = "${local.path}/lambda/pets/lambda_get_pets.zip"
      function_name = "get_pets"
      handler       = "lambda_get_pets.main"
      description   = "Get pets lambda"
      runtime       = "python3.9"
      method        = "GET"
      path          = "/pets"
      part_path     = "pets"
    },
    "get_pet" = {
      filename      = "${local.path}/lambda/pets/lambda_get_pet.zip"
      function_name = "get_pet"
      handler       = "lambda_get_pet.main"
      description   = "Get pet lambda"
      runtime       = "python3.9"
      method        = "GET"
      path          = "/pets/{ong_id}/{pet_id}"
      part_path     = "pets"
    }
    "post_pet" = {
      filename      = "${local.path}/lambda/pets/lambda_post_pet.zip"
      function_name = "post_pet"
      handler       = "lambda_post_pet.main"
      description   = "Post pet lambda"
      runtime       = "python3.9"
      method        = "POST"
      path          = "/pets"
      part_path     = "pets"
    },
    "get_applications_ong" = {
      filename      = "${local.path}/lambda/applications/lambda_get_applications_ong.zip"
      function_name = "get_applications_ong"
      handler       = "get_applications_ong.main"
      description   = "Get applications from ong lambda"
      runtime       = "python3.9"
      method        = "GET"
      path          = "/applications_ong"
      part_path     = "applications_ong"
    },
    "get_applications_adopter" = {
      filename      = "${local.path}/lambda/applications/lambda_get_applications_adopter.zip"
      function_name = "get_applications_adopter"
      handler       = "get_applications_adopter.main"
      description   = "Get applications from adopter lambda"
      runtime       = "python3.9"
      method        = "GET"
      path          = "/applications_adopter"
      part_path     = "applications_adopter"
    },
    "post_application" = {
      filename      = "${local.path}/lambda/applications/lambda_post_application.zip"
      function_name = "post_application"
      handler       = "lambda_post_application.main"
      description   = "Post application lambda"
      runtime       = "python3.9"
      method        = "POST"
      path          = "/applications_adopter"
      part_path     = "applications_adopter"
    }
    "get_user" = {
      filename      = "${local.path}/lambda/ongs/lambda_get_user.zip"
      function_name = "get_user"
      handler       = "lambda_get_user.main"
      description   = "Get user lambda"
      runtime       = "python3.9"
      method        = "GET"
      path          = "/user/"
      part_path     = "ong"
    }
    "post_register_adopter" = {
      filename      = "${local.path}/lambda/cognito/post_register_adopter.zip"
      function_name = "register_adopter"
      handler       = "lambda_handler_adopter.main"
      description   = "Post adopter lambda"
      runtime       = "python3.9"
      method        = "GET"
      path          = "/postadopter"
      part_path     = "adopter"
    }
    "post_register_ong" = {
      filename      = "${local.path}/lambda/cognito/post_register_ong.zip"
      function_name = "register_ong"
      handler       = "lambda_handler_ong.main"
      description   = "Post ong lambda"
      runtime       = "python3.9"
      method        = "GET"
      path          = "/postong"
      part_path     = "ong"
    }
  }

  # DynamoDB
  dynamodb = {
    tables = {
      users = {
        name      = "users"
        hash_key  = "Name"
        range_key = "Email"

        attributes = [
          {
            name = "Name"
            type = "S"
          },
          {
            name = "Email"
            type = "S"
          }
        ]

        global_secondary_indexes = []

        tags = {
          Entity = "USERS"
        }

      }

      pets = {
        name      = "pets"
        hash_key  = "ong_username"
        range_key = "pet_name"


        attributes = [
          {
            name = "ong_username"
            type = "S"
          },
          {
            name = "pet_name"
            type = "S"
          }
#          , {
#            name = "type"
#            type = "N"
#          }
#          , {
#            name = "age"
#            type = "N"
#          }
#          , {
#            name = "situation"
#            type = "N"
#          }
        ]

        global_secondary_indexes = [
#        {
#          name            = "TypeIndex"
#          hash_key        = "type"
#          write_capacity  = 5
#          read_capacity   = 5
#          projection_type = "ALL"
#          },
#          {
#            name            = "AgeIndex"
#            hash_key        = "age"
#            write_capacity  = 5
#            read_capacity   = 5
#            projection_type = "ALL"
#          },
#          {
#            name            = "SituationIndex"
#            hash_key        = "situation"
#            write_capacity  = 5
#            read_capacity   = 5
#            projection_type = "ALL"
#          }
        ]

        tags = {
          entity = "Pet"
        }
      }

      applications = {
        name = "applications",
        hash_key  = "ong_username"
        range_key = "pet_name"

        attributes = [
          {
            name = "ong_username"
            type = "S"
          },
          {
            name = "adopter_username"
            type = "S"
          },
          {
            name = "pet_name"
            type = "S"
          }
        ]

        global_secondary_indexes = [
          {
            name            = "AdopterIndex"
            hash_key        = "adopter_username"
            write_capacity  = 5
            read_capacity   = 5
            projection_type = "ALL"
          }
        ]

        tags = {
          Entity = "Application"
        }

      }
    }
  }

  # API GW
  apigw = {
    name        = "main_api_gw",
    description = "Main API gateway",
  }

  # Site bucket
  buckets = {
    site_bucket = {
      prefix = "adoptemos-todos-site-s3-",
    }
    logs_bucket = {
      prefixes = { site = "adoptemos-todos-logs-s3-", cdn = "cdn-logs-s3-" }
    }
    default_server_side_encryption = {
      rule = {
        apply_server_side_encryption_by_default = {
          sse_algorithm = "AES256"
        }
      }
    }
    logs_prefix = "log/"
  }




  filetypes = {
    "html" : "text/html",
    "jpg" : "image/jpg",
    "jpeg" : "image/jpeg",
    "png" : "image/png",
    "css" : "text/css",
    "js" : "application/javascript",
    "json" : "application/json",
  }

  file_with_type = flatten([
    for type, mime in local.filetypes : [
      for key, value in fileset("../resources/web/", "**/*.${type}") : {
        mime      = mime
        file_name = value
      }
    ]
  ])

}