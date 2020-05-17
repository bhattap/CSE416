<%--References I used:
 - Bootstrap template info below
 --%>

<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<link href="css/myProfile.css" rel="stylesheet">

<!DOCTYPE html>
<html>
<head>
    <title>Profile</title>
    <!--Made with love by Mutiullah Samim -->

    <!--Bootsrap 4 CDN-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <!--Fontawesome CDN-->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
          integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

    <!--Custom styles-->
    <link rel="stylesheet" type="text/css" href="styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
    <div class="container">
        <a class="navbar-brand" href="/home">Level Builder</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
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
    <a href="/my-tilesets">My Tilesets</a>
    <a href="/logout">Logout</a>
</div>

<div class="main">
    <div class="container">
        <div class="card">
            <form:form modelAttribute="user" onsubmit="logoutAlert()">
                <h1>Welcome ${user.name}!</h1>
                <p class="title">Edit Profile details</p>
                <p>
                <div class=" col-md-9 col-lg-9 ">
                    <table class="table table-user-information">
                        <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>
                                <spring:bind path="name">
                                    <div class="form-group ${status.error ? 'has-error' : ''}">
                                        <form:input type="text" path="name" class="form-control"
                                                    placeholder="Name"></form:input>
                                        <form:errors path="name"></form:errors>
                                    </div>
                                </spring:bind>
                            </td>
                            <!-- <td>Jin Kim</td> -->
                        </tr>
                        <tr>
                            <td>Username:</td>
                            <td>
                                <spring:bind path="username">
                                    <div class="form-group ${status.error ? 'has-error' : ''}">
                                        <form:input type="text" path="username" class="form-control"
                                                    placeholder="Username"
                                                    autofocus="true"></form:input>
                                        <form:errors path="username"></form:errors>
                                    </div>
                                </spring:bind>
                            </td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>
                                <spring:bind path="email">
                                    <div class="form-group ${status.error ? 'has-error' : ''}">
                                        <form:input type="email" path="email" class="form-control"
                                                    placeholder="Email"></form:input>
                                        <form:errors path="email"></form:errors>
                                    </div>
                                </spring:bind>
                            </td>
                        </tr>
                        <tr>
                            <td>Date of Birth:</td>
                            <td>
                                <spring:bind path="birthdate">
                                    <div class="form-group ${status.error ? 'has-error' : ''}">
                                        <form:input type="date" path="birthdate" class="form-control"
                                                    placeholder="Birthdate"></form:input>
                                        <form:errors path="birthdate"></form:errors>
                                    </div>
                                </spring:bind>
                            </td>
                        </tr>
                        <tr>
                            <td>Phone Number:</td>
                            <td>
                                <spring:bind path="phonenumber">
                                    <div class="form-group ${status.error ? 'has-error' : ''}">
                                        <form:input type="number" path="phonenumber" class="form-control"
                                                    placeholder="Phone Number"></form:input>
                                        <form:errors path="phonenumber"></form:errors>
                                    </div>
                                </spring:bind>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="form-group">
                        <button type="submit" class="editbtn">Save</button>
                        <a href="/my-profile">
                            <button type="button" class="editbtn">Cancel</button>
                        </a>
                    </div>
                </div>
                </p>
            </form:form>
        </div>

    </div>
</div>
<script type="text/javascript">
    function logoutAlert() {
        alert("Please log back in to view changes to your profile.");
    }
</script>
</body>
</html>
