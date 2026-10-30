CREATE DATABASE student_db;

USE student_db;

CREATE TABLE students (
    regno VARCHAR(20) PRIMARY KEY,
    stdname VARCHAR(100),
    mark1 INT,
    mark2 INT,
    mark3 INT
);

INSERT INTO students VALUES
('101', 'Abi', 85, 90, 88),
('102', 'Rahul', 78, 82, 80),
('103', 'Arun', 90, 95, 92);