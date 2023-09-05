
// Passwort sichtbar machen 
function togglePasswordVisibility(fieldId, imgId) {
    const passwordField = document.getElementById(fieldId);
    
    if (passwordField.type === "password") {
        passwordField.type = "text";
        if (imgId) {
            const imageElement = document.getElementById(imgId);
            imageElement.src = "./assets/img/visibility.svg";
        }
    } else {
        passwordField.type = "password";
        if (imgId) {
            const imageElement = document.getElementById(imgId);
            imageElement.src = "./assets/img/visibility_off.svg";
        }
    }
}

function setVisibilityOff(fieldId, imgId) {
    const imageElement = document.getElementById(imgId);
    imageElement.src = "./assets/img/visibility_off.svg";
}

function showPasswordRequirements() {

    document.getElementById("passwordInfo").style.display = "block";
    
    //Zeig info bei klick für 3 sekunden an
    setTimeout(function() {
        document.getElementById("passwordInfo").style.display = "none";
    }, 3000);
}





async function getAllUsers() {
    return await getItem('users') || [];
}


async function registerUser() {
    
    let name = document.getElementById("nameField");
    let email = document.getElementById("emailField");
    let password = document.getElementById("password");
    let passwordconf = document.getElementById("passwordConf");

    let users = await getAllUsers();

    console.log("Users nach dem Abrufen:", users);
  
    // Passwort bestätigung überprüfen
    if (password.value !== passwordconf.value) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }
  
    // Passwortstandarts überprüfen
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{5,}$/;
    
      if (!passwordRegex.test(password.value)) {
        document.getElementById("passwordError").style.display = "block";
        return;
    } else {
        document.getElementById("passwordError").style.display = "none";
    }
  
    // Gucken ob die Daten in einer Array struktur sind
    if (!Array.isArray(users)) {
        console.error("Fehler: Nicht ein Array", users);
        return;
      }
  
    //E-Mails aller Benutzer ausorteren aus dem array
    const existingUserEmails = users.map((user) => user.email);
  
    // Gucken ob die Email bereits existiert 
    if (existingUserEmails.includes(email.value)) {
      alert("E-Mail existiert bereits!");
      return;
    }
  
  
    // Beide Anfangsbuchstaben der namen rausfiltern und als initials speichern
    const nameParts = name.value.split(" ");
    let initials = "";
    if (nameParts.length > 1) {
      initials = nameParts[0][0] + nameParts[1][0];
    } else if (nameParts.length === 1) {
      initials = nameParts[0][0];
    }
  
    // Array auf Server anlegen
    let newUser = {
      name: name.value,
      initials: initials.toUpperCase(),
      email: email.value,
      password: password.value,
      phone: "",
      "badge-color": Math.floor(Math.random() * 150) + 1, // Zufällige Farbnummer 
      contacts: [],
    };
  
    // Neuen Benutzer zum Benutzerarray hinzufügen
    users.push(newUser);
  
    // Den aktualisierten Benutzerarray speichern
    await saveAllUsers(users);
  

    document.getElementById("nameField").value = "";
    document.getElementById("emailField").value = "";
    document.getElementById("password").value = "";
    document.getElementById("passwordConf").value = "";

    async function saveAllUsers(allUsers) {
        return await setItem('users', allUsers);
    }

}

function backToLogin() {
  window.location.href = "index.html";
}

    




