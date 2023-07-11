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
    pet_name = body['pet_name']

    
    # cancell all other applications for this pet
    hash_key = ong_username + '#' + pet_name
    
    response = table.query(
        KeyConditionExpression=Key('ong_username#pet').eq(hash_key) & Key('adopter_username').eq(adopter_username)
    )
    
    
    table.put_item(Item=response["Items"][0])

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
