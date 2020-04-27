<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Forgot Password?</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/share.css" rel="stylesheet">
</head>

<body>

<div class="container">

    <h2 align="center">Your project has been successfully shared!</h2>

    <div>
        <h3 align="center"> <a href="/my-projects">Back to Projects</a> </h3>
    </div>

</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="${contextPath}/resources/js/bootstrap.min.js"></script>
</body>
</html>
