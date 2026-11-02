<?php

// Return structured JSON response with proper character encoding
if (!headers_sent()) {
    header('Content-Type: application/json; charset=UTF-8');
}

// Disable internal warning output so that valid JSON structure is always preserved
error_reporting(0);
mysqli_report(MYSQLI_REPORT_OFF);

// Database configuration (Default XAMPP settings)
$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "student_db";

// Validate input parameter: regno
if (!isset($_GET['regno']) || trim($_GET['regno']) === '') {
    echo json_encode([
        'success' => false,
        'message' => 'Please provide a valid Register Number.'
    ]);
    exit;
}

$regno = trim($_GET['regno']);

// Establish connection to MySQL database using mysqli
$conn = @mysqli_connect($db_host, $db_user, $db_pass, $db_name);

// Handle connection failure gracefully
if (!$conn) {
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed. Please ensure MySQL is running in XAMPP.'
    ]);
    exit;
}

// Set connection charset to utf8mb4
mysqli_set_charset($conn, "utf8mb4");

// Prepare SQL query using prepared statement to prevent SQL injection
$sql = "SELECT regno, stdname, mark1, mark2, mark3 FROM students WHERE regno = ?";
$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to prepare database query.'
    ]);
    mysqli_close($conn);
    exit;
}

// Bind the register number parameter (s = string)
mysqli_stmt_bind_param($stmt, "s", $regno);

// Execute prepared query
mysqli_stmt_execute($stmt);

// Fetch query result
$result = mysqli_stmt_get_result($stmt);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);

    // Return student record formatted as JSON
    echo json_encode([
        'success' => true,
        'student' => [
            'regno'   => (string)$row['regno'],
            'stdname' => (string)$row['stdname'],
            'mark1'   => (int)$row['mark1'],
            'mark2'   => (int)$row['mark2'],
            'mark3'   => (int)$row['mark3']
        ]
    ]);
} else {
    // Record not found
    echo json_encode([
        'success' => false,
        'message' => 'Student not found'
    ]);
}

// Clean up statement and connection resources
mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
