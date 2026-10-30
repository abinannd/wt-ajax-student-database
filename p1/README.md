# Program 1: Asynchronous AJAX Database Access

Academic Web Technology Laboratory Assignment demonstrating genuine asynchronous communication between a web browser, PHP backend, and MySQL database using vanilla JavaScript `XMLHttpRequest`.

---

## 1. Project Objective

The objective of this application is to implement a responsive student record lookup system that:
1. Accepts a student register number (`regno`).
2. Dispatches an asynchronous HTTP request using traditional `XMLHttpRequest` without reloading the webpage.
3. Queries a MySQL database via PHP using secure prepared statements.
4. Returns a structured JSON response.
5. Dynamically renders the student details (Register Number, Name, Mark 1, Mark 2, Mark 3, Total, and Average) safely into the DOM.
6. Gracefully handles invalid inputs, nonexistent records, and server/database connection errors.

---

## 2. Technologies Used

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6 / standard DOM APIs).
* **Communication Protocol:** Traditional `XMLHttpRequest` (Asynchronous AJAX, JSON data interchange).
* **Backend:** PHP 8.x (procedural `mysqli` with prepared statements).
* **Database:** MySQL / MariaDB (`student_db`).
* **Web Server:** Apache (via XAMPP).

> **Note:** Built strictly using native browser APIs and vanilla PHP/MySQL. No external libraries, jQuery, or frameworks are used.

---

## 3. Folder Structure

```text
p1/
├── index.html       # Clean, accessible student search interface
├── style.css        # Responsive, modern styling for tables, cards & alerts
├── script.js        # Vanilla JS XMLHttpRequest controller & safe DOM renderer
├── db.php           # Secure backend PHP script querying MySQL with prepared statements
├── database.sql     # Database schema and realistic sample records
├── README.md        # Comprehensive documentation and viva preparation guide
└── .gitignore       # Git ignore rules for logs and editor settings
```

---

## 4. Database Setup

### Database Details
* **Database Name:** `student_db`
* **Table Name:** `students`
* **Schema:**
  * `regno` (VARCHAR(20), PRIMARY KEY)
  * `stdname` (VARCHAR(100), NOT NULL)
  * `mark1` (INT, NOT NULL)
  * `mark2` (INT, NOT NULL)
  * `mark3` (INT, NOT NULL)

### Setup Instructions via phpMyAdmin
1. Start **Apache** and **MySQL** from the XAMPP Control Panel.
2. Open your browser and navigate to `http://localhost/phpmyadmin/`.
3. Click on the **Import** tab.
4. Choose the file `C:\BRAIN-STORM\wt\p1\database.sql` and click **Import** (or paste its contents into the **SQL** tab).

### Setup Instructions via MySQL CLI
```bash
mysql -u root -p < "C:\BRAIN-STORM\wt\p1\database.sql"
```

---

## 5. XAMPP Apache Configuration

The project is hosted from `C:\BRAIN-STORM\wt\p1` and mapped to Apache via an Alias in `C:\xampp\apache\conf\httpd.conf`:

```apache
Alias /WT_AJAX "C:/BRAIN-STORM/wt/p1"

<Directory "C:/BRAIN-STORM/wt/p1">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

### Application URL
Open any web browser and visit:
```
http://localhost/WT_AJAX/
```

### Default Database Credentials (in `db.php`)
* **Host:** `localhost`
* **Username:** `root`
* **Password:** `""` (empty by default in XAMPP)
* **Database:** `student_db`

---

## 6. How AJAX Works in this Application

```
+-------------------------------------------------------------------+
|                            Web Browser                            |
|                                                                   |
|  1. User enters '101' & clicks Search                             |
|  2. searchForm submit listener catches event (e.preventDefault())  |
|  3. var xhr = new XMLHttpRequest();                               |
|  4. xhr.open("GET", "db.php?regno=101", true);                    |
|  5. xhr.send(null);                                               |
+---------------------------------+---------------------------------+
                                  |
                   HTTP GET Request (Asynchronous)
                                  v
+-------------------------------------------------------------------+
|                        Apache / PHP (db.php)                      |
|                                                                   |
|  6. Receives $_GET['regno'] and validates                         |
|  7. Executes prepared statement: SELECT ... WHERE regno = ?       |
|  8. Fetches row from MySQL (student_db)                           |
|  9. Returns JSON: { "success": true, "student": { ... } }         |
+---------------------------------+---------------------------------+
                                  |
                     HTTP 200 JSON Response
                                  v
+-------------------------------------------------------------------+
|                            Web Browser                            |
|                                                                   |
| 10. xhr.onreadystatechange fires until readyState === 4           |
| 11. Status 200 verified; JSON.parse(xhr.responseText) executed    |
| 12. DOM updated safely via textContent (Page NEVER reloaded!)      |
+-------------------------------------------------------------------+
```

---

## 7. Sample Test Register Numbers

| Register Number | Expected Student Name | Mark 1 | Mark 2 | Mark 3 | Expected Result |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `101` | Abi Nandhan | 85 | 90 | 88 | Record found & rendered |
| `102` | Rahul Kumar | 78 | 82 | 80 | Record found & rendered |
| `103` | Arun Prasad | 90 | 95 | 92 | Record found & rendered |
| `104` | Priya Sharma | 92 | 89 | 94 | Record found & rendered |
| `105` | Sneha Patel | 74 | 88 | 81 | Record found & rendered |
| `999` | *(Nonexistent)* | - | - | - | "Student not found" message |
| ` ` *(Empty)* | - | - | - | - | Validation error: "Please enter a valid Register Number" |

---

## 8. Lab Viva Preparation Guide

### Q1. What is AJAX and why is it used?
**Answer:** AJAX stands for **Asynchronous JavaScript and XML**. It enables web pages to update content asynchronously by exchanging data with a web server behind the scenes. This means a portion of the web page can be updated dynamically without reloading the entire page, providing a fast and desktop-like user experience.

### Q2. What is `XMLHttpRequest`?
**Answer:** `XMLHttpRequest` (XHR) is a built-in browser JavaScript object used to interact with servers. It can retrieve data from a URL without requiring a full page refresh. Despite having "XML" in its name, it can transfer any type of data, most commonly JSON, HTML, or plain text.

### Q3. What is the difference between Synchronous and Asynchronous requests?
* **Synchronous (`async = false`):** The browser halts and freezes JavaScript execution until the server finishes processing and returns the response. The UI becomes completely unresponsive.
* **Asynchronous (`async = true`):** The browser sends the HTTP request in the background and immediately continues executing other JavaScript code. When the server response eventually arrives, an event handler (`onreadystatechange` or `onload`) is triggered to handle the response.

### Q4. What do the 5 values of `readyState` represent?
The `xhr.readyState` property returns the current state of an `XMLHttpRequest` client:
* **`0 (UNSENT)`:** Client has been created; `open()` has not been called yet.
* **`1 (OPENED)`:** `open()` has been called; request is configured.
* **`2 (HEADERS_RECEIVED)`:** `send()` has been called, and headers and status are available.
* **`3 (LOADING)`:** Downloading response body; `responseText` holds partial data.
* **`4 (DONE)`:** The data transfer operation is completely finished.

### Q5. Why do we check both `readyState === 4` and `status === 200`?
* `readyState === 4` only tells us that the communication cycle with the server is **complete**. It does *not* indicate whether the request succeeded or failed.
* `status === 200` verifies the HTTP response status code is **OK** (successful). If the server returns a 404 (Not Found) or 500 (Internal Server Error), `readyState` will still be 4, but `status` will reflect the error.

### Q6. Why are Prepared Statements essential in PHP?
**Answer:** Prepared statements separate the SQL query logic from user-supplied data:
1. The SQL query structure is pre-compiled on the database engine with placeholders (`?`).
2. Parameters are bound separately using `mysqli_stmt_bind_param()`.
3. Even if user input contains malicious SQL fragments (e.g. `' OR '1'='1`), the database engine treats it strictly as a literal scalar value, preventing **SQL Injection (SQLi)** attacks.

### Q7. Why should server data never be inserted directly into `innerHTML`?
**Answer:** Injecting unescaped or untrusted server responses directly into `innerHTML` leaves the application vulnerable to **Cross-Site Scripting (XSS)**. Malicious scripts returned from a compromised server or database could execute within the user's browser. Using `element.textContent` or explicit DOM node construction ensures characters like `<` and `>` are treated as plain text strings rather than executable HTML tags.

