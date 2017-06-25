define(['jquery'], function ($) {

    //默认参数
		var configs = {
			animate: true,
            imageServer : "http://image.38zs.net:38888",
            imageLoadErr : "./resource/images/default/default_image.png"
		};


	//使用闭包的方式避免全局污染
	(function ($) {

		
        $.fn.extend({

            myImageLazyLoad : function(config){

                // 默认参数与设置参数合并，生成最终配置参数
				var opts = $.extend({}, configs, config);

				$(this).each(function(i){

				var _this = $(this);

				//获取当前图片路径
				var imgUrl = "";
				var imgSrc = $(this).data("original");

				if(imgSrc == ""||imgSrc == 'null' ||imgSrc == undefined){
					imgUrl = opts.imageLoadErr;
				}else{
					imgUrl = opts.imageServer + imgSrc;
				}

				//动态创建一个IMG
				var imgDOM = $("<img src='"+imgUrl+"' style='display:none' />");

				
				imgDOM.load(function(){

					_this.parent().html(imgDOM);

                    if(opts.animate){
                        imgDOM.fadeIn(300);
                    }else{
                        imgDOM.show();
                    }
                    

				});
            });
            

            }
        });

	})($);

});