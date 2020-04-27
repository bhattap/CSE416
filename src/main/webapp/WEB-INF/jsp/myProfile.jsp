<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<link href="css/myProfile.css" rel="stylesheet">

<!DOCTYPE html>
<html>
   <head>
        <title>Profile</title>
        <!--Made with love by Mutiullah Samim -->
        
         <!--Bootsrap 4 CDN-->
         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
         
         <!--Fontawesome CDN-->
         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
     
         <!--Custom styles-->
         <link rel="stylesheet" type="text/css" href="styles.css">
         <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
<body>

    <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
        <div class="container">
            <a class="navbar-brand" href="/home">Level Builder</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                </ul>
            </div>
        </div>
    </nav>

    <div class="sidenav">

        <a href="/home">Workspace</a>
        <a href="/my-profile">Profile</a>
        <a href="/my-projects">My Projects</a>
        <a href="/logout">Logout</a>

    </div>

  <div class="main">
    <div class="container">
            <div class="card">
                <form:form modelAttribute="user" >
                    <h1>Welcome ${user.name}!</h1>
                    <p class="title">Profile details</p>
                    <p>
                        <div class=" col-md-9 col-lg-9 "> 
                            <table class="table table-user-information">
                              <tbody>
                                <tr>

                                  <td>Name: </td>
                                  <td>${user.name}</td>
                                </tr>
                                <tr>
                                  <td>Username:</td>
                                  <td>${user.username}</td>
                                </tr>
                                <tr>
                                  <td>Email: </td>
                                  <td>${user.email}</td>
                                </tr>
                                <tr>
                                  <td>Date of Birth:</td>
                                  <td>${user.birthdate}</td>
                                </tr>
                                  <td>Phone Number:</td>
                                  <td>${user.phonenumber}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                    </p>
                </form:form>
            </div>

    </div>
  </div>
<script>

</script>
</body>
</html>
