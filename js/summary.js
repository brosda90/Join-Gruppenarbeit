// Event, der beim Laden des Dokuments ausgeführt wird, um Aufgaben aus dem Remote-Speicher zu laden.
document.addEventListener("DOMContentLoaded", function () {
  loadTasksFromRemoteStorage();
});

//###################################################################################//
//###################################################################################//
/**
 * Wechselt zur "board.html"-Seite.
 */
function switchToBoard() {
  window.location.href = "board.html";
}

//################  LOAD FUNCTION FOR NAME AND GREETINGS ############################//
//###################################################################################//
/**
 * Aktualisiert die Anzeige.
 */
function updateDisplay() {
  const rightContainer = document.querySelector(".right-container");

  rightContainer.addEventListener("transitionend", function () {});
}

setTimeout(updateDisplay, 2000);

// Event, der beim Laden des Dokuments ausgeführt wird, um den aktuellen Zeitgruß und den eingeloggten Benutzer anzuzeigen.
document.addEventListener("DOMContentLoaded", function () {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting;

  if (hour >= 6 && hour < 12) {
    greeting = "Guten Morgen";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Guten Tag";
  } else if (hour >= 18 && hour < 23) {
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

//###################################################################################//
//###################################################################################//
// Event, der beim Laden des Fensters ausgeführt.nach einer 1 Sekunde ändert Opazität eines Elements.
window.addEventListener("DOMContentLoaded", (event) => {
  setTimeout(function () {
    const viewportWidth = window.innerWidth;

    if (viewportWidth <= 1000) {
      document.querySelector(".right-container").style.opacity = "0";
    }
  }, 1000);
});

//################  LOAD TASKS ######################################################//
//###################################################################################//
/**
 * Lädt Aufgaben aus dem Remote-Speicher.
 * @returns {void}
 */
async function loadTasksFromRemoteStorage() {
  tasks = JSON.parse(await getItem("tasks"));
  updateTaskFromServer();
  nextDeadline();
}

//################ ARRAY FILTER  ####################################################//
//###################################################################################//
/**
 * Aktualisiert die Aufgabenzahlen basierend auf den Daten vom Server.
 */
function updateTaskFromServer() {
  const taskCount = tasks.length;
  const toDoCount = tasks.filter((task) => task.status === "to-do").length;
  const progessCount = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const feedbackCount = tasks.filter(
    (task) => task.status === "await-feedback"
  ).length;
  const urgentCount = tasks.filter((task) => task.priority === 1).length;
  const doneCount = tasks.filter((task) => task.priority === true).length;

  document.querySelector("#taskInBoard h3").textContent = taskCount;
  document.querySelector("#toDo h3").textContent = toDoCount;
  document.querySelector("#taskInProgress h3").textContent = progessCount;
  document.querySelector("#awaitingfeedback h3").textContent = feedbackCount;
  document.querySelector("#urgent h3").textContent = urgentCount;
  document.querySelector("#done h3").textContent = doneCount;
}

//################  DEADLINE DATE FOR URGENT TASKS ##################################//
//###################################################################################//
/**
 * Zeigt das nächste Fälligkeitsdatum für dringende Aufgaben an.
 */
function nextDeadline() {
  const urgentTasks = tasks.filter((task) => task.priority === 1);

  if (urgentTasks.length === 0) {
    return;
  }

  urgentTasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  const nextDate = urgentTasks[0].due_date;

  const formatDate = new Date(nextDate).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.querySelector("#deadLine p:nth-child(1) b").textContent = formatDate;
}

//################  HOVER FOR IMAGES ################################################//
//###################################################################################//

// Event, der beim Laden des Dokuments ausgeführt wird, um Hover-Effekte für bestimmte Bilder zu erstellen.
document.addEventListener("DOMContentLoaded", function () {
  const toDoElement = document.getElementById("toDo");
  const doneElement = document.getElementById("done");

  toDoElement.addEventListener("mouseover", function () {
    this.querySelector("img").setAttribute("src", "assets/img/edit_hover.svg");
  });

  toDoElement.addEventListener("mouseout", function () {
    this.querySelector("img").setAttribute("src", "assets/img/pencil.png");
  });

  doneElement.addEventListener("mouseover", function () {
    this.querySelector("img").setAttribute("src", "assets/img/done_hover.svg");
  });

  doneElement.addEventListener("mouseout", function () {
    this.querySelector("img").setAttribute("src", "assets/img/done.png");
  });
});
