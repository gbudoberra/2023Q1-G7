import json
from decimal import Decimal

import boto3


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


def main(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = 'pets'
    table = dynamodb.Table(table_name)

    query_parameters = event['queryStringParameters']
    ong_username = query_parameters['ong_username']
    pet_name = query_parameters['name']

    # Retrieve all pets from the DynamoDB table
    # ong_id = int(ong_id)
    response = table.get_item(Key={'ong_username': ong_username, 'name': pet_name})
    pet = response.get('Item')

    # Prepare the response
    if pet:
        response = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps(pet, cls=DecimalEncoder)
        }
    else:
        response = {
            'statusCode': 404,
            'headers': {
                'Access-Control-Allow-Origin': '*',
            },
            'body': 'Pet not found'
        }

    return response
