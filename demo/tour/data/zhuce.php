<?php
header('Content-Type: text/plain');
$uname = $_REQUEST['zname'];
$upwd = $_REQUEST['zpwd'];
$conn = mysqli_connect('127.0.0.1','root','','vipUser');
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "INSERT INTO user VALUES(NULL,'$uname','$upwd')";
$result = mysqli_query($conn,$sql);
if($result){	
	//执行成功
	//获取$conn上刚执行的INSERT语句生成的自增ID号
	$id=mysqli_insert_id($conn);
	echo '注册成功！欢迎成为我们第'.$id.'位会员！';
}else {		
	//执行失败
	echo '注册失败';
}
?>