module "images_bucket" {

  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "images-adoptemos-todos-g7-cloud-gaspar"

  versioning = {
    enabled = true
  }

  attach_policy = true
  policy= data.aws_iam_policy_document.images.json

  #attach_deny_insecure_transport_policy = true
  #attach_require_latest_tls_policy      = true

  server_side_encryption_configuration = local.buckets.default_server_side_encryption

}
