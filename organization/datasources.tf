data "aws_caller_identity" "current" {
  provider = aws.aws
}

data "aws_region" "current" {
  provider = aws.aws
}

data "aws_iam_policy_document" "site" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${module.site_bucket.s3_bucket_arn}/*"]

    principals {
      type        = "AWS"
      identifiers = module.cdn.cloudfront_origin_access_identity_iam_arns
    }
  }
}

data "aws_iam_policy_document" "images" {
  statement {
    actions   = ["s3:GetObject", "s3:PutObject"]
    resources = ["${module.images_bucket.s3_bucket_arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/LabRole"]
    }
  }
}
