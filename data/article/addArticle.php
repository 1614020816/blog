<?php
 require_once('../init.php');
 header('Content-Type: application/json;charset=UTF-8');

 //接收参数
 @$title = $_REQUEST["title"];
 @$content = $_REQUEST["content"];
 @$type1 = $_REQUEST["type1"];
 @$type2 = $_REQUEST["type2"];
 @$des = $_REQUEST["des"];
 @$author = $_REQUEST["author"];
//  var_dump($title,$type,$author,$des);

//添加SQL
$sql = "INSERT INTO article(art_title,art_author,art_type1,art_type2,art_des,art_content) 
 VALUES('$title','$author','$type1','$type2','$des','$content')";
 //查询结果
 $result = mysqli_query($conn,$sql);
 var_dump($sql);
 var_dump($result);
 
 if($result){
	 echo json_encode('{"code": 200, "msg": "添加成功"}');
 }else{
	 echo json_encode('{"code": 201, "msg": "添加失败"}');
 }

?>