import json
import boto3
from boto3.dynamodb.conditions import Key

def main(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = 'applications'
    table = dynamodb.Table(table_name)

    # Extract pet details from the request body
    body = json.loads(event['body'])
    adopter_username = body['adopter_username']
    ong_username = body['ong_username']
    pet_name = body['pet_name']
    
    hash_key = f"{ong_username}#{pet_name}"
    
    # response = table.query(
    #     IndexName='AdopterIndex',
    #     KeyConditionExpression=Key('adopter_username').eq(adopter_username)
    # )
    
    response = table.query(
        KeyConditionExpression=Key('ong_username#pet').eq(hash_key)
    )
    

    items = response['Items']

    for item in items:
        # Update each item's situation to canceled except for the specific adopter
        if item['adopter_username'] == adopter_username:
            item['situation'] = 2  # Confirm the specific adopter's application
        else:
            item['situation'] = 1  # Cancel other applications

        # Update the item in DynamoDB
        table.put_item(Item=item)

    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps({
            'message': 'Application updated successfully!'
        })
    }

    return response
