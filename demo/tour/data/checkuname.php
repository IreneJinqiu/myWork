<?php 
	//接收客户端提交的uname
	$uname=$_REQUEST['zname'];
	//链接到数据库服务器 端口号默认3306 密码''没有空格
	$conn=mysqli_connect('127.0.0.1','root','','vipUser');
	//提交SQL命令
	$sql="SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql="";
	$sql="SELECT * FROM user WHERE uname='$uname'";
	//echo $sql;
	$result=mysqli_query($conn,$sql);
	//查看执行结果
	//echo mysqli_query($conn,$sql);
	//抓取一行 关联数组
	$row=mysqli_fetch_assoc($result);
	if($row){
		echo "用户已存在，请直接登录！";
	}else{
		echo "用户不存在，请注册！";
	}
?>