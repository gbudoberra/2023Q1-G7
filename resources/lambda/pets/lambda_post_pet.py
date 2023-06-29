import boto3
import json


def main(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = 'pets'
    table = dynamodb.Table(table_name)

    # Extract pet details from the request body
    body = json.loads(event['body'])
    ong_id = body['ong_id']
    pet_id = body['id']
    pet_type = body['type']
    age = body['age']
    situation = body['situation']
    name = body['name']

    # Create the pet item in DynamoDB
    pet_item = {
        'ong_id': ong_id,
        'id': pet_id,
        'type': pet_type,
        'age': age,
        'situation': situation,
        'name': name
    }
    table.put_item(Item=pet_item)

    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps({
            'message': 'Pet created successfully!'
        })
    }

    return response
