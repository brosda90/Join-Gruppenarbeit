window.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => {
      moveLogoAndShowLogin();
    }, 500); 
  });
  
  function moveLogoAndShowLogin() {
    const logoContainer = document.querySelector(".logo-container");
    const logo = document.getElementById("logo");
    const loginContainer = document.getElementById("loginContainer");
  
    // Logo verschieben und Größe ändern
    logoContainer.style.top = "10px";
    logoContainer.style.left = "10px";
    logoContainer.style.transform = "none";
    logo.style.width = "100px"; // Zielgröße
  
    setTimeout(() => {
      // Login-Container anzeigen
      loginContainer.style.display = "flex";
    }, 2000); // Warten Sie 2 Sekunden nachdem das Logo verschoben wurde.
  }

  function openSignUpInNewWindow() {
    window.open("sign-up.html");
}


