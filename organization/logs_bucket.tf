module "logs_bucket" {
  source = "../modules/logs_bucket"

  for_each = local.buckets.logs_bucket.prefixes


  bucket_prefix = each.value


  default_server_side_encryption = local.buckets.default_server_side_encryption

}