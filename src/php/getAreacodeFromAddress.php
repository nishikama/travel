<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

$url = '../json/areacode.json';

$strJson = file_get_contents($url);

echo $strJson;
exit();
