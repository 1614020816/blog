<?php
header("Access-Control-Allow-Origin: *");
//header('Access-Control-Allow-Origin:http://localhost');

header('Access-Control-Allow-Credentials:true');
  $db_host = '39.108.187.242';
  $db_user = 'root';
  $db_password = 'root';
  $db_database = 'BLOG';
  $db_port = 3306;
  $db_charset = 'UTF8';
  $conn = mysqli_connect($db_host, $db_user, $db_password, $db_database, $db_port);
  mysqli_query($conn, "SET NAMES $db_charset");