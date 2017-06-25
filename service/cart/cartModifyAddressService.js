
define(['app'],function(app){

    app.factory("cartModifyAddressService",function(){

        var service = {};

        /*设置默认收货地址*/
        service.setModifyAddress = function($scope,updateParams,POP,fn){

            //var p = updateParams;
      
            POP.StartLoading();

            //更新操作
            HTTP.post(API.Cart.updateUserAddress,updateParams,function(e,data){


                POP.EndLoading();
                if(e){
                    POP.Hint("设置失败");
                    return;
                }
                   
                    fn();


            });

        }


        return service;

    });


});

