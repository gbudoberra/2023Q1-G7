output "s3_bucket_id" {
  description = "bucket id"
  value       = module.logs_bucket.s3_bucket_id
}

output "s3_bucket_bucket_domain_name" {
  description = "bucket domain name"
  value       = module.site_bucket.s3_bucket_bucket_domain_name
}

