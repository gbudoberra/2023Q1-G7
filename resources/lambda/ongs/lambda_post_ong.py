import boto3
import json


def main(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = 'users'
    table = dynamodb.Table(table_name)

    # Extract pet details from the request body
    body = json.loads(event['body'])
    neighborhood = body['UserId']
    Name = body['Name']
    name = body['name']
    email = body['email']
    phone = body['phone']

    # Create the pet item in DynamoDB
    ong_item = {
        'id': id,
        'neighborhood': neighborhood,
        'email': email,
        'phone': phone,
        'name': name
    }
    table.put_item(Item=ong_item)

    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps({
            'message': 'ONG created successfully!'
        })
    }

    return response
