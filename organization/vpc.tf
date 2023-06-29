module "vpc" {
  source = "../modules/vpc"

  name = "VeterinaryVPC"
  vpc_cidr = local.vpc_cidr
}
