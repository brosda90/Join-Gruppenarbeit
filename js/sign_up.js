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
  setTimeout(function () {
    document.getElementById("passwordInfo").style.display = "none";
  }, 3000);
}

let users = []; // Initialisierung der Benutzerliste. Dies sollte eigentlich aus dem Speicher geladen werden.

async function loadUsers() {
  let storedUsers = await getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
}

//################ CHECKING CHECKBOX PRIVACY POLICY  #############################//
document
  .getElementById("PrivacyCheckBox")
  .addEventListener("change", function () {
    const btn = document.getElementById("logInBtn");
    if (this.checked) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  });

//################  USER REGISTER #############################//
async function registerUser() {
  await loadUsers(); // Laden der aktuellen Benutzerliste.

  const name = document.getElementById("nameField").value;
  const email = document.getElementById("emailField").value;
  const password = document.getElementById("password").value;
  const passwordConf = document.getElementById("passwordConf").value;

  if (password !== passwordConf) {
    showWrongPasswordPopup();
    return;
  }

  // Prüfen, ob die E-Mail bereits vorhanden exisitiert.
  const emailExists = users.some((user) => user.email === email);
  if (emailExists) {
    showEmailExistPopup();
    return;
  }

  const newUser = {
    id: getNextUserId(),
    name: name,
    initials: getInitials(name),
    email: email,
    password: password,
  };

  users.push(newUser);

  await setItem("users", JSON.stringify(users)); // Speichern aktualisierte Benutzerliste.

  alert("Erfolgreich registriert!");
}

//################ USER ID + 1 #############################//
function getNextUserId() {
  if (users.length === 0) return 1;
  return users[users.length - 1].id + 1;
}

//################ Get the first two letters and the name and capitalize them #############################//
function getInitials(name) {
  const parts = name.split(" ");
  let initials = "";
  for (let i = 0; i < parts.length; i++) {
    initials += parts[i].charAt(0);
  }
  return initials.toUpperCase();
}

//################ CHECKS IF EMAIL EXISTS #############################//
async function checkEmailExists() {
  await loadUsers();

  const email = document.getElementById("emailField").value;
  const emailExists = users.some((user) => user.email === email);

  if (emailExists) {
    showEmailExistPopup();
  }
}

//################ SHOW AND CLOSE POPUP FUNCTIONS #############################//
function closeWrongPassword() {
  document.getElementById("errorPassword").style.display = "none";
}

function showWrongPasswordPopup() {
  document.getElementById("errorPassword").style.display = "flex";
}

function closeEmailExist() {
  document.getElementById("errorEmailExists").style.display = "none";
}

function showEmailExistPopup() {
  document.getElementById("errorEmailExists").style.display = "flex";
}
