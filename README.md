# nimbl3 test

Please check the live demo on heroku [here](https://immense-sands-32323.herokuapp.com/)

The choices of technology for the implementation are:
* Back-end: Express
* Front-end: AngularJS
* Build tool: Grunt

## OAuth2

This project implemented the "Password Credentials Flow". The front-end is hardcoded with the correct username and password which are:
```
username: nimbl3test
password: helloworld
```
Testing the OAuth2 from other clients such as mobile device could be simulated by following the steps below.

### Authentication with Username and Password
Clients will need to send the client_id, client_secret, username, password and gran_type to the endpoint "/oauth/token" to obtain new access token.
```
curl -X POST -d "client_id=mobile_android&client_secret=secret&grant_type=password&username=nimbl3test&password=helloworld" https://immense-sands-32323.herokuapp.com/oauth/token
```

### Authorization with Access Token
To connect with the protected APIs, clients will need to send request with Bearer token header according to the OAuth2.0 standard. The header of the request should look like this.
`Authorization: Bearer <ACCESS-TOKEN>`
This API can be tested using:
```
curl --header "Authorization: Bearer 76a3152758bbc5cf3a9f28cd3237d5ecf662b59c" https://immense-sands-32323.herokuapp.com/secret
```