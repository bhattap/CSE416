<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

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

        <h2 class="form-signin-heading">Follow the link in your email to reset your password.</h2>

    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="${contextPath}/resources/js/bootstrap.min.js"></script>
  </body>
</html>
