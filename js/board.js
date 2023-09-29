
let tasks = [];
let users = [];
let contacts = [];
let sortedContacts = [];
let currentUser = {};
let taskStateCategories = ["to-do", "in-progress", "await-feedback", "done"];
let currentTask;
let search = '';
let categoryOpen = false;
let contactsOpen = false;
let contactSearch = '';


/* ======================= */
/* ===== LOAD & SAVE ===== */
/* ======================= */

async function loadUsersFromStorage() {
  users = JSON.parse(await getItem('users'));
}

async function loadCurrentUserFromStorage() {
  let currentUserID = localStorage.getItem('loggedInUserID');
  if (currentUserID >= 0) {
    currentUser = users.find( user => user['id'] == currentUserID)
  } else if (currentUserID == -2) {
    currentUser = {
      'id' : -2,
      'name' : 'Guest User',
      'initials' : 'GU',
      'email' : '',
      'password' : '',
      'phone' : '',
      'badge-color' : 1,
      'contacts' : [],
    };
  }
}

async function loadContactsFromStorage() {
  contacts = JSON.parse(await getItem('contacts'));
}

async function loadTasksFromStorage() {
  tasks = JSON.parse(await getItem('tasks'));
}

async function saveTasksToStorage() {
  await setItem('tasks', JSON.stringify(tasks));
}


/**
 * onload function to load and render the content
 */
async function initBoard() {
  renderMobileOrDesktopTemplates(window.innerWidth >= 1000);
  await loadUsersFromStorage();
  await loadCurrentUserFromStorage();
  await loadContactsFromStorage();
  await loadTasksFromStorage();
  await loadLastContactId();
  renderAllTasks();
  sortContactsOnBoard(contacts);
  initAddTask()
}



/* ================================ */
/* ===== BOARD TASK RENDERING ===== */
/* ================================ */

/**
 * function to render all tasks in the corresponding category
 */
function renderAllTasks() {
  for (let i = 0; i < taskStateCategories.length; i++) {
    renderTasksInState(taskStateCategories[i]);
  }
}



/**
 * render all tasks that have the state
 * 
 * @param {string} taskStateCategory - task state category like e.g. 'to-do', 'done' ...
 */
function renderTasksInState(taskStateCategory) {
  let allTasksInState = tasks.filter((t) => t["status"] == taskStateCategory);
  let tasksContainer = document.getElementById(`section-${taskStateCategory}-tasks-container`);
  tasksContainer.innerHTML = "";
  let tasksIncludeSearch = 0;
  for (let i = 0; i < allTasksInState.length; i++) {
    const taskJSON = allTasksInState[i];
    if (taskJSONContainsSearch(taskJSON)) {
      tasksContainer.innerHTML += generateBoardTaskHTML(taskJSON);
      tasksIncludeSearch++;
    }
  }
  if (tasksIncludeSearch == 0) {
    renderNoTasksContainer(taskStateCategory, tasksContainer);
  }
}



/**
 * render no-task-container
 * 
 * @param {string} taskStateCategory - e.g. 'to-do', 'done' ...
 * @param {Element} tasksContainer - div container for the tasks in the state
 */
function renderNoTasksContainer(taskStateCategory, tasksContainer) {
  taskStateCategory = replaceHyphenWithSpaceAndCapitalize(taskStateCategory);
  tasksContainer.innerHTML += noTaskContainerHTML(taskStateCategory);
}



/**
 * function to replace hyphens with spaces and capitalize the first letter
 * 
 * @param {string} string - input string e.g. 'to-do'
 * @returns string - e.g. 'To do'
 */
function replaceHyphenWithSpaceAndCapitalize(string) {
    string = string.charAt(0).toUpperCase() + string.slice(1);
    string = string.replace('-',' ');
    return string;
}



/**
 * shorten any string
 * 
 * @param {string} string - text
 * @param {number} length - maximum length the text should be
 * @returns shortened string of maximum length
 */
function shortenString(string,length) {
  if (string.length > length) {
    string = string.slice(0,(length - 3)) + '...'
  }
  return string;
}


/**
 * Generates subtasks HTML for Board Tasks if subtasks exist
 * 
 * @param {JSON} taskJSON - JSON Element with the informations of the task
 * @returns HTML 
 */
function generateBoardSubtasksHTML(taskJSON) {
    let boardSubtasksHTML = '';
    let subtasks = taskJSON['subtasks'];
    if (subtasks.length > 0) {
        let subtasksDone = subtasks.filter(subtask => subtask['done'] == true).length;
        let procentualAmountDone = (subtasksDone / subtasks.length) * 100;
        boardSubtasksHTML = boardSubtasksContainerHTML(subtasksDone,procentualAmountDone,subtasks);
    }
    return boardSubtasksHTML;
}



/**
 * Generates profile badges HTML for assigned users
 * 
 * @param {JSON} taskJSON - JSON Element with the informations of the task
 * @returns HTML
 */
function generateAssignedUserBadges(taskJSON) {
  let assignedUserBadgesHTML = '';
  let assignedContacts = taskJSON['assigned_to'];
  for (let i = 0; i < assignedContacts.length; i++) {
    let contact = contacts.filter((contact) => contact['id'] == assignedContacts[i])[0];
    if (contact && i < 5) {
      assignedUserBadgesHTML += /*html*/`
      <div class="profile-badge bc-${contact['badge-color']}" style="left: -${(i * 8)}px">${contact['initials']}</div>
    `;
    } else if(i == 5) {
      assignedUserBadgesHTML += /*html*/`
      <div class="profile-badge" style="left: -${(i * 8)}px; background-color: #2A3647;">+${assignedContacts.length - 5}</div>
    `;
    }
  };
  return assignedUserBadgesHTML;
}



/* ======================== */
/* ===== BOARD SEARCH ===== */
/* ======================== */

function searchTasks() {
  let searchbar = document.getElementById('board-searchbar');
  search = searchbar.value.toLowerCase();
  renderAllTasks();
}

function taskJSONContainsSearch(taskJSON) {
  if (taskJSON['title'].toLowerCase().includes(search) || taskJSON['description'].toLowerCase().includes(search)) {
    return true;
  } else {
    return false;
  };
}



/* ======================= */
/* ===== POP UP VIEW ===== */
/* ======================= */

/**
 * open the popup view (detail view) of the task
 * 
 * @param {number} taskID - id of the task
 */
function openPopup(taskID) {
  let task = tasks.find(task => task['id'] == taskID);
  let popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = 'flex';
  popupContainer.innerHTML = generatePopupTaskContainerHTML(task,taskID);
  setTimeout(() => {
    document.getElementsByClassName('popup-task-container')[0].style.right = 0;
  }, 150);
}



/**
 * close the popup
 */
function closePopup() {
  let popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = 'none';
  renderAllTasks();
}


/**
 * get the right word for the priority level
 * - 1 == High, 2 == Medium, 3 == Low
 * 
 * @param {number} prio - number of priority starts at 1 
 * @returns string
 */
function prioToText(prio) {
  let prioAsText = ['High', 'Medium', 'Low'];
  return prioAsText[prio-1]; // started counting at 1 not 0
}



/**
 * check / uncheck subtask in popup view
 * @param {number} taskID - id of the current task
 * @param {number} subtaskIndex - index of the current subtask
 */
async function toggleSubtaskState(taskID, subtaskIndex) {
  let task = tasks.find(task => task['id'] == taskID);
  let subtask = task['subtasks'][subtaskIndex];
  let checkButtonsSRC = ['./assets/img/check_button_unchecked.svg','./assets/img/check_button_checked.svg']
  let img = document.getElementById(`subtask-${subtaskIndex}-checkbutton`);
  if (currentUser['id'] == -2) {
    img.src = (img.src.includes('button_unchecked')) ? checkButtonsSRC[1] : checkButtonsSRC[0];
    msgBox("Your changes won't be saved.<br> Please register and log in.");
  } else {
    subtask['done'] = subtask['done']? false:true;
    img.src = checkButtonsSRC[+subtask['done']];
    await saveTasksToStorage();
  }
}


/**
 * delete current task
 * @param {number} taskID - id of the current task
 */
async function deleteTask(taskID) {
  if (currentUser['id'] == -2) {
    msgBox();
  } else {
    let taskIndex = tasks.findIndex(task => task['id'] == taskID);
    tasks.splice(taskIndex,1);
    await saveTasksToStorage();
    closePopup();
    renderAllTasks();
  }
}



/* ======================= */
/* ===== MEDIA QUERY ===== */
/* ======================= */

const mediaQuery1000px = window.matchMedia("(min-width: 1000px)");

mediaQuery1000px.addEventListener('change', (e) => renderMobileOrDesktopTemplates(e.matches));

function renderMobileOrDesktopTemplates(match) {
  let boardHeader = document.getElementById('board-header');
  let boardSearchbar = document.getElementById('board-searchbar');
  if (match)  {
    boardHeader.innerHTML = boardHeaderDesktopHTML();
    if (boardSearchbar) {
      document.getElementById('board-searchbar').value = search;
    }
  } else {
    boardHeader.innerHTML = boardHeaderMobileHTML();
    if (boardSearchbar) {
      document.getElementById('board-searchbar').value = search;
    }
  }
}




/* ========================== */
/* ===== ADD TASK POPUP ===== */
/* ========================== */

function openAddNewTaskPopUp(status) {
  localStorage.removeItem('taskStatus');
  localStorage.setItem('taskStatus', status);

  if (window.innerWidth >= 1000) {
    document.getElementById('popup-container-add-task').style.display = 'flex';
    document.getElementById('add-task-closing-button').classList.remove('d-none');
    setTimeout(() => {
      document.getElementsByClassName('popup-add-task-container')[0].style.right = 0;
    }, 150)
  } else {
    window.location.href = 'add_task.html';
  }
} 


function closeAddTaskPopup() {
  let popupContainer = document.getElementById('popup-container-add-task');
  popupContainer.style.display = 'none';
  document.getElementsByClassName('popup-add-task-container')[0].style.right = '-100%';
  renderAllTasks();
}



/* ============================ */
/* ===== OTHER FUNCTIONS  ===== */
/* ============================ */

function stopPropagation(event) {
  event.stopPropagation();
}