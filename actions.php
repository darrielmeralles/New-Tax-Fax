<?php 
// Init Everything
require('taxfax.php');

// Catch Payload Object from Ajax
$payload = @file_get_contents("php://input");
$data = json_decode($payload);

if(gettype($data) !== 'object') die(json_encode(["status"=>false,"response"=>"Data is not an object"]));

switch ($data->action) {
    case 'Get Tax Fax':
        print_r(json_encode(getTaxFax($data)));
    break;

    default:
        die(json_encode(["status"=>false,"response"=>"Method Not Allowed - ".$data->action." not found"])); 
}
?>