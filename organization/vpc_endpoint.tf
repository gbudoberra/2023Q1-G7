module "vpc_endpoint" {
  source = "../modules/vpc_endpoint"

  service_name = "com.amazonaws.us-east-1.dynamodb"

  vpc_id = module.vpc.vpc_id

  route_table_ids = [module.vpc.subnet_route_table_id]

  endpoint_owner = "AdoptemosTodos"

  endpoint_type = "Gateway"
}


module "vpc_endpoint_s3" {
  source = "../modules/vpc_endpoint"

  service_name = "com.amazonaws.us-east-1.s3"

  vpc_id = module.vpc.vpc_id

  route_table_ids = [module.vpc.subnet_route_table_id]

  endpoint_owner = "AdoptemosTodos"

  endpoint_type = "Gateway"
}