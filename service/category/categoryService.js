define(['app'], function (app) {

    app.factory("categoryService", function () {

        var service = {};
        var categoryId;
        //  获取头部的分类列表和默认分类货物
        service.getCategoryListAndCategoryGoodsList = function ($scope, POP) {
            $.initAppStartLoad();
            HTTP.get(API.Category.category, {}, function (e, data) {
                if (e) {
                    $.loadError(function () {
                        service.getCategoryListAndCategoryGoodsList();
                    });
                    return;
                }

                $scope.$apply(function () {
                    $scope.categorys = data.categoryInfo;
                    $scope.productArray = data.goodsInfo.data;
                    var a = data.categoryInfo;
                    
                    var obj = a[0];
                    $scope.categoryName = obj.category_name;
                    //  手动请求一下点击事件
                    categoryId = obj.category_id;
                    service.getCategoryGoodsList($scope, categoryId, POP, {}, obj.category_name, 0);
                    $.initAppEndLoad();
                });

            });
        };

        // 点击按钮后实现分类货物的切换
        service.getCategoryGoodsList = function ($scope, categoryId, POP, cacheData, categoryName, index) {
            
            
            
            if (CommenFun.isNullObj(cacheData)) {
                POP.StartLoading();
                HTTP.get(API.Category.category + "/category_id/" + categoryId, {}, function (e, data) {
                    POP.EndLoading();
                    if (e) {
                        //$.loadError(function () {
                        //    service.getCategoryGoodsList();
                        //});
                        return;
                    }

                    $scope.$apply(function () {
                        $scope.productArray = data.goodsInfo.data;
                        cacheData[categoryId] = $scope.productArray;
                        $scope.categoryName = categoryName;
                        $(".categoryName").css("color", "#999999");
                        $(".categoryName").eq(index).css("color", "#D39AC5");

                    });


                   


                });
            } else {
                if (cacheData[categoryId] == undefined) {
                    POP.StartLoading();
                    HTTP.get(API.Category.category + "/category_id/" + categoryId, {}, function (e, data) {
                        POP.EndLoading();
                        if (e) {
                            $.loadError(function () {
                                service.getCategoryGoodsList();
                            });
                            return;
                        }
                        $scope.$apply(function () {
                            $scope.productArray = data.goodsInfo.data;
                            cacheData[categoryId] = $scope.productArray;
                            $scope.categoryName = categoryName;
                            $(".categoryName").css("color", "#999999");
                            $(".categoryName").eq(index).css("color", "#D39AC5");

                        });


                      

                    });

                } else {
                    $scope.productArray = cacheData[categoryId];
                    $scope.categoryName = categoryName;
                    $(".categoryName").css("color", "#999999");
                    $(".categoryName").eq(index).css("color", "#D39AC5");

                  
                }
            }



        }

        // 下拉刷新
        service.Refresh = function ($scope) {

            HTTP.get(API.Category.category + "/category_id/" + categoryId, {}, function (e, data) {
                if (e) {
                    $scope.$broadcast('scroll.refreshComplete');
                    return;
                }
                $scope.$apply(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.categorys = data.categoryInfo;
                    $scope.productArray = data.goodsInfo.data;
                    $scope.categoryName = data.categoryInfo[0].category_name;
                    $scope.$broadcast('clearCache');
                });

            });

        }
        return service;
    });


});