<?php

// need to create .praat-dir @ root of file system and chown www-data:www-data .praat-dir in order to the script to work
$file = $_GET['file'];

$command = 'praat extractF0.praat ' . $file;

$output = shell_exec($command);

$list = explode(';', $output);
$response = [];

foreach ($list as $value) {
    $str = trim($value);
    $tmp = explode(':', $str);
    
    $time = isset($tmp[0]) ? floatval($tmp[0]) : null;
    $frequency = isset($tmp[1]) && $tmp[1] != "0" ? floatval($tmp[1]) : null;
    
    $item = ['time' => $time, 'frequency' => $frequency];
    array_push($response, $item);
}
echo json_encode($response);
