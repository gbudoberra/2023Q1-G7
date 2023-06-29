variable "name" {
  type        = string
  description = "Name of the vpc"
}

variable "vpc_cidr" {
  type = string
  description = "CIDR block for the vpc"
  default     = "10.0.0.0/16"
}
