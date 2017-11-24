<?php
/**向客户端输出一个内容随机的验证码图片**/
header('Content-Type: image/png');
header('Cache-Control: no-cache');
header('Pragma: no-cache');

$w = 90;
$h = 24;
//在服务器端内存中创建一张图片
$img = imagecreatetruecolor($w, $h);

//为图片绘制背景颜色
$c = imagecolorallocate($img,rand(180,230), rand(180,230), rand(180,230));
imagefilledrectangle($img, 0, 0, $w, $h, $c);


//在图片上绘制随机的文字
$src = 'ABCDEFGHJKLMNPQRSTWXY3456789';
for($i=0; $i<4; $i++){
	$txt = $src[rand(0,strlen($src)-1)];
	$c = imagecolorallocate( $img,rand(80,180), rand(80,180), rand(80,180));
	imagestring($img, rand(10,18), $i*20+10, rand(0,$h-15),$txt, $c);
}


//把图片输出给客户端
imagepng($img);
//从服务器内存中删除该图片
imagedestroy($img);
