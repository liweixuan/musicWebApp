/*
 * 路由配置文件
 */

//console.log("[框架]====>[加载angularjs路由配置文件]");


define(['app'], function (app) {

    //配置路由
    app.config(function ($stateProvider, $urlRouterProvider, $controllerProvider) {

        //控制器文件,按需加载方法
        app.registerController = $controllerProvider.register;

        app.loadControllerJs = function (controllerJs) {

            return function ($rootScope, $q) {
                var def = $q.defer(), deps = [];
                angular.isArray(controllerJs) ? (deps = controllerJs) : deps.push(controllerJs);
                require(deps, function () {
                    $rootScope.$apply(function () {
                        def.resolve();
                    });
                });
                return def.promise;
            }
        };


        //初始化显示的路由，页面初次打开时，默认显示的界面
        $urlRouterProvider.otherwise('/tab/interaction');

        //初始化显示的路由，页面初次打开时，默认显示的界面

        /*
         * 开始路由配置信息
         * url           : 导航中显示的路由地址
         * templateUrl   : 对应的模板路径
         * controllerUrl : 处理该模板的控制器路径
         * controller    : 控制器名称
         */
        $stateProvider

            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "template/tabController.html?_r=" + Math.random(),
                controller: 'mainController',
                resolve: {
                    deps: app.loadControllerJs('../controller/mainController')
                }
            })

            //互动
            .state('tab.interaction', {
                url: '/interaction',
                cache : false,
                views: {
                    'tab-interaction': {
                        templateUrl: "views/interaction/interaction.html?_r=" + Math.random(),
                        controller: 'interactionController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/interaction/interactionController')
                        }
                    }

                }
            })
            
            //曲谱
            .state('tab.musicScore', {
                url: '/musicScore',
                cache : false,
                views: {
                    'tab-musicScore': {
                        templateUrl: "views/musicScore/musicScore.html?_r=" + Math.random(),
                        controller: 'musicScoreController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/musicScore/musicScoreController')
                        }
                    }

                }

            })

            //工具
            .state('tab.musicTool', {
                cache : false,
                url: '/musicTool',
                views: {
                    'tab-musicTool': {
                        templateUrl: "views/musicTool/musicTool.html?_r=" + Math.random(),
                        controller: 'musicToolController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/musicTool/musicToolController')
                        }
                    }

                }

            })

            //音乐信息(文章，视频等)
            .state('tab.musicalInformation', {
                url: '/musicalInformation',
                cache : false,
                views: {
                    'tab-musicalInformation': {
                        templateUrl: "views/musicalInformation/musicalInformation.html?_r=" + Math.random(),
                        controller: 'musicalInformationController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/musicalInformation/musicalInformationController')
                        }
                    }

                }
            })
           
    });

});