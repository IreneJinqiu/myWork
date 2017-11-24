var mainbody=document.getElementById("mainbody");
var lis=mainbody.getElementsByTagName("li");

var otheme=document.getElementById("theme");
var omessage=document.getElementById("mymessage");
var node=document.getElementById("1");
var newnode=document.createElement("img");

omessage.insertBefore(newnode,node);

function change1()
{
otheme.href="../css/main1.css";
newnode.src="../images/blue_Idphoto.jpg";
newnode.alt="穆金秋的照片";
newnode.title="穆金秋的照片";
for(var i=0;i<lis.length;i++){
		lis[i].onmouseover=function(){
			this.style.background="#9999FF";
		},
		lis[i].onmouseout=function(){
				this.style.background="";
			};
	};
};

function change2()
{
otheme.href="../css/main2.css";
newnode.src="../images/green_Idphoto.jpg";
newnode.alt="穆金秋的照片";
newnode.title="穆金秋的照片";
for(var i=0;i<lis.length;i++){
		lis[i].onmouseover=function(){
			this.style.background="#99CCCC";
		},
		lis[i].onmouseout=function(){
				this.style.background="";
			};
	};
};

function change3()
{
otheme.href="../css/main3.css";
newnode.src="";
newnode.alt="";
newnode.title="";
for(var i=0;i<lis.length;i++){
		lis[i].onmouseover=function(){
			this.style.background="#FF6699";
		},
		lis[i].onmouseout=function(){
				this.style.background="";
			};
	};
};