let users = [];

//###################################################################################//
//###################################################################################//
/**
 * Navigiert zurück zur Login-Seite.
 */
function backToLogin() {
  window.location.href = "index.html";
}

//################## SETS VISIBILITY FROM INPUT ON ##################################//
//###################################################################################//
/**
 * Schaltet die Sichtbarkeit des Passworts im gegebenen Feld.
 * @param {string} fieldId - Die ID des Passwortfeldes.
 * @param {string} [imgId] - Die ID des Bildes zur Anzeige des Sichtbarkeitsstatus.
 */
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

//#################### SETS VISIBILITY FROM INPUT OFF ###############################//
//###################################################################################//
/**
 * Setzt die Sichtbarkeit des Passworts auf "aus".
 * @param {string} fieldId - Die ID des Passwortfeldes.
 * @param {string} imgId - Die ID des Bildes.
 */
function setVisibilityOff(fieldId, imgId) {
  const imageElement = document.getElementById(imgId);
  imageElement.src = "./assets/img/visibility_off.svg";
}

//################### SHOWS PASSWORD REGULATIONS ####################################//
//###################################################################################//
/**
 * Zeigt die Passwortanforderungen für eine kurze Zeit.
 */
function showPasswordRequirements() {
  document.getElementById("passwordInfo").style.display = "block";

  setTimeout(function () {
    document.getElementById("passwordInfo").style.display = "none";
  }, 3000);
}

//#################### LOADS USER FORM USERS ARRAY ##################################//
//###################################################################################//
/**
 * Lädt Benutzer aus dem Speicher.
 */
async function loadUsers() {
  let storedUsers = await getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
}

//###################### LOADS LAST CONTACT ID ######################################//
//###################################################################################//
/**
 * Lädt die letzte Kontakt-ID aus dem Speicher.
 * @returns {number} Die letzte Kontakt-ID.
 */
async function loadLastContactId() {
  let storedLastContactId = await getItem("lastContactId");
  if (storedLastContactId) {
    return JSON.parse(storedLastContactId);
  }
  return 0;
}

//################ RETURNS RANDOM NUMBER FOR COLORBADGE #############################//
//###################################################################################//
/**
 * Gibt eine zufällige Farbe für ein Badge zurück.
 * @returns {number} Eine zufällige Zahl zwischen 0 und 14.
 */
function randomBadgeColor() {
  return Math.floor(Math.random() * 15);
}

//################### REGISTER USER #################################################//
//###################################################################################//
/**
 * Registriert einen neuen Benutzer.
 * @returns {boolean} false, wenn die Registrierung nicht erfolgreich war.
 */
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
    "badge-color": randomBadgeColor(),
    userid: userId, // Änderung von "id" zu "userId"
  };

  await loadFromStorage(); // aus contacts.js
  contactList.push(newContact);
  await setItem("contacts", JSON.stringify(contactList));

  showRegistrationSuccess();

  return false;
}

//################## CHECKS AND REMOVES ERROR CLASS #################################//
//###################################################################################//
/**
 * Überprüft und entfernt die Fehlerklasse, wenn das Feld Daten enthält.
 * @param {HTMLElement} field - Das zu überprüfende Feld.
 */
function checkAndRemoveErrorClass(field) {
  if (field.value.trim()) {
    field.closest(".elementbox").classList.remove("elementbox-error");
  }
}

//################## CHECKS NEXT AVAILABLE USER ID ##################################//
//###################################################################################//
/**
 * Ermittelt die nächste verfügbare Benutzer-ID.
 * @returns {number} Die nächste Benutzer-ID.
 */
function getNextUserId() {
  if (users.length === 0) return 1;
  return users[users.length - 1].id + 1;
}

//################### EXTRACTS AND RETURNS INITIALS #################################//
//###################################################################################//
/**
 * Extrahiert und gibt die Initialen eines gegebenen Namens zurück.
 * @param {string} name - Der Name, aus dem die Initialen extrahiert werden sollen.
 * @returns {string} Die Initialen des Namens.
 */
function getInitials(name) {
  const parts = name.split(" ");
  let initials = "";
  for (let i = 0; i < parts.length; i++) {
    initials += parts[i].charAt(0);
  }
  return initials.toUpperCase();
}
//################## CHECKS IF EMAIL MEETS REGULATIONS ##############################//
//###################################################################################//
/**
 * Überprüft, ob die gegebene E-Mail gültig ist.
 * @param {string} email - Die zu überprüfende E-Mail.
 * @returns {boolean} true, wenn die E-Mail gültig ist, sonst false.
 */
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

//##################### CHECKS IF EMAIL EXISTS ######################################//
//###################################################################################//
/**
 * Überprüft, ob eine E-Mail bereits existiert.
 */
async function checkEmailExists() {
  const email = document.getElementById("emailField").value.toLowerCase();

  if (!email.trim()) return;

  if (!isValidEmail(email)) {
    showInvalidEmailPopup(); // Function to show popup for invalid emails
    return;
  }

  await loadUsers();

  const emailExists = users.some((user) => user.email === email);

  if (emailExists) {
    showEmailExistPopup();
  }
}

///################ CHECKS IF PASSWORD MEETS REGULATIONS ############################//
//###################################################################################//
/**
 * Überprüft, ob das Passwort den Anforderungen entspricht.
 * @returns {boolean} true, wenn das Passwort den Anforderungen entspricht, sonst false.
 */
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

//################# CHECKS IF PASSWORD MATCH ########################################//
//###################################################################################//
/**
 * Überprüft, ob zwei Passwörter übereinstimmen.
 */
function checkPasswordsMatch() {
  const passwordField = document.getElementById("password");
  const passwordConfField = document.getElementById("passwordConf");

  const password = passwordField.value;
  const passwordConf = passwordConfField.value;

  if (password.trim() && passwordConf.trim() && password !== passwordConf) {
    showWrongPasswordPopup();
  }
}

//#################### POPUP WINDOWS ################################################//
//###################################################################################//
function closeWrongPassword() {
  document.getElementById("errorPassword").style.display = "none";
}

function showWrongPasswordPopup() {
  document.getElementById("errorPassword").style.display = "flex";
}

function closePasswordNotSecurePopup() {
  document.getElementById("passwordNotSecure").style.display = "none";
}

function showInvalidEmailPopup() {
  document.getElementById("invalidEmailPopup").style.display = "flex";
}

function closeInvalidEmailPopup() {
  document.getElementById("invalidEmailPopup").style.display = "none";
  document.getElementById("emailField").value = "";
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

  startCountdown(3);
}
//#####################STARTS COUNDOWN AFTER REG. ###################################//
//###################################################################################//
/**
 * Startet Countdown nach Regestrierung.
 */
function startCountdown(seconds) {
  let counter = seconds;
  const countdownElement = document.getElementById("countdown");

  // Timer
  const timer = setInterval(function () {
    countdownElement.textContent = counter;
    counter--;

    if (counter < 0) {
      clearInterval(timer);

      window.location.href = "index.html";
    }
  }, 1000);
}
//################ DELETE ALL USERS FROM ARRAY ######################################//
//###################################################################################//
/**
 * Löscht alle Benutzer aus dem Server.
 */
async function deleteAllUsers() {
  users = [];
  await setItem("users", JSON.stringify(users));
}

//################ INITIALIZES LOGGED IN USER / FUNCTION FROM STORAGE.JS ######################################//
//###################################################################################//
/**
 * The logged-in user identifier retrieved from local storage.
 * @type {number}
 */
let loggedInUserID = +localStorage.getItem("loggedInUserID");

async function initLoggedInUser() {
  await loadHeaderUsersFromStorage();
  if (loggedInUserID != -2 && useridToIndex(loggedInUserID, userList) == -1) {
    userLogout();
  } else {
    renderHeaderUserName();
  }
}
