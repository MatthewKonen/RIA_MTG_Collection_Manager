<?php

$servername = "database-1.czsdb4e1dg18.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "awspassword";
$dbname = "database1";
//Retrieve variable from query string
$tableid = $_REQUEST["tableid"];
//Establish connection to database
$conn = mysqli_connect($servername, $username, $password, $dbname);
//If error, exit
if (mysqli_connect_errno()) {
    echo "Connection Failed";
    exit();
}
$sql = "delete from collection where tableid = ".$tableid.";";

//Execute command
//If success, echo table id removed
//Else echo command + error
if (mysqli_query($conn, $sql)) {
    echo "Card with table id ".$tableid." Removed";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

?>