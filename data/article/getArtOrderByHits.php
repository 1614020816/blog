<?php
  //添加留言到数据库中
  require_once('../init.php');
  header('Content-Type: application/json;charset=UTF-8');
  $output=[
		"rankList"=>null,
		"recommendList"=>null
	];
  //添加SQL
  $sql = "SELECT art.art_id 
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
					ORDER BY art.art_hits DESC LIMIT 7";
  //查询结果
  $result = mysqli_query($conn,$sql);
	$output['rankList'] = mysqli_fetch_all($result, 1);
	$sql_recommend_TEC = "SELECT art.art_id 
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
												WHERE art.art_type1='1' 
												ORDER BY art.art_hits DESC 
												LIMIT 1 ";
	$result = mysqli_query($conn,$sql_recommend_TEC);
	$output['recommendList'][0] = mysqli_fetch_all($result, 1);
	$sql_recommend_NOTE = "SELECT art.art_id 
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
												WHERE art.art_type1='2' 
												ORDER BY art.art_hits DESC 
												LIMIT 1 ";
$result = mysqli_query($conn,$sql_recommend_NOTE);
$output['recommendList'][1] = mysqli_fetch_all($result, 1);
	// var_dump(json_encode($output['recommendList']));
  echo json_encode($output);
?>