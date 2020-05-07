<%--References I used:
 - https://hellokoding.com/registration-and-login-example-with-spring-security-spring-boot-spring-data-jpa-hsql-jsp/
--%>

<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Forgot Password?</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/forgotPassword.css" rel="stylesheet">
</head>

<body>

<div class="container">

    <form:form method="POST" modelAttribute="resetForm" class="form-signin">
        <h2 class="form-signin-heading" align="center">Forgot Password?</h2>

        <spring:bind path="email">
            <div class="form-group ${status.error ? 'has-error' : ''}">
                <form:input type="email" path="email" class="form-control" placeholder="Email"></form:input>
                <form:errors path="email"></form:errors>
            </div>
        </spring:bind>

        <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>

        <div>
            <h3 align="center"> <a href="/login">Back to Login</a> </h3>
        </div>
    </form:form>

</div>

</body>
</html>
