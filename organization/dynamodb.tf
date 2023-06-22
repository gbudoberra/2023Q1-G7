module "dynamodb_table" {
  source = "../modules/dynamodb"

  for_each = local.dynamodb.tables

  name      = each.value.name

  hash_key  = each.value.hash_key
  range_key = each.value.range_key

  attributes = each.value.attributes
  tags       = each.value.tags

  global_secondary_indexes = each.value.global_secondary_indexes

}