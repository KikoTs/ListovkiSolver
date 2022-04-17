<?php
header('Content-type: application/json');
$json = file_get_contents('php://input');
$json_decode = json_decode($json, true); 
$data = $json_decode['questions'];
// echo $data;
$url =  "https://avtoizpit.com/api/test-sets/". $json_decode['id']."/assessment";

function getListovka(){
    $curl = curl_init($GLOBALS['url']);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($GLOBALS['data']));
    
    // execute!
    $response = curl_exec($curl);
    echo($response);
    // close the connection, release resources used
    curl_close($curl);
    
    // do anything you want with your response
    return json_decode($response, true);
}
getListovka();
?>