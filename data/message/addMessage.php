<?php
  //添加留言到数据库中
  require_once('../init.php');
  header('Content-Type: application/json;charset=UTF-8');
  //接收参数
  @$name = $_REQUEST["name"];
  @$content = $_REQUEST["content"];
  @$email = $_REQUEST["email"];
  @$url = $_REQUEST["userurl"];
  //添加SQL
  $sql = "INSERT INTO message(msg_user,msg_content,msg_date,user_email,user_url) 
  VALUES('$name','$content',now(),'$email','$url')";
  //查询结果
  $result = mysqli_query($conn,$sql);
  var_dump($result);
  if($result){
    echo json_encode('{"code": 200, "msg": "添加成功"}');
  }else{
    echo json_encode('{"code": 201, "msg": "添加失败"}');
  }
  
?>