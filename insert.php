<?php

$servername = "database-1.czsdb4e1dg18.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "awspassword";
$dbname = "database1";
//Retrieve variables from query string
$cardId = $_REQUEST["cardid"];
$cardImage = $_REQUEST["cardImage"];
$cardName = $_REQUEST["cardName"];
//Establish connection to database
$conn = mysqli_connect($servername, $username, $password, $dbname);
//If error, exit
if (mysqli_connect_errno()) {
    echo "Connection Failed";
    exit();
}

$sql = "insert into collection (cardid, cardImage, cardName) values (".$cardId.", '".$cardImage."', '".$cardName."');";

//Execute command
//If success, echo card name added.
//Else echo command + error
if (mysqli_query($conn, $sql)) {
    echo $cardName." added";
} else {
    echo "Error: ".$sql."<br>".mysqli_error($conn);
}

?>