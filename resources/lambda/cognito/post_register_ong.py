import boto3

dynamodb = boto3.client('dynamodb')


def lambda_handler_ong(event, context):
    try:
        user_attributes = event['request']['userAttributes']
        name = event['userName']
        email = user_attributes['email']

        dynamo_params = {
            'TableName': 'users',
            'Item': {
                'Name': {'S': name},
                'Email': {'S': email},
                'Role': {'S': 'ONG'}
            }
        }

        try:
            dynamodb.put_item(**dynamo_params)
            print('User record created in DynamoDB:', name)
            return event
        except Exception as e:
            print('Error creating user record in DynamoDB:', e)
            raise e

    except KeyError as e:
        print('Error accessing user attributes:', e)
        raise e
