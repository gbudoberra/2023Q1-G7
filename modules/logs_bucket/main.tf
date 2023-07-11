module "logs_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  versioning = {
    enabled = true
  }

  bucket = var.bucket_name
  acl           = "log-delivery-write"

  control_object_ownership = true
  object_ownership         = "BucketOwnerPreferred"

  server_side_encryption_configuration = var.default_server_side_encryption

  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true
  force_destroy                         = true

  lifecycle_rule = [
    {
      id = "log"

      expiration = {
        days = 90
      }

      filter = {
        and = {
          prefix = "log/"

          tags = {
            rule      = "log"
            autoclean = "true"
          }
        }
      }

      status = "Enabled"

      transition = {
        days          = 30
        storage_class = "STANDARD_IA"
      }

      transition = {
        days          = 60
        storage_class = "GLACIER"
      }
    }
  ]

}