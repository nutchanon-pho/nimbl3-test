var app = angular.module('nimbl3', []);
app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    alert();
    $scope.helloMessage = "Hello";
}]);
