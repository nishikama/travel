<?php

$lines = @file('code.csv');
$json = '[';
foreach ($lines as $line) {
    $columns = explode(',', $line);
    $json .= '{"city": "'.$columns[1].'", "code": "'.preg_replace('/[0-9]$/', '0', $columns[2]).'"}, ';
}
$json = rtrim($json, ', ');
$json .= ']';
header('Content-Type: application/json; charset=utf-8');
echo $json;