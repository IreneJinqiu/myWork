window.onload=function(){
var music=document.getElementById("music");
var audio=document.getElementsByTagName("audio")[0];
//当音乐播放完停止的时候，自动停止音乐图标的旋转效果play
audio.addEventListener("ended",function(event){
	music.setAttribute("class","");
},false);
// 点击音乐图标，控制音乐的播放和暂停
music.onclick=function(){
	if(audio.paused){
		alert("播放");
		audio.play();
		this.setAttribute("class","play");
	}else{
		alert("暂停");
		audio.pause();
		this.setAttribute("class","");
	};
};
};