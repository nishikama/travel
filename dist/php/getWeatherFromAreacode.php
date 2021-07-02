<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

$city = filter_input(INPUT_GET, 'city') ?? '';
$url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=' . $city;

$strJson = file_get_contents($url);

echo $strJson;
exit();
