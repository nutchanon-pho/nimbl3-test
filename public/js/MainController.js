var app = angular.module('nimbl3', ['ngCookies']);
app.controller('MainController', ['$scope', '$http', '$cookies', '$httpParamSerializer', function ($scope, $http, $cookies, $httpParamSerializer) {
    
    $scope.login = () => {
        let data = {
            grant_type:'password', 
            username: 'nimbl3test', 
            password: 'helloworld', 
            client_id: 'mobile_android',
            client_secret: 'secret'
        };
        let req = {
            method: 'POST',
            url: 'http://localhost:3000/oauth/token',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            data: $httpParamSerializer(data)
        };
        $http(req).then(function(data){
            console.log(data.data.access_token);
            $http.defaults.headers.common.Authorization = 
              'Bearer ' + data.data.access_token;
            $cookies.put('access_token', data.data.access_token);
            // $http.get('/secret').then((result) => {
            //     console.log(result);
            // });
        });   
    };

    $scope.login();
}]);
