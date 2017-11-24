window.onload=function(){
	waterfall('main','box');
	//后台给到的数据
	var dataInt={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"}]};
	window.onscroll=function(){
		if(checkScrollSlide()){
		var oParent=document.getElementById('main');
		//将数据块渲染到当前页面的尾部
		for(var i=0;i<dataInt.data.length;i++){
			var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
			var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
			var oImg=document.createElement('img');
				oImg.src="images/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
		}
		waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
	//将main下的所有class为box的元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面显示的列数（页面宽/box宽）
	var oBoxW=oBoxs[0].offsetWidth;
	console.log(oBoxW);
	//187
	//宽度202=图片宽度165+内边距10*2+边框1*2+15;
	//offsetWidth=border+padding+width;
	//计算一行可以放几列（页面宽/box宽）
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	//console.log(cols);
	//7
	//灵活设置main的宽度（box宽*一行可以放置的列数）预防不同显示屏宽度不一
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0px auto';
	var hArr=[];
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);
			//求第一行图片高度最小的那张图所在数组中的索引号
			var index=getMinHIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			//或这样写：oBoxs[i].style.left=oBoxW*index+'px';
			hArr[index]+=oBoxs[i].offsetHeight;

		}
	}
	//console.log(hArr);
}

//封装函数 根据class获取元素
function getByClass(parent,className){
	var boxArr=new Array(),
		oElements=parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==className){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

function getMinHIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}

//检测是否具备了滚动滚动条时加载数据块的条件
//即该页已显示完需多加载数据填满本页
function checkScrollSlide(){
	var oParent=document.getElementById('main');
	//加引号表示id="main",class="box";
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	//解决兼容
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var height=document.documentElement.clientHeight||document.body.clientHeight;
	//到达指定高度后返回true
	return (lastBoxH<scrollTop+height)?true:false;
}