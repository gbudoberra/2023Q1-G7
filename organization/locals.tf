locals {
  # VPC LOCALS
  vpc_cidr = "10.0.0.0/16"


  # LAMBDAS
  path = "../resources"
  lambdas = {
    "get_image" = {
      filename      = "${local.path}/lambda/images/lambda_get_image.zip"
      function_name = "get_image"
      handler       = "lambda_get_image.main"
      description   = "Get image lambda"
      runtime       = "python3.9"
      method        = "GET"
      path          = "/image"
      part_path     = "image"
    },
    "post_image" = {
      filename      = "${local.path}/lambda/images/lambda_post_image.zip"
      function_name = "post_image"
      handler       = "lambda_post_image.main"
      description   = "Post image lambda"
      runtime       = "python3.9"
      method        = "POST"
      path          = "/image"
      part_path     = "image"
    },
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
    "get_applications" = {
      filename      = "${local.path}/lambda/applications/lambda_get_applications.zip"
      function_name = "get_applications"
      handler       = "lambda_get_applications.main"
      description   = "Get applications lambda"
      runtime       = "python3.9"
      method        = "GET"
      path          = "/applications"
      part_path     = "applications"
    },
    "post_application" = {
      filename      = "${local.path}/lambda/applications/lambda_post_application.zip"
      function_name = "post_application"
      handler       = "lambda_post_application.main"
      description   = "Post application lambda"
      runtime       = "python3.9"
      method        = "POST"
      path          = "/applications"
      part_path     = "applications"
    }
    "post_ong" = {
      filename      = "${local.path}/lambda/ongs/lambda_post_ong.zip"
      function_name = "post_ong"
      handler       = "lambda_post_ong.main"
      description   = "Post ong lambda"
      runtime       = "python3.9"
      method        = "POST"
      path          = "/ongs"
      part_path     = "ongs"
    }
    "get_ong" = {
      filename      = "${local.path}/lambda/ongs/lambda_get_ong.zip"
      function_name = "get_ong"
      handler       = "lambda_get_ong.main"
      description   = "Get ong lambda"
      runtime       = "python3.9"
      method        = "GET"
      path          = "/ongs/{neighborhood}/{ong_id}"
      part_path     = "ong"
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
      name = "site-adoptemos-todos-g7-cloud",
    }
    logs_bucket = {
      names = { site = "logs-site-adoptemos-todos-g7-cloud", cdn = "logs-cdn-adoptemos-todos-g7-cloud" }
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