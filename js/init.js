//console.log("[框架]====>[加载框架初始化配置文件]");

define(['jquery','loading','app'],function(N,N,app){

    //在此初始化全局配置数据
	app.run(['$rootScope','POP',function($rootScope,POP){

		$rootScope.isNavShow = true;


	}]);

});