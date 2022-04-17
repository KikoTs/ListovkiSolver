<?php 
function getIzpit($id){
    $data =  array('subCategoryId' => 3,
               'languageId' => 1);
    $curl = curl_init('https://avtoizpit.com/api/test-sets/' . $id);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json', "Connection: close"));
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
    // curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($curl, CURLOPT_VERBOSE, true);
    // execute!
    $response = curl_exec($curl);
    echo($response);
    // close the connection, release resources used
    curl_close($curl);
    
    // do anything you want with your response
    return json_decode($response, true);
}
if(isset($_GET['id'])){
    getIzpit($_GET['id']);
}else{
    echo 'Plase Provide ID';
}
?>