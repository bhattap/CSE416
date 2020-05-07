<%--References I used:
 - Bootstrap template info below
 - This is the only page using JSTL (for a for loop): https://stackoverflow.com/questions/15839335/using-for-loop-inside-of-a-jsp
 - https://hellokoding.com/registration-and-login-example-with-spring-security-spring-boot-spring-data-jpa-hsql-jsp/
--%>

<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<link href="css/myProjects.css" rel="stylesheet">

<!DOCTYPE html>
<html>
   <head>
        <title>My Tilesets</title>
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
                    <!-- <ul class="navbar-nav ml-auto">
                      <li class="nav-item">
                        <a class="nav-link" href="register.html">Sign Up</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="logIn.html">Log In</a>
                      </li>
                    </ul> -->
                  </div>
                </div>
              </nav>

    <div class="sidenav">
        <a href="/home">Workspace</a>
        <a href="/my-profile">Profile</a>
        <a href="/my-projects">My Projects</a>
        <a href="/my-tilesets">My Tilesets</a>
        <a href="/logout">Logout</a>
    </div>

  <div class="main">
      <h2 align="center">Owned By Me</h2>
    <div class="container">
      <div class="row">
          <jsp:useBean id="userTilesets" scope="request" type="java.util.List"/>
          <c:forEach items="${userTilesets}" var="tileset">
            <div class="col-md-3">
              <!-- <div class="card mb-4"> -->
                <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
                xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false"
                role="img" aria-label="Placeholder: Thumbnail"><title>${tileset.name}</title>
                <rect width="90%" height="100%" fill="#fa9898"/>
                <!-- <img src="http://www.mirchu.net/wp-content/uploads/2014/10/how-to-use-font-awesome-icons-250x210.jpg" class="img-circle" alt="image" /> -->
            </svg>

                <div class="card-body">
                        <p class="card-text">Name: ${tileset.name}</p>

                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary"><a href="">Download</a></button>
                        <button type="button" class="btn btn-sm btn-outline-secondary"><a href="/share-tileset?tilesetId=${tileset.id}">Share</a></button>
                    </div>
<%--                    <small class="text-muted">9 mins</small>--%>
                  </div>
                </div>

              <!-- </div> -->
            </div>
          </c:forEach>
      </div>
    </div>
      <br>
      <h2 align="center">Shared With Me</h2>

      <div class="container">
          <div class="row">
              <jsp:useBean id="sharedTilesets" scope="request" type="java.util.List"/>
              <c:forEach items="${sharedTilesets}" var="tileset">
                  <div class="col-md-3">
                      <!-- <div class="card mb-4"> -->
                      <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
                           xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false"
                           role="img" aria-label="Placeholder: Thumbnail"><title>${tileset.name}</title>
                          <rect width="90%" height="100%" fill="#fa9898"/>
                          <!-- <img src="http://www.mirchu.net/wp-content/uploads/2014/10/how-to-use-font-awesome-icons-250x210.jpg" class="img-circle" alt="image" /> -->
                      </svg>

                      <div class="card-body">
                          <p class="card-text">Name: ${tileset.name} <br> Owned By: ${tileset.ownedBy}</p>

                          <div class="d-flex justify-content-between align-items-center">
                              <div class="btn-group">
                                  <button type="button" class="btn btn-sm btn-outline-secondary"><a href="">Download</a></button>
                                  <button type="button" class="btn btn-sm btn-outline-secondary"><a href="/share-tileset?tilesetId=${tileset.id}">Share</a></button>
                              </div>
                                  <%--                    <small class="text-muted">9 mins</small>--%>
                          </div>
                      </div>

                      <!-- </div> -->
                  </div>
              </c:forEach>
          </div>
      </div>

  </div>
</body>
</html>
