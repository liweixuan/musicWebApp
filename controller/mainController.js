/*
 * 主控制器文件
 */

define(['app'],function(app){

	function ctrl($scope,$rootScope,$state){

		$scope.tabSelect=function(index){
			if(index==0) {
				$state.go('tab.interaction',{});
			} else if(index==1) {
				$state.go('tab.musicScore',{});
			} else if(index==2) {
				$state.go('tab.musicTool', {});
			}else if(index==3) {
				$state.go('tab.musicalInformation', {});
			}
		};
		
	}

	ctrl.$inject = ['$scope','$rootScope','$state'];
	app.registerController('mainController',ctrl);


});