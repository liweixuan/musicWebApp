/**
 * Created by ShareLock on 2017/5/9.
 *  奖金币转电子币
 */

define(['app'], function (app) {

    app.factory("myAwardGoldCOINSTransferElectronicTokenService", function () {

        var service = {};


        /**
         * 获取短信验证码
         */
        service.getMessageCodeBiz = function ($scope, POP) {

            //获取账号
            var user_name = User.getInfo().user_name;
            var password = $scope.transform.password;
            var money = $scope.transform.money;
            var pattern = /^\d{6}$/;
            if (money == undefined) {
                POP.Hint("请你填写转账金额！");
                return;
            }
            if (password == undefined) {
                POP.Hint("请填写支付密码！");
                return;
            }
            // 验证转账金额
            if (money <= 0) {
                POP.Hint("金额格式不正确，请重新输入！");
                return;
            }
            if (!pattern.test(password)) {
                POP.Hint("密码格式不正确，请重新输入！");
                return;
            }
            var sendBox = $('.postNote');
            sendBox.attr("disabled", true);
            sendBox.text("正在发送...");
            //获取验证码
            //var url = "http://192.168.10.123:5000/_user/getSmsCode/user_name/" + user_name;
            HTTP.get(API.My.internalTransferGetSmsCode + "/user_name/" + user_name, {}, function (e, data) {
                if (e) {
                    sendBox.removeAttr("disabled");
                    sendBox.text("发送短信效验码");
                    return;
                }
                POP.Hint(data);
                setTime(sendBox);
            });


        }

        var countdown = 60;
        //定时60s
        function setTime(obj) {
            if (countdown == 0) {
                obj.text("发送短信效验码");
                countdown = 60;
                obj.removeAttr("disabled");
                return;
            } else {
                obj.attr("disabled", true);
                obj.text("重新发送(" + countdown + ")");
                countdown--;
            }
            setTimeout(function () {
                    setTime(obj)
                }
                , 1000)
        }


        /**
         * 提交转账申请
         * @param $scope
         * @param verification_code
         * @param POP
         */
        service.submitTransformMoney = function ($scope, POP, $state) {
            var money = $scope.transform.money;
            var passWord = $scope.transform.password;
            var reMark = $scope.transform.reMark;
            var messageCode = $scope.transform.messageCode;
            if (reMark == undefined)reMark = "";
            if (passWord == undefined) {
                POP.Hint("请填写支付密码！");
                return;
            }
            if (money == undefined) {
                POP.Hint("请你填写转账金额！");
                return;
            }
            if (messageCode == undefined) {
                POP.Hint("请填写短信验证码！");
                return;
            }

            var parrt = /^\d{6}$/;
            if (!parrt.test(passWord)) {
                POP.Hint("密码格式不正确，请重新输入！");
                return;
            }
            // 验证转账金额
            if (money <= 0) {
                POP.Hint("金额格式不正确，请重新输入！");
                return;
            }

            var userInfo = User.getInfo();
            var userId = userInfo.user_id;
            POP.StartLoading();
            HTTP.post(API.My.bonusOnUserMoney,
                {
                    "user_id": userId,
                    "bonus": money,
                    "THREE_PASSWORD": passWord,
                    "verification_type": "1",
                    "verification_code": messageCode,
                    "remark": reMark,
                }, function (e, data) {
                    console.log(data);
                    POP.EndLoading()
                    if (e) {
                        if (data.verifyCode != undefined) {
                            POP.Hint(data.verifyCode);
                        } else if (data.transferMoney != undefined) {
                            POP.Hint(data.transferMoney);
                        } else {
                            POP.Hint("转账失败");
                        }

                        return;
                    }
                    POP.Hint("转账成功");

                    setTimeout(function () {
                        $state.go("tab.my");
                    }, 2000);


                });

        }

        service.getBouns = function ($scope, POP) {

            var userId = User.getInfo().user_id;
            POP.StartLoading();
            HTTP.get(API.My.showUserBonus + "/user_id/" + userId, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint("获取奖金币失败");
                    return;
                }
                $scope.$apply(function () {
                    $scope.userBonus = data.userInfo.BONUS;
                });

            });

        }
        return service;


    });


});