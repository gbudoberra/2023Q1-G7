import json
from decimal import Decimal

import boto3
from boto3.dynamodb.conditions import Key


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


error_response = {
    'statusCode': 500,
    'headers': {
        'Access-Control-Allow-Origin': '*',
    },
    'body': json.dumps({
        'message': 'Error getting applications.'
    })
}


def main(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = 'applications'
    table = dynamodb.Table(table_name)

    # Retrieve
    if 'queryStringParameters' in event and event['queryStringParameters'] is not None:
        query_params = event['queryStringParameters']
        adopter_username = query_params.get('adopter_username')
    else:
        return error_response

    try:
        response = table.query(
            IndexName='AdopterIndex',
            KeyConditionExpression=Key('adopter_username').eq(adopter_username)
        )

        applications = response['Items']

        response = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps(applications, cls=DecimalEncoder)
        }
        return response
    except Exception:
        return error_response
