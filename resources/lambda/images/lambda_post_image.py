import boto3
import base64
import json


def main(event, context):
    s3 = boto3.client('s3')

    bucket_name = 'images-adoptemos-todos-g7-cloud-gaspar'

    body = json.loads(event['body'])

    image_data = body['image']
    key = body['name']

    decoded_image_data = base64.b64decode(image_data)

    s3.put_object(
        Bucket=bucket_name,
        Key=key,
        Body=decoded_image_data
    )

    resp = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain"
        },
        "body": "Image uploaded successfully"
    }

    return resp