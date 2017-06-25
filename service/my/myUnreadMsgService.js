define(['app'], function (app) {

    app.factory("myUnreadMsgService", function () {

        var service = {};

        /*网络获取未读消息记录 信息*/
        service.getUnreadMsg = function ($scope, POP,isLoading) {
            if (isLoading) {
                POP.StartLoading();
            }

            //获取用户的账号
            HTTP.get(API.My.unreadMsg + "/is_notification/1/skip/" + $scope.page * 10 + "/limit/10", {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint("加载失败");
                    return;
                }
                //如果是上拉则添加到上次数据的后面
                $scope.$apply(function () {
                    var length = data.data.length;
                    if ($scope.isCanPull) {
                        $scope.datas = $scope.datas.concat(data.data);
                    } else {
                        $scope.datas = data.data;
                        //判断数据是否为空
                        if (length <= 0) {
                            $scope.isEmptyData = true;
                        } else {
                            $scope.isEmptyData = false;
                        }
                    }
                });
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

        /*网络获取未读消息详情 信息*/
        service.getUnreadMsgInfo = function ($scope, $sce, POP, article_id) {
            POP.StartLoading();
            HTTP.get(API.My.unreadMsgInfo + "/type/2/article_id/" + article_id, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint("加载失败");
                    return;
                }

                $scope.$apply(function () {
                    //如果是上拉则添加到上次数据的后面
                    $scope.content = $sce.trustAsHtml(data.data[0].content);
                });

            });
        };
        return service;


    });


});