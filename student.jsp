<%@ page language="java" contentType="text/html; charset=UTF-8" %>

<html>
<head>
    <title>Student Details</title>
</head>

<body>

<h2>Student Details</h2>

<form method="post">

    Register Number:
    <input type="text" name="regno">
    <br><br>

    Name:
    <input type="text" name="name">
    <br><br>

    Mark 1:
    <input type="text" name="mark1">
    <br><br>

    Mark 2:
    <input type="text" name="mark2">
    <br><br>

    Mark 3:
    <input type="text" name="mark3">
    <br><br>

    <input type="submit" value="Submit">

</form>

<%
    String regno = request.getParameter("regno");
    String name = request.getParameter("name");
    String mark1 = request.getParameter("mark1");
    String mark2 = request.getParameter("mark2");
    String mark3 = request.getParameter("mark3");

    if (regno != null) {
%>

<hr>

<h2>Student Details</h2>

Register Number: <%= regno %>
<br><br>

Name: <%= name %>
<br><br>

Mark 1: <%= mark1 %>
<br><br>

Mark 2: <%= mark2 %>
<br><br>

Mark 3: <%= mark3 %>

<%
    }
%>

</body>
</html>