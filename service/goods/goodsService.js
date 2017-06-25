define(['app'],function(app){

    app.factory("goodsService",function(){

         var service = {};

//获取商品列表
        service.getGoodList = function($scope,isRefresh){

            if(!isRefresh){
                $.initAppStartLoad();
            }


            HTTP.get(API.Goods.goods + "/skip/0/limit/100",{},function(e,data){

                if(e){
                    $.loadError(function(){
                        service.getGoodList();
                    });
                    return;
                }
                $scope.$apply(function () {
                $scope.goodsArray=data.goodsInfo.data;
                    $.initAppEndLoad();
                });

                $scope.$broadcast('scroll.refreshComplete');

                if(isRefresh){
                    $(".goodsMenuItem").removeClass("selected");
                    $(".goodsMenuItem").eq(0).addClass("selected");
                }


            });


        };


//点击按钮切换分类
        service.getCategoryGoodList = function ($scope, type, POP) {

            var params = "";
            if(type == "ALL"){

            }else if(type == "BEST"){
                params = "/is_best/1";
            }else if(type == "HOT"){
                params = "/is_hot/1";
            }else if(type == "NEW"){
                params = "/is_new/1";
            }

            var url = API.Goods.goods + params + "/skip/0/limit/100";

            POP.StartLoading();

            HTTP.get(url, {}, function (e, data) {
                    POP.EndLoading();

                if (e) {
                        POP.Hint("商品信息获取失败");
                        return;
                    }

                    $scope.$apply(function () {
                        $scope.goodsArray = data.goodsInfo.data;
                    });
            });



            //console.log(cacheData);
            //console.log(CommenFun.isNullObj(cacheData));
            //if (CommenFun.isNullObj(cacheData)) {
            //    console.log("没有缓存");
            //    console.log("当前的Id是没有缓存的");
            //    POP.StartLoading();
            //    HTTP.get(API.Goods.goods + "/is_hot/" + is_hot+ "/is_new/" + is_new+ "/is_best/" + is_best, {}, function (e, data) {
            //        POP.EndLoading();
            //        if (e) {
            //            $.loadError(function () {
            //                service.getCategoryGoodList();
            //            });
            //            return;
            //        }
            //
            //        $scope.$apply(function () {
            //            $scope.goodsArray = data.data;
            //            cacheData[categoryId] = $scope.goodsArray;
            //            console.log(cacheData);
            //        });
            //        console.log(data);
            //    });
            //} else {
            //    console.log("有缓存");
            //    console.log(cacheData[categoryId]);
            //    if (cacheData[categoryId] == undefined) {
            //        console.log("当前的Id是没有缓存的");
            //        POP.StartLoading();
            //        HTTP.get(API.Category.category + "/category_id/" + categoryId, {}, function (e, data) {
            //            POP.EndLoading();
            //            if (e) {
            //                $.loadError(function () {
            //                    service.getCategoryGoodList();
            //                });
            //                return;
            //            }
            //
            //            $scope.$apply(function () {
            //                $scope.productArray = data.goodsInfo.data;
            //                cacheData[categoryId] = $scope.productArray;
            //
            //                console.log(cacheData);
            //            });
            //
            //            console.log(data);
            //
            //        });
            //
            //    } else {
            //        console.log("当前的ID是有缓存的")
            //
            //        $scope.productArray = cacheData[categoryId];
            //        console.log(cacheData[categoryId]);
            //    }
            //}
        }




//加入购物车
        service.addCart = function($scope,isRefresh){

            if(!isRefresh){
                $.initAppStartLoad();
            }


            HTTP.get(API.Cart.cartAdd + "/skip/0/limit/100",{},function(e,data){

                if(e){
                    $.loadError(function(){
                        service.addCart();
                    });
                    return;
                }
                $scope.$apply(function () {
                    $scope.goodsArray=data.goodsInfo.data;
                    $.initAppEndLoad();
                });

                $scope.$broadcast('scroll.refreshComplete');

                if(isRefresh){
                    $(".goodsMenuItem").removeClass("selected");
                    $(".goodsMenuItem").eq(0).addClass("selected");
                }

                console.log(data);

            });


        };

        return service;

    });


});