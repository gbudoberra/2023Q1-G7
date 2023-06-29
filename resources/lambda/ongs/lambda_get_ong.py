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
    table_name = 'ong'
    table = dynamodb.Table(table_name)

    query_parameters = event['queryStringParameters']
    neighborhood = query_parameters['neighborhood']
    ong_id = query_parameters['id']

    ong_id = int(ong_id)
    response = table.get_item(Key={'id': ong_id, 'neighborhood': neighborhood})
    ong = response.get('Item')

    if ong:
        response = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps(ong, cls=DecimalEncoder)
        }
    else:
        response = {
            'statusCode': 404,
            'headers': {
                'Access-Control-Allow-Origin': '*',
            },
            'body': 'ONG not found'
        }

    return response
