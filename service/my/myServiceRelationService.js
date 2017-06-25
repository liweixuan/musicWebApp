
define(['app'],function(app){

    app.factory("myServiceRelationService",function(){

        var service = {};


        /*网络获取用户信息*/
        service.getServiceRelationship = function ($scope, POP,fn) {


            POP.StartLoading();

            //获取用户的账号
            var info = User.getInfo()

            HTTP.get(API.My.serviceRelationShip + "/user_id/"+info.user_id + "/limit/10" + "/skip/" + 0, {}, function (e, data) {

                POP.EndLoading();

                console.log(data);
                if (e) {
                    $.loadError(function () {
                        service.getServiceRelationship();
                    });
                    return;
                }


                $scope.$apply(function () {
                    //为html页面注入数据
                    $scope.relationData  = data.data;
                    $scope.relationCount = data.count;

                    if (data.data.length <= 0) {
                        $scope.isEmptyServiceRelation = true;
                    } else {
                        $scope.isEmptyServiceRelation = false;
                        if(data.count >10){

                            $scope.isPullComplete = true;
                            $scope.servicePage = 1;

                        }else {

                            $scope.isPullComplete = false;
                            $scope.servicePage = 0;

                        }

                    }
                    fn();
                });

            });

        };


        // 下拉刷新
        service.ServiceRefresh = function ($scope) {

            var searchContent = $('.searchInput').val();
            var searchCondition ="";

            if (searchContent != null && searchContent != undefined && searchContent.length >0){

                searchCondition = "/search_user_name/" + searchContent;

            }


            var info = User.getInfo()

            HTTP.get(API.My.serviceRelationShip + "/user_id/" + info.user_id + searchCondition + "/limit/10"+ "/skip/" + 0, {}, function (e, data) {

                if (e) {
                    $scope.$broadcast('scroll.refreshComplete');
                    return;
                }

                $scope.$apply(function () {
                    //为html页面注入数据
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.relationData = data.data;
                    $scope.relationCount = data.count;
                    $scope.$broadcast('clearCache');

                    if (data.data.length <= 0) {
                        $scope.isEmptyServiceRelation = true;
                    } else {
                        $scope.isEmptyServiceRelation = false;
                        if(data.count >10){

                            $scope.isPullComplete = true;
                            $scope.servicePage = 1;

                        }else {

                            $scope.isPullComplete = false;
                            $scope.servicePage = 0;

                        }

                    }


                });

            });

        };


        //上拉加载
        service.loadMoreServiceRelationship = function ($scope, POP,fn) {

            if ($scope.isPullComplete == false) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }

            var info = User.getInfo();

            HTTP.get(API.My.serviceRelationShip + "/user_id/" + info.user_id + "/limit/10" + "/skip/" + $scope.servicePage * 10, {}, function (e, data) {

                if (e) {
                    POP.Hint("加载失败");
                    return;
                }

                console.log(data);
               //添加到上次数据的后面
                $scope.$apply(function () {

                    //判断是否有下页数据
                    var length = data.data.length;
                    if (length >= 10) {
                        //加载更多
                        $scope.relationData = $scope.relationData.concat(data.data);
                        $scope.isPullComplete = true;
                        $scope.servicePage++;
                    } else {

                        $scope.relationData = $scope.relationData.concat(data.data);
                        $scope.isPullComplete = false;

                    }

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                       fn();


                });

            });


        }


        //搜索内容
        service.searchServiceAction = function ($scope, POP) {

            var searchContent = $('.searchInput').val();

            //正则验证用户名为数字、字母
            var re = /^[\w]+$/;

            if (!re.test(searchContent) || searchContent == 0 ||searchContent == "0"){

                POP.Hint("请输入正确的用户名");
                return;
            }

            POP.StartLoading();

            //获取用户的账号
            var info = User.getInfo()

            HTTP.get(API.My.serviceRelationShip + "/user_id/"+info.user_id + "/search_user_name/" + searchContent, {}, function (e, data) {

                POP.EndLoading();

                console.log(data);
                if (e) {
                    POP.Hint("请输入正确的用户名")
                    return;
                }

                $scope.$apply(function () {
                    //为html页面注入数据
                    $scope.relationData  = data.data;
                    $scope.relationCount = data.count;

                    if (data.count == 0) {
                        $scope.isEmptyServiceRelation = true;
                    } else {
                        $scope.isEmptyServiceRelation = false;

                    }
                    $scope.isPullComplete = false;
                    $scope.$broadcast('scroll.refreshComplete');

                });

            });


        };


        return service;

    });


});