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

    application_item = {
        'ong_username#pet': ong_username + '#' + pet_name,
        "adopter_username": adopter_username,
        "situation": 1
    }
    # cancell all other applications for this pet
    hash_key = ong_username + '#' + pet_name
    # cancel the corresponding application
    hash_key = ong_username + '#' + pet_name
    table.update_item(
        Key={"ong_username#pet": hash_key, "adopter_username": adopter_username},
        Item=application_item)

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
