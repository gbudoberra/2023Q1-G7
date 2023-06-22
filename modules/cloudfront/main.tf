module "cdn" {
  source = "terraform-aws-modules/cloudfront/aws"


  tags = {
    Name = "Cloudfront"
  }


  #  Any comments you want to include about the distribution.
  comment         = "CloudFront-Adoptemos-Todos"
  enabled         = true
  is_ipv6_enabled = true

  #  The price class for this distribution. One of PriceClass_All, PriceClass_200, PriceClass_100
  price_class = "PriceClass_All"

  retain_on_delete    = false
  wait_for_deployment = true

  # When you enable additional metrics for a distribution, CloudFront sends up to 8 metrics to CloudWatch in the US East (N. Virginia) Region.
  # This rate is charged only once per month, per metric (up to 8 metrics per distribution).
  # create_monitoring_subscription = true

  #  Controls if CloudFront origin access identity should be created
  create_origin_access_identity = true
  origin_access_identities = {
    frontend_s3_bucket = "My awesome CloudFront can access"
  }

  #  The logging configuration that controls how logs are written to your distribution (maximum one).
  logging_config = {
    bucket = var.bucket_logs
    prefix = "log/"
  }

  #  One or more origins for this distribution (multiples allowed).
  origin = {
    api = {
      domain_name = var.domain_backend
      origin_id   = var.origin_backend

      custom_origin_config = {
        http_port              = 80
        https_port             = 443
        origin_protocol_policy = "https-only"
        origin_ssl_protocols   = ["TLSv1.2"]
      }

    }

    frontend = {
      domain_name = var.domain_frontend
      origin_id   = var.origin_frontend
      s3_origin_config = {
        origin_access_identity = "frontend_s3_bucket"
      }
    }

  }

  default_root_object = "index.html"

  #  The default cache behavior for this distribution
  default_cache_behavior = {
    target_origin_id       = var.target_frontend
    viewer_protocol_policy = "allow-all"

    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD"]
    compress        = true
    query_string    = true

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400

  }

  ordered_cache_behavior = [
    {
      path_pattern           = "prod_stage/*"
      target_origin_id       = var.target_backend
      viewer_protocol_policy = "redirect-to-https"

      allowed_methods = ["GET", "HEAD", "OPTIONS", "DELETE", "PUT", "PATCH", "POST"]
      cached_methods  = ["GET", "HEAD"]

      compress     = true
      query_string = true

      min_ttl     = 0
      default_ttl = 3600
      max_ttl     = 86400
    }
  ]


  geo_restriction = {
    restriction_type = "none"
  }

  viewer_certificate = {
    cloudfront_default_certificate = true
  }
}