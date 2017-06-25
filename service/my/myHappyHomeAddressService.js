define(['app'],function(app){

    app.factory("myHappyHomeAddressService",function(){

        var service = {};

        /* 获取服务器数据*/
        service.getHappyHomeAddressList = function ($scope, POP ,fn) {

            POP.StartLoading();

            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.Cart.shippingAddress + "/user_id/"+info.user_id , {}, function (e, data) {

                POP.EndLoading();
                console.log(data);
                if (e) {
                    $.loadError(function () {
                        service.getHappyHomeAddressList();
                    });
                    return;
                }

                $scope.$apply(function () {
                    //为html页面注入数据
                    $scope.happyHomeAddress = data.AddressList;
                    $scope.defaultHomeAddressID = data.defaultAddress;
                    fn();//回调函数

                });

            });

        };

        /*设置默认收货地址*/
        service.setDefaultAddress = function($scope,updateParams,POP,fn){

            POP.StartLoading();

            //更新操作
            HTTP.post(API.Cart.updateDefaultAddress,updateParams,function(e,data){

                POP.EndLoading();

                if(e){
                    POP.Hint("设置失败");
                    return;
                }else {
                    fn();
                    POP.Hint("设置成功");
                }



            });

        }


        /*删除收货地址*/
        service.deleteAddress = function($scope,deleteParams,POP,_idx,fn){

            POP.StartLoading();
            //删除操作
            HTTP.get(API.Cart.deleteUserAddress + "/user_id/"+deleteParams.user_id + "/address_id/"+deleteParams.address_id, {}, function (e, data) {

                POP.EndLoading();

                if (e) {
                    $.loadError(function () {
                        POP.Hint("删除失败!");
                        return;
                    });
                    return;
                }

                $(".deleteBtnBox:eq("+_idx+")").parent().parent().slideUp(200);
                 _.pullAt($scope.happyHomeAddress,_idx);

                    fn("YES");
                if($scope.happyHomeAddress.length<=0){
                    fn("NO");
                    $scope.$apply(function () {
                     $scope.righttitleValue = "";

                    });
                    $(".noAddress").show();
                    $(".addAddressBtn").hide(); //初始添加新地址隐藏
                }



            });



        }



        return service;

    });


});

