let users = [];

function backToLogin() {
  window.location.href = "index.html";
}

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

async function loadLastContactId() {
  let storedLastContactId = await getItem("lastContactId");
  if (storedLastContactId) {
    return JSON.parse(storedLastContactId);
  }
  return 0;
}

function randomBadgeColor() {
  return Math.floor(Math.random() * 15);
}

//################  USER REGISTER #############################//
async function registerUser() {
  const nameField = document.getElementById("nameField");
  const emailField = document.getElementById("emailField");
  const passwordField = document.getElementById("password");
  const passwordConfField = document.getElementById("passwordConf");

  const name = nameField.value;
  const email = emailField.value.toLowerCase();
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

  if (!privacyCheckBox.checked) {
    showPrivacyPopup();
    return;
  }

  if (password !== passwordConf) {
    showWrongPasswordPopup();
    return;
  }

  await loadUsers();

  let lastContactId = await loadLastContactId();
  lastContactId++;
  await setItem("lastContactId", JSON.stringify(lastContactId));

  const emailExists = users.some((user) => user.email === email);
  if (emailExists) {
    return;
  }

  const userId = getNextUserId();
  const newUser = {
    id: userId,
    name: name,
    initials: getInitials(name),
    email: email,
    password: password,
    phone: "Bitte Telefonnummer eintragen",
    contacts: [lastContactId],
  };

  users.push(newUser);

  await setItem("users", JSON.stringify(users));

  //Wird in der contactList gespeichert
  const newContact = {
    id: lastContactId, // Änderung von "contacts" zu "id"
    name: name,
    initials: getInitials(name),
    email: email,
    phone: "Bitte Telefonnummer eintragen",
    badgecolor: randomBadgeColor(),
    userId: userId, // Änderung von "id" zu "userId"
  };

  await loadContactsFromStorage(); // aus contacts.js
  contactList.push(newContact);
  await setItem("contacts", JSON.stringify(contactList));

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
  const email = document.getElementById("emailField").value.toLowerCase();

  if (!email.trim()) return; // Überprüfung ob Emailfeld leer ist.

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

  if (!password.trim()) return;

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

function closePasswordNotSecurePopup() {
  document.getElementById("passwordNotSecure").style.display = "none";
}

//################ DELETE ALL USERS FROM SERVER #############################//
async function deleteAllUsers() {
  users = [];
  await setItem("users", JSON.stringify(users));
}
