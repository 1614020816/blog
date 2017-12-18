<?php
  require_once('../init.php');
  header('Content-Type: application/json;charset=UTF-8');
  //声明一个关联数组
  $output=[
    "recordCount"=>0,
    "pageSize"=>10,
    "pageCount"=>0,
    "pno"=>1,
    "data"=>null
  ];
  //查询留言总数
  $sql = "SELECT COUNT(1) FROM message"; 
  $result = mysqli_query($conn,$sql);
  $count = mysqli_fetch_row($result); 
  //添加到对象数组中
  $output["recordCount"]=$count[0];
  // 计算总页数
  $output["pageCount"]=ceil($output["recordCount"]/$output["pageSize"]);
  //根据页码来查询数据
  $sql = "SELECT msg_id, msg_user, msg_content, msg_date FROM message order by msg_date";


  @$pno = $_REQUEST["pno"];
  if($pno){
      $output["pno"] = $pno || 1;
      $start = $output["pageSize"]*($pno-1);
      $sql = $sql." limit $start, ".$output["pageSize"];
  }
  $result = mysqli_query($conn,$sql);
  $rows = mysqli_fetch_all($result,1);
  $output["data"]=$rows;
  echo json_encode($output);
?>