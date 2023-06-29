locals {
  # VPC LOCALS
  vpc_cidr = "10.0.0.0/16"


  # LAMBDAS
  path = "../resources"
  lambdas = {
    "get_pets" = {
      filename      = "${local.path}/lambda/lambda_get_pets.zip"
      function_name = "get_pets"
      handler       = "lambda_get_pets.main"
      description   = "Get pets lambda"
      runtime       = "python3.9"
      method        = "GET"
      path          = "/pets"
      part_path     = "pets"
    },
    "post_pet" = {
      filename      = "${local.path}/lambda/lambda_post_pet.zip"
      function_name = "post_pet"
      handler       = "lambda_post_pet.main"
      description   = "Post pet lambda"
      runtime       = "python3.9"
      method        = "POST"
      path          = "/pets"
      part_path     = "pets"
    }
  }

  # DynamoDB
  dynamodb = {
    tables = {
      ong = {
        name      = "ong"
        hash_key  = "neighborhood"
        range_key = "id"

        attributes = [
          {
            name = "neighborhood"
            type = "S"
          },
          {
            name = "id"
            type = "N"
          }
        ]

        global_secondary_indexes = []

        tags = {
          Entity = "ONG"
        }

      }

      pets = {
        name      = "pets"
        hash_key  = "ong_id"
        range_key = "id"


        attributes = [
          {
            name = "ong_id"
            type = "N"
          },
          {
            name = "id"
            type = "N"
          }
          , {
            name = "type"
            type = "N"
          }
          , {
            name = "age"
            type = "N"
          }
          , {
            name = "situation"
            type = "N"
          }
        ]

        global_secondary_indexes = [{
          name            = "TypeIndex"
          hash_key        = "type"
          write_capacity  = 5
          read_capacity   = 5
          projection_type = "ALL"
          },
          {
            name            = "AgeIndex"
            hash_key        = "age"
            write_capacity  = 5
            read_capacity   = 5
            projection_type = "ALL"
          },
          {
            name            = "SituationIndex"
            hash_key        = "situation"
            write_capacity  = 5
            read_capacity   = 5
            projection_type = "ALL"
          }
        ]

        tags = {
          entity = "Pet"
        }
      }

      applications = {
        name = "applications",
        hash_key  = "ong_id"
        range_key = "id"

        attributes = [
          {
            name = "ong_id"
            type = "N"
          },
          {
            name = "pet_id"
            type = "N"
          },
          {
            name = "id"
            type = "N"
          },
          {
            name = "situation"
            type = "N"
          }
        ]

        global_secondary_indexes = [
          {
            name            = "PetIndex"
            hash_key        = "pet_id"
            write_capacity  = 5
            read_capacity   = 5
            projection_type = "ALL"
          },
          {
            name            = "SituationIndex"
            hash_key        = "situation"
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