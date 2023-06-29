import json

import boto3


def main(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = 'applications'
    table = dynamodb.Table(table_name)

    # Extract pet details from the request body
    body = json.loads(event['body'])
    ong_id = body['ong_id']
    pet_id = body['pet_id']
    application_id = body['id']
    application_situation = 0

    # Create the pet item in DynamoDB
    application_item = {
        'ong_id': ong_id,
        'pet_id': pet_id,
        'id': application_id,
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
