
variable "name" {
  type        = string
  description = "Table name"
}

variable "hash_key" {
  type        = string
  description = "Table hash key"
}

variable "range_key" {
  type        = string
  description = "Table range key"
}

variable "attributes" {
  type        = list(map(string))
  description = "Table attributes"
}

variable "tags" {
  type        = map(string)
  description = "Table tags"
}

variable "global_secondary_indexes" {
  type        = any
  description = "Table indexes"
}

