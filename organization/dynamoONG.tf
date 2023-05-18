module "dynamodb_table_ong" {
  source = "terraform-aws-modules/dynamodb-table/aws"

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
    # , {
    #   name = "email"    NO SON NECESARIOS PORQUE NO VAN A NINGUN INDEX
    #   type = "S"
    # }
    # , {
    #   name = "name"
    #   type = "S"
    # }
  ]

  server_side_encryption_enabled = true
  table_class                 = "STANDARD"

  tags = {
    Terraform   = "true"
    Environment = "staging"
  }
}