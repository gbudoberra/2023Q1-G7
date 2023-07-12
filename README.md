# TP3 Cloud Computing - Grupo 7

## Módulos utilizados
### Externos
#### [Bucket S3](https://github.com/terraform-aws-modules/terraform-aws-s3-bucket)
#### [Cloudfront](https://github.com/terraform-aws-modules/terraform-aws-cloudfront)
#### [Dynamo](https://github.com/terraform-aws-modules/terraform-aws-dynamodb-table)
### Propios
#### [VPC](https://github.com/gbudoberra/2023Q1-G7/blob/main/modules/vpc)
#### [API Gateway](https://github.com/gbudoberra/2023Q1-G7/blob/main/modules/api_gateway)
#### [Lambda](https://github.com/gbudoberra/2023Q1-G7/blob/main/modules/lambda)
#### [VPC Endpoint](https://github.com/gbudoberra/2023Q1-G7/blob/main/modules/vpc_endpoint)

## Componentes a evaluar

1. Bucket S3
    
    - Se deployan 2 Buckets S3. Uno para el frontend estático y otro para guardar los logs del proyecto. El frontend posee un index.html con data mockeada.
2. Cloudfront

   - Se vincula Cloudfront con el Bucket S3 del frontend para poder acceder a la página web. 
   - Se configura para que los logs se guarden en un Bucket S3 específico.
   - Además, se configura el API Gateway para que pueda ser accedido desde el Cloudfront.
3. Dynamo DB

    - Tabla "ong". 
        - Partition Key: neighborhood para poder filtrar por barrios de forma eficiente. 
        - Sort key: id. 
        - Ademas se insertaran datos como name, email y phone que no se ven registrados en el código de Terraform
    - Tabla "pets" con la informacion requerida para crear una mascota. 
        - Partition Key: ong_id para filtrar de forma eficiente las mascotas pertenecientes a una ong. 
        - Range Key: id. 
        - GSIs: por Type, Age y Situation para optimizar los posibles filtros.
    - Toda la información se almacena encriptada.
4. VPC

    - Se crea una VPC con 2 subredes privadas en la region us-east-1.
    - Se le agrega un VPC Endpoint para que las funciones Lambdas tengan acceso a Dynamo DB.
5. API Gateway

    - ```GET /pets``` para obtener toda la lista de mascotas. Inicialmente se encuentra sin valores porque la tabla esta vacía.
    - ```POST /pets``` para crear una nueva mascota con los parámetros dentro del body del request.
6. Lambda

    - Implementación de las funciones necesarias para los endpoints de la API. Realizadas en Python.

## Descripción y referencia de funciones y meta-argumentos utilizados

### Funciones

* [fileset](https://github.com/gbudoberra/2023Q1-G7/blob/main/organization/locals.tf)
    * Enumera la lista de archivos dado un path y un patrón.
* [filemd5](https://github.com/gbudoberra/2023Q1-G7/blob/main/organization/s3_bucket.tf)
    * Genera el hash del archivo utilizando una variante de md5.
* [flatten](https://github.com/gbudoberra/2023Q1-G7/blob/main/organization/locals.tf)
    * Unifica todo lo que se le ingrese en una lista.
* [sha1](https://github.com/gbudoberra/2023Q1-G7/blob/main/modules/api_gateway/main.tf)
    * Genera el hash SHA1.
* [jsonencode](https://github.com/gbudoberra/2023Q1-G7/blob/main/modules/api_gateway/main.tf)
    * Codifica lo que se ingresa por parámetro con un sintáxis JSON.
* [length](https://github.com/gbudoberra/2023Q1-G7/blob/main/modules/vpc/main.tf)
    * Devuelve la longitud de la lista especificada.
* [cidrsubnet](https://github.com/gbudoberra/2023Q1-G7/blob/main/modules/vpc/locals.tf)
    * Calcula la dirección dentro la IP ingresada.

### Meta-argumentos

* [for_each](https://github.com/gbudoberra/2023Q1-G7/blob/main/organization/s3_bucket.tf)
    * for_each recibe un mapa o una lista de strings y crea una instancia para cada item. 
* [count](https://github.com/gbudoberra/2023Q1-G7/blob/main/modules/vpc/main.tf)
    * count recibe un número y crea esa cantidad de instancias del recurso o modulo específico.
* [lifecycle](https://github.com/gbudoberra/2023Q1-G7/blob/main/modules/lambda/main.tf)
    * lifecycle ayuda al control de las operaciones que realiza Terraform mediante la creación de reglas particulares para cada recurso.

## Diagrama de arquitectura
![Cloud-TP2-TP2](https://github.com/gbudoberra/2023Q1-G7/assets/67807324/296e4f4d-43c8-4a51-a829-c68e04134274)

