
variable "bucket_prefix" {
  type        = string
  description = "Bucket prefix"
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
  type        = string
  description = "Server side encryption"
}

