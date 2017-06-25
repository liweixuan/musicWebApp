define(['jquery'], function ($) {

	//使用闭包的方式避免全局污染
	(function ($) {

		var GIF_timer = null;

		$.extend({

			//界面初始化开始加载
			initAppStartLoad : function(){

				$.loadErrorRM();

				//动态创建进度显示容器 plugin/loading/images/loading.gif
				var loadingBox = $('<div class="loadingBox" id="loadingBox"><div class="loadingImage"><img src="resource/loading/loading_0.png" /></div><div class="loadingText">界面加载中...</div></div>')

				var imageArr = [
					"resource/loading/loading_0.png",
					"resource/loading/loading_1.png",
					"resource/loading/loading_2.png",
					"resource/loading/loading_3.png",
					"resource/loading/loading_4.png",
					"resource/loading/loading_5.png",
					"resource/loading/loading_6.png",
					"resource/loading/loading_7.png",
					"resource/loading/loading_8.png",
					"resource/loading/loading_9.png",
					"resource/loading/loading_10.png",
					"resource/loading/loading_11.png",
					"resource/loading/loading_12.png",
					"resource/loading/loading_13.png",
				];

				$("body").append(loadingBox);

				var imageSize = imageArr.length;
				var imageObj  = $(".loadingImage img");
				var i = 0;

				GIF_timer = setInterval(function(){
					i++;
					imageObj.attr("src",imageArr[i]);
					if(i >= imageSize){
						i = 0;
					}
				},150);
			

			},

			//界面初始化结束加载
			initAppEndLoad : function(){
				clearInterval(GIF_timer);
				$(".loadingBox").remove();

			},

			//网络请求错误
			loadError : function(cb){

				$.initAppEndLoad();
				$.loadErrorRM();

				var loadErrorBox = $("<div class='loadErrorBox'><div class='loadErrorImage'><span class='glyphicons glyphicons-warning-sign'></span></div><div class='loadErrorText'><font color='red'>数据加载失败</font> , 请点击界面重新尝试</div></div>");
				$("body").append(loadErrorBox);

				loadErrorBox.click(function(){
					$.initAppStartLoad();
					cb();
				});

			},

			loadErrorRM : function(){
				clearInterval(GIF_timer);
				$(".loadErrorBox").remove();
			}

		});

	})($)

})