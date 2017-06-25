/**
 * Created by ShareLock on 2017/4/1.
 * 充值卡列表的Service
 */
define(['app'], function (app) {


    app.factory('myRechargeableCardListService', function () {
        var service = {};
        /**
         * 获取电子币卡记录
         *
         */
        service.getAList = function ($scope, POP, userId) {
            POP.StartLoading();
            HTTP.get(API.My.searchUserAccount + "/user_id/" + userId, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    return;
                }
                $scope.$apply(function () {
                    // 电子币
                    var listA = [];
                    // 辅销币
                    var listB = [];
                    // 辅销币积分
                    var listC = [];
                    for (var i = 0; i < data.data.length; i++) {
                        var item = data.data[i];
                        if (item.user_money > 0) {
                            listA.push(item);
                        }

                        if (item.fxp_money > 0) {
                            listB.push(item);
                        }

                        if (item.fxp_points > 0) {
                            listC.push(item);
                        }
                    }

                    $scope.rechargeableCardAList = listA;
                    $scope.rechargeableCardBList = listB;
                    $scope.rechargeableCardCList = listC;

                    console.log(listA.length);
                    console.log(listB.length);
                    console.log(listC.length);


                    if (data.data.length <= 0) {
                        $scope.isEmptyData = true;
                    } else {
                        $scope.isEmptyData = false;
                    }

                });
            });

        }
        return service;

    });


});


