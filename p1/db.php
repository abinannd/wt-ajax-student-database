<?php

$conn = mysqli_connect("localhost", "root", "", "database");

if (!$conn) {
    die("Database connection failed");
}

$regno = $_GET['regno'];

$sql = "SELECT * FROM students WHERE regno = ?";

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "s", $regno);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {

    $row = mysqli_fetch_assoc($result);

    echo "<h3>Student Details</h3>";

    echo "Register Number: " . htmlspecialchars($row['regno']) . "<br><br>";

    echo "Student Name: " . htmlspecialchars($row['stdname']) . "<br><br>";

    echo "Mark 1: " . $row['mark1'] . "<br><br>";

    echo "Mark 2: " . $row['mark2'] . "<br><br>";

    echo "Mark 3: " . $row['mark3'];

} else {

    echo "Student Not Found";

}

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>