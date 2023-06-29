import boto3
import json
from decimal import Decimal


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

    # Retrieve all pets from the DynamoDB table
    response = table.scan()
    pets = response['Items']

    # Prepare the response
    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps(pets, cls=DecimalEncoder)
    }

    return response
