<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Fib</title>
</head>

<body>

<h1>Fibonacci sequence</h1>

<form:form method="post" action="showfib.html" modelAttribute="fibonnacci">
    <form:label path="number">Number</form:label>
    <form:input path="number" />
    <br>
    <input type="submit" value="Show sequence"/>
</form:form>
<br>
${message}
</body>
</html>
