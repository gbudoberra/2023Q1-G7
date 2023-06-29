module "vpc" {
  source = "../modules/vpc"

  vpc_cidr = local.vpc_cidr
}
