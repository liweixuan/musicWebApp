define(['app'], function (app) {

    app.factory("myElectronicBankTransferService", function () {

        var service = {};

        /*网络获取银行列表 信息*/
        service.getBankList = function ($scope, type, POP) {

            HTTP.get(API.My.bankList + "/BANK_TYPE/" + type, {}, function (e, data) {
                //隐藏加载图片
                $('.sel_loadImg').hide();
                if (e) {
                    POP.Hint("获取银行列表失败");
                    $('.sel_loadTxt').show();
                    return;
                }
                $('.sel_loading').hide();
                $scope.$apply(function(){
                    $scope.bankLists = data.data;
                });
                if (data.data.length > 0) {
                    //确定按钮可点击
                    $('.sel_confirmSelect').removeAttr("disabled");
                    //确定按钮的 点击效果
                    $(document).off("touchstart", ".sel_confirmSelect").on("touchstart", ".sel_confirmSelect", function (event) {
                        $(this).css({background: "#d98bbc"}).transition({background: "#d9a9cd"}, 100);
                    });
                    $(document).off("touchend", ".sel_confirmSelect").on("touchend", ".sel_confirmSelect", function (event) {
                        $(this).css("background", "#d9a9cd").transition({background: "#d98bbc"}, 100);
                    });
                }

            });
        };

        //提交
        service.addEleBankTransfer = function ($scope, POP, param) {
            POP.StartLoading();
            //获取用户的账号
            var info = User.getInfo();
            HTTP.post(API.My.eleBankTransfer, {
                "user_id": info.user_id,
                "user_name": info.user_name,
                "AMOUNT": param.amount,
                "BANK_ACCOUNT": param.bank_account,
                "BANK_NAME": param.bank_name,
                "REMITTANCE_DATE": param.remittance_date,
                "REMITTANCE_MAN": param.remittance_man,
                "BANK_ID": param.bank_id,
                "BANK_ADDRESS": param.bank_address,
                "HUIKUAN_TYPE": param.huikuan_type,
                "remittance_img": '/upload/auto/2017/04/1491528899881.png',
                "REMARK": param.remark
            }, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint(data);
                    return;
                }
                //成功干啥？？？
                POP.Hint("提交成功");
                $("#form1")[0].reset();
            });

        };
        return service;


    });


});