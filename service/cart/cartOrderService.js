define(['app'], function (app) {

    app.factory("cartOrderService", function () {

        var service = {};


        /*网络获取用户信息*/
        service.getOrderInfo = function ($scope, POP) {


            POP.StartLoading();

            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.Cart.orderInfo + "/user_id/" + info.user_id, {}, function (e, data) {


                POP.EndLoading();

                if (e) {
                    $.loadError(function () {
                        service.getOrderInfo();
                    });
                    return;
                }

                var nowAddress;
                if (data.address != undefined && data.address.length > 0) {
                    for (var i = 0; i < data.address.length; i++) {

                        if($scope.jugdeAddress.length >0 && $scope.jugdeAddress.length != null && $scope.jugdeAddress != undefined){

                            if ($scope.jugdeAddress == data.address[i].address_id){

                                nowAddress = data.address[i];
                                $scope.jugdeAddress = null;
                                break;

                            }
                        }else {
                            if (data.address[i].is_default == 1) {
                                nowAddress = data.address[i];
                                break;
                            } else {
                                nowAddress = data.address[0];
                            }


                        }

                    }

                } else {
                    nowAddress = "NO";

                }

                var orderAmount = 0;
                var goodsCount = 0;
                if (data.cartInfo.cart_goods != undefined && data.cartInfo.cart_goods.length > 0) {

                    for (var i = 0; i < data.cartInfo.cart_goods.length; i++) {

                        orderAmount += parseFloat(data.cartInfo.cart_goods[i].goods_price);

                        goodsCount += parseFloat(data.cartInfo.cart_goods[i].goods_number);

                    }


                }


                $scope.$apply(function () {

                    $scope.address = nowAddress;                  //收货地址和信息
                    $scope.cartGoods = data.cartInfo.cart_goods;    //购物车订单信息
                    $scope.orderInfo = data.cartInfo.order_info;    //订单价格积分信息
                    $scope.userInfo = data.userInfo;               //用户购买能力信息
                    $scope.payment = data.payment.data[0];        //支付方式
                    $scope.deliveryArray = data.shipping.data;        //快递公司名
                    $scope.goodsNumber = goodsCount;                  //购买商品总数
                    $scope.amountOrder = orderAmount;                 //合计价格
                    $scope.webConfig = data.webConfig;              //免运费配置/专卖店情况

                });

            });

        };

        service.getPartOrderInfo = function ($scope, POP) {

            POP.StartLoading();

            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.Cart.orderInfo + "/user_id/" + info.user_id, {}, function (e, data) {


                POP.EndLoading();

                if (e) {
                    $.loadError(function () {
                        service.getOrderInfo();
                    });
                    return;
                }


                var orderAmount = 0;
                var goodsCount = 0;
                if (data.cartInfo.cart_goods != undefined && data.cartInfo.cart_goods.length > 0) {

                    for (var i = 0; i < data.cartInfo.cart_goods.length; i++) {
                        console.log(parseFloat(data.cartInfo.cart_goods[i].goods_price));

                        orderAmount += parseFloat(data.cartInfo.cart_goods[i].goods_price);

                        goodsCount += parseFloat(data.cartInfo.cart_goods[i].goods_number);

                    }


                }

                $scope.$apply(function () {

                    $scope.cartGoods = data.cartInfo.cart_goods;    //购物车订单信息
                    $scope.orderInfo = data.cartInfo.order_info;    //订单价格积分信息
                    $scope.userInfo = data.userInfo;               //用户购买能力信息
                    $scope.payment = data.payment.data[0];        //支付方式
                    $scope.deliveryArray = data.shipping.data;       //快递公司名
                    $scope.goodsNumber = goodsCount;                  //购买商品总数
                    $scope.amountOrder = $scope.orderInfo.pay_amount;  //合计价格
                    $scope.webConfig = data.webConfig;              //免运费配置/专卖店情况

                });

                //默认请求一次运费
                var freightParams = {
                       shipping_id : $scope.deliveryArray[0].shipping_id,
                           cart_id : $scope.cartGoods[0].cart_id,
                    payment_amount : $scope.orderInfo.pay_amount
                }

                $scope.shi_id = $scope.deliveryArray[0].shipping_id;


                //计算运费
                service.countFreightAction($scope, freightParams,POP, function (freight) {

                    $scope.shippingName = $scope.deliveryArray[0].shipping_name + '¥' + freight;
                    $scope.expressName = $scope.deliveryArray[0].shipping_name; //物流公司名
                    $scope.amountOrder = $scope.orderInfo.pay_amount + freight;

                    if (freight == "免运费") {
                        $scope.amountOrder = $scope.orderInfo.pay_amount
                    }

                    $(".deliveryBox:eq(0)").children(".deliveryChoice").css("border", "0px");
                    $(".deliveryBox:eq(0)").find(".deliveryChoice img").show();
                    $(".deliveryBox:eq(0)").find(".deliveryPrice").css({visibility: "visible"});
                    $(".deliveryBox:eq(0)").find(".deliveryPrice").html("&nbsp;&nbsp;  ¥ " + freight);

                });


            });


        }


        //验证支付密码
        service.verifyPayPassword = function ($scope, updateParams, POP, fn) {

            POP.StartLoading();

            //更新操作
            HTTP.post(API.Cart.verifyUserPassword, updateParams, function (e, data) {

                POP.EndLoading();

                if (e) {
                    POP.Hint("密码错误!");
                    return;
                } else {
                    fn();
                }

            });

        }


        //生成支付订单(普通商城)
        service.addCommonPaymentOrder = function ($scope, orderParams, POP, fn) {

            POP.StartLoading();

            //更新操作
            HTTP.post(API.Cart.commonPaymentOrder, orderParams, function (e, data) {

                POP.EndLoading();

                if (e) {
                    POP.Alert("订单提交失败");
                    return;
                } else {
                    fn();
                    POP.Hint("订单提交成功!");
                }

            });

        }

        //计算运费

        service.countFreightAction = function ($scope,freightParams,POP,fn) {


            //更新操作
            HTTP.post(API.Cart.countFreight, freightParams, function (e, data) {

                if (e) {
                    POP.Alert("获取运费失败");
                    return;
                }
                else {
                    if (data == null) {
                        data = "免运费";
                    }

                    fn(data);

                    $scope.$apply(function () {
                        $scope.deliveryFreight = data;
                    });

                }


            });

        }


        return service;

    });


});
