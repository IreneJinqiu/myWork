//全局变量
var data=["奖品1","奖品2","奖品3","奖品4","奖品5","奖品6","奖品6"];
	timer=null,//定时器
	flag=0;//或者写flag=true;判断两种情况

window.onload=function(){
	var	play=document.getElementById('play'),
		stop=document.getElementById('stop');

	//开始抽奖(鼠标事件)
	play.onclick=playFun;
	stop.onclick=stopFun;

	//键盘事件
	document.onkeyup=function(event){
		event=event || window.event;
		if(event.keyCode==13){
			if(flag==0){
				playFun();
				flag=1;
			}else{
				stopFun();
				flag=0;
			}
		}
	}
}
		
function playFun(){
	var title=document.getElementById('title');
	var	play=document.getElementById('play');
	clearInterval(timer);
	timer=setInterval(function(){
		var random=Math.floor(Math.random()*data.length);
		title.innerHTML=data[random];
	},50);
	//当键盘事件和鼠标事件都有时，不能用this
	//因为按下键盘时this指键盘，键盘对应的document不能设背景色
	//this.style.background='#999';
	play.style.background='#999';
}

function stopFun(){
	clearInterval(timer);
	var play=document.getElementById('play');
	play.style.background='#036';
}