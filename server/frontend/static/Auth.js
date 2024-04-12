const handleLogout = async (e) => {
  e.preventDefault();

  // request user logout
  const response = await fetch("/djangoapp/logout", {
    method: "GET",
  });

  // check if user is logged out
  const json = await response.json();
  if (json) {
    // remove username from sessionStorage and reload page
    let username = sessionStorage.getItem("username");

    sessionStorage.removeItem("username");
    window.location.reload();
    alert(username + " has been logged out.");
  } else {
    alert("The user could not be logged out.");
  }
};

function handleAuthentication() {
  // check if user is logged in
  const loggedIn = sessionStorage.getItem("username");

  // if logged in, change "Login" to "Logout" and display username
  if (loggedIn) {
    const logLink = document.getElementById("login-logout");
    logLink.innerHTML = `<span><b>${loggedIn}</b></span><a href="#" id="logout">Logout</a>`;

    // event listener for logout
    document.getElementById("logout").addEventListener("click", handleLogout);
  }
}

// call the function to handle authentication when the DOM is loaded
document.addEventListener("DOMContentLoaded", handleAuthentication);
