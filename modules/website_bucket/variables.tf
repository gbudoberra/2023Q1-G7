
variable "bucket_name" {
  type        = string
  description = "Bucket name"
}


variable "policy" {
  type        = string
  description = "Bucket policy"
}


variable "logs_bucket_id" {
  type        = string
  description = "Log bucket id"
}

variable "logs_prefix" {
  type        = string
  description = "Log bucket prefix"
}

variable "default_server_side_encryption" {
  type        = any
  description = "Server side encryption"
}

