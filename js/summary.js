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
