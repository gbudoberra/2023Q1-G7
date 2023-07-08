module "site_bucket" {

  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = var.bucket_name

  versioning = {
    enabled = true
  }

  attach_policy = true
  policy        = var.policy

  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true

  website = {
    index_document = "index.html"
    error_document = "error.html"
  }

  logging = {
    target_bucket = var.logs_bucket_id
    target_prefix = var.logs_prefix
  }

  server_side_encryption_configuration = var.default_server_side_encryption

}