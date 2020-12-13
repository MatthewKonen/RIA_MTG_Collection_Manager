<?php

$servername = "database-1.czsdb4e1dg18.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "awspassword";
$dbname = "database1";
//Establish connection to database
$conn = mysqli_connect($servername, $username, $password, $dbname);
//If error, exit
if (mysqli_connect_errno()) {
    echo "Connection Failed";
    exit();
}

$sql = "select * from collection;";
//result of command
$result = mysqli_query($conn, $sql);
//if there are results, output string of results divided by |
if (mysqli_num_rows($result) > 0) {
    $rows = mysqli_fetch_assoc($result);
    while($row = mysqli_fetch_assoc($result)) {
      echo $row["tableid"]."|".$row["cardName"]."|".$row["cardImage"]."|";
    } 
} else {
    echo "0 results";
}

?>