<?php
 $files = array();
 $path = '/home/emyun2/public_html/images/' . $_GET['query'];
 if(!is_dir($path)){
   header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
   header("Status: 404 Not Found");
   header('Content-type: application/json');
   echo json_encode("No results");
   exit();
 }
 $dir = opendir('/home/emyun2/public_html/images/' . $_GET['query']);
 while ($file = readdir($dir)) {
    if ($file == '.' || $file == '..') {
        continue;
    }

    $files[] = $file;
 }
 header('Content-type: application/json');
 echo json_encode($files);
?>

