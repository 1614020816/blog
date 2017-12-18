<?php
	require_once('../init.php');
	header('Content-Type: application/json;charset=UTF-8');
	$output=[
		"type1"=>null,
		"type2"=>null
	];
	$sql = 'SELECT distinct art_type1,art_type1_des FROM `art_type_def`';
	$result = mysqli_query($conn,$sql);
	$output["type1"]=mysqli_fetch_all($result,1);
	$sql = 'SELECT DISTINCT art_type1,art_type1_des,art_type2,art_type2_des FROM `art_type_def`';
	$result = mysqli_query($conn,$sql);
	$output["type2"]=mysqli_fetch_all($result,1);
	echo json_encode($output);
?>