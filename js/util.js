//console.log("[框架]====>[加载框架工具包文件]");

define(['linq'],function () {

	// HTTP 请求封装
	var HTTP = {};

	/*
	 * get请求
	 * @params {url} 请求地址
	 * @params {data} 请求参数
	 * @params {callback} 回调函数
	 */
	HTTP.get = function(url, data, callback) {
				var $data = typeof data === 'function' ? null : data;
				var $callback = typeof data === 'function' ? data : callback;
				send('get', url, $data, $callback);
	};

	/*
	 * post请求
	 * @params {url} 请求地址
	 * @params {data} 请求参数
	 * @params {callback} 回调函数
	 */
	HTTP.post = function (url, data, callback) {
			send('post', url, data, callback);
		};

	//将工具添加至window对象
	window.HTTP = HTTP;


	/*
	 * 请求发送方法
	 * @params {$method} 请求方式
	 * @params {$url} 请求地址
	 * @params {$data} 请求参数
	 * @params {$callback} 回调函数
	 */
	var send = function ($method, $url, $data, $callback) {

		//回调函数定义
		var _callback = function (e, data) {

			// 回调
			if (typeof $callback === 'function') {
				$callback(e, data);
			} else {
				console.log("错误请求");
			}
		};

		console.log("请求的接口地址为:" + $url);

		//查看是否为POST请求,如果是则取出token并设置在头信息中
		if($method == 'post'){

			//取出本地token信息
			var userInfo = JSON.parse($.cookie("userInfo"));

			//获取token
			var tokenValue = userInfo.token;

			//设置在ajax的请求头中
			$.ajaxSetup({
			   headers: {'x-token': tokenValue}
			});
		}

		console.log(88888888);
		console.log($data);

		// 设置异步请求选项
		var options = {
			url			: $url,
			method	: $method,
			data		: $data,
			dataType : "json",
			jsonp		: true,
			timeout	: 15000,  //设置超时时间15秒
			success	: function (data) {

				//判断业务是否成功
				if (data.success) {
					_callback(null, data.result);
				} else {

					if(data.result == undefined){
						_callback(true,"请求失败，请重新尝试");
						return;
					}

					if(data.result.message == undefined){
						_callback(true, data.result);
					}else{
						_callback(true, data.result.message);
					}

				}
			},
			error: function (e) {
				_callback(e);
			}
		};

		// 发送异步请求
		$.ajax(options);

	};


	// 浏览器相关判断
	var BrowserUtil = {};

	/*
	 * 判断当前打开的浏览起是否为微信内置浏览器
	 */
	BrowserUtil.isWeiXinBrowser = function(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;  
		} else {
			return false;  
		}
	}

	/*
	 * 判断当前打开的浏览起是否为QQ内置浏览器
	 */
	BrowserUtil.isQQBrowser = function(){
		var ua = navigator.userAgent.toLowerCase();  
			if(ua.match(/qqmobile/i)=="qqmobile") {
				return true;  
			} else {
				return false;  
			}
	}

	//将工具添加至window对象
	window.BrowserUtil = BrowserUtil;


	//公共方法
	var CommenFun = {};

	/**
	 * 判断一个对象是否为空
	 */
	CommenFun.isNullObj = function(obj){
		for(var i in obj){
			if(obj.hasOwnProperty(i)){
				return false;
			}
		}
		return true;
	}

	window.CommenFun = CommenFun;

	/**
	 * 用户相关操作
	 */
	var User = {};

	//判断是否登录
	User.isLogin = function(){
		//判断是否登录
		var userInfo = $.cookie('userInfo');
		if(userInfo == undefined || userInfo === 'null'){
			return false;
		}else{
			return true;
		}
	};

	//获取用户信息
	User.getInfo = function(){
		var userInfo = $.cookie('userInfo');
		return JSON.parse(userInfo);
	};

	window.User = User;


	/*
	 * 本地存储工具
	 */
  var customStorage = {};

	//session会话存储-保存
	customStorage.setSessionValue = function(key,value){

		//判断是否支持端session存储
		if(!window.sessionStorage){
			POP.error("抱歉您的浏览器不支持端session存储功能!");
			return;
		}

		//判断key与value是否有值
		if(key == undefined || value == undefined){
			POP.error("请您传递需要缓存的session键名与键值!");
			return;
		}

		//存储内容
		window.sessionStorage.setItem(key,value);


	};

	//session会话存储-获取
	customStorage.getSessionValue = function(key){

		//判断是否支持端session存储
		if(!window.sessionStorage){
			POP.error("抱歉您的浏览器不支持端session存储功能!");
			return;
		}

		//判断key是否有值
		if(key == undefined){
			POP.error("请您传递需要缓存的session键名与键值!");
			return;
		}

		//存储内容
		return window.sessionStorage.getItem(key);


	};

	//session会话存储-删除
	customStorage.deleteSessionValue = function(key){
		window.sessionStorage.removeItem(key);
	};

	//session会话存储-删除全部
	customStorage.deleteSessionValueAll = function(){
		window.sessionStorage.clear();
	};

	//本地持久化存储-保存
	customStorage.setPersistenceValue = function(key,value){

		console.log("本地存储...");

		//判断是否支持端本地存储
		if(!window.localStorage){
			POP.error("抱歉您的浏览器不支持端session存储功能!");
			return;
		}

		//判断key与value是否有值
		if(key == undefined || value == undefined){
			POP.error("请您传递需要缓存的session键名与键值!");
			return;
		}

		//存储内容
		window.localStorage.setItem(key,value);

	};

	//本地持久化存储-获取
	customStorage.getPersistenceValue = function(key){

		//判断是否支持端本地存储
		if(!window.localStorage){
			POP.error("抱歉您的浏览器不支持端session存储功能!");
			return;
		}

		//判断key是否有值
		if(key == undefined){
			POP.error("请您传递需要缓存的session键名与键值!");
			return;
		}

		//存储内容
		return window.localStorage.getItem(key);

	};

	//本地持久化存储-删除
	customStorage.deleteLocalStorageValue = function(key){
		window.localStorage.removeItem(key);
	};

	//本地持久化存储-删除全部
	customStorage.deleteLocalStorageValueAll = function(){
		window.localStorage.clear();
	};

	window.customStorage = customStorage;

	var locationInfo = {};

	//反回所有省份
	locationInfo.getProvince = function(){

		var locationData = JSON.parse(customStorage.getPersistenceValue("regionData"));

		if(locationData!=null){

			var exampleArray = JSLINQ(locationData).Where(function(item){ return item.region_type == "1"; })
		
			return exampleArray;
		}

		return null;

	} 

	//反回所有城市
	locationInfo.getCity = function(pid){

		var locationData = JSON.parse(customStorage.getPersistenceValue("regionData"));

		if(locationData!=null){

			var exampleArray = JSLINQ(locationData)
			.Where(function(item){ return item.region_type == "2"; })
			.Where(function(item){ return item.parent_id   == pid; })
			
			return exampleArray;

		}

		return null;
		

	} 

	//反回所有区域
	locationInfo.getArea = function(pid){

		var locationData = JSON.parse(customStorage.getPersistenceValue("regionData"));

		if(locationData!=null){
			var exampleArray = JSLINQ(locationData)
			.Where(function(item){ return item.region_type == "3"; })
			.Where(function(item){ return item.parent_id   == pid; })
			
			return exampleArray;
		}

		return null;
	}

	//根据省市区ID 获取 省市区相对应的名称
	locationInfo.getAddressName = function(pid,cid,aid){

		var locationData = JSON.parse(customStorage.getPersistenceValue("regionData"));

		if(locationData!=null){

			var pname = JSLINQ(locationData).Where(function(item){ return item.region_id == pid; })
			var cname = JSLINQ(locationData).Where(function(item){ return item.region_id == cid; })
			var aname = JSLINQ(locationData).Where(function(item){ return item.region_id == aid; })

			var addressStr = "";
			if(pname.items[0].region_name){
				addressStr += pname.items[0].region_name;
			}

			if(cname.items[0].region_name){
				addressStr += "-" + cname.items[0].region_name;
			}

			if(aname.items[0].region_name){
				addressStr += "-" + pname.items[0].region_name;
			}

			return addressStr;

		}
		
		return null;

	}

	window.locationInfo = locationInfo;
	

});