
//17:11--17:21 练习
//17:21--17:31 休息
//1:创建对象game
var game = {
 //2:添加方法start
 start:function(){
     //2.1 清空分数
     this.score = 0;
     //2.2 创建二维数组并且赋值 0
     this.data = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
     ];
     //2.3 产生二个随机数
     this.randomNum();
     this.randomNum();
     //2.4 依据数组更新网页
     this.updateView();
     //2.5 监听键盘事件 11:30--11:35

     //2.5.1  为了处理下面问题
     //在事件处理函数之前
     var self = this;//this 26 line-->game
     document.onkeydown  = function(){
      //2.6 获取事件对象 
      //11:43--11:48
      var e = arguments[0] || window.event;
      var code = e.keyCode;
      //1:如果用户按向上键 调用方法moveUp();
      //#坑:this document.onkeydown
      //onkeydown 事件
      //在一个事件处理函数中 this 指事件目标对象
      //this--->document
      //解决方案:预留 this
      if(code == 37){
        self.moveLeft();
      }else if(code == 38){
        self.moveUp();
      }else if(code == 39){
        self.moveRight();
      }else if(code == 40){
        self.moveDown();
      }
      //2:如果用户按向下键 调用方法moveDown();
      //3:如果用户按向左键 调用方法moveLeft();
      //4:如果用户按向右键 调用方法moveRight();
     }
     //##修改游戏状态
     this.state = this.RUNNING;
 },
 //3:添加属性游戏分数
 score:0,
 //4:添加属性行数:变量的值不会发生变化:大写
 RN:4,
 //5:添加属性列数
 CN:4,
 //6:添加属性游戏状态
 state:0,
 //7:添加属性游戏运行状态:变量的值不会发生变化:大写
 RUNNING:1,
 //8:添加属性游戏结束状态
 GAMEOVER:2,
 //9:添加属性游戏二维数组
 data:null,
 //10:添加方法randomNum
 //1:产生一个行下标
 //2:产生一个列下标
 //3:产生一个随机数
 randomNum:function(){
     //2.3 产生一个随机数 2 或者 4
     //1:简单[2,4,2,4]
     //       0 1 2 3    parseInt(Math.random()*4)
     //       0.5*4=2.101  2   ->2
     //       0.9*4=3.612  3   ->4
     //var row = [2,4,2,4];
     //var idx = parseInt(Math.random()*4);
     //console.log(row[idx]);
     //2:快速
     //var num = Math.random() > 0.5 ? 4 : 2;
     //0  0.1 0.92 0.5 0.2 ..
     //console.log(num);

     //9:51--9:56   练习
     //9:56--10:06  休息
     //10.0 如果数组己满则不再产生随机数
     if(this.isFull()){
      //return 功能结束方法执行
      return;
     }
     while(true){
      //10.1 产生一个行下标  0-3
      var r = parseInt(Math.random()*this.RN);
      //10.2 产生一个列下标  0-3
      var c = parseInt(Math.random()*this.CN);
      //10.3 产生一个随机数  2 4 
      var n = Math.random() > 0.5 ? 4 : 2;
      //10.4 将随机数保存在数组中指定的行列下标中
      if(this.data[r][c] == 0){
       this.data[r][c] = n;
       //10.4.1 如果保存数据退出循环 
       break;
      }
      //*10.5 如果当前行下标列下标己存在数字，则另选位置 
     }
 },
 //11：判断当前数组是否是满的
 //满  :16元素都不为0    true
 //不满:16元素有一个为0  false
 //如果是满的:返回true
 //如果不满  :返回false
 isFull:function(){
   //11.1 循环行下标  10:30--10:36
   for(var r=0;r<this.RN;r++){
   //11.2 循环列下标
   for(var c=0;c<this.CN;c++){
    //11.3 判断如果当前元素为0
    if(this.data[r][c]==0){
      //11.4 返回false 
      return false;
     }
    //11.5 如果循环结束
    } 
   }
   //11.6 返回true
   return true;
 },
 //12:依据数组更新网页
 updateView:function(){
  //10:51--11:01 练习
  //11:01--11:11休息
  //12.1  循环行下标
  for(var r=0;r<this.RN;r++){
  //12.2  循环列下标
  for(var c=0;c<this.CN;c++){
   //12.3  判断如果数组对象行下标列下标-->不为零
   if(this.data[r][c]>0){
   //12.4  将数组值获取      11:15--11:20
   var num = this.data[r][c];
   //12.5  拼接字符串c+行下标+列下标
   var ids = "c"+r+c;
   //12.6  依据字符串获取网页元素!!!!!!!!!!!!!!!
   var node = document.getElementById(ids);
   //12.7  赋值元素innerHTML
   node.innerHTML = num;
   node.className = "cell n"+num;
   }else{
   //12.8  判断如果数组对象行下标列下标-->为零
   var ids = "c"+r+c;
   var node = document.getElementById(ids);
   //12.9  将 "" 赋值元素innerHTML
   node.innerHTML = "";
   node.className = "cell";
   }
  }
  }
  //12.10 分数显示在网页上
  document.getElementById("score").innerHTML = this.score;


  //12.11 判断游戏是否结束
  if(this.state == this.GAMEOVER){
    var gameOver = document.getElementById("gameOver");
    gameOver.style.display = "block";
    document.getElementById("final").innerHTML = this.score;
  }else{
    var gameOver = document.getElementById("gameOver");
    gameOver.style.display = "none";    
  }


 },
 //13 完成向上操作  
 //17:18--17:23 练习
 //17:23--17:33 休息
 moveUp:function(){
    //13.1 循环 0-3 列 c
    for(var c=0;c<this.CN;c++){
     //13.2 对向上每一列进行一个操作
     this.moveUpInCol(c);
     //13.3 循环外
    }
    //##判断
    if(this.isGameOver()){
      this.state = this.GAMEOVER;
    }

    //13.4 产生一个随机数
    this.randomNum();
    //13.5 依据数组更新网页
    this.updateView()
 },
 //14 完成向下操作
 moveDown:function(){
   //14.1 循环四列 0-3
   for(var c=0;c<this.CN;c++){
    //14.2 对每一列进行操作
    this.moveDownInCol(c);
    //14.3 循环外
   }
    //##判断
    if(this.isGameOver()){
      this.state = this.GAMEOVER;
    }   
   //14.4 产生一个随机数
   this.randomNum();
   //14.5 依据数组更新网页
   this.updateView();

 },
 //15 完成向左操作
 moveLeft:function(){
  //14:35--14:40
  //15.1:循环四行 0-3
  for(var r=0;r<this.RN;r++){
   //15.2:在循环内部调用方法完成一行操作
   this.moveLeftInRow(r);
  }
    //##判断
    if(this.isGameOver()){
      this.state = this.GAMEOVER;
    }  
  //15.3:循环结束 
  //15.4:产生一个随机数
  this.randomNum();
  //15.5:依据数组更新网页
  this.updateView();
 },
 //16 完成向右操作 
 //moveRight:function(){
 //  console.log("右");
 //},
 //17:完成向左操作{一行}任务
 //   r行号
 moveLeftInRow:function(r){
  //14:50--15:00 练习
  //15:00--15:10 休息 
  //17.1 创建变量c表示当前列下标
  for(var c=0;c<this.CN-1;c++){
   //17.2 创建变量 nextC表示下一个不为0元素列下标
   var nextC = this.leftNextC(r,c);//15:15--15:18 练习
   //17.3 如果nextC == -1 退出函数
   if(nextC == -1){return;}
   //17.4 如果当前列下标c为0
   else if(this.data[r][c] == 0){  
   //17.5 交换c 和nextC值
   var t = this.data[r][c];
   this.data[r][c] = this.data[r][nextC];
   this.data[r][nextC] = t;
   //17.6 c不变
   c--;
   //17.7 如果当前列下标c与nextC值相同
   }else if( this.data[r][c] == this.data[r][nextC]){
    //17.8 合并，合并后值放在c nextC赋值0
    this.data[r][c] = this.data[r][c]*2;
    this.data[r][nextC] = 0;
    //17.9 计算分数 2+2=4 保存到变量 score变量中
    this.score += this.data[r][c];
   }
  }

 },
 //18:向左操作查找第一个不为0元素列下标
 //如果没找到返回-1
 leftNextC:function(r,c){
  //15:28---15:33 练习
  //18.1: 创建变量nextC c+1--3结束
  for(var nextC=c+1;nextC<this.CN;nextC++){
   //18.2: 判断如果nextC元素不为0
   if(this.data[r][nextC]!=0){
      return nextC;
   }
   //18.3: 返回列下标
  }
  //18.4: 循环返回 -1
  return -1;
 },
 //19:向右操作 15:55--16:00
 //16:00--16:15 休息 
 moveRight:function(){
  //19.1 循环四行 0-4
  for(var r=0;r<this.RN;r++){
  //19.2 为每一行进行向右操作
   this.moveRightInRow(r);
  } 
  //##判断
  if(this.isGameOver()){
    this.state = this.GAMEOVER;
  }  
  //19.3 循环结束 
  //19.4 产生一个随机数
  this.randomNum();
  //19.5 依据数组更新网页
  this.updateView();
 },
 //20:
 //向右操作，针对每一行
 moveRightInRow:function(r){
  //16:20--16:35 练习 
  //20.1 创建变量 c     3   ~ 1
  for(var c=this.CN-1;c>0;c--){
   //20.2 创建变量 nextC c-1 ~ 0
   var nextC = this.rightNextC(r,c);
   //20.3 nextC == -1  退出函数
   if(nextC==-1){return;}
   //20.4 当前元素为0
   //16:40--16:45 练习
   else if(this.data[r][c]==0){
    //20.5 交换
    this.data[r][c] = this.data[r][nextC];
    this.data[r][nextC] = 0;
    //20.6 c不变量
    c++;
   }
   //20.7 如果当前值与nextC值相同
   else if(this.data[r][c] == this.data[r][nextC]){
    //20.8 合并
    this.data[r][c] = this.data[r][c]*2;
    //20.9 nextC赋值为0
    this.data[r][nextC] = 0;
    //20.10 计算分数
    this.score += this.data[r][c];
   }

  }
 },
 //21:向右操作查找nextC   16:45--16:50
 rightNextC:function(r,c){
  //21.1 创建变量nextC c-1 ~ 0
  for(var nextC=c-1;nextC>=0;nextC--){
   //21.2 判断如果当前元素不为0
   if(this.data[r][nextC]!=0){
   //21.3 返回nextC
   return nextC;    
   }
   //21.4 循环外
  }
  //21.5 返回-1 
  return -1;
 },
 //22:向上操作一整列
 moveUpInCol:function(c){
  //17:40--17:50
  //22.1 创建变量r      当前行 0~2
  for(var r=0;r<this.CN-1;r++){
  //22.2 创建变量nextR  下一个不为0元素行号 r+1~3
  var nextR = this.moveUpnextR(r,c);
  //22.3 判断nextR等于-1 退出函数
  if(nextR == -1){return;}
  //22.4 判断当前行为0
  else if(this.data[r][c]==0){
   //22.5 交换
   this.data[r][c] = this.data[nextR][c];
   this.data[nextR][c] = 0;
   //22.6 r不变量 
   r--;
  }else if(this.data[r][c] == this.data[nextR][c]){
   //22.7 判断当前行与nextR相同
   this.data[r][c] = this.data[r][c]*2;
   this.data[nextR][c] = 0;
   //22.8 合并
   //22.9 重新计算分数
   this.score += this.data[r][c];
  }
  }

 },
 //23 完成向上操作: 查找 nextR元素下标
 moveUpnextR:function(r,c){
    //23.1 创建nextR r+1 = 3
    for(var nextR=r+1;nextR<this.RN;nextR++){
     //23.2 当前元素不为0
     if(this.data[nextR][c]!=0){
      //23.3 返回nextR
      return nextR;
      }
    }
    //23.4 循环外返回-1
    return -1;
 },
 //24.0 下向一行操作
 moveDownInCol:function(c){
  //24.1 创建变量r     3   ~1
  for(var r=this.RN-1;r>0;r--){
   //24.2 创建变量nextR r-1 ~0
   var nextR = this.moveDownNextR(r,c);
   //24.3 判断如果nextR等于-1停止函数
   if(nextR==-1){return;}
   //24.4 判断当前元素为0
   else if(this.data[r][c]==0){
    //24.5 交换
    this.data[r][c] = this.data[nextR][c];
    this.data[nextR][c] = 0;
    //24.6 r不变
    r++;
    //24.7 判断当前元素与nextR元素相同
    }else if(this.data[r][c] == this.data[nextR][c]){
     //24.8 合并
     this.data[r][c] = this.data[r][c]*2;
     this.data[nextR][c] = 0;
     //24.9 计算分数
     this.score +=  this.data[r][c];
    }
  }
 },
 //25:向下操作查找nextR
 moveDownNextR:function(r,c){
   for(var nextR=r-1;nextR>=0;nextR--){
    if(this.data[nextR][c]!=0){
      return nextR;
    }
   }
   return -1;
 },
 //26:写一个方法判断游戏是否结束
 //结束返回true
 //没有返回false
 //9:40--9:50  练习
 //9:50--10:00 休息
 isGameOver:function(){
  //26.1 创建循环行
  for(var r=0;r<this.RN;r++){
  //26.2 创建循环列
  for(var c=0;c<this.CN;c++){
   //26.3 第一个判断:当前元素是否为0  返回false
   if(this.data[r][c]==0){return false;}
   //26.4 第二个判断:相邻二行是否相同 返回false      
   if(r<this.RN-1&&this.data[r][c]==this.data[r+1][c]){
    return false;
   }
   //26.5 第三个判断:相邻二列是否相同 返回false
   if(c<this.CN-1&&this.data[r][c]==this.data[r][c+1]){
    return false;
   }
  }
  }
  //26.6 循环外 返回true
  return true;
 }
};

window.onload = function(){
	game.start();
}