<?php
 require_once('../init.php');
 header('Content-Type: application/json;charset=UTF-8');
 @$id = $_REQUEST['id'];	
 $sql = " UPDATE article SET art_hits = art_hits + 1 WHERE art_id = $id ";
 mysqli_query($conn,$sql);
?>