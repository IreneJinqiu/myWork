function task(){
			var now=new Date();
			var h=now.getHours();
				h>=12&&(h-=12);
			var m=now.getMinutes();
			var s=now.getSeconds();

			var hDeg=(h*3600+m*60+s)/(3600*12)*360;
			var mDeg=(m*60+s)/3600*360;
			var sDeg=s/60*360;
			document.getElementById("h").style.transform="rotate("+hDeg+"deg)";
			document.getElementById("m").style.transform="rotate("+mDeg+"deg)";
			document.getElementById("s").style.transform="rotate("+sDeg+"deg)";
		};
		task();
		setInterval(task,1000);