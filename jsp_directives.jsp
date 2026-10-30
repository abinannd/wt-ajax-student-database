<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>

<html>
<head>
    <title>JSP Directives and Custom Tags</title>
</head>
<body>

```
<h2>JSP Directives and Custom Tags</h2>

<%-- Declaration --%>
<%!
    int square(int n) {
        return n * n;
    }
%>

<%-- Scriptlet --%>
<%
    String name = "Abi";
    int number = 5;
%>

<h3>1. JSP Directive</h3>
<p>Page directive is used to define page settings.</p>

<h3>2. JSP Declaration</h3>
<p>Square of 5: <%= square(number) %></p>

<h3>3. JSP Scriptlet</h3>
<p>Student Name: <%= name %></p>

<h3>4. JSP Expression</h3>
<p>Current Date: <%= new java.util.Date() %></p>

<h3>5. Custom Tags (JSTL)</h3>

<c:set var="mark" value="85"/>

<p>Student Mark: <c:out value="${mark}"/></p>

<c:if test="${mark >= 50}">
    <p>Result: Pass</p>
</c:if>
```

</body>
</html>
