/*封装$*/
// window.$=HTMLElement.prototype.$=function(selector){
//     var elems=(this==window?document:this)
//         .querySelectorAll(selector);
//     return elems.length==0?null:elems.length==1?elems[0]:elems;
// }
/*广告图片数组*/
var imgs=[
	{"i":0,"img":"images/index/banner_01.jpg"},
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
];
var slider={
	LIWIDTH:0,//保存每个LI的宽度 #slider的初始宽
	DURATION:1000,//动画总时间
	WAIT:3000,//自动轮播的等待时间
	timer:null,
	canAuto:true,//是否可以自动轮播
	init:function(){
		this.LIWIDTH=parseFloat($("#slider").css("width"));
		this.updateView();
		//为#indexs的ul添加鼠标进入事件
		//获得目标元素
		//调用move方法，传入要移动的个数
		$("#indexs").on("mouseover","li:not(.hover)",function(e){
			var $target=$(e.target);
			this.move($target.html()-$target.siblings(".hover").html());
		}.bind(this));
		//当鼠标进入#slider 不能自动轮播
		$("#slider").hover(
			function(){this.canAuto=false;}.bind(this),
			function(){this.canAuto=true;}.bind(this)
			);
		this.autoMove();
	},
	autoMove:function(){//启动自动轮播
		this.timer=setTimeout(
			function(){
			if(this.canMove){
				this.move(1);
			}else{
				this.autoMove();
			}
	}.bind(this),this.WAIT);
	},
	move:function(n){
		clearTimeout(this.timer);
		this.timer=null;
		$("#imgs").stop(true);
		//n<0 右移 改数组 更新界面
		if(n<0){
			//删除结尾的n个元素
			n*=-1;
			imgs=imgs.splice(imgs.length-n,n).concat(imgs);
			this.updateView();
			//获得#imgs当前的left,转为浮点数
			var left=parseFloat($("#imgs").css("left"));
			$("#imgs").css("left",left-n*this.LIWIDTH);
			$("#imgs").animate({left:"0"},
						this.DURATION,
						this.autoMove.bind(this));
		}else{//左移
			$("#imgs").animate({left:-n*this.LIWIDTH+"px"},
				this.DURATION,
				//回调函数this指window
				this.endMove.bind(this,n)
				);
		}
	},
	endMove:function(n){
		//删除数组开头的n个元素
		imgs=imgs.concat(imgs.splice(0,n));
		this.updateView();
		$("#imgs").css("left",0);
		this.autoMove();
	},
	updateView:function(){//将数组元素更新到页面
		//遍历imags数组中每个图片对象
		for(var i=0,html="",idxs="";i<imgs.length;i++){
			html+="<li><img src='" +imgs[i].img+ "'></li>";
			idxs+="<li>"+(i+1)+"</li>";
		}
		$("#imgs").html(html)
				  .css("width",this.LIWIDTH*imgs.length);
		//序号圆点
		$("#indexs").html(idxs);
		$("#indexs>li:eq("+imgs[0].i+")").addClass("hover")
										.siblings(".hover")
										.removeClass("hover");
	}
}
slider.init();