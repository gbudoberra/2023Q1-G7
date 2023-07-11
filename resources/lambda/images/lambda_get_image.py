import boto3
import base64


def main(event, context):
    s3 = boto3.resource('s3')

    bucket_name = 'images-adoptemos-todos-g7-cloud-gaspar'

    query_parameters = event['queryStringParameters']
    key = query_parameters['name']

    bucket = s3.Bucket(bucket_name)
    object = bucket.Object(key)
    response = object.get()
    file_stream = response['Body']
    image_data = file_stream.read()
    encoded_image_data = base64.b64encode(image_data).decode('utf-8')
    #serialized_data = json.dumps(encoded_image_data)

    resp = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'image/jpeg'
        },
        "body": encoded_image_data
    }

    return resp
