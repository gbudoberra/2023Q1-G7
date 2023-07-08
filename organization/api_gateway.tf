module "apigw" {
  source = "../modules/api_gateway"

  name            = local.apigw.name
  description     = local.apigw.description
  aws_region_name = data.aws_region.current.name
  account_id      = data.aws_caller_identity.current.account_id
  cognito_user_pool_arn = aws_cognito_user_pool.this.arn
  get_pets_arn = module.lambda["get_pets"].invoke_arn
  post_pets_arn = module.lambda["post_pet"].invoke_arn
  get_pet_arn = module.lambda["get_pet"].invoke_arn
  get_ongs_arn = module.lambda["get_ong"].invoke_arn
  post_ongs_arn = module.lambda["post_ong"].invoke_arn
  get_apps_arn = module.lambda["get_applications"].invoke_arn
  post_apps_arn = module.lambda["post_application"].invoke_arn
  get_image_arn = module.lambda["get_image"].invoke_arn
  post_image_arn = module.lambda["post_image"].invoke_arn


}