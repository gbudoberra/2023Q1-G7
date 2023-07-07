output "invoke_arn" {
  description = "Invoke arn"
  value       = aws_lambda_function.this.invoke_arn
}

output "arn" {
  description = "arn"
  value       = aws_lambda_function.this.arn
}