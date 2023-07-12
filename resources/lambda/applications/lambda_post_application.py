import json

import boto3


def main(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = 'applications'
    table = dynamodb.Table(table_name)

    # Extract pet details from the request body
    body = json.loads(event['body'])
    adopter_username = body['adopter_username']
    ong_username = body['ong_username']
    pet_id = body['pet_name']
    application_situation = 0

    # Create the pet item in DynamoDB
    application_item = {
        'adopter_username': adopter_username,
        'ong_username#pet': ong_username + '#' + pet_id,
        # 'pet_name': pet_id,
        'situation': application_situation
    }
    table.put_item(Item=application_item)

    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps({
            'message': 'Application created successfully!'
        })
    }

    return response
