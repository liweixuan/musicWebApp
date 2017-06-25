define(['app'], function (app) {

    app.factory("myTransferRecordService", function () {

        var service = {};

        /*网络获取转账记录 信息*/
        service.getTransferRecord = function ($scope, POP, type) {
            if (!$scope.isCanPull) {
                POP.StartLoading();
            }
            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.My.transferRecord + "/skip/" + $scope.page * 10 + "/limit/10/type/" + type + "/user_id/" + info.user_id, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint("加载失败");
                    return;
                }
                $scope.$apply(function () {
                    //根据是否上拉不同处理
                    var length = data.data.length;
                    if ($scope.isCanPull) {
                        //加载更多
                        $scope.data = $scope.data.concat(data.data);
                    } else {
                        //刷新
                        $scope.data = data.data;
                        //判断数据是否为空
                        if (length <= 0) {
                            $scope.isEmptyData = true;
                        } else {
                            $scope.isEmptyData = false;
                        }
                    }
                    //判断是否有下页数据
                    if (length < 10) {
                        $scope.isCanPull = false;
                    } else {
                        $scope.isCanPull = true;
                        $scope.page++;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            });

        };

        /*网络获取转账记录 信息*/
        service.getVouTransferRecord = function ($scope, POP, isCanPull) {
            if (isCanPull) {
                POP.StartLoading();
            }

            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.My.voucherTransferRecord + "/skip/" + $scope.page * 10 + "/limit/10" + "/user_name/" + info.user_name, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint("加载失败");
                    return;
                }
                var length = data.data.length;
                //如果是上拉则添加到上次数据的后面
                if ($scope.isCanPull) {
                    $scope.data = $scope.data.concat(data.data);
                } else {
                    $scope.data = data.data;
                    //判断数据是否为空
                    if (length <= 0) {
                        $scope.isEmptyData = true;
                    } else {
                        $scope.isEmptyData = false;
                    }
                }
                //判断是否有下页数据
                if (length < 10) {
                    $scope.isCanPull = false;
                } else {
                    $scope.isCanPull = true;
                    $scope.page++;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            });

        };
        return service;


    });


});