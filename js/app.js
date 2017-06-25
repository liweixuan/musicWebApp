/*
 * angular主配置文件
 */

//console.log("[框架]====>[加载angularjs主配置文件]");

define(function(){

	//创建模块,同时加载ionic模块
	var app =  angular.module('myApp',['ionic']);

	//app相关配置
	app.config(function($ionicConfigProvider){
		$ionicConfigProvider.tabs.style('standard'); // Tab风格
		$ionicConfigProvider.tabs.position('bottom'); // Tab位置
		$ionicConfigProvider.navBar.alignTitle('center'); // 标题位置
		$ionicConfigProvider.navBar.positionPrimaryButtons('left'); // 主要操作按钮位置
		$ionicConfigProvider.navBar.positionSecondaryButtons('right'); //次要操作按钮位置
		$ionicConfigProvider.scrolling.jsScrolling(true);

	});
	
	return app;

});

