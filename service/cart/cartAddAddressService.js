/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app'],function(app){

    app.factory("cartAddAddressService",function(){

        var service = {};

        /*更新购物车信息*/
        service.updateCart = function($scope,updateParams,POP){

            POP.StartLoading();

            //更新操作
            HTTP.post(API.Cart.updateCart,updateParams,function(e,data){

                POP.EndLoading();

                if(e){
                    POP.Hint("购物车更新失败");
                    return;
                }

                $scope.$apply(function () {
                    $scope.cart_goods = data.cart_goods;
                    $scope.cart_info  = data.order_info;
                });

                $scope.countPrice = function(){
                    var moneyCount = 0;
                    for(var i=0;i<$scope.cart_goods.length;i++){
                        moneyCount += parseInt($scope.cart_goods[i].goods_price);
                    }
                    return moneyCount;
                }

            });

        }



        /*保存新添加的收货地址*/
        service.saveAddress = function($scope,newParams,POP,fn){

            POP.StartLoading();

            //更新操作
            HTTP.post(API.Cart.addNewAddress,newParams,function(e,data){


                POP.EndLoading();

                if(e){
                    POP.Hint("设置失败:" + e);
                    return;
                }else {
                    fn();
                    POP.Hint("设置成功");
                }

            });

        }


        return service;

    });


});

