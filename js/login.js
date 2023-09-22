function openSignUpInNewWindow() {
  window.location.href = "sign_up.html";
}

//################ PASSWORT SICHTBAR MACHEN #############################//
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

//################ PASSWORD REQUIRMENTS POPUP #############################//
function showPasswordRequirements() {
  document.getElementById("passwordInfo").style.display = "block";

  setTimeout(function () {
    document.getElementById("passwordInfo").style.display = "none";
  }, 3000);
}

//################ LOAD USERS FROM SERVER #############################//
async function loadUsers() {
  let storedUsers = await getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
}

//################ SAVE LOGIN DETAILS BY ACTIVATING CHECKBOX #############################//
function saveLoginDetails(email) {
  localStorage.setItem("rememberEmail", email);
}

//################ LOGIN FUNCTION #############################//
async function login() {
  const emailField = document.getElementById("emailLogin");
  const passwordField = document.getElementById("passwordLogin");
  const rememberMeCheckbox = document.getElementById("rememberBox");

  const emailBox = emailField.closest(".elementbox");
  const passwordBox = passwordField.closest(".elementbox");
  const email = emailField.value;
  const password = passwordField.value;

  emailBox.classList.remove("elementbox-error");
  passwordBox.classList.remove("elementbox-error");

  let error = false;

  // Überprüfung, ob E-Mail oder Passwort leer sind
  if (!email.trim()) {
    emailBox.classList.add("elementbox-error");
    error = true;
  }

  if (!password.trim()) {
    passwordBox.classList.add("elementbox-error");
    error = true;
  }

  if (error) {
    return;
  }

  let usersData = await getItem("users");

  let users;
  try {
    users = JSON.parse(usersData);
  } catch (error) {
    alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    return;
  }

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    if (rememberMeCheckbox.checked) {
      localStorage.setItem("rememberEmail", email);
      localStorage.setItem("rememberPassword", password);
    } else {
      localStorage.removeItem("rememberEmail");
      localStorage.removeItem("rememberPassword");
    }

    localStorage.setItem("loggedInUser", user.name);
    localStorage.setItem("loggedInUserID", user.id);
    window.location.href = "board.html";
  } else {
    document.getElementById("errorReport").style.display = "flex";
  }
}

//################ DELETE LOGIN DETAILS BY DEACTIVATING CHECKBOX #############################//
function clearLoginDetailsFromStorage() {
  localStorage.removeItem("rememberEmail");
}

function autofillLoginDetails() {
  const emailField = document.getElementById("emailLogin");
  const passwordField = document.getElementById("passwordLogin");
  const rememberMeCheckbox = document.getElementById("rememberBox");

  const storedEmail = localStorage.getItem("rememberEmail");
  const storedPassword = localStorage.getItem("rememberPassword");

  if (storedEmail) {
    emailField.value = storedEmail;
    rememberMeCheckbox.checked = true;
  }

  if (storedPassword) {
    passwordField.value = storedPassword;
  }
}

//################ CLOSE POPUP #############################//
function closeWrongLogin() {
  document.getElementById("errorReport").style.display = "none";
}

//################ TEST FUNKTION ZEIGT REGESTRIERTE NUTZER IN CONSOLE  #############################//
//################                                                     #############################//
async function logRegisteredUsers() {
  const users = JSON.parse(await getItem("users"));

  if (users) {
    console.log("Registrierte Benutzer:", users);
  } else {
    console.log("Keine Benutzer gefunden.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  autofillLoginDetails();
});

logRegisteredUsers();
