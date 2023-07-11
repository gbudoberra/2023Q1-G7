import base64

import boto3
import json


def main(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = 'pets'
    table = dynamodb.Table(table_name)

    # Extract pet details from the request body
    body = json.loads(event['body'])
    ong_username = body['ong_username']
    name = body['name']
    pet_type = body['type']
    age = body['age']

    # Create the pet item in DynamoDB
    pet_item = {
        'ong_username': ong_username,
        'type': pet_type,
        'age': age,
        'situation': 0,
        'pet_name': name
    }
    table.put_item(Item=pet_item)

    # Image
    s3 = boto3.client('s3')

    bucket_name = 'images-adoptemos-todos-g7-cloud-gaspar'

    image_data = body['image']
    key = name

    decoded_image_data = base64.b64decode(image_data)

    s3.put_object(
        Bucket=bucket_name,
        Key=key,
        Body=decoded_image_data
    )

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
