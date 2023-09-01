window.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => {
      moveLogoAndShowLogin();
    }, 600); 
  });
  
  function moveLogoAndShowLogin() {
    const overlay = document.getElementById("colorOverlay");
    const logoContainer = document.querySelector(".logo-container");
    const logo = document.getElementById("logo");
    const loginContainer = document.getElementById("loginContainer");
  
    // Logo verschieben 
    logoContainer.style.top = "10px";
    logoContainer.style.left = "10px";
    logoContainer.style.transform = "none";
    
    //Overlay div transparent machen
    setTimeout(() => {
        overlay.style.transition = "opacity 0.8s ease-out";
        overlay.style.opacity = "0"; 
    }, 800); // zeitversetzt starten
  
    // Logo ändern und overlay div entfernen wegen mobile touch funktion
    setTimeout(() => {
        logo.src = "assets/img/mobile-start-animation-black.svg";
        overlay.remove();
        // Login-Container anzeigen
        loginContainer.style.display = "flex";
        
        // Margins für den logoContainer wenn das bild gewandert ist 
        logoContainer.style.marginTop = "40px";
        logoContainer.style.marginLeft = "40px";
    }, 200); // zeitversetzt starten
}

  function openSignUpInNewWindow() {
    window.open("sign-up.html");
}


