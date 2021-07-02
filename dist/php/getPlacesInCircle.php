<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

$lng = filter_input(INPUT_GET, 'lng') ?? '139.7649361';
$lat = filter_input(INPUT_GET, 'lat') ?? '35.6812405';
$searchRadius = filter_input(INPUT_GET, 'searchRadius') ?? '0.1';
$range = filter_input(INPUT_GET, 'range') ?? '1';

//$url = 'http://jws.jalan.net/APIAdvance/HotelSearch/V1/?order=4&xml_ptn=0&pict_size=4&key=cyg16a75d42d44&x='.$x.'&y='.$y.'&range='.$range;
$getHotelsUrl = 'https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?applicationId=1032222392476119124&latitude=' . $lat . '&longitude=' . $lng . '&searchRadius=' . $searchRadius . '&datumType=1';
$getShopsUrl = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=97e853c51579c82b&lat=' . $lat . '&lng=' . $lng . '&range=' . $range . '&format=json&count=100';

$getHotelsJson = file_get_contents($getHotelsUrl) ? (array) json_decode('{"hotels":' . file_get_contents($getHotelsUrl) . '}') : [];
$getShopsJson = file_get_contents($getShopsUrl) ? (array) json_decode('{"shops":' . file_get_contents($getShopsUrl) . '}') : [];

$strJson = array_merge($getHotelsJson, $getShopsJson);

echo '{ "places": ' . json_encode($strJson) . ' }';
exit();
