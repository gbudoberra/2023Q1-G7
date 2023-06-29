
output "cloudfront_origin_access_identity_iam_arns" {
  description = "bucket domain name"
  value       = module.cdn.cloudfront_origin_access_identity_iam_arns
}