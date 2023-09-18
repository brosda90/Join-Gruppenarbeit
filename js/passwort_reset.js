document.addEventListener("DOMContentLoaded", function () {
  changePassword();
});

async function changePassword(email, newPassword) {
  users = JSON.parse(await getItem("users"));

  let user = users.find((u) => u.email === email);
  if (user) {
    user.password = newPassword;
    await setItem("users", users);
    alert("Passwort erfolgreich aktualisiert!");
  }
}

async function updatePassword() {
  const emailInput = document.getElementById("passwordReset");
  const newPasswordInput = document.getElementById("newPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const passwordPopup = document.getElementById("passwordPopup");

  const email = emailInput.value;
  const newPassword = newPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  newPasswordInput.classList.remove("input-error");
  confirmPasswordInput.classList.remove("input-error");

  let Error = false;
  if (!newPassword) {
    newPasswordInput.classList.add("input-error");
    Error = true;
  }
  if (!confirmPassword) {
    confirmPasswordInput.classList.add("input-error");
    Error = true;
  }
  if (Error) return;

  if (newPassword === confirmPassword) {
    await changePassword(email, newPassword);
    passwordPopup.style.display = "none";
  } else {
    alert("Passwörter stimmen nicht überein!");
  }
}

async function checkUserEmailAndShowPopup() {
  const email = document.getElementById("passwordReset").value;
  users = JSON.parse(await getItem("users"));

  let user = users.find((u) => u.email === email);
  if (user) {
    document.getElementById("passwordPopup").style.display = "block";
  } else {
    alert("E-Mail nicht gefunden.");
  }
}
