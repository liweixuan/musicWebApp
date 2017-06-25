/**
 * Created by ShareLock on 2017/3/31.
 * 代金券转账Service
 */

define(['app'], function (app) {

    app.factory('myVoucherTransferService', function () {

        var service = {};


        /**
         * 提交转账申请
         * @param $scope
         * @param POP
         */
        service.submitVoucherTransfer = function ($scope, POP,$state) {

            var targetName = $scope.voucher.targetName;
            var amount = $scope.voucher.amount;
            var thirdPassword = $scope.voucher.thirdPassword;
            var reMark = $scope.voucher.remark;
            var messageCode = $scope.voucher.messageCode;
            if (reMark == undefined)reMark = "";
            if (targetName == undefined || targetName == null) {
                POP.Hint("转账对象不能为空，请检查！");
                return;
            }
            if (amount == undefined) {
                POP.Hint("请你填写转账金额！");
                return;
            }

            if (thirdPassword == undefined) {
                POP.Hint("请填写支付密码！");
                return;
            }
            if (messageCode == undefined) {
                POP.Hint("请填写短信验证码！");
                return;
            }

            var parrt = /^\d{6}$/;
            if (!parrt.test(thirdPassword)) {
                POP.Hint("密码格式不正确，请重新输入！");
            }

            var userInfo = User.getInfo();
            var userName = userInfo.user_name;
            var userId = userInfo.user_id;

            //(* 必须)user_name           String转出账户用户名
            //(* 必须)user_id             Number转出账户用户id
            //(* 必须)target_user         String转入账户用户名
            //(* 必须)point               Number转账积分
            //(* 必须)SECOND_PASSWORD     String二级密码
            //(* 必须)verificationType    Number验证方式 1-短信验证 2-图片验证码验证 3-推送验证
            //(* 必须)verification_code   Number验证码
            //(- 可选)remark              String转账备注
            POP.StartLoading();
            HTTP.post(API.My.voucherTransfer, {
                "user_name": userName,
                "user_id": userId,
                "target_user": targetName,
                "point": amount,
                "SECOND_PASSWORD": thirdPassword,
                "verificationType": 1,
                "verification_code": messageCode,
                "remark": reMark
            }, function (e, data) {
                POP.EndLoading()
                if (e) {
                    POP.Hint(data);
                    return;
                }
                POP.Hint("转账成功");
                setTimeout(function(){
                    $state.go("tab.my");
                },2000);

            });

        }


        /**
         * 发送短信验证码业务
         * @param $scope
         * @param POP
         */
        service.getMessageCodeBiz = function ($scope, POP) {

            //获取账号
            var user_name = $scope.userName;
            //账号不为空
            if (CommenFun.isNullObj(user_name)) {
                POP.Hint("账号不能为空");
                return;
            }
            var sendBox = $('.postNote');
            sendBox.attr("disabled", true);
            sendBox.text("正在发送...");
            //获取验证码
            var url = "http://192.168.10.123:5000/_user/getSmsCode/user_name/" + user_name;
            HTTP.get(url, {}, function (e, data) {
                if (e) {
                    POP.Hint("data");
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
            console.log(obj);
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

        return service;

    });

})