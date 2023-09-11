let users = [];

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

async function loadUsers() {
  let storedUsers = await getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
}

//################  USER REGISTER #############################//
async function registerUser() {
  const nameField = document.getElementById("nameField");
  const emailField = document.getElementById("emailField");
  const passwordField = document.getElementById("password");
  const passwordConfField = document.getElementById("passwordConf");

  const name = nameField.value;
  const email = emailField.value;
  const password = passwordField.value;
  const passwordConf = passwordConfField.value;
  const privacyCheckBox = document.getElementById("PrivacyCheckBox");

  document.getElementById("nameField").addEventListener("input", function () {
    checkAndRemoveErrorClass(this);
  });
  document.getElementById("emailField").addEventListener("input", function () {
    checkAndRemoveErrorClass(this);
  });
  document.getElementById("password").addEventListener("input", function () {
    checkAndRemoveErrorClass(this);
  });
  document
    .getElementById("passwordConf")
    .addEventListener("input", function () {
      checkAndRemoveErrorClass(this);
    });

  // Überprüfung, ob die Felder leer sind
  if (
    !name.trim() ||
    !email.trim() ||
    !password.trim() ||
    !passwordConf.trim()
  ) {
    [nameField, emailField, passwordField, passwordConfField].forEach(
      (field) => {
        if (!field.value.trim()) {
          field.closest(".elementbox").classList.add("elementbox-error");
        }
      }
    );
    return;
  }

  // Überprüfung, ob die Datenschutzrichtlinie angeklickt wurde
  if (!privacyCheckBox.checked) {
    showPrivacyPopup();
    return;
  }

  // Wenn das Passwort mit der Passwortbestätigung übereinstimmt
  if (password !== passwordConf) {
    showWrongPasswordPopup();
    return;
  }

  await loadUsers();

  // Prüfen, ob die E-Mail bereits vorhanden exisitiert.
  const emailExists = users.some((user) => user.email === email);
  if (emailExists) {
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

  await setItem("users", JSON.stringify(users));

  showRegistrationSuccess();

  return false;
}

function checkAndRemoveErrorClass(field) {
  if (field.value.trim()) {
    field.closest(".elementbox").classList.remove("elementbox-error");
  }
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
  const email = document.getElementById("emailField").value;

  if (!email.trim()) return; // Diese Zeile hinzufügen, um zu überprüfen, ob das E-Mail-Feld leer ist.

  await loadUsers();

  const emailExists = users.some((user) => user.email === email);

  if (emailExists) {
    showEmailExistPopup();
  }
}

//################ TEST IF PASSWORD MEETS REGULATIONS  #############################//
function validatePasswordRequirements() {
  const passwordField = document.getElementById("password");
  const password = passwordField.value;

  if (!password.trim()) return; // Füge diese Zeile hinzu, um zu überprüfen, ob das Passwortfeld leer ist.

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  if (!regex.test(password)) {
    document.getElementById("passwordNotSecure").style.display = "flex";
    return false;
  }
  return true;
}

//################ PASSWORD MATCH CHECK #############################//

function checkPasswordsMatch() {
  const passwordField = document.getElementById("password");
  const passwordConfField = document.getElementById("passwordConf");

  const password = passwordField.value;
  const passwordConf = passwordConfField.value;

  if (password.trim() && passwordConf.trim() && password !== passwordConf) {
    showWrongPasswordPopup();
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
  document.getElementById("emailField").value = "";
}

function showEmailExistPopup() {
  document.getElementById("errorEmailExists").style.display = "flex";
}

function closePrivacyAlert() {
  document.getElementById("errorPrivacy").style.display = "none";
}

function showPrivacyPopup() {
  document.getElementById("errorPrivacy").style.display = "flex";
}

function showRegistrationSuccess() {
  document.getElementById("successRegistration").style.display = "flex";

  // Weiterleitung nach 2 Sekunden
  setTimeout(function () {
    window.location.href = "index.html";
  }, 2000);
}

function closeRegistrationSuccess() {
  document.getElementById("successRegistration").style.display = "none";
}

function closePasswordNotSecurePopup() {
  document.getElementById("passwordNotSecure").style.display = "none";
}
