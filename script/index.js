// index.js

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Retrieve the values entered by the user
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Check if the username and password match
        if (username === "admin" && password === "123") {
            // Redirect to the home page
            window.location.href = "/views/home.html";
        } else {
            // If the credentials are incorrect, display an error message
            alert("Incorrect username or password. Please try again.");
        }
    });
});
