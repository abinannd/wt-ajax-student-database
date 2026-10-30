-- =====================================================================
-- Database: student_db
-- Program 1: Asynchronous AJAX Database Access
-- =====================================================================

-- Step 1: Create Database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

-- Step 2: Create Table 'students'
CREATE TABLE IF NOT EXISTS students (
    regno VARCHAR(20) NOT NULL PRIMARY KEY,
    stdname VARCHAR(100) NOT NULL,
    mark1 INT NOT NULL,
    mark2 INT NOT NULL,
    mark3 INT NOT NULL
);

-- Step 3: Insert Realistic Sample Student Records
INSERT INTO students (regno, stdname, mark1, mark2, mark3) VALUES
('101', 'Abi Nandhan', 85, 90, 88),
('102', 'Rahul Kumar', 78, 82, 80),
('103', 'Arun Prasad', 90, 95, 92),
('104', 'Priya Sharma', 92, 89, 94),
('105', 'Sneha Patel', 74, 88, 81)
ON DUPLICATE KEY UPDATE
    stdname = VALUES(stdname),
    mark1 = VALUES(mark1),
    mark2 = VALUES(mark2),
    mark3 = VALUES(mark3);
