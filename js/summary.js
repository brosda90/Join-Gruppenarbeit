function updateDisplay() {
  const mainContainer = document.querySelector(".main");
  const rightContainer = document.querySelector(".right-container");

  rightContainer.style.opacity = "0";
  mainContainer.style.display = "flex";
  mainContainer.style.opacity = "1";

  rightContainer.addEventListener("transitionend", function () {
    rightContainer.style.display = "none";
  });
}

setTimeout(updateDisplay, 2000);

document.addEventListener("DOMContentLoaded", function () {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting;

  if (hour >= 6 && hour < 12) {
    greeting = "Guten Morgen";
  } else if (hour >= 12 && hour < 16) {
    greeting = "Guten Mittag";
  } else if (hour >= 16 && hour < 20) {
    greeting = "Guten Abend";
  } else {
    greeting = "Hallo";
  }

  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    document.querySelector(".right-container p:nth-child(1)").textContent =
      greeting + ",";
    document.querySelector(".right-container p:nth-child(2)").textContent =
      loggedInUser;
  }
});
