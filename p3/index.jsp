<%@ page language="java"
         contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>

<%@ include file="header.jsp" %>

<%@ taglib prefix="my" tagdir="/WEB-INF/tags" %>

<!DOCTYPE html>
<html>
<head>
    <title>JSP Directives and Custom Tags</title>

    <style>
        body {
            font-family: Arial;
            background: #f4f4f4;
            padding: 30px;
        }

        .container {
            background: white;
            padding: 25px;
            max-width: 600px;
            margin: auto;
            border-radius: 10px;
            box-shadow: 0 2px 10px #ccc;
        }

        h2 {
            color: crimson;
        }
    </style>
</head>

<body>

<div class="container">

    <h2>JSP Directives and Custom Tags</h2>

    <h3>1. Page Directive</h3>
    <p>Used to define page settings such as language and content type.</p>

    <h3>2. Include Directive</h3>
    <p>The header.jsp file is included in this page.</p>

    <h3>3. JSP Declaration</h3>

    <%!
        int square(int n) {
            return n * n;
        }
    %>

    <p>Square of 5: <%= square(5) %></p>

    <h3>4. JSP Scriptlet</h3>

    <%
        String name = "Abi";
        int mark = 85;
    %>

    <p>Student Name: <%= name %></p>

    <h3>5. JSP Expression</h3>

    <p>Student Mark: <%= mark %></p>

    <h3>6. Custom Tag</h3>

    <my:student name="Abi" regno="101" mark="85"/>

</div>

</body>
</html>