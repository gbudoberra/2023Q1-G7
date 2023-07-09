module "lambda" {
  for_each = local.lambdas
  source   = "../modules/lambda"


  lambda_info = each.value
  account_id  = data.aws_caller_identity.current.account_id
  local_path  = local.path

  apigw_execution_arn = module.apigw.execution_arn
  subnet_ids          = module.vpc.subnet_ids
  sg_ids              = [aws_security_group.lambda_security_group.id]

  apigw_id          = module.apigw.id
  apigw_resource_id = module.apigw.resource_id

  myregion  = data.aws_region.current.name
  accountId = data.aws_caller_identity.current.account_id
}

resource "aws_security_group" "lambda_security_group" {
  name   = "lambda_security_group"
  vpc_id = module.vpc.vpc_id
  tags = {
    Name = "lambda_security_group"
  }
}

resource "aws_security_group_rule" "out" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.lambda_security_group.id
}

resource "aws_lambda_permission" "allow_execution_from_user_pool_ong" {
  statement_id = "AllowExecutionFromUserPool"
  action = "lambda:InvokeFunction"
  function_name = module.lambda["post_register_ong"].function_name
  principal = "cognito-idp.amazonaws.com"
  source_arn = aws_cognito_user_pool.this.arn
}

resource "aws_lambda_permission" "allow_execution_from_user_pool_adopter" {
  statement_id = "AllowExecutionFromUserPool"
  action = "lambda:InvokeFunction"
  function_name = module.lambda["post_register_adopter"].function_name
  principal = "cognito-idp.amazonaws.com"
  # TODO Set adopters' user pool
  source_arn = aws_cognito_user_pool.this.arn
}
