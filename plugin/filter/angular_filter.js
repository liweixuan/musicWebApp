/*
 * angularjs过滤器扩展文件
 */

//console.log("[框架]====>[加载angularjs过滤器自定义扩展文件]");

define(['app'], function (app) {

    app.filter('demoFilter', function ($rootScope) {
        return function (input, var1) {
            return input + "|" + var1;
        }
    });

    /*显示专卖店等级 过滤器*/
    app.filter('storeLevelFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '会员';
                    break;
                case  1:
                    varl = '专卖店';
                    break;
                case  2:
                    varl = '旗舰店';
                    break;
                default:
                    varl = '会员default';
                    break;
            }
            return varl
        }

    });
    /*性别 过滤器*/
    app.filter('userSexFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '保密';
                    break;
                case  1:
                    varl = '男';
                    break;
                case  2:
                    varl = '女';
                    break;
                default:
                    varl = '保密';
                    break;
            }
            return varl
        }

    });
    /*显示用户等级 过滤器*/
    app.filter('userLevelFilter', function ($rootScope) {
        return function (input, varl, var2) {
            var v = parseInt(input);
            var is_vip = parseInt(varl);
            var is_pi_fa = parseInt(var2);
            switch (v) {
                case  0:
                    varl = '会员';
                    break;
                case 4:
                    switch (is_vip) {
                        case 0:
                            varl = "志愿者D";
                            break;
                        case 1:
                            switch (is_pi_fa) {
                                case 0:
                                    varl = "VIP";
                                    break;
                                case 1:
                                    varl = "批发";
                                    break;
                            }
                            break;
                    }
                    break;
                default:
                    varl = '会员';
                    break;
            }
            return varl
        }

    });
    /*订单类型 过滤器*/
    app.filter('orderTypeFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '商城订单';
                    break;
                case  1:
                    varl = '提货';
                    break;
                case  2:
                    varl = '重复消费订单';
                    break;
                case  3:
                    varl = '申请专柜';
                    break;
                case  4:
                    varl = '申请专卖店';
                    break;
                case  5:
                    varl = '申请旗舰店';
                    break;
                case  6:
                    varl = '辅销品订单';
                    break;
                case  7:
                    varl = '辅销品积分换购订单';
                    break;
                case  8:
                    varl = '喜乐之家订单';
                    break;
                default:
                    varl = '未发货';
                    break;
            }
            return varl
        }

    });
    /*订单状态 过滤器*/
    app.filter('orderStatusFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '未发货';
                    break;
                case  1:
                    varl = '配货中';
                    break;
                case  2:
                    varl = '发货中';
                    break;
                case  3:
                    varl = '部分发货';
                    break;
                case  4:
                    varl = '已全部发货';
                    break;
                case  5:
                    varl = '已收货';
                    break;
                default:
                    varl = '商城订单';
                    break;
            }
            return varl
        }

    });
    /*订单支付状态 过滤器*/
    app.filter('orderPayStatusFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '未付款';
                    break;
                case  1:
                    varl = '已付款';
                    break;
                default:
                    varl = '未付款';
                    break;
            }
            return varl
        }

    });
    //汇款记录状态 过滤器

    app.filter('remittanceRecordStateFilter', function ($rootScope) {
        return function (input, varl) {
            var v = $.trim(input.toUpperCase());
            if (v == 'A') {
                varl = "同意"
            } else if (v == 'I') {
                varl = "拒绝"
            } else {//v=='W'
                varl = "待审批"
            }
            return varl
        }

    });

    /*时间戳 过滤器*/
    app.filter('timeFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            var now = new Date(parseInt(v) * 1000);
            return now.toLocaleDateString();
        }
    });


    /*时间戳 过滤器*/
    app.filter('dateTimeFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            var now = new Date(parseInt(v) * 1000);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            var time = [year, month, date].join('-') + "  " + [hour, minute, second].join(':');
            return time;
        }
    });
    /*管理关系位置 过滤器*/
    app.filter('locationFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '左区';
                    break;
                case  1:
                    varl = '右区';
                    break;
            }
            return varl
        }

    });

    /*服务关系志愿者级别 过滤器*/
    app.filter('registerGradeFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '注册会员';
                    break;
                case  1:
                    varl = 'A级';
                    break;
                case  2:
                    varl = 'B级';
                    break;
                case  3:
                    varl = 'C级';
                    break;
                case  4:
                    varl = 'D级';
                    break;

            }
            return varl
        }

    });


    /*服务关系专卖店 过滤器*/
    app.filter('exclusiveAgencyFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '';
                    break;
                case  1:
                    varl = '专卖店';
                    break;
                case  2:
                    varl = '旗舰店';
                    break;

            }
            return varl
        }

    });

    /*服务关系志愿者级别 过滤器*/
    app.filter('memberGradeFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '暂无';
                    break;
                case  1:
                    varl = '尚未开通';
                    break;
                case  2:
                    varl = '见习主任';
                    break;
                case  3:
                    varl = '主任';
                    break;
                case  4:
                    varl = '见习经理';
                    break;
                case  5:
                    varl = '经理';
                    break;
                case  6:
                    varl = '高级经理';
                    break;
            }
            return varl
        }

    });


    /*服务关系管理等级 过滤器*/
    app.filter('memberManageGradeFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '暂无';
                    break;
                case  1:
                    varl = '尚未开通';
                    break;
                case  2:
                    varl = '区域总监';
                    break;
                case  3:
                    varl = '全国总监';
                    break;
                case  4:
                    varl = '一星董事';
                    break;
                case  5:
                    varl = '二星董事';
                    break;
                case  6:
                    varl = '三星董事';
                    break;
                case  7:
                    varl = '四星董事';
                    break;
                case  8:
                    varl = '五星董事';
                    break;
            }
            return varl
        }

    });


    app.filter('rechargeableCardFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '扣除';
                    break;
                case  99:
                    varl = '新增';
                    break;
            }
            return varl
        }


    })


    /***
     *银行过滤器
     */
    app.filter('bankFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  1:
                    varl = '中国工商银行';
                    break;
                case  2:
                    varl = '中国农业银行';
                    break;
                case  3:
                    varl = '中国建设银行';
                    break;
            }
            return varl
        }


    })

});