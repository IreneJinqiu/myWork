//需做补位处理 使分钟数和秒数在小于10的情况下也可以两位数显示如01,02,03等
var t=setInterval(function timer(){
	var mydate=new Date();
	var mytime="";
	mytime=" "+mydate.getFullYear()+"年";
	mytime+=mydate.getMonth()+1+"月";
	mytime+=mydate.getDate()+"日";
	var week=mydate.getDay();
	switch(week){
		case 0:week="星期天";break;
		case 1:week="星期一";break;
		case 2:week="星期二";break;
		case 3:week="星期三";break;
		case 4:week="星期四";break;
		case 5:week="星期五";break;
		case 6:week="星期六";break;
	};
	mytime+="  "+week;
	//mytime+="&nbsp;"+week;
	mytime+="  "+mydate.getHours()+":";
	var myminute=mydate.getMinutes();
	if(myminute<10){
		myminute="0"+myminute;
	};
	mytime+=myminute+":";
	var mysecond=mydate.getSeconds();
	if(mysecond<10){
		mysecond="0"+mysecond;
	};
	mytime+=mysecond;
	document.getElementById("timebox").value=mytime;
},1000);

window.onload = function()
    {
     var oTab = document.getElementById("tabs");
     var oUl = oTab.getElementsByTagName("ul")[0];
     var oLis = oUl.getElementsByTagName("li");
     var oDivs= oTab.getElementsByTagName("div");

     for(var i= 0,len = oLis.length;i<len;i++)
         {
             oLis[i].index = i;
             oLis[i].onclick = function() 
             {
                 for(var n= 0;n<len;n++)
                 {
                     oLis[n].className = "";
                     oDivs[n].className = "hide";
                 }
                 this.className = "on";
                 oDivs[this.index].className = "";
             }
         };
    };

    var oTab = document.getElementById("tabs");
    function changecolor(){
    	oTab.style.color="#990033";
    };
    function changefont(){
    	oTab.style.font="20px bold";
    };
    function hidetext(){
    	oTab.style.display="none";
    };
    function showtext(){
    	oTab.style.display="block";
    };
    function canselset(){
    	// var mess=confirm("是否取消设置？")
    	// if(mess==true){
    	// 	oTab.removeAttribute('style');
    	// };
        parent.layer.confirm('是否取消设置？', {
            btn: ['是','否'], //按钮
            shade: false //不显示遮罩
        }, function(){
            oTab.removeAttribute('style');
            parent.layer.msg('已取消啦', {icon: 1});
        }, function(){
            parent.layer.msg('没有取消哦', {shift: 6});
        });
    };