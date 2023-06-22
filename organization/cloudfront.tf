module "cdn" {
  
  bucket_logs = module.logs_bucket["cdn"].s3_bucket_bucket_domain_name

  domain_backend = module.apigw.domain_name

  domain_frontend = module.site_bucket.s3_bucket_bucket_domain_name

  origin_backend   = module.apigw.id
  
  origin_frontend   = module.site_bucket.s3_bucket_id

  target_backend       = module.site_bucket.s3_bucket_id

  target_frontend      = module.apigw.id
}