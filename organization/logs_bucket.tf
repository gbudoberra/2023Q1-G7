module "logs_bucket" {
  source = "../modules/logs_bucket"

  for_each = local.buckets.logs_bucket.names


  bucket_name = each.value


  default_server_side_encryption = local.buckets.default_server_side_encryption

}