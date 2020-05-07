<%--References I used:
 - https://hellokoding.com/registration-and-login-example-with-spring-security-spring-boot-spring-data-jpa-hsql-jsp/
--%>


<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Share Map</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/share.css" rel="stylesheet">
</head>

<body>

<div class="container">

    <h2 class="form-signin-heading" align="center">Share Map Using Email or Username</h2>
    <form:form method="POST" modelAttribute="userToShareWith" class="form-signin">
        <spring:bind path="email">
            <div class="form-group ${status.error ? 'has-error' : ''}">
                <form:input type="email" path="email" class="form-control" placeholder="Email"></form:input>
                <form:errors path="email"></form:errors>
            </div>
        </spring:bind>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Share</button>
        <br><hr><br>
        <spring:bind path="username">
            <div class="form-group ${status.error ? 'has-error' : ''}">
                <form:input type="text" path="username" class="form-control" placeholder="Username"></form:input>
                <form:errors path="username"></form:errors>
            </div>
        </spring:bind>

        <button class="btn btn-lg btn-primary btn-block" type="submit">Share</button>

        <div>
            <h3 align="center"> <a href="/my-projects">Back to Projects</a> </h3>
        </div>
    </form:form>

</div>

</body>
</html>
