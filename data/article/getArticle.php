<?php
 require_once('../init.php');
 header('Content-Type: application/json;charset=UTF-8');
//  声明数组返回值
 $output=[
	"recordCount"=>0,
	"pageSize"=>8,
	"pageCount"=>0,
	"pno"=>1,
	"data"=>null
];
//查询文章总数

//接收参数
 @$type1 = $_REQUEST['type1'];		//文章一级分类
 @$type2 = $_REQUEST['type2'];		//文章二级分类
 @$art_id = $_REQUEST['art_id'];

 $sql_count = "SELECT COUNT(1) 
 							 FROM article art
								WHERE 1 = 1"; 
	//按照分配查询文章总数
	// if($type1 != 'null' && $type1 != ''){
	// 	$sql .= " AND art.art_type1 = '$type1'";
	// 	$sql_count .= " AND art.art_type1 = '$type1'";
	// }
	// if($type2 != 'null' && $type2 != ''){
	// 	$sql .= " AND art.art_type2 = '$type2'";
	// 	$sql_count .= " AND art.art_type2 = '$type2'";
	// }


 $sql = " SELECT art.art_id 
 							, art.art_title 
							, art.art_author 
							, art.art_type1 
							, def.art_type1_des AS art_type1Desc
							, def.art_type2_des AS art_type2Desc
							, art.art_type2 
							, art.art_hits 
							, art.art_pubtime 
							, art.art_des 
							, art.art_content 
					FROM article art 
						LEFT JOIN art_type_def def ON def.art_type1=art.art_type1 AND def.art_type2=art.art_type2 
					WHERE 1 = 1";
	// echo $sql;
	
 if($type1 != 'null' && $type1 != ''){
	$sql .= " AND art.art_type1 = '$type1'";
	$sql_count .= " AND art.art_type1 = '$type1'";
 }
 if($type2 != 'null' && $type2 != ''){
	$sql .= " AND art.art_type2 = '$type2'";
	$sql_count .= " AND art.art_type2 = '$type2'";
 }
 if($art_id){
	$sql .= " AND art.art_id = '$art_id'";
 }
// var_dump($sql);
// var_dump($sql_count);
 $result = mysqli_query($conn,$sql_count);
 $count = mysqli_fetch_row($result); 
 //添加到对象数组中
 $output["recordCount"]=$count[0];
 // 计算总页数
 $output["pageCount"]=ceil($output["recordCount"]/$output["pageSize"]);

  //按时间排序
	$sql .= " ORDER BY art.art_pubtime DESC ";
	//查询结果
	// var_dump($sql);
	@$pno = $_REQUEST["pno"];
  if($pno){
      $output["pno"] = $pno;
      $start = $output["pageSize"]*($pno-1);
      $sql = $sql." limit $start, ".$output["pageSize"];
	}
	
	$result = mysqli_query($conn,$sql);
	// var_dump($result);
	$rows = mysqli_fetch_all($result,1);
	// var_dump($rows);
	$output['data'] = $rows;
	echo json_encode($output);
?>