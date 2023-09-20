
let tasks = [];
let users = [];
let contacts = [];
let currentUser = {};
let taskStateCategories = ["to-do", "in-progress", "await-feedback", "done"];
let currentTask;
let search = '';
let contactsOpen = false;
let contactSearch = '';


/* ======================= */
/* ===== LOAD & SAVE ===== */
/* ======================= */

async function loadUsersFromStorage() {
  users = JSON.parse(await getItem('users'));
}

async function loadCurrentUserFromStorage() {
  currentUser = JSON.parse(await getItem('currentUser'));
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
 * Onload function to load and render the content
 */
async function initBoard() {
  renderMobileOrDesktopTemplates(window.innerWidth >= 1000);
  await loadUsersFromStorage();
  // await loadCurrentUserFromStorage();
  await loadContactsFromStorage();
  await loadTasksFromStorage();
  renderAllTasks();
  sortContacts(contacts);
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
      <div class="profile-badge bc-${contact['badge-color']} ${checkIfContactIsJoinUser(contact['userid'])}" style="left: -${(i * 8)}px">${contact['initials']}</div>
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

function openPopup(taskID) {
  let task = tasks.find(task => task['id'] == taskID);
  let popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = 'flex';
  popupContainer.innerHTML = generatePopupTaskContainerHTML(task,taskID);
}

function closePopup() {
  let popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = 'none';
  renderAllTasks();
}

function closeAddTaskPopup() {
  let popupContainer = document.getElementById('popup-container-add-task');
  popupContainer.style.display = 'none';
  renderAllTasks();
}

function prioToText(prio) {
  let prioAsText = ['High', 'Medium', 'Low'];
  return prioAsText[prio-1]; // started counting at 1 not 0
}


async function toggleSubtaskState(taskID, subtaskIndex) {
  let task = tasks.find(task => task['id'] == taskID);
  let subtask = task['subtasks'][subtaskIndex];
  subtask['done'] = subtask['done']? false:true;
  let checkButtonsSRC = ['./assets/img/check_button_unchecked.svg','./assets/img/check_button_checked.svg']
  let img = document.getElementById(`subtask-${subtaskIndex}-checkbutton`);
  img.src = checkButtonsSRC[+subtask['done']];
  await saveTasksToStorage();
}


async function deleteTask(taskID) {
  let taskIndex = tasks.findIndex(task => task['id'] == taskID);
  tasks.splice(taskIndex,1);
  await saveTasksToStorage();
  closePopup();
  renderAllTasks();
}



/* =================================== */
/* ===== EDIT TASK - POP UP VIEW ===== */
/* =================================== */

function editTask(taskID) {
  let task = tasks.find(task => task['id'] == taskID);
  currentTask = JSON.parse(JSON.stringify(task)); // deep copy to disconect the copy from the original object
  let popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = 'flex';
  popupContainer.innerHTML = generatePopupEditTaskContainerHTML(task,taskID);
  selectPriority(task['priority']);
  renderAssignedUserBadgesEditTask(taskID);
  renderSubtasksInEditTask(taskID);
}



// Input Focus

function setFocusOnInput(id) {
  let input = document.getElementById(id);
  input.focus();
}



// Date

function currentDate() {
  return new Date().toISOString().split("T")[0];
}



// PRIO Buttons

function selectPriority(prio) {
  let prioColors = ['#ff3d00','#ffa800','#7ae229'];
  let selectedPrioButton = document.getElementById(`prio-button-${prio}`);
  removePrioSelection();
  selectedPrioButton.classList.add('selected-prio');
  document.getElementsByClassName('selected-prio')[0].style = `background-color: ${prioColors[prio - 1]};`;
  currentTask['priority'] = prio;
}



function removePrioSelection() {
  if (document.getElementsByClassName('selected-prio')[0]) {
    document.getElementsByClassName('selected-prio')[0].style = `background-color: var(--color-white);`
    document.getElementsByClassName('selected-prio')[0].classList.remove('selected-prio');
  }
}



// Assigned To

function toggleContactList(taskID) {
  document.getElementById('assigned-contacts-list').classList.toggle('d-none');
  contactsOpen = contactsOpen ? false:true;
  toggleDropdownArrow();
  loadContactsIntoDropdown(taskID);
}



function toggleDropdownArrow() {
  let img = document.getElementById('contactsArrow');
  if (contactsOpen) {
    img.src = './assets/img/arrow_up.svg';
  } else {
    img.src = './assets/img/arrow_drop_down.svg'
  }
}



function loadContactsIntoDropdown() {
  let container = document.getElementById('assigned-to-contacts');
  container.innerHTML = '';
  for (let i = 0; i < sortedContactList.length; i++) {
    const contact = sortedContactList[i];
    if (contact['name'].toLowerCase().includes(contactSearch)) {
      container.innerHTML += generateContactListItemHTML(contact,i);
    }
  }
}


function loadCheckButtonImg(contactID) {
  let isAssigned = currentTask['assigned_to'].includes(contactID);
  if (isAssigned) {
    return '/assets/img/check_button_checked.svg';
  } else {
    return '/assets/img/check_button_unchecked.svg';
  }
}



function addCSSClass_assigned(contactID) {
  let isAssigned = currentTask['assigned_to'].includes(contactID);
  if (isAssigned) {
    return 'assigned';
  } else {
    return '';
  }
}



function checkIfContactIsJoinUser(userid) {
  if (userid < 0) {
    return 'no-active-user';
  } else {
    return '';
  }
}



function toggleAssignment(contactID,imgID) {
  let contactListItem = document.getElementById(`contact-${contactID}`);
  let checkBoxImg = document.getElementById(imgID);
  let isAssigned = currentTask['assigned_to'].includes(contactID);
  if (isAssigned) {
    contactListItem.classList.remove('assigned');
    let index = currentTask['assigned_to'].indexOf(contactID);
    currentTask['assigned_to'].splice(index,1);
    checkBoxImg.src = '/assets/img/check_button_unchecked.svg';
  } else {
    contactListItem.classList.add('assigned');
    currentTask['assigned_to'].push(contactID);
    checkBoxImg.src = '/assets/img/check_button_checked.svg';
  };
  renderAssignedUserBadgesEditTask();
}



function checkIfContactIsCurrentUser(userID) {
  if (userID == currentUser['id']) {
    return '(You)';
  } else {
    return '';
  }
}



function renderAssignedUserBadgesEditTask() {
  let assignedContacts = currentTask['assigned_to'];
  let container = document.getElementById('assigned-contact-badges-container');
  container.innerHTML = '';
  for (let i = 0; i < assignedContacts.length; i++) {
    let contact = contacts.find(u => u['id'] == assignedContacts[i]);
    if (contact != undefined) {
      container.innerHTML += /*html*/`
      <div class="profile-badge bc-${contact['badge-color']} width-40px ${checkIfContactIsJoinUser(contact['userid'])}">${contact['initials']}</div>
    `;
    }
  };
}


// ############################################################
function sortContacts(arr) {
  sortedContactList = arr;
  sortedContactList.sort((c1, c2) =>
    c1.initials < c2.initials ? -1 : c1.initials > c2.initials ? 1 : 0
  );
  // place user at the first position
  const currentUserIndex = sortedContactList.findIndex(contact => contact['userid'] == currentUser['id']);
  const currentUserContactInfo = JSON.parse(JSON.stringify(sortedContactList[currentUserIndex]));
  sortedContactList.splice(currentUserIndex,1);
  sortedContactList.unshift(currentUserContactInfo);
}


// Assigned To Search



function searchContacts() {
  let searchbar = document.getElementById('input-assigned-to');
  contactSearch = searchbar.value.toLowerCase();
  loadContactsIntoDropdown();
}


// SUBTASKS

function renderSubtasksInEditTask() {
  let subtasks = currentTask['subtasks'];
  let container = document.getElementById('popup-task-edit-subtasks-container');
  container.innerHTML = '';
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    container.innerHTML += generateSubtaskInEditPopupHTML(subtask,i);
  }
}


function editSubtask(subtaskIndex) {
  let subtask = currentTask['subtasks'][subtaskIndex];
  let container = document.getElementById(`popup-task-edit-subtask-${subtaskIndex}`);
  container.innerHTML = generateEditSubtaskHTML(subtask,subtaskIndex);
}


function saveSubtask(subtaskIndex) {
  let subtask = currentTask['subtasks'][subtaskIndex];
  let input = document.getElementById(`subtask-edit-input`);
  subtask['subtask'] = input.value;
  renderSubtasksInEditTask();
}

function deleteSubtask(subtaskIndex) {
  currentTask['subtasks'].splice(subtaskIndex,1);
  renderSubtasksInEditTask();
}

function addNewSubtask() {
  let input = document.getElementById(`input-subtasks`);
  let newSubtask = {
      done: false,
      subtask: `${input.value}`,
  };
  currentTask['subtasks'].push(newSubtask);
  dropNewSubtask();
  renderSubtasksInEditTask();
}

function dropNewSubtask() {
  let input = document.getElementById(`input-subtasks`);
  input.value = '';
  document.activeElement.blur();
}


async function acceptEdit(taskID) {
  let task = tasks.find(task => task['id'] == taskID);
  // create edited task
  currentTask['title'] = document.getElementById('input-title').value;
  currentTask['description'] = document.getElementById('input-description').value;
  currentTask['due_date'] = document.getElementById('input-due-date').value;
  // replace old task with edited task
  task['title'] = currentTask['title'];
  task['description'] = currentTask['description'];
  task['due_date'] = currentTask['due_date'];
  task['priority'] = currentTask['priority'];
  task['assigned_to'] = currentTask['assigned_to'];
  task['subtasks'] = currentTask['subtasks'];
  await setItem('tasks', JSON.stringify(loadedTasks));
  currentTask = {};
  closePopup();
}


/* =========================== */
/* ===== FORM VALIDATION ===== */
/* =========================== */

document.addEventListener('input', function() {
  let inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.validity.valid) {
      input.parentElement.classList.remove('invalid');
    } else {
      input.parentElement.classList.add('invalid');
    }
  }
})

document.addEventListener('input', function() {
  let inputs = document.getElementsByTagName('textarea');
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.validity.valid) {
      input.parentElement.classList.remove('invalid');
    } else {
      input.parentElement.classList.add('invalid');
    }
  }
})



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




// ADD TASK POPUP

function openAddNewTaskPopUp(status) {
  localStorage.removeItem('taskStatus');
  localStorage.setItem('taskStatus', status);

  if (window.innerWidth > 980) {
    document.getElementById('popup-container-add-task').style.display = 'flex';
    document.getElementsByClassName('headAddTask')[0].innerHTML += addTaskClosingButtonHTML(); // Close Button for Popup
  } else {
    window.location.href = 'add_task.html'
  }
} 