// window.onload=function(){
$(function(){
	// 搜索按钮旁边 随机变换背景色
	$("#change_color").click(function(){
		var r=parseInt(Math.random()*(255+1));
		var g=parseInt(Math.random()*(255+1));
		var b=parseInt(Math.random()*(255+1));
		var rgb="rgb("+r+","+g+","+b+")";
		$("body").css("background",rgb);
	});

	//banner部分点击更换图片loop_img_2
	$("img#loop2").mouseover(function(){
      //获得当前img元素的alt属性，转为整数保存在n中
      var n=parseInt($(this).attr("alt"));
      n++;//n+1
      n>4&&(n=1);//如果n>4,就将n改回1
      //设置当前img元素的src属性为img/n.jpg,再设置alt为n
      $(this).attr("src","images/loop2_"+n+".jpg")
             .attr("alt",n);
    });

	//页面主体内容中
  //第一部分手风琴效果
  $(".my-accordion").accordion();
  $("div.my_tabs>ul").on(
      "click","[data-toggle='item']",function(e){
      //获得目标元素封装为jQuery对象
      var $target=$(e.target);
      e.preventDefault();
      //如果当前a的父元素不是active的
      if(!$target.parent().hasClass("active")){
        //获得当前a的父元素的所有兄弟中class为active的，移除其active类
        $target.parent()
               .siblings(".active")
               .removeClass("active");
        //为当前a的父元素添加active类
        $target.parent().addClass("active");
        //获得当前a的href属性,保存在变量selector中
        //使用selector查找div，为其添加active类，再查找其所有兄弟中class为active的移除active类
        $($target.attr("href"))
          .addClass("active")
          .siblings(".active")
          .removeClass("active");
      }
    });
});