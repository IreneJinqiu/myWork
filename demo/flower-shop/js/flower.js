/**
 * Created by bjwsl-001 on 2016/11/5.
 */
window.alert("需要数据库环境加载后台数据才能显示！\n可以查看源码");
var app = angular.module('myapp',['ng','ngRoute']);

//声明一个控制器 parentCtrl
app.controller('parentCtrl',
  ['$scope','$location',
    function ($scope,$location) {
      $scope.jump = function (arg) {
        $location.path(arg);
      }
    }]);

//mainCtrl
app.controller('mainCtrl',
  ['$scope','$http',
    function ($scope,$http) {

      $scope.hasMore = true;

      $http.get('data/flower_getbypage.php?start=0')
        .success(function (data) {
          console.log(data);
          $scope.flowerList = data;
        });
      
      $scope.loadMore = function () {
        $http.get('data/flower_getbypage.php?start='+$scope.flowerList.length)
          .success(function (data) {
            console.log(data);
            if(data.length < 5)
            {
              $scope.hasMore = false;
            }
            $scope.flowerList = $scope.flowerList.concat(data);
          });
      }

      $scope.$watch('kw', function () {
        console.log($scope.kw);
        if($scope.kw)
        {
          $http.get('data/flower_getbykw.php?kw='+$scope.kw)
            .success(function (data) {
              $scope.flowerList = data;
            })
        }
      });
}]);

//detailCtrl
app.controller('detailCtrl',
  ['$scope','$routeParams','$http',
    function ($scope,$routeParams,$http) {

      console.log($routeParams.did);

      $http.get('data/flower_getbyid.php?id='+$routeParams.did)
        .success(function (data) {
          console.log(data);
          $scope.flower = data[0];
        });

  }]);

//orderCtrl
app.controller('orderCtrl',[
  '$scope','$routeParams','$http','$rootScope',
  function ($scope,$routeParams,$http,$rootScope) {
    console.log($routeParams.did);

    $scope.order={'did':$routeParams.did};

    $scope.submitOrder = function () {
      //console.log($scope.order);
      var str = jQuery.param($scope.order);
      //console.log(str);
      $http.get('data/order_add.php?'+str)
        .success(function (data) {
          console.log(data);
          if(data[0].msg == 'succ')
          {
            $rootScope.phone = $scope.order.phone;
            $scope.succMsg = "订餐成功！您的订单编号为："+data[0].oid+"您可以在用户中心查看订单状态";
          }
          else
          {
            $scope.errMsg = '订餐失败！';
          }
        })
    }
    
  }
]);

//myOrderCtrl
app.controller('myOrderCtrl',
  ['$scope','$rootScope','$http',
    function ($scope,$rootScope,$http) {

      $http.get('data/order_getbyphone.php?phone='
        +$rootScope.phone).success(function (data) {
        $scope.flowerList = data;
      });

  }]);

//跳转
app.config(function ($routeProvider) {

  $routeProvider
    .when('/start',{
      templateUrl:'tpl/start.html'
    })
    .when('/main',{
      templateUrl:'tpl/main.html',
      controller:'mainCtrl'
    })
    .when('/detail',{
      templateUrl:'tpl/detail.html',
      controller:'detailCtrl'
    })
    .when('/detail/:did',{
      templateUrl:'tpl/detail.html',
      controller:"detailCtrl"
    })
    .when('/order',{
      templateUrl:'tpl/order.html'
    })
    .when('/order/:did',{
      templateUrl:'tpl/order.html',
      controller:'orderCtrl'
    })
    .when('/myOrder',{
      templateUrl:'tpl/myOrder.html',
      controller:'myOrderCtrl'
    })
    .otherwise({redirectTo:'/start'});

});