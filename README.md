<p  align="center">

<a  href="http://nestjs.com/"  target="blank"><img  src="https://designli.co/hs-fs/hubfs/images/global%20components/logo/logoWhite-compressed.png?width=882&height=246&name=logoWhite-compressed.png"  width="120"  alt="Designli Logo"  /></a>

<a  href="http://nestjs.com/"  target="blank"><img  src="https://nestjs.com/img/logo-small.svg"  width="120"  alt="Nest Logo"  /></a>

</p>

# NEST DEVELOPER CODE TEST

Made with❤️ by Santiago Múnera.

[NestJS](https://github.com/sfmunera10/designli-code-test) application repository for the Backend Lead/Nest developer code test.

## Local project setup

### Clone the public repository

```bash

$  git  clone  https://github.com/sfmunera10/designli-code-test.git

```

Or simply download it: https://github.com/sfmunera10/designli-code-test

### Install dependencies

On your favorite code editor, run the following commands at the root folder of the project:

```bash

$  npm  install

```

### Compile and run the project

```bash

# development

$  npm  run  start



# watch mode

$  npm  run  start:dev



# production mode

$  npm  run  start:prod

```

### Run tests

```bash

# unit tests

$  npm  run  test



# e2e tests

$  npm  run  test:e2e



# test coverage

$  npm  run  test:cov

```

## API Documentation

Once you run the project locally, you can access the API documentation at http://localhost:3000/api

## Demo and postman collection

I'm using a lightweight HTTP client UI known as https://www.thunderclient.com/. It allows to export postman collections so you can test each endpoint locally using the collecion file:

    postman_collection_designli_code_test

As for the Demo, there's an MP4 video to see the working solution:

    Designli Code Test Demo.mp4

## Static assets folders for local testing (emails and public)

The following folders are used for serving static files, each with one specific purpose:

```
# You need to put .eml files in this folder in order to test the email parser endpoint. Path parameter URLs for these files have the following URI encoded format: 'http%3A%2F%2Flocalhost%3A3000%2F${FILENAME_GOES_HERE}.eml'. As for path parameter file paths, you can just pass the email filename (e.g. test.eml)
emails

# Public folder is for the output files (email attachments and static webpages for the email parser endpoint).
public


```

## Stay in touch

- Author - [Santiago Múnera](https://www.linkedin.com/in/sfmd/)

## License

This project is [MIT licensed](https://github.com/sfmunera10/designli-code-test/blob/main/LICENSE).
