import boto3

dynamodb = boto3.client('dynamodb')

def lambda_handler_adopter(event, context):
    user_attributes = event['request']['userAttributes']

    dynamo_params = {
        'TableName': 'users',
        'Item': {
            # 'UserId': {'S': event['userName']},
            'Name': {'S': user_attributes['name']},
            'Email': {'S': user_attributes['email']},
            'Role': {'S': 'ADOPTER'}
        }
    }

    try:
        response = dynamodb.put_item(**dynamo_params)
        print('User record created in DynamoDB:', event['userName'])
    except Exception as e:
        print('Error creating user record in DynamoDB:', e)
        raise e
