variable "bucket_logs" {
    type =  string
    description = "Bucket for logs"
}

variable "domain_backend"{
    type =  string
    description = "Domain backend"
}

variable "domain_frontend"{
    type =  string
    description = "Domain frontend"
}


variable "origin_backend"{
    type =  string
    description = "Origin backend"
}

variable "origin_frontend"{
    type =  string
    description = "Origin frontend"
}

variable "target_backend"{
    type =  string
    description = "Target backend"
}

variable "target_frontend"{
    type =  string
    description = "Target frontend"
}