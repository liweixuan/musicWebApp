/**
 * Created by ShareLock on 2017/3/30.
 * 条形码验证SerVice
 */
define(['app'], function (app) {

    app.factory("myAuthenticCheckService", function () {

        var service = {};


        service.searchBarCodeGoods = function ($scope, code, userId,POP) {
            // 非空验证
            if(code==null||code.length<1){
              POP.Hint("输入不能为空！");
                return;
            }
            POP.StartLoading();
            HTTP.get(API.My.searchBarCodeGoods + "/user_id/" + userId + "/code_password/" + code, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    $(".res").show();
                    $(".ser").hide();
                    return;
                }
                $(".res").hide();
                $(".ser").show();

            });
        }

        return service;


    });


});