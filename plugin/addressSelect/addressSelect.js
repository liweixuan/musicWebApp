define(function(){

    (function($){

        //默认参数
		var defaultOptions = {

            provinceAPI : API.Other.getProvinces,
            cityAPI     : API.Other.getCities,
            areaAPI     : API.Other.getCounties,
            isSelectedArea : false,

            provinceid  : 0,
            cityid      : 0,
            areaid      : 0,

			resultBtnClick : function(){}

		};

        function AddressSelect(config){

			this.options = $.extend(false,{},defaultOptions,config);

            this.pId    = 0;
            this.cId    = 0;
            this.aId    = 0;
            this.pValue = "未选择";
            this.cValue = "未选择";
            this.aValue = "未选择";
            this.paData = null;

            //加载锁
            this.lock = false;

			//初始化组件
			this.init();



		}

        AddressSelect.prototype.init = function(){


            //创建视图
            this.createView();

            //数据获取
            this.initData();

            //创建点击事件
            this.initEvent();

            //初始化已有数据

           console.log(this.paData);

            if(this.paData != null){
                this.initSelectedData();
            }
            

		};

        //初始化已有数据
        AddressSelect.prototype.initSelectedData = function(){

            var _this = this;

            if(this.options.provinceid != undefined && this.options.provinceid > 0){

                //选中相应省份
                $(".provinceBox .addressItem").each(function(){
                    var _id = $(this).attr("id");
                   // console.log(_id);
                    if(_id == _this.options.provinceid){
                        $(this).trigger("click");
                    }
                })
               
            }

            if(this.options.cityid != undefined && this.options.cityid > 0){

                //选中相应省份
                $(".cityBox .addressItem").each(function(){
                    var _id = $(this).attr("id");
                   // console.log(_id);
                    if(_id == _this.options.cityid){
                        $(this).trigger("click");
                    }
                })
               
            }

            if(this.options.areaid != undefined && this.options.areaid > 0){

                //选中相应省份
                $(".areaBox .addressItem").each(function(){
                    var _id = $(this).attr("id");
                   // console.log(_id);
                    if(_id == _this.options.areaid){
                        $(this).trigger("click");
                    }
                })
               
            }






        }

        //创建视图
        AddressSelect.prototype.createView = function(){

            //console.log(88888);
           // console.log(this.maskBox);


            //创建遮罩
            this.maskBox = $("<div class='addressSelectBox'></div>");
            $("body").append(this.maskBox);

            //创建选择视图容器
            this.selectBox = $("<div class='addressSelectMain'></div>");
            this.maskBox.append(this.selectBox);

            this.maskBox.fadeIn(200);
            this.selectBox.animate({
                bottom:50
            },350);
          

            //正在获取
            this.lodingAddress = "<img src='./plugin/addressSelect/images/loading.gif' /><p>正在获取...</p>";

            //请选择上级
            this.selectParent = "<span class='glyphicons glyphicons-nearby-circle'></span><p>请选择上级</p>";

            //获取失败
            this.errorData = "<span class='glyphicons glyphicons-exclamation-sign'></span><p>获取失败</p>";

            //获取为空
            this.noData = "<span class='glyphicons glyphicons-ban-circle'></span><p>当前城市无区域信息</p>";

            //省市区地址选择容器
            var addressTabBox = $("<div class='addressTabBox'><div id='selectResultBox'>选择 : "+this.pValue+" - "+this.cValue+" - "+this.aValue+"</div><button id='addressSubmit'>确定</button></div>");
            var provinceBox = $("<div class='addressContent provinceBox'><div class='addressMask provinceMask'>"+this.lodingAddress+"</div></div>");
            var cityBox     = $("<div class='addressContent cityBox'><div class='addressMask cityMask'>"+this.selectParent+"</div></div>");
            var areaBox     = $("<div class='addressContent areaBox'><div class='addressMask areaMask'>"+this.selectParent+"</div></div>");
            
            this.selectBox.append(addressTabBox);
            this.selectBox.append(provinceBox);
            this.selectBox.append(cityBox);
            this.selectBox.append(areaBox);

            //创建省份数据
            var provinceContent = $("");
            provinceBox.append(provinceContent);

            //创建城市数据
            var cityContent = $("");
            cityBox.append(cityContent);

            //创建区域数据
            var areaContent = $("");
            areaBox.append(areaContent);




        }

        AddressSelect.prototype.updateProvincesDOM = function(pData){

            var _this = this;
  
            //清除原有DOM
            $(".provinceBox").find(".addressItem").remove();

            //重新渲染数据
            var pDOM = "";
            for(var i= 0;i<pData.length;i++){
                 
                 if(_this.paData != null){
                    pDOM += "<div id='"+pData[i].region_id+"' class='addressItem ellipsis'>"+pData[i].region_name+"</div>";
                 }else{
                    pDOM += "<div id='"+pData[i].province_id+"' class='addressItem ellipsis'>"+pData[i].province_name+"</div>";
                 }
                   

            }
            
            $(".provinceBox").append(pDOM);
            $(".provinceMask").fadeOut(200);

        }

        AddressSelect.prototype.updateCityDOM = function(cData){

            var _this = this;
            
            //清除原有DOM
            $(".cityBox").find(".addressItem").remove();
            $(".areaBox").find(".addressItem").remove();
            $(".areaBox").css("overflow-y","hidden");

            //重新渲染数据
            var pDOM = "";
            for(var i= 0;i<cData.length;i++){
                if(_this.paData != null){
pDOM += "<div id='"+cData[i].region_id+"' class='addressItem'>"+cData[i].region_name+"</div>";
                }else{
pDOM += "<div id='"+cData[i].city_id+"' class='addressItem'>"+cData[i].city_name+"</div>";
                }
                
            }
            
            $(".cityBox").append(pDOM);
            $(".cityMask").fadeOut(200);

        }

        AddressSelect.prototype.updateAreaDOM = function(aData){

            var _this = this;
            
            //清除原有DOM
            $(".areaBox").find(".addressItem").remove();

            //重新渲染数据
            var pDOM = "";
            for(var i= 0;i<aData.length;i++){
                if(_this.paData != null){
pDOM += "<div id='"+aData[i].region_id+"' class='addressItem'>"+aData[i].region_name+"</div>";
                }else{
pDOM += "<div id='"+aData[i].county_id+"' class='addressItem'>"+aData[i].county_name+"</div>";
                }
                
            }
            
            $(".areaBox").append(pDOM);
            $(".areaMask").fadeOut(200);

        }

        AddressSelect.prototype.initData = function(){

            var _this = this;


            _this.paData = locationInfo.getProvince();


            if(_this.paData != null){
               // console.log("本地缓存");
          
                _this.updateProvincesDOM(_this.paData.items);
            }else{

               // console.log("网络请求");

                //获取省份信息
                HTTP.get(_this.options.provinceAPI,{},function(e,data){

                    if(e){
                        $(".provinceMask").html(_this.errorData);
                        return;
                    }

                    _this.updateProvincesDOM(data);
                    
                });

            }
            

        }

        AddressSelect.prototype.initEvent = function(){

            var _this = this;

            //省份点击
            $(document).off("click",".provinceBox .addressItem").on("click",".provinceBox .addressItem",function(){

                if(_this.lock){
                   // console.log("被锁");
                    return false;
                }

                $(".provinceBox .addressItem").css("background","#FFF");
                $(this).css("background","#F5F5F5");

                //禁止城市遮罩滚动
                $(".cityBox").css("overflow-y","hidden");
                $(".areaBox").css("overflow-y","hidden");

               

                //获取当前点击的省份ID
                var pid = $(this).attr("id");
                var pvalue = $(this).text();
                
                //清除城市，区域数据
                _this.cId = 0;
                _this.aId = 0; 
                _this.cValue = '未选择';
                _this.aValue = '未选择';

                _this.pId = pid;
                _this.pValue = pvalue; 
                _this.updateResult();
                
                var scrollTop = $(".cityBox").scrollTop();
                $(".cityMask").css("top",scrollTop);

                var scrollTop = $(".areaBox").scrollTop();
                $(".areaMask").css("top",scrollTop);

                $(".cityMask").show();
                $(".cityMask").html(_this.lodingAddress);

                $(".areaMask").show();
                $(".areaMask").html(_this.selectParent);

                

     //setTimeout(function(){

                   // console.log(33333);

                    var cData = locationInfo.getCity(pid);

                    if(cData !=null){

                        //恢复滚动
                            $(".cityBox").css("overflow-y","auto");
                            $(".areaBox").css("overflow-y","auto");

                        _this.updateCityDOM(cData.items);

                    }else{

                        //获取城市
                        HTTP.get(_this.options.cityAPI + "/province/" + pid ,function(e,data){

                            //恢复滚动
                            $(".cityBox").css("overflow-y","auto");
                            $(".areaBox").css("overflow-y","auto");

                            if(e){
                                $(".cityMask").html(_this.errorData);
                                return;
                            }

                            _this.updateCityDOM(data);
                            
                        });

                    }

                    

                
               //  },2000);


            });


            //城市点击
            $(document).off("click",".cityBox .addressItem").on("click",".cityBox .addressItem",function(){

                _this.lock = true;

                $(".cityBox .addressItem").css("background","#FFF");
                $(this).css("background","#F5F5F5");

      
                //禁止滚动
                $(".areaBox").css("overflow-y","hidden");

                //获取当前点击的省份ID
                var cid    = $(this).attr("id");
                var cvalue = $(this).text();

                //清除城市，区域数据
                _this.aId = 0; 
                _this.aValue = '未选择';

                _this.cId = cid;
                _this.cValue = cvalue; 
                _this.updateResult();

                var scrollTop = $(".areaBox").scrollTop();
                $(".areaMask").css("top",scrollTop);

                $(".areaMask").show();
                $(".areaMask").html(_this.lodingAddress);

             // setTimeout(function(){

                var aData = locationInfo.getArea(cid);

                    if(aData !=null){

                       // console.log("本地获取");
                       // console.log(aData);

                        if(aData.items.length > 0){
                            _this.options.isSelectedArea = true;
                        }else{
                            _this.options.isSelectedArea = false;
                        }

                        //恢复滚动
                        $(".areaBox").css("overflow-y","auto");
                        _this.lock = false;
                        _this.updateAreaDOM(aData.items);

                    }else{

                        console.log("请求区域");

                        //获取城市
                    HTTP.get(_this.options.areaAPI+"/city/" + cid,function(e,data){

                        _this.lock = false;

                        //恢复滚动
                        $(".areaBox").css("overflow-y","auto");

                        if(e){
                            $(".areaMask").html(_this.errData);
                            return;
                        }

                        if(data.length<=0){
                            $(".areaMask").html(_this.noData);
                            _this.options.isSelectedArea = false;
                            return;
                        }else{
                            _this.options.isSelectedArea = true;
                        }



                        _this.updateAreaDOM(data);
                        
                    });


                    }

                    

          
               //  },2000);


            });

             //区域点击
            $(document).off("click",".areaBox .addressItem").on("click",".areaBox .addressItem",function(){
                $(".areaBox .addressItem").css("background","#FFF");
                $(this).css("background","#F5F5F5");

                //获取当前点击的省份ID
                var aid = $(this).attr("id");

                var avalue = $(this).text();

                _this.aId = aid;
                _this.aValue = avalue; 
                _this.updateResult();
            
            });

            $(document).off("click","#addressSubmit").on("click","#addressSubmit",function(){

              //  console.log(_this.aId);

                if(_this.pId == 0||_this.cId==0){
                    _this.noErrorResult();
                    return;
                }

                if(_this.options.isSelectedArea){
                    if(_this.aId == 0){
                        _this.noErrorResult();
                        return;
                    }
                }

                //回传数据
                var params = {
                    pid : _this.pId,
                    cid : _this.cId,
                    aid : _this.aId,
                    provinceName : _this.pValue,
                    cityName     : _this.cValue,
                    areaName     : _this.aValue == '未选择' ? '' : _this.aValue ,
                };

                 _this.maskBox.fadeOut(200);
                _this.selectBox.animate({
                    bottom:-350
                },500);
                

            
                _this.options.resultBtnClick(params);

                

            });

            $(document).off("click",".addressSelectBox").on("click",".addressSelectBox",function(e){

                if(e.target.className == 'addressSelectBox'){
                    _this.maskBox.fadeOut(200);
                    _this.selectBox.animate({
                        bottom:-350
                    },500,function(){
                        _this.maskBox.remove();
                        _this.selectBox.remove();
                    });

                    
                 }
            
            
                
                
            });



        }

        //更新结果
        AddressSelect.prototype.updateResult = function(){
            
            $(".addressTabBox").find("#selectResultBox").text("选择 : " + this.pValue + " - " + this.cValue + " - " + this.aValue);

        }

        AddressSelect.prototype.noErrorResult = function(){
            
            $(".addressTabBox").find("#selectResultBox").html("选择 : <font color='red'>请选择相应的省市区</font>");

        }

        window.AddressSelect = AddressSelect;


    })(window.jQuery);

});