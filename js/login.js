function openSignUpInNewWindow() {
  window.location.href = "sign_up.html";
}

function guestLogin() {
  window.location.href = "board.html";
}

function login() {
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  // Gucken E-Mail in den Benutzerdaten existiert
  const user = users.find((u) => u.email === email);

  if (user) {
    if (user.password === password) {
      window.location.href = "board.html";
    } else {
      alert("Benutzername oder Passwort falsch");
    }
  } else {
    alert("E-Mail existiert nicht");
  }
}
