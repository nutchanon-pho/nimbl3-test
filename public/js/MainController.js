var app = angular.module('nimbl3', ['ngCookies']);
app.controller('MainController', ['$scope', '$http', '$cookies', '$httpParamSerializer', function ($scope, $http, $cookies, $httpParamSerializer) {
    Ps.initialize(document.querySelector('.navmenu'));

    $scope.currentActiveMenuIndex = 0;

    $scope.sideNavMenuList = [
        {
            label: 'Dashboard',
            image: {
                active: '/icons/controls-white.svg',
                inactive: '/icons/controls-purple.svg'
            },
            isActive: true,
            colorBar: '#FFCC00'
        },
        {
            label: 'Orders',
            image: {
                active: '/icons/shopping-cart-white.svg',
                inactive: '/icons/shopping-cart-purple.svg'
            },
            isActive: false,
            colorBar: '#65B32E'
        },{
            label: 'Companies',
            image: {
                active: '/icons/factory-white.svg',
                inactive: '/icons/factory-purple.svg'
            },
            isActive: false,
            colorBar: '#65B32E'
        },
        {
            label: 'Products',
            image: {
                active: '/icons/box-white.svg',
                inactive: '/icons/box-purple.svg'
            },
            isActive: false,
            colorBar: '#65B32E'
        },
        {
            label: 'Documents',
            image: {
                active: '/icons/document-white.svg',
                inactive: '/icons/document-purple.svg'
            },
            isActive: false,
            colorBar: '#65B32E'
        },
        {
            label: 'Pricing',
            image: {
                active: '/icons/pricing-label-white.svg',
                inactive: '/icons/pricing-label-purple.svg'
            },
            isActive: false,
            colorBar: '#65B32E'
        },
        {
            label: 'Brands',
            image: {
                active: '/icons/shapes-white.svg',
                inactive: '/icons/shapes-purple.svg'
            },
            isActive: false,
            colorBar: '#65B32E'
        },
        {
            label: 'Settings',
            image: {
                active: '/icons/gear-white.svg',
                inactive: '/icons/gear-purple.svg'
            },
            isActive: false,
            colorBar: '#65B32E'
        },
        {
            label: 'Reports',
            image: {
                active: '/icons/chart-white.svg',
                inactive: '/icons/chart-purple.svg'
            },
            isActive: false,
            colorBar: '#65B32E'
        },
        {
            label: 'Account Users',
            image: {
                active: '/icons/people-white.svg',
                inactive: '/icons/people-purple.svg'
            },
            isActive: false,
            colorBar: '#65B32E'
        }
    ];

    $scope.setMenuAsActive = (index) => {
        $scope.sideNavMenuList[$scope.currentActiveMenuIndex].isActive = false;
        $scope.sideNavMenuList[index].isActive = true;
        $scope.currentActiveMenuIndex = index;
    };

    $scope.login = () => {
        return new Promise((resolve, reject) => {
            let data = {
                grant_type:'password', 
                username: 'nimbl3test', 
                password: 'helloworld', 
                client_id: 'mobile_android',
                client_secret: 'secret'
            };
            let req = {
                method: 'POST',
                url: '/oauth/token',
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
                resolve();
            }).catch(reject);
        });
    };

    $scope.getOrder = (orderId) => {
        $http.get(`/orders/${orderId}`).then((result) => {
            console.log('getOrder result',result);
            $scope.order = result.data;
        })
        .catch((err) => {
            alert('There is an error while retrieving order from the server.');
            console.error(err);
        });
    };

    $scope.getProducts = () => {
        $http.get('/products').then((result) => {
            console.log('getProducts result', result);
            $scope.productList = result.data;
        })
        .catch((err) => {
            alert('There is an error while retrieving products from the server.');
            console.error(err);
        });
    };

    $scope.login().then(() => {
        $scope.getOrder(1);
        $scope.getProducts();
    });
}]);
