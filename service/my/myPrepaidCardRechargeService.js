/**
 * Created by ShareLock on 2017/3/30.
 *充值卡充值的Service
 */
define(['app'], function (app) {

    app.factory("myPrepaidCardRechargeService", function () {

        var service = {};

        service.rechargeBiz = function ($scope, POP, $state) {
            var secondPassword = $scope.rechargeCard.secondPassword;
            var cardNum = $scope.rechargeCard.cardNum;
            var cardPassword = $scope.rechargeCard.cardPassword;
            if (secondPassword == undefined) {
                POP.Hint("二级密码为空，请检查！");
                return;
            }
            if (cardNum == undefined) {
                POP.Hint("储值卡账户为空，请检查！");
                return;
            }
            if (cardPassword == undefined) {
                POP.Hint("储值卡密码为空，请检查！");
                return;
            }

            var pattern = /^[A-Za-z0-9]+$/;
            if (!pattern.test(secondPassword)) {
                POP.Hint("二级密码格式有误，请重新输入！");
                return;
            }
            if (!pattern.test(cardNum)) {
                POP.Hint("储值卡账户格式有误，请重新输入！");
                return;
            }
            if (!pattern.test(cardPassword)) {
                POP.Hint("储值卡密码格式有误，请重新输入！");
                return;
            }
            //http://ecommerce.38zs.net:66/docs/index.php#594_28_14   文档接口
            userId = User.getInfo().user_id;
            HTTP.post(API.My.prepaidCard, {
                "user_id": userId,
                "SECOND_PASSWORD": secondPassword,
                "card_no": cardNum,
                "card_pass": cardPassword
            }, function (e, data) {
                if (e) {

                    POP.Hint(data);
                    return;
                }
                POP.Hint("充值成功！！");
                setTimeout(function () {
                    $state.go("tab.my-rechargeableCardList");
                }, 2000);


            })


        }


        return service;


    });


});