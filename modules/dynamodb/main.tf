module "dynamodb_table" {
  source = "terraform-aws-modules/dynamodb-table/aws"



  name      =  var.name
  hash_key  = var.hash_key
  range_key = var.range_key

  attributes = var.attributes
  tags       = var.tags

  global_secondary_indexes = var.global_secondary_indexes

  server_side_encryption_enabled = true
  table_class                    = "STANDARD"

}