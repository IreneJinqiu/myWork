<?php
header('Content-Type: text/html;charset=UTF-8');
?>
<p>
	<h4>html5新特性</h4>
	<ul>
		<li>表单新特性</li>
		<li>视频和音频</li>
		<li>Canvas绘图</li>
		<li>SVG绘图</li>
		<li>地理定位</li>
		<li>拖放API</li>
		<li>WebWorker</li>
		<li>WebStorage</li>
		<li>WebSocket</li>
	</ul>
	<h5>表单新特性</h5>
	原有的input type：<br/>
	text、password、radio、checkbox、button、reset、submit、image、 file、hidden<br/><br/>
	(1)新的input type——10个<br/>
	number、email、url、tel、search、range、color、date、month、week<br/>
	(2)新的表单元素——4个 不能与用户交互，不能提交，仅用于信息展示<br/>
	datalist、progress、meter、output<br/>
	(3)表单元素新的属性——11个——重点<br/>
	placeholder、autofocus、autocomplete、multiple、form<br>
	required、min、max、minlength、maxlength、pattern<br/>

	<h5>视频播放</h5>
	  video标签在HTML5中专用于播放视频。<br/>
	  VIDEO标签默认是一个300*150的inline-block;<br/>

	  <h5>音频播放</h5>
	  audio标签在HTML5中专用于播放声音。<br/>
	  AUDIO标签默认是一个300*30的inline-block;若不显示播放控件则display为none。<br/>
	<h5>HTML5取代Flash体现在哪些方面</h5>
	Flash-绘图、动画、游戏	——   HTML5 - Canvas  SVG<br/>
	Flash-视频、音频 —— HTML5 - Video  Audio <br/>
	Flash-客户端存储 —— HTML5 - WebStorage<br/>

	<h5>前端技术中可以实现绘图的技术</h5>
	 (1)WebGL技术 —— 当前还没有纳入HTML5标准<br/>
	 (2)Canvas技术 —— 在HTML5标准中提出的技术<br/>
	 (3)SVG技术 —— 早就存在的技术，纳入了HTML5标准<br/>

	 <h5>Canvas绘图技术 </h5>
	  Canvas：画布，在HTML5中默认是一个300*150的inline-block。设定画布的宽和高不能使用CSS Style，只能使用width和height属性。<br/>
	  画布本身不能绘制内容，只用于承载被绘制的内容——使用画笔来往画布绘制内容。<br/>
</p>