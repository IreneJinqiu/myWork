var elevator={
	FHEIGHT:0,
	UPLEVEL:0,
	DOWNLEVEL:0,
	DURATION:1000,
	init:function(){
		this.FHEIGHT=parseFloat($("#f1").css("height"))+
					 parseFloat($("#f2").css("marginBottom"));
		this.UPLEVEL=parseFloat((innerHeight-this.FHEIGHT)/2);
		this.DOWNLEVEL=this.UPLEVEL+this.FHEIGHT;
		$(document).scroll(this.scroll.bind(this));
		//鼠标移入
		$("#elevator>ul").on("mouseover","li",function(e){
			//target 可能是li 或是 li下的a
			var $target=$(e.target);
			if(e.target.nodeName=="A"){
				$target=$target.parent();
			}
			$target.children(":first").hide();
			$target.children(":last").show();
		});
		//鼠标移出
		$("#elevator>ul").on("mouseout","li",function(e){
			var $target=$(e.target);
			if(e.target.nodeName=="A"){
				$target=$target.parent();
			}
			var i=$target.index("#elevator>ul>li");
			var $span=$(".floor>header>span:eq("+i+")");
			if(!$span.hasClass("hover")){
				$target.children(":first").show();
				$target.children(":last").hide();
			}
		});
		//为#elevator下的ul添加click
		$("#elevator").on("click","li>a.etitle",function(e){
			//停止body上的动画，清空队列
			$("body").stop(true);
			var $target=$(e.target);
			var $li=$target.parent();
			var i=$li.index("#elevator>ul>li");
			var $span=$(".floor>header>span:eq("+i+")");
			//启动动画
			$("body").animate({
				scrollTop:$span.offset().top-this.UPLEVEL
			},this.DURATION)
		}.bind(this))
	},
	scroll:function(){//响应document的scroll事件
		$(".floor>header>span").each(function(i,elem){
			//回调函数的第二个参数自动获得当前的DOM元素
			var totalTop=$(elem).offset().top;
			var scrollTop=$("body").scrollTop();
			var innerTop=totalTop-scrollTop;
			if(innerTop>this.UPLEVEL&&innerTop<=this.DOWNLEVEL){
				$(elem).addClass("hover");
				$("#elevator>ul>li:eq("+i+")>a:first").hide();
				$("#elevator>ul>li:eq("+i+")>a:last").show();
			}else{
				$(elem).removeClass("hover");
				$("#elevator>ul>li:eq("+i+")>a:first").show();
				$("#elevator>ul>li:eq("+i+")>a:last").hide();
			}
		}.bind(this));
		$(".floor>header>span.hover").length>0?
				$("#elevator").show():
				$("#elevator").hide();

	}
}
elevator.init();