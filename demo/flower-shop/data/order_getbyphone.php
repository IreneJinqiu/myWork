<?php

header('Content-Type:application/json');

@$phone = $_REQUEST['phone'];
if(empty($phone))
{
    echo '[]';
    return;
}

$output = [];

$conn = mysqli_connect('127.0.0.1','root','','flower');
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT lv_order.oid,lv_order.user_name,lv_order.order_time,lv_flower.img_sm FROM lv_order ,lv_flower WHERE lv_order.did=lv_flower.did AND lv_order.phone='$phone'";
$result = mysqli_query($conn,$sql);
while(true)
{
    $row = mysqli_fetch_assoc($result);
    if(!$row)
    {
        break;
    }
    $output[] = $row;
}

echo json_encode($output);

?>