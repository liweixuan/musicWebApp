define(['app'], function (app) {

    app.factory("myBuyHappyHomeServer", function () {

        var service = {};

        /*喜乐之家商品列表 信息*/
        //获取用户的账号
        var info = User.getInfo();
        service.getBuyGoodList = function ($scope, POP) {
            POP.StartLoading();
            //获取用户的账号
            HTTP.get(API.My.buyGoodsList + "/user_id/" + info.user_id + "/user_name/" + info.user_name, {}, function (e, data) {
                    POP.EndLoading();
                    console.log(data);

                    if (e) {
                        POP.Hint("加载失败");
                        return;
                    }

                    var nowAddress;
                    if (data.address != undefined && data.address.length > 0) {
                        for (var i = 0; i < data.address.length; i++) {

                            if ($scope.jugdeXlzjAddress.length > 0 && $scope.jugdeXlzjAddress.length != null && $scope.jugdeXlzjAddress != undefined) {

                                if ($scope.jugdeXlzjAddress == data.address[i].address_id) {

                                    nowAddress = data.address[i];
                                    $scope.jugdeXlzjAddress = null;
                                    break;
                                }
                            } else {
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

                    //绑定提交订单时使用的数据
                    //用户余额
                    xilzj_user_money = data.userInfo.user_money;
                    //$scope.user_money = data.userInfo.user_money;
                    $scope.$apply(function () {
                        $scope.goods = data.goodsInfo.data;
                        $scope.buyHappyAddress = nowAddress;
                    })
                }
            );
        };
        /*喜乐之家商品列表 信息*/
        service.getBuyGoodConfig = function ($scope, POP, id) {
            //获取用户的账号
            HTTP.get(API.My.buyHappyHomeGoodsConfig + "/id/" + id, {}, function (e, data) {
                    if (e) {
                        POP.Hint("加载失败");
                        return;
                    }
                    console.log(data);
                    $scope.$apply(function () {
                        $scope.bugConfig = data.data[0];

                    })
                }
            );
        };
        //获取用户信息 主要是获取用户余额
        /*网络获取用户信息*/
        service.getUserInfo = function ($scope, POP) {
            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.My.myInfo + "/user_name/" + info.user_name, {}, function (e, data) {
                if (e) {
                    POP.Hint("用户信获取失败");
                    return
                }
                $scope.$apply(function () {
                    xilzj_user_money = data.userInfo.user_money;
                });

            })
        };

        /*网络获取商品列表的属性列表 信息*/
        service.getBuyGoodMoreAttr = function ($scope, POP, goodId, $ionicScrollDelegate, $compile, price) {
            POP.StartLoading();
            //获取用户的账号
            HTTP.get(API.My.buyGoodsMoreAttr + "/goods_id/" + goodId, {}, function (e, data) {
                    POP.EndLoading();
                    if (e) {
                        POP.Hint("加载失败");
                        return;
                    }
                    $scope.$apply(function () {

                        var length = data.length;
                        for (var i = 0; i < length; i++) {
                            var lth = data[i].attr_info.length;

                            var tempHtml = "";
                            //计算当前产品的单价
                            var pice = Number.parseFloat(price);

                            for (var j = 0; j < lth; j++) {
                                var attrInfo = data[i].attr_info[j];

                                //计算附加金额
                                pice += Number.parseFloat(attrInfo.attr_price);

                                var tem = [
                                    '<div class="goodAttrNameBox">',
                                    attrInfo.attr_name + '&nbsp;:&nbsp;',
                                    '<span class="goodAttrVal">' + attrInfo.attr_value + '</span>',
                                    '</div>'
                                ].join("");

                                tempHtml += tem;
                            }
                            var moreGoodNameObj = "<div class='more_goodName'>" + tempHtml + "</div>";

                            //获取当前属性产品的数量
                            var goodsNumber = data[i].product_number;

                            //绑定产品的数量
                            var bindGoodNumber = "abc" + goodId + i;
                            var empty = "";

                            var template = [
                                '<div class="more_goodsBox">',
                                '   <div class="more_goodImgBox">',
                                moreGoodNameObj,
                                '    </div>',
                                '    <div class="more_goodInfo">',
                                '              <div class="bbh_goodPrice">单价&nbsp;:&nbsp;<span class="price">{{' + pice + '}}</span></div>',
                                '              <div class="bbh_goodMoney">实际金额&nbsp;:&nbsp;<span class="money">{{goodMoney}}</span></div>',
                                '     </div>',
                                '     <div class="more_buyNumberBox">',
                                '           <div class="bhh_noGoods" ng-if="( ' + goodsNumber + '==0 ||((' + goodsNumber + ' - ' + bindGoodNumber + ') < 0))">商品库存不足</div>',
                                '           <input onkeyup="inputKeyUp(this)" onafterpaste="inputKeyUp(this)" data-productid="' + data[i].product_id + '"  data-goodsprice="' + price + '" data-goodsattr="' + data[i].goods_attr + '"  class="bhh_buyNumber" type="number" placeholder="购买数量" data-price="{{' + pice + '}}" data-number="{{' + goodsNumber + '}}" data-oldinput="0" ng-model="' + bindGoodNumber + '">',
                                '     </div>',
                                '     <div style="clear: both"> ',
                                '     </div>',
                                '</div>'
                            ].join("");
                            var modelHtml = $compile(template)($scope);
                            $("#more_goodsBox_" + goodId).append(modelHtml);
                        }


                        $('#' + "more_goodsBox_" + goodId).slideDown(300, function () {
                            var scroller = $ionicScrollDelegate.$getByHandle('bhh_scroll');
                            var scrollPosition = scroller.getScrollPosition();
                            var currentScroll = scrollPosition.top;
                            scroller.scrollTo(0, currentScroll + 60, true);
                        });
                    })
                }
            );
        };
        //提交订单
        service.saveOrderForm = function (param, $scope, POP, fn) {
            //提交订单
            POP.StartLoading();
            HTTP.post(API.My.confirmHappyOrder, param, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint(data);
                    return;
                }
                fn();
            })
        };
        //验证支付密码
        service.verifyPayPassword = function ($scope, updateParams, POP, fn) {

            POP.StartLoading();
            //更新操作
            HTTP.post(API.Cart.verifyUserPassword, updateParams, function (e, data) {
                POP.EndLoading();
                console.log("*******" + data);
                if (e) {
                    POP.Hint("密码错误!");
                    return;
                } else {
                    fn();
                }
            });

        };

        //最后提交订单
        service.happlyOver = function (param, $scope, POP, fn) {
            //提交订单
            POP.StartLoading();
            HTTP.post(API.My.butyHapplyOver, param, function (e, data) {
                POP.EndLoading();
                if (e) {

                    var msg = "";
                    if (data == undefined || data == "" || data == null) {
                        msg = "购买失败";
                    } else {
                        msg = data;
                    }
                    POP.Hint(msg);
                    return;
                }
                fn();
            })
        };


        return service;


    })
    ;


})
;