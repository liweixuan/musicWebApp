define(['app'],function(app){

    app.factory("cartService",function(){

         var service = {};

        /* 获取服务器数据*/
        service.getCartGoods = function ($scope, POP) {
          
            $.initAppStartLoad();
           
            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.Cart.cartSearch + "/shopping_type/1/user_id/"+info.user_id , {}, function (e, data) {

                console.log(data);


                if (e) {
                    $.loadError(function () {
                        service.getCartGoods();
                    });
                    return;
                }

                

                var cart_goods = data.cart_goods == undefined ? [] : data.cart_goods;
                var order_info = data.order_info == undefined ? [] : data.order_info;

                if(cart_goods.length<=0){
                    $(".noCartGoodBox").show();
                    $(".noCartGoodBox").find(".isLoginBox").hide();
                  $scope.righttitleValue = "";
                    $.initAppEndLoad();
                    return;
                }

                //计算购物车总量
                var cCount = 0;

                $scope.$apply(function () {
                    $scope.cart_goods = cart_goods;
                    $scope.cart_info  = order_info;
                    $scope.righttitleValue = "编辑";
                    $.initAppEndLoad();



                    $scope.countPrice = function(){

                        var moneyCount = 0;
                        if(cart_goods.length>0){
                            for(var i=0;i<cart_goods.length;i++){
                                moneyCount += parseInt(cart_goods[i].goods_price);
                            }
                        }
                        return moneyCount;
                    }
                    
                });

                
            });


        };

        /*更新购物车信息*/
        service.updateCart = function($scope,updateParams,POP,$rootScope){

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

                 //计算购物车总量
                var cCount = 0;
                for(var i=0;i<$scope.cart_goods.length;i++){
                     cCount += parseInt($scope.cart_goods[i].goods_number);
				}

                 $scope.$apply(function () {
                    $rootScope.cartBadge = cCount;
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

        /*删除购物车信息*/
        service.deleteCartGood = function($scope,deleteParams,POP,_idx,$rootScope){

            POP.StartLoading();

			//更新操作
			HTTP.get(API.Cart.deleteCart+"/user_id/"+deleteParams.user_id + "/shopping_type/1/id/" + deleteParams.id ,{},function(e,data){
                console.log(data);


				POP.EndLoading();
				
				if(e){
					POP.Hint("购物车删除失败");
					return;
				}

                $(".deleteBox:eq("+_idx+")").parent().slideUp(200);
                var newArr = _.pullAt($scope.cart_goods,_idx);
                $scope.$apply(function () {
                    $scope.cart_info.content = data.content;
                });


                if($scope.cart_goods.length<=0){

                    $scope.$apply(function () {
                        console.log("清空购物车...");
                            $scope.cart_goods = [];
                            $scope.righttitleValue = "";
                            $rootScope.cartBadge = 0;
                    });

                        $(".noCartGoodBox").show();
                        $(".noCartGoodBox").find(".isLoginBox").hide();

                }else{

                    $scope.$apply(function () {
                        $rootScope.cartBadge = parseInt($rootScope.cartBadge) - parseInt(newArr[0].goods_number);
                    });
                }

			});

        }
         

         return service;

    });


});
