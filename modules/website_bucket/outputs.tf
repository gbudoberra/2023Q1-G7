output "s3_bucket_id" {
  description = "bucket id"
  value       = module.site_bucket.s3_bucket_id
}


output "s3_bucket_arn" {
  description = "bucket arn"
  value       = module.site_bucket.s3_bucket_arn
}

output "s3_bucket_bucket_domain_name" {
  description = "bucket arn"
  value       = module.site_bucket.s3_bucket_bucket_domain_name
}