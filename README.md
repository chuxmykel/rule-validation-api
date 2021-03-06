# Rule Validation API
> A simple rule-validation API.

This API validates data against the specified condition.

## Installing / Getting started
To get started, follow the steps listed below:
- Copy the environment variables sample file i.e `cp .env.sample .env`.
- Fill in the required environment variables e.g `PORT=9887`.
- Run `yarn` or `npm install` to install all dependenciees.
- Run `yarn start` or `npm start` and the server will begin to listen for requests.

## Testing
To run the test suites included, run `yarn test` or `npm test`

## Building
The APP was developed using ES5 syntax therefore there is no need for transpilation.

## Features
The API has two endpoints.
- `GET /` The home route
- `POST /validate-rule` The rule validation endpoint.

## Making requests
### GET /
Response body
```json
{
  "message": "My Rule-Validation API.",
  "status": "success",
  "data": {
    "name": "Mr. X",
    "github": "@xxxxxx",
    "email": "xxxxx@xxxxxxxxx.com",
    "mobile": "080XXXXXXXX",
    "twitter": "@xxxxxx"
  }
}
```

### POST /validate-rule
Request body
```json
{
  "rule": {
    "field": "name",
    "condition": "contains",
    "condition_value": "Oghene"
  },
  "data": {
    "name": "James Oghene"
  }
}
```

Response body
```json
{
  "message": "field name successfully validated.",
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "name",
      "field_value": "James Oghene",
      "condition": "contains",
      "condition_value": "Oghene"
    }
  }
}
```

## Links
- API Base URL: https://valley-date.herokuapp.com/
- Repository: https://github.com/chuxmykel/rule-validation-api


## Licensing
"The code in this project is licensed under MIT license."
