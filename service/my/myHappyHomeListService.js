
define(['app'],function(app){

    app.factory("myHappyHomeListService",function(){

        var service = {};

        /* 获取服务器数据*/
        service.getHappyHomeList = function ($scope, POP,fn) {

            POP.StartLoading();

            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.My.happyHomeList, {}, function (e, data) {

                POP.EndLoading();


                if (e) {
                    $.loadError(function () {
                        service.getHappyHomeList();
                    });
                    return;
                }


                $scope.$apply(function () {
                    //为html页面注入数据
                    $scope.happyHomeData= data.data;
                    fn();

                });


            });

        };


        return service;

    });


});