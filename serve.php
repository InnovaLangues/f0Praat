<?php

// need to create .praat-dir @ root of file system and chown www-data:www-data .praat-dir in order to the script to work


	$file = $_GET['file'];
	
	$command = 'praat script_test.praat ' . $file;
	$output = shell_exec($command);

	$list = explode(';', $output);
	$response = [];

	foreach ($list as $value){
		$str = trim($value);
		$tmp = explode(':', $str);
		$item = ['time' => floatval($tmp[0]), 'frequency' => $tmp[1] == "0" ? null : floatval($tmp[1])];
                
                //$item = ['frequency' => $tmp[1] == "0" ? 0 : floatval($tmp[1])];
		
		array_push($response, $item);    
	}
        
        //print_r($response);die;

	echo json_encode($response);
