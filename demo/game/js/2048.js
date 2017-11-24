function setCookie(cookieName,value,date){
  document.cookie=cookieName+"="+value+
                 ";expires="+date.toGMTString();
}
function getCookie(cookieName){
  //将document.cookie保存在变量cookie中
  var cookie=document.cookie;
  //在cookie中查找cookieName的位置保存在i中
  var i=cookie.indexOf(cookieName);
  //如果i等于-1,就返回null
  if(i==-1){return null}
  else{//否则  
    //i+cookieName的长度+1,保存在变量starti中
    var starti=i+cookieName.length+1;
    //从starti开始查找cookie中下一个;的位置endi
    var endi=cookie.indexOf(";",starti);
    if(endi==-1){//如果endi是-1
      //截取cookie中starti到结尾的剩余内容,返回
      return cookie.slice(starti);
    }else{//否则
      //截取cookie中starti到endi的内容，返回
      return cookie.slice(starti,endi);
    }
  }
}
var game={
  RN:4,CN:4,//总行数和总列数
  data:null,//保存游戏格子数据的二维数组
  score:0,//保存游戏得分
  state:1,//保存游戏状态
  GAMEOVER:0,//表示游戏结束状态
  RUNNING:1,//表示游戏运行中
  top:0,//保存游戏最高分
  start:function(){//游戏启动
    //获得cookie中的top变量值，保存在top属性中(如果top变量的值无效，就用0代替)
    this.top=getCookie("top")||0;
    //重置游戏状态为RUNNING
    this.state=this.RUNNING;
    this.score=0;//重置分数为0
    //初始化二维数组
    this.data=[];//创建空数组保存在data属性中
    //r从0开始，到<RN结束
    for(var r=0;r<this.RN;r++){
      //创建一个空数组保存在data中r行
      this.data[r]=[];
      for(var c=0;//c从0开始，到<CN结束
          c<this.CN;//设置data中r行c列的值为0
          this.data[r][c]=0,c++);   
    }
    //在二维数组中生成两个随机数:
    this.randomNum();
    this.randomNum();
    this.updateView();//更新页面
    //为页面绑定键盘按下事件
    document.onkeydown=function(e){
      //事件处理函数中,this默认指事件绑定到的对象
      switch(e.keyCode){
        case 37: this.moveLeft();break;
        case 38: this.moveUp();break;
        case 39: this.moveRight();break;
        case 40: this.moveDown();break;
      }
    }.bind(/*start方法的*/this);
  },
  move:function(callback){
    //为data拍照保存在before中
    var before=String(this.data);
    callback();//this->window
    //为data拍照保存在after中
    var after=String(this.data);
    //如果before不等于after
    if(before!=after){
      this.randomNum();//随机生成数
      //如果游戏结束
      if(this.isGameOver()){
        //修改游戏状态为GAMEOVER
        this.state=this.GAMEOVER;
        if(this.score>this.top){//如果score>top
          var now=new Date();//获得当前时间now
          //将now+1年
          now.setFullYear(now.getFullYear()+1);
          //才将score写入cookie中的top变量,设置过期日期为now
          setCookie("top",this.score,now);
        }
      }
      this.updateView();//更新页面
    }
  },
  isGameOver:function(){
    //遍历data中每个元素
    for(var r=0;r<this.RN;r++){
      for(var c=0;c<this.CN;c++){
      //如果当前元素是0，就返回false
        if(this.data[r][c]==0){return false;}
      //否则，如果c<CN-1&&当前元素等于右侧元素
        else if(c<this.CN-1
         &&this.data[r][c]==this.data[r][c+1]){
          return false;//就返回false
        }
        else if(r<this.RN-1
         &&this.data[r][c]==this.data[r+1][c]){
      //否则，如果r<RN-1&&当前元素等于下方元素
          return false;//就返回false
        }
      }
    }//(遍历结束)
    return true;//返回true
  },
  moveDown:function(){
    this.move(function(){
      //遍历data中每一列
      for(var c=0;c<this.CN;c++){
        //调用moveDownInCol下移第c列
        this.moveDownInCol(c);
      }
    }.bind(/*moveDown中的*/this));
  },
  moveDownInCol:function(c){
    //r从RN-1开始，到r>0结束，r每次递减1
    for(var r=this.RN-1;r>0;r--){
      //查找r位置c列上方前一个不为0的位置prevr
      var prevr=this.getPrevInCol(r,c);
      //如果没找到,就退出循环
      if(prevr==-1){break;}
      else{//否则  
        //如果r位置c列的值为0
        if(this.data[r][c]==0){
          //将prevr位置c列的值赋值给r位置
          this.data[r][c]=this.data[prevr][c];
          //将prevr位置c列置为0
          this.data[prevr][c]=0;
          r++;//r留在原地
        }else if(this.data[r][c]
                  ==this.data[prevr][c]){
        //否则，如果r位置c列的值等于prevr位置的值
          this.data[r][c]*=2;//将r位置c列的值*2
          //将r行c列的新值累加到score属性上
          this.score+=this.data[r][c];
          //将prevr位置c列置为0
          this.data[prevr][c]=0;
        }
      }
    }
  },
  getPrevInCol:function(r,c){
    r--;//r-1
    //循环，r到>=0结束，每次递减1
    for(;r>=0;r--){
      //如果r位置c列不等于0
      if(this.data[r][c]!=0)
        return r;//返回r
    }//(遍历结束)
    return -1;//返回-1
  },
  moveUp:function(){
    this.move(function(){
      //遍历data中每一列
      for(var c=0;c<this.CN;c++){
        //调用moveUpInCol上移第c列
        this.moveUpInCol(c);
      }
    }.bind(this));
  },
  moveUpInCol:function(c){
    //r从0开始,到r<RN-1结束，r每次递增1
    for(var r=0;r<this.RN-1;r++){
      //查找r行c列下方下一个不为0的位置nextr
      var nextr=this.getNextInCol(r,c);
      //如果没找到,就退出循环
      if(nextr==-1){break;}
      else{//否则  
        //如果r位置c列的值为0
        if(this.data[r][c]==0){
          //将nextr位置c列的值赋值给r位置
          this.data[r][c]=this.data[nextr][c];
          //将nextr位置c列置为0
          this.data[nextr][c]=0;
          r--;//r留在原地
        }else if(this.data[r][c]
                  ==this.data[nextr][c]){
        //否则，如果r位置c列的值等于nextr位置的值          
	        //将r位置c列的值*2
          this.data[r][c]*=2;
          //将r行c列的新值累加到score属性上
          this.score+=this.data[r][c];
          //将nextr位置c列的值置为0
          this.data[nextr][c]=0;
        }
      }
    }
  },
  getNextInCol:function(r,c){
    r++;//r+1
    //循环，到<RN结束，r每次递增1
    for(;r<this.RN;r++){
      //如果r位置c列不等于0
      if(this.data[r][c]!=0){
        return r;//返回r
      }
    }//(遍历结束)
    return -1;//返回-1
  },
  moveRight:function(){//左移所有行
    this.move(function(){
      //遍历data中每一行
      for(var r=0;r<this.RN;r++){
        //调用moveRightInRow右移第r行
        this.moveRightInRow(r);
      }//(遍历后)
    }.bind(this));
  },
  moveRightInRow:function(r){//左移第r行
    //c从CN-1开始，到>0结束,c每次递减1
    for(var c=this.CN-1;c>0;c--){
      //调用getPrevInRow方法，查找r行c列前一个不为0的位置，保存在prevc中
      var prevc=this.getPrevInRow(r,c);
      //如果prevc等于-1，就退出循环
      if(prevc==-1){break;}
      else{//否则
        //如果r行c位置的值为0
        if(this.data[r][c]==0){
          //将r行c位置的值替换为prevc位置的值
          this.data[r][c]=this.data[r][prevc];
          //将prevc位置的值置为0
          this.data[r][prevc]=0;
          c++;//c留在原地
        }else if(this.data[r][c]
                  ==this.data[r][prevc]){
        //否则，如果r行c位置的值等于r行prevc位置的值
          //将r行c位置的值*2
          this.data[r][c]*=2;
          //将r行c列的新值累加到score属性上
          this.score+=this.data[r][c];
          //将prevc位置的值置为0
          this.data[r][prevc]=0;
        }
      }
    }
  },
  //查找r行c列右侧下一个不为0的位置
  getPrevInRow:function(r,c){
    c--;//c-1
    //循环,c>=0,c每次递减1
    for(;c>=0;c--){
      //如果c位置的值不为0
      if(this.data[r][c]!=0){
        return c;//返回c
      }
    }//(遍历结束)
    return -1;//返回-1
  },
  moveLeft:function(){//左移所有行
    this.move(function(){
      //遍历data中每一行
      for(var r=0;r<this.RN;r++){
        //调用moveLeftInRow方法，传入r
        this.moveLeftInRow(r);
      }
    }.bind(this));
  },
  moveLeftInRow:function(r){//左移第r行
    //c从0开始，到<CN-1结束
    for(var c=0;c<this.CN-1;c++){
      //调用getNextInRow方法,传入参数r,c, 将返回值保存在变量nextc中
      var nextc=this.getNextInRow(r,c);
      //如果nextc是-1,退出循环
      if(nextc==-1){break;}
      else{//否则
        //如果r行c位置的值是0
        if(this.data[r][c]==0){
          //就将r行c位置的值替换为nextc位置的值
          this.data[r][c]=this.data[r][nextc];
          //将nextc位置的值置为0
          this.data[r][nextc]=0;
          c--;//c留在原地
        }else if(this.data[r][c]
                  ==this.data[r][nextc]){
          //否则,如果r行c位置的值等于r行nextc位置的值
          this.data[r][c]*=2;//将r行c位置的值*2
          //将r行c列的新值累加到score属性上
          this.score+=this.data[r][c];
          //将nextc位置的值置为0
          this.data[r][nextc]=0;
        }
      }
    }
  },
  //获得r行c列右侧下一个不为0的位置
  getNextInRow:function(r,c){
    c++;//c+1
    for(;c<this.CN;c++){//c<CN结束,c++
      if(this.data[r][c]!=0){//如果r行c位置不是0
        return c;//返回c
      }
    }//(遍历结束)
    return -1;//返回-1
  },
  //将数组中每个元素更新到页面的div中
  updateView:function(){
    //遍历data中每个元素
    for(var r=0;r<this.RN;r++){
      for(var c=0;c<this.CN;c++){
        var div=//找到页面上id为"c"+r+c的div
          document.getElementById("c"+r+c);
        //在网页中 获得 id为 "c"+r+c 的元素
        //如果当前元素不是0
        if(this.data[r][c]!=0){
         //设置div的内容为当前元素值
         div.innerHTML=this.data[r][c];
         //设置div的className为"cell n"+当前元素
         div.className="cell n"+this.data[r][c];
        }else{//否则
          div.innerHTML="";//设置div的内容为""
          //设置div的className为"cell"
          div.className="cell";
        }
      }
    }
    //找到id为score的元素，设置其内容为score属性
    document.getElementById("score")
            .innerHTML=this.score;
    //如果游戏状态为结束
    if(this.state==this.GAMEOVER){
      //找到id为gameOver的元素，设置其显示
      document.getElementById("gameOver")
              .style.display="block";
      //找到id为fScore的元素，设置其内容为score属性
      document.getElementById("fScore")
              .innerHTML=this.score;
    }else{//否则
      //找到id为gameOver的元素，设置其隐藏
      document.getElementById("gameOver")
              .style.display="none";
    }
    //设置id为topScore的内容为top属性
    document.getElementById("topScore")
            .innerHTML=this.top;
  },
  //在一个随机位置生成一个2或4
  randomNum:function(){
    while(true){//反复: 
      //在0~RN-1之间生成一个随机整数r
      var r=Math.floor(Math.random()*(this.RN));
      //在0~CN-1之间生成一个随机整数c
      var c=Math.floor(Math.random()*(this.CN));
      //如果data中r行c列的值是0
      if(this.data[r][c]==0){
        //设置data中r行c列的值为:
          //随机生成一个0~1的小数,如果<0.5,就赋值为2，否则赋值为4
        this.data[r][c]=Math.random()<0.5?2:4;
        break;//退出循环
      }
    }
  }
}
game.start();//启动游戏