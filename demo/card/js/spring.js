window.onload=function(){
	// console.log("网页可见区域宽:"+document.body.clientWidth);
	// console.log("网页可见区域高:"+document.body.clientHeight);
	// console.log("网页可见区域宽(包括边线):"+document.body.offsetWidth);
	// console.log("网页可见区域高(包括边线):"+document.body.offsetHeight);
	// console.log("网页正文全文宽:"+document.body.scrollWidth);
	// console.log("网页正文全文高:"+document.body.scrollHeight);
	// console.log("网页被卷去的上部:"+document.body.scrollTop);
	// console.log("网页被卷去的左部:"+document.body.scrollLeft);
	// console.log("网页正文部分上:"+window.screenTop);
	// console.log("网页正文部分左:"+window.screenLeft);
	// console.log("屏幕分辨率宽:"+window.screen.width);
	// console.log("屏幕分辨率高:"+window.screen.height);
	// console.log("屏幕可用工作区域宽:"+window.screen.availWidth);
	// console.log("屏幕可用工作区域高:"+window.screen.availHeight);
var music=document.getElementById("music");
var audio=document.getElementsByTagName("audio")[0];
//当音乐播放完停止的时候，自动停止光盘的旋转效果
audio.addEventListener("ended",function(event){
	music.setAttribute("class","");
	//music.style.animationPlayState="paused";
	//music.style.webkitanimationPlayState="paused";
},false);

// 点击音乐图标，控制音乐的播放和暂停
// 手机端是触摸事件，不是点击事件
music.onclick=function(){
	if(audio.paused){
		audio.play();
		this.setAttribute("class","play");
		// 完美效果，但兼容性不好
		// this.style.animationPlayState="running";
		// this.style.webkitanimationPlayState="running";
	}else{
		audio.pause();
		this.setAttribute("class","");
		// this.style.webkitanimationPlayState="paused";
		// this.style.webkitwebkitanimationPlayState="paused";
	};
};
//移动端触摸事件，控制音乐的开启停止
music.addEventListener("touchstart",function(event){
	if(audio.paused){
		audio.play();
		this.setAttribute("class","play");
	}else{
		audio.pause();
		this.setAttribute("class","");
	};
},false);
//点击后 翻页效果
page1.addEventListener("touchstart",function(event){
	page1.style.display="none";
	page2.style.display="block";
	page3.style.display="block";
	// page3和page2同时出现，但page3出现在页面底部看不到
	page3.style.top="100%";
	setTimeout(function(){
		page2.setAttribute("class","page fadeOut");
		//fadeIn transform:translate(0,-100%);page3向上走100%
		page3.setAttribute("class","page fadeIn");
	},5500);
},false);
};
