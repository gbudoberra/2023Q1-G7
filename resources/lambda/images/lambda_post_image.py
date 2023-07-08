import boto3
import base64


def main(event, context):
    s3 = boto3.client('s3')

    bucket_name = 'images-adoptemos-todos-g7-cloud'  # Replace with your bucket name
    #TODO: sacar la key(nombre de la foto) del request
    key = 'a.JPG'  # Replace with the desired object key

    # Get the image data from the request body
    image_data = event['body']

    # Decode the base64-encoded image data
    decoded_image_data = base64.b64decode(image_data)

    # Upload the image to S3 bucket
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