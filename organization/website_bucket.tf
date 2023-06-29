module "site_bucket" {

  source = "../modules/website_bucket"

  bucket_prefix = local.buckets.site_bucket.prefix

  policy        = data.aws_iam_policy_document.site.json

  logs_bucket_id = module.logs_bucket["site"].s3_bucket_id

  logs_prefix = local.buckets.logs_prefix

  default_server_side_encryption = local.buckets.default_server_side_encryption

}

resource "aws_s3_object" "data" {
  for_each = { for file in local.file_with_type : "${file.file_name}.${file.mime}" => file }

  bucket = module.site_bucket.s3_bucket_id
  key    = each.value.file_name

  source       = "../resources/web/${each.value.file_name}"
  etag         = filemd5("../resources/web/${each.value.file_name}")
  content_type = each.value.mime
}