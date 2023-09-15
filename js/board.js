let tasks = [
  {
    id: 0,
    status: "to-do",
    category: "User Story",
    category_color: 11, 
    title: "Kochwelt Page & Recipe Recommender",
    description: "Build start page with recipe recommendation...",
    due_date: "2023-09-03",
    priority: 2,
    assigned_to: [1,3,4,5,6,7,8,9],
    subtasks: [
      {
        done: true,
        subtask: "Implement Recipe Recommendation",
      },
      {
        done: false,
        subtask: "Start Page Layout",
      },
      {
        done: false,
        subtask: "Do something",
      },
      {
        done: false,
        subtask: "Do something else",
      },
      {
        done: false,
        subtask: "...",
      },
    ],
  },
  {
    id: 1,
    status: "await-feedback",
    category: "Technical Task",
    category_color: 6,
    title: "CSS Architecture Planning",
    description: "Define CSS naming conventions and structure.",
    due_date: "2023-09-15",
    priority: 1,
    assigned_to: [2,3],
    subtasks: [
      {
        done: true,
        subtask: "Establish CSS Methodology",
      },
      {
        done: true,
        subtask: "Setup Base Styles",
      },
    ],
  },
  {
    id: 2,
    status: "await-feedback",
    category: "Technical Task",
    category_color: 5,
    title: "CSS Architecture Planning",
    description: "Define CSS naming conventions and structure.",
    due_date: "2023-09-15",
    priority: 1,
    assigned_to: [2,3],
    subtasks: [
      {
        done: true,
        subtask: "Establish CSS Methodology",
      },
      {
        done: true,
        subtask: "Setup Base Styles",
      },
    ],
  },
];

let users = [
    {
        'id' : 1,
        'name' : 'Emanuel Müller',
        'initials' : 'EM',
        'email' : 'emanuelmüller@gmail.de',
        'password' : '!P3Lm?',
        'phone' : '0123456789',
        'badge-color' : 11,
        'contacts' : [2]
    },
    {
        'id' : 2,
        'name' : 'Manuel Bauer',
        'initials' : 'MB',
        'email' : 'manuelbauer@gmail.de',
        'password' : 'passwort',
        'phone' : '0123456788',
        'badge-color' : 6,
        'contacts' : [1,2]
    },
    {
        'id' : 3,
        'name' : 'Anna Mayer',
        'initials' : 'AM',
        'email' : 'annamayer@gmail.de',
        'password' : 'Passwort',
        'phone' : '0123456787',
        'badge-color' : 9,
        'contacts' : [1,2,3]
    },
    {
        'id' : 4,
        'name' : 'Joachim Baum',
        'initials' : 'JM',
        'email' : 'jb@gmail.de',
        'password' : 'Passwort',
        'phone' : '0123466787',
        'badge-color' : 7,
        'contacts' : [1,5,3]
    },
    {
        'id' : 5,
        'name' : 'Sarah Blume',
        'initials' : 'SB',
        'email' : 'sb@gmail.de',
        'password' : 'Passwort',
        'phone' : '0123454787',
        'badge-color' : 12,
        'contacts' : [1,4,3]
    },
    {
        'id' : 6,
        'name' : 'Benjamin Blümchen',
        'initials' : 'BB',
        'email' : 'bb@gmail.de',
        'password' : 'Passwort',
        'phone' : '0122354787',
        'badge-color' : 15,
        'contacts' : [1,4,3]
    },
    {
        'id' : 7,
        'name' : 'Niklas Nickel',
        'initials' : 'NN',
        'email' : 'nn@gmail.de',
        'password' : 'Passwort',
        'phone' : '2223454787',
        'badge-color' : 5,
        'contacts' : [1,4,3]
    },
    {
        'id' : 8,
        'name' : 'Fernando Garcia',
        'initials' : 'FG',
        'email' : 'fg@gmail.de',
        'password' : 'Passwort',
        'phone' : '0523454787',
        'badge-color' : 1,
        'contacts' : [1,4,3]
    },
    {
        'id' : 9,
        'name' : 'Tobias Schmidt',
        'initials' : 'TS',
        'email' : 'ts@gmail.de',
        'password' : 'Passwort',
        'phone' : '0127454787',
        'badge-color' : 3,
        'contacts' : [1,4,3]
    },
]

let contacts = [
  {
      'id' : 1,
      'userID' : 1,
      'name' : 'Emanuel Müller',
      'initials' : 'EM',
      'email' : 'emanuelmüller@gmail.de',
      'phone' : '0123456789',
      'badge-color' : 1,
  },
  {
      'id' : 2,
      'userID' : 2,
      'name' : 'Manuel Bauer',
      'initials' : 'MB',
      'email' : 'manuelbauer@gmail.de',
      'phone' : '0123456788',
      'badge-color' : 2,
  },
  {
      'id' : 3,
      'userID' : -1, // Contact who isn't an active JOIN User
      'name' : 'Tina Meier',
      'initials' : 'TM',
      'email' : 'tinameier@gmail.de',
      'phone' : '0839920239',
      'badge-color' : 3,
  },{
      'id' : 4,
      'userID' : -1,
      'name' : 'Alex Schmidt',
      'initials' : 'AS',
      'email' : 'alexschmidt@gmail.de',
      'phone' : '0173902384',
      'badge-color' : 4,
  },
  {
      'id' : 5,
      'userID' : -1,
      'name' : 'Sina Reuter',
      'initials' : 'SR',
      'email' : 'sindreuter@gmail.de',
      'phone' : '0190234312',
      'badge-color' : 5,
  }
]

let currentUser = 
  {
    'id' : 1,
    'name' : 'Emanuel Müller',
    'initials' : 'EM',
    'email' : 'emanuelmüller@gmail.de',
    'password' : '!P3Lm?',
    'phone' : '0123456789',
    'badge-color' : 11,
    'contacts' : [2]
  }
;

// #############################################################################################################################################

let currentTask;

let taskStateCategories = ["to-do", "in-progress", "await-feedback", "done"];

/* ===================================================================================================================================== */

/**
 * Onload function to load and render the content
 */
function initBoard() {
  renderAllTasks();
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
 * HTML Template - for no-task-container
 * 
 * @param {string} taskStateCategory - e.g. 'to-do'
 * @returns HTML for no-task-container
 */
function noTaskContainerHTML(taskStateCategory) {
  return /*html*/`
    <div class="no-task-container">
      <span>No tasks ${taskStateCategory}</span>
    </div>
  `;
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
 * HTML Template - for Board Task
 * 
 * @param {JSON} taskJSON - JSON Element with the informations of the task
 * @returns HTML for Board Task
 */
function generateBoardTaskHTML(taskJSON) {
  return /*html*/ `
    <div id="task-${taskJSON['id']}-container" class="task-container" onclick="openPopup(${taskJSON['id']})" draggable="true" ondragstart="startDragging(${taskJSON['id']},event)" ondrag="drag(event)"  ondragend="dragEnd(event)"  ontouchstart="touchStart(${taskJSON['id']},event)" ontouchmove="touchDrag(event)" ontouchend="touchEnd(event)">
        <div class="task-category bc-${taskJSON['category_color']}">${taskJSON['category']}</div>
        <div class="task-text">
            <div class="task-title">${taskJSON['title']}</div>
            <div class="task-description">${shortenString(taskJSON['description'],50)}</div>
        </div>
       ${generateBoardSubtasksHTML(taskJSON)}
        <div class="task-assignments-prio-container">
            <div class="task-assignments">
                ${generateAssignedUserBadges(taskJSON)}
            </div>
            <div class="task-prio">
                <img src="./assets/img/prio-${taskJSON['priority']}.svg" alt="prio-media-symbol">
            </div>
        </div>
    </div>
   `;
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
 * HTML Template - for Subtasks in Board-Task HTML
 * 
 * @param {number} subtasksDone - amount of all subtasks that are done
 * @param {number} procentualAmountDone - procentual amount of subtasks completed
 * @param {Array} subtasks - Array of all subtasks for the task
 * @returns HTML
 */
function boardSubtasksContainerHTML(subtasksDone,procentualAmountDone,subtasks) {
  return /*html*/`
  <div class="task-subtask-progress-container">
     <div class="subtask-progress-bar">
         <div class="subtask-progress-bar-fill" style="width: ${procentualAmountDone}%"></div>
     </div>
     <div class="subtask-progress-text">${subtasksDone}/${subtasks.length} Subtasks</div>
  </div>
`;
}



/**
 * Generates profile badges HTML for assigned users
 * 
 * @param {JSON} taskJSON - JSON Element with the informations of the task
 * @returns HTML
 */
function generateAssignedUserBadges(taskJSON) {
  let assignedUserBadgesHTML = '';
  let assignedUsersIDs = taskJSON['assigned_to'];
  for (let i = 0; i < assignedUsersIDs.length; i++) {
    let user = users.filter((user) => user['id'] == assignedUsersIDs[i])[0];
    if (user && i < 5) {
      assignedUserBadgesHTML += /*html*/`
      <div class="profile-badge bc-${user['badge-color']}" style="left: -${(i * 8)}px">${user['initials']}</div>
    `;
    } else if(i == 5) {
      assignedUserBadgesHTML += /*html*/`
      <div class="profile-badge" style="left: -${(i * 8)}px; background-color: #2A3647;">+${assignedUsersIDs.length - 5}</div>
    `;
    }
  };
  return assignedUserBadgesHTML;
}




/* ======================== */
/* ===== BOARD SEARCH ===== */
/* ======================== */

let search = '';


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
  popupContainer.innerHTML = /*html*/`
    <div class="popup-task-container">
    <div class="popup-task-header">
        <div class="task-category bc-${task['category_color']}">${task['category']}</div>
        <button class="close-button" onclick="closePopup()">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_81722_982" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
                <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_81722_982)">
                <path d="M15.9998 17.3998L11.0998 22.2998C10.9165 22.4831 10.6831 22.5748 10.3998 22.5748C10.1165 22.5748 9.88314 22.4831 9.6998 22.2998C9.51647 22.1165 9.4248 21.8831 9.4248 21.5998C9.4248 21.3165 9.51647 21.0831 9.6998 20.8998L14.5998 15.9998L9.6998 11.0998C9.51647 10.9165 9.4248 10.6831 9.4248 10.3998C9.4248 10.1165 9.51647 9.88314 9.6998 9.6998C9.88314 9.51647 10.1165 9.4248 10.3998 9.4248C10.6831 9.4248 10.9165 9.51647 11.0998 9.6998L15.9998 14.5998L20.8998 9.6998C21.0831 9.51647 21.3165 9.4248 21.5998 9.4248C21.8831 9.4248 22.1165 9.51647 22.2998 9.6998C22.4831 9.88314 22.5748 10.1165 22.5748 10.3998C22.5748 10.6831 22.4831 10.9165 22.2998 11.0998L17.3998 15.9998L22.2998 20.8998C22.4831 21.0831 22.5748 21.3165 22.5748 21.5998C22.5748 21.8831 22.4831 22.1165 22.2998 22.2998C22.1165 22.4831 21.8831 22.5748 21.5998 22.5748C21.3165 22.5748 21.0831 22.4831 20.8998 22.2998L15.9998 17.3998Z" fill="#2A3647"/>
                </g>
            </svg>                            
        </button>
    </div>
    <h2 id="popup-task-title" class="popup-task-title">${task['title']}</h2>
    <p id="popup-task-description" class="popup-task-description">${task['description']}</p>
    <div class="popup-task-info-container">
        <div class="popup-task-info-title">Due Date:</div>
        <div class="popup-task-info">${task['due_date']}</div>
    </div>
    <div id="popup-task-priority-container" class="popup-task-info-container">
        <div class="popup-task-info-title">Priority:</div>
        <div class="popup-task-info">
            <span>${prioToText(`${task['priority']}`)}</span>
            <img src="./assets/img/prio-${task['priority']}.svg" alt="prio-${task['priority']}">  
        </div>
    </div>
    ${generatePopupAssignedToContainerHTML(task)}
    ${generatePopupSubtasksContainerHTML(task)}
    <div class="popup-task-footer">
        <button id="popup-task-delete-button" class="btn-task-edit" onclick="deleteTask(${taskID})">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_81758_217" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_81758_217)">
              <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
            </g>
          </svg>
            <div>Delete</div>
        </button>
        <div class="v-line-separator"></div>
        <button id="popup-task-edit-button" class="btn-task-edit" onclick="editTask(${taskID})">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_81758_502" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_81758_502)">
              <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
            </g>
          </svg>
          <div>Edit</div>
        </button>
    </div>
  </div>
  `;
}

function closePopup() {
  let popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = 'none';
}

function prioToText(prio) {
  let prioAsText = ['High', 'Medium', 'Low'];
  return prioAsText[prio-1]; // started counting at 1 not 0
}


function generatePopupAssignedToContainerHTML(task) {
  let html = '';
  if (task['assigned_to'].length > 0) {
    html = /*html*/`
    <div id="popup-task-assigned-to-container" class="popup-task-info-container flex-column gap-8px overflow-hidden">
        <div class="popup-task-info-title">Assigned To:</div>
        <div class="popup-task-info overflow-y-scroll">
            <ul class="contacts-list">
              ${generatePopupContactsHTML(task)}
            </ul>
        </div>
    </div>
    
  `
  };

  return html;
}


function generatePopupContactsHTML(task) {
  let contactList = '';
  for (let i = 0; i < task['assigned_to'].length; i++) {
    let user = users.find( user => user['id'] == task['assigned_to'][i]);
    contactList += /*html*/`
      <li class="contacts-list-item">
        <div class="profile-badge bc-${user['badge-color']} width-40 border-2px">${user['initials']}</div>
        <div class="contact-name">${user['name']}</div>
      </li>  
    `;
  }
  return contactList;
}


function generatePopupSubtasksContainerHTML(task) {
  let html = '';
  if (task['subtasks'].length > 0) {
    html = /*html*/`
      <div class="popup-task-info-container flex-column gap-8px overflow-hidden">
        <div class="popup-task-info-title">Subtasks:</div>
        <div class="popup-task-info overflow-y-scroll">
            <ul class="subtasks-list">
                ${generatePopupSubtasksHTML(task)} 
            </ul>
        </div>
      </div>
    `;
  };
  return html;
}

function generatePopupSubtasksHTML(task) {
  let html = '';
  let checkButtonsSRC = ['./assets/img/check_button_unchecked.svg','./assets/img/check_button_checked.svg']
  for (let i = 0; i < task['subtasks'].length; i++) {
    let done = task['subtasks'][i]['done'];
    html += /*html*/`
      <li class="subtasks-list-item" onclick="toggleSubtaskState(${task['id']},${i})">
          <img id="subtask-${i}-checkbutton" src="${checkButtonsSRC[+done]}" alt="checked-icon">
          <div>${task['subtasks'][i]['subtask']}</div>
      </li>          
    `;
  }
  return html;
}


function toggleSubtaskState(taskID, subtaskIndex) {
  let task = tasks.find(task => task['id'] == taskID);
  let subtask = task['subtasks'][subtaskIndex];
  subtask['done'] = subtask['done']? false:true;
  let checkButtonsSRC = ['./assets/img/check_button_unchecked.svg','./assets/img/check_button_checked.svg']
  let img = document.getElementById(`subtask-${subtaskIndex}-checkbutton`);
  img.src = checkButtonsSRC[+subtask['done']];
  // TODO: save tasks
}


function deleteTask(taskID) {
  let taskIndex = tasks.findIndex(task => task['id'] == taskID);
  tasks.splice(taskIndex,1);
  closePopup();
  renderAllTasks();
}





/* =================================== */
/* ===== EDIT TASK - POP UP VIEW ===== */
/* =================================== */


function editTask(taskID) {
  let task = tasks.find(task => task['id'] == taskID);
  let popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = 'flex';
  popupContainer.innerHTML = /*html*/`
    <div class="popup-task-edit-container">
                <div class="popup-task-edit-header">
                    <div class="empty"></div>
                    <button class="close-button" onclick="closePopup()">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_81722_982" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
                            <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_81722_982)">
                            <path d="M15.9998 17.3998L11.0998 22.2998C10.9165 22.4831 10.6831 22.5748 10.3998 22.5748C10.1165 22.5748 9.88314 22.4831 9.6998 22.2998C9.51647 22.1165 9.4248 21.8831 9.4248 21.5998C9.4248 21.3165 9.51647 21.0831 9.6998 20.8998L14.5998 15.9998L9.6998 11.0998C9.51647 10.9165 9.4248 10.6831 9.4248 10.3998C9.4248 10.1165 9.51647 9.88314 9.6998 9.6998C9.88314 9.51647 10.1165 9.4248 10.3998 9.4248C10.6831 9.4248 10.9165 9.51647 11.0998 9.6998L15.9998 14.5998L20.8998 9.6998C21.0831 9.51647 21.3165 9.4248 21.5998 9.4248C21.8831 9.4248 22.1165 9.51647 22.2998 9.6998C22.4831 9.88314 22.5748 10.1165 22.5748 10.3998C22.5748 10.6831 22.4831 10.9165 22.2998 11.0998L17.3998 15.9998L22.2998 20.8998C22.4831 21.0831 22.5748 21.3165 22.5748 21.5998C22.5748 21.8831 22.4831 22.1165 22.2998 22.2998C22.1165 22.4831 21.8831 22.5748 21.5998 22.5748C21.3165 22.5748 21.0831 22.4831 20.8998 22.2998L15.9998 17.3998Z" fill="#2A3647"/>
                            </g>
                        </svg>                            
                    </button>
                </div>
                <div class="popup-task-edit-main">
                  <!-- Title -->
                  <div class="popup-task-edit-info-container">
                      <div class="popup-task-edit-info-headline">Title</div>
                      <div class="input-field-container"  onclick="setFocusOnInput('input-title')">
                          <input id="input-title" type="text" value="${task['title']}">
                      </div>
                  </div>
                  <!-- Description -->
                  <div class="popup-task-edit-info-container">
                      <div class="popup-task-edit-info-headline">Description</div>
                      <div class="textarea-field-container"  onclick="setFocusOnInput('input-description')">
                          <textarea id="input-description" type="text">${task['description']}</textarea>
                      </div>
                  </div>
                   <!-- Due Date -->
                   <div class="popup-task-edit-info-container">
                      <div class="popup-task-edit-info-headline">Due Date</div>
                      <div class="input-field-container pos-rel"  onclick="setFocusOnInput('input-due-date')" >
                          <input id="input-due-date" type="date" value="${task['due_date']}" min="${currentDate()}">
                          <svg class="input-date-img" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <mask id="mask0_81758_1232" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                              <rect width="24" height="24" fill="#D9D9D9"/>
                              </mask>
                              <g mask="url(#mask0_81758_1232)">
                              <path d="M14.5 18C13.8 18 13.2083 17.7583 12.725 17.275C12.2417 16.7917 12 16.2 12 15.5C12 14.8 12.2417 14.2083 12.725 13.725C13.2083 13.2417 13.8 13 14.5 13C15.2 13 15.7917 13.2417 16.275 13.725C16.7583 14.2083 17 14.8 17 15.5C17 16.2 16.7583 16.7917 16.275 17.275C15.7917 17.7583 15.2 18 14.5 18ZM5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V3C6 2.71667 6.09583 2.47917 6.2875 2.2875C6.47917 2.09583 6.71667 2 7 2C7.28333 2 7.52083 2.09583 7.7125 2.2875C7.90417 2.47917 8 2.71667 8 3V4H16V3C16 2.71667 16.0958 2.47917 16.2875 2.2875C16.4792 2.09583 16.7167 2 17 2C17.2833 2 17.5208 2.09583 17.7125 2.2875C17.9042 2.47917 18 2.71667 18 3V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8Z" fill="#2A3647"/>
                              </g>
                          </svg>    
                      </div>
                  </div>
                   <!-- Prio -->
                   <div class="popup-task-edit-info-container">
                      <div class="popup-task-edit-info-headline">Priority</div>
                      <div class="prio-buttons-container">
                          <button id="prio-button-1" class="prio-button" onclick="selectPrio(1)">
                              <span>Urgent</span>
                              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.00002 4.75476C9.19945 4.75443 9.39372 4.81633 9.55427 4.93137L17.1228 10.3653C17.2212 10.4361 17.3044 10.525 17.3675 10.627C17.4307 10.7291 17.4725 10.8422 17.4907 10.9599C17.5273 11.1977 17.4654 11.4399 17.3184 11.6333C17.1714 11.8266 16.9514 11.9553 16.7068 11.9909C16.4623 12.0266 16.2131 11.9664 16.0143 11.8234L9.00002 6.7925L1.98577 11.8234C1.8873 11.8942 1.77545 11.9454 1.65662 11.9742C1.53779 12.0029 1.4143 12.0086 1.2932 11.9909C1.1721 11.9733 1.05577 11.9326 0.950844 11.8712C0.845915 11.8099 0.754446 11.729 0.681662 11.6333C0.608878 11.5375 0.556201 11.4288 0.52664 11.3132C0.49708 11.1977 0.491215 11.0776 0.509379 10.9599C0.527545 10.8422 0.569382 10.7291 0.632508 10.627C0.695632 10.525 0.778805 10.4361 0.87728 10.3653L8.44577 4.93137C8.60631 4.81633 8.80059 4.75443 9.00002 4.75476Z" fill="#FF3D00"/>
                                  <path d="M9.00002 -0.000121266C9.19945 -0.000455511 9.39372 0.0614475 9.55427 0.176482L17.1228 5.61045C17.3216 5.75336 17.454 5.96724 17.4907 6.20502C17.5273 6.4428 17.4654 6.68501 17.3184 6.87837C17.1714 7.07173 16.9514 7.20039 16.7068 7.23606C16.4623 7.27173 16.2131 7.21147 16.0143 7.06856L9.00002 2.03761L1.98577 7.06856C1.78689 7.21147 1.53777 7.27173 1.2932 7.23606C1.04863 7.20039 0.828657 7.07173 0.681662 6.87837C0.534667 6.68501 0.472695 6.4428 0.509379 6.20502C0.546065 5.96723 0.678402 5.75336 0.87728 5.61044L8.44577 0.176482C8.60631 0.0614474 8.80059 -0.000455546 9.00002 -0.000121266Z" fill="#FF3D00"/>
                              </svg>
                          </button>
                          <button id="prio-button-2" class="prio-button" onclick="selectPrio(2)">
                              <span>Medium</span>
                              <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_81273_4781)">
                                  <path d="M16.5685 7.16658L1.43151 7.16658C1.18446 7.16658 0.947523 7.06773 0.772832 6.89177C0.598141 6.71581 0.5 6.47716 0.5 6.22831C0.5 5.97947 0.598141 5.74081 0.772832 5.56485C0.947523 5.38889 1.18446 5.29004 1.43151 5.29004L16.5685 5.29004C16.8155 5.29004 17.0525 5.38889 17.2272 5.56485C17.4019 5.74081 17.5 5.97947 17.5 6.22831C17.5 6.47716 17.4019 6.71581 17.2272 6.89177C17.0525 7.06773 16.8155 7.16658 16.5685 7.16658Z" fill="#FFA800"/>
                                  <path d="M16.5685 2.7098L1.43151 2.7098C1.18446 2.7098 0.947523 2.61094 0.772832 2.43498C0.598141 2.25902 0.5 2.02037 0.5 1.77152C0.5 1.52268 0.598141 1.28403 0.772832 1.10807C0.947523 0.932105 1.18446 0.833252 1.43151 0.833252L16.5685 0.833252C16.8155 0.833252 17.0525 0.932105 17.2272 1.10807C17.4019 1.28403 17.5 1.52268 17.5 1.77152C17.5 2.02037 17.4019 2.25902 17.2272 2.43498C17.0525 2.61094 16.8155 2.7098 16.5685 2.7098Z" fill="#FFA800"/>
                                  </g>
                                  <defs>
                                  <clipPath id="clip0_81273_4781">
                                  <rect width="17" height="6.33333" fill="white" transform="translate(0.5 0.833252)"/>
                                  </clipPath>
                                  </defs>
                              </svg>    
                          </button>
                          <button id="prio-button-3" class="prio-button" onclick="selectPrio(3)">
                              <span>Low</span>
                              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_81273_4809)">
                                  <path d="M8.99974 7.24524C8.80031 7.24557 8.60603 7.18367 8.44549 7.06863L0.876998 1.63467C0.778524 1.56391 0.695351 1.47498 0.632227 1.37296C0.569103 1.27094 0.527264 1.15784 0.5091 1.0401C0.472414 0.802317 0.534386 0.560105 0.681381 0.366747C0.828377 0.17339 1.04835 0.0447247 1.29292 0.00905743C1.53749 -0.0266099 1.78661 0.0336422 1.98549 0.176559L8.99974 5.2075L16.014 0.17656C16.1125 0.105795 16.2243 0.0545799 16.3431 0.02584C16.462 -0.00289994 16.5855 -0.00860237 16.7066 0.00905829C16.8277 0.0267189 16.944 0.0673968 17.0489 0.128769C17.1538 0.190142 17.2453 0.271007 17.3181 0.366748C17.3909 0.462489 17.4436 0.571231 17.4731 0.686765C17.5027 0.802299 17.5085 0.922362 17.4904 1.0401C17.4722 1.15784 17.4304 1.27094 17.3672 1.37296C17.3041 1.47498 17.221 1.56391 17.1225 1.63467L9.55398 7.06863C9.39344 7.18367 9.19917 7.24557 8.99974 7.24524Z" fill="#7AE229"/>
                                  <path d="M8.99998 12.0001C8.80055 12.0005 8.60628 11.9386 8.44574 11.8235L0.877242 6.38955C0.678366 6.24664 0.546029 6.03276 0.509344 5.79498C0.472658 5.5572 0.53463 5.31499 0.681625 5.12163C0.828621 4.92827 1.0486 4.79961 1.29317 4.76394C1.53773 4.72827 1.78686 4.78853 1.98574 4.93144L8.99998 9.96239L16.0142 4.93144C16.2131 4.78853 16.4622 4.72827 16.7068 4.76394C16.9514 4.79961 17.1713 4.92827 17.3183 5.12163C17.4653 5.31499 17.5273 5.5572 17.4906 5.79498C17.4539 6.03276 17.3216 6.24664 17.1227 6.38956L9.55423 11.8235C9.39369 11.9386 9.19941 12.0005 8.99998 12.0001Z" fill="#7AE229"/>
                                  </g>
                                  <defs>
                                  <clipPath id="clip0_81273_4809">
                                  <rect width="17" height="12" fill="white" transform="translate(0.5)"/>
                                  </clipPath>
                                  </defs>
                              </svg>
                          </button>
                      </div>
                  </div>
                   <!-- Assigned To -->
                   <div class="popup-task-edit-info-container">
                      <div class="popup-task-edit-info-headline">Assigned to</div>
                      <div class="input-field-container assigned-to-container" onclick="setFocusOnInput('input-assigned-to');toggleContactList(${taskID})">
                        <input id="input-assigned-to" type="text" placeholder="Select contacts to assign">
                        <img id="contactsArrow" src="./assets/img/arrow_drop_down.svg" alt="">
                      </div>
                      <div id="assigned-contacts-list" class="contact-list-container d-none">
                        <div id="assigned-to-contacts" class="contact-list">
                        </div>
                        <button class="btn-filled btn-add-new-contact" onclick="addNewContact()">
                          <span>Add new contact</span>
                          <img src="./assets/img/person_add.svg" alt="add_contact">
                        </button>
                      </div>
                      <div id="assigned-contact-badges-container" class="contact-icons-container">
                          <!-- <div class="profile-badge bc-turquoise width-40px">EM</div>
                          <div class="profile-badge bc-dark-blue width-40px">MB</div>
                          <div class="profile-badge bc-orange width-40px">AM</div> -->
                      </div>
                  </div>
                   <!-- Subtasks -->
                   <div class="popup-task-edit-info-container">
                      <div class="popup-task-edit-info-headline">Subtasks</div>
                      <div class="input-field-container"  onclick="setFocusOnInput('input-subtasks')">
                          <input id="input-subtasks" type="text" placeholder="Add new subtask">
                          <button class="createNewSubtask-button">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9 1.5V16.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                                  <path d="M16.5 9.1416L1.5 9.1416" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                              </svg> 
                          </button>
                          <div class="subtask-buttons-container add-new-task-buttons">
                            <button class="btn-drop-new-subtask" onclick="dropNewSubtask()">
                                <img src="./assets/img/delete_icon.svg" alt="delete-icon">    
                            </button>
                            <div class="v-line-separator"></div>
                            <button class="btn-add-new-subtask width-24px" onclick="addNewSubtask(${taskID})">
                                <img src="./assets/img/input_check.svg" alt="check-icon">
                            </button>
                          </div>
                      </div>
                      <div id="popup-task-edit-subtasks-container" class="subtasks-container">
                      </div>
                  </div>
                </div>
                <!-- OK Button -->
                <div class="popup-task-edit-footer">
                    <button class="ok-button" type="submit">
                        <span>Ok</span>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_81835_1115" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
                            <rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_81835_1115)">
                            <path d="M9.55021 15.65L18.0252 7.175C18.2252 6.975 18.4627 6.875 18.7377 6.875C19.0127 6.875 19.2502 6.975 19.4502 7.175C19.6502 7.375 19.7502 7.6125 19.7502 7.8875C19.7502 8.1625 19.6502 8.4 19.4502 8.6L10.2502 17.8C10.0502 18 9.81687 18.1 9.55021 18.1C9.28354 18.1 9.05021 18 8.85021 17.8L4.55021 13.5C4.35021 13.3 4.25437 13.0625 4.26271 12.7875C4.27104 12.5125 4.37521 12.275 4.57521 12.075C4.77521 11.875 5.01271 11.775 5.28771 11.775C5.56271 11.775 5.80021 11.875 6.00021 12.075L9.55021 15.65Z" fill="white"/>
                            </g>
                        </svg>    
                    </button>
                </div>
            </div>
  `;
  selectPrio(task['priority']);
  renderAssignedUserBadgesEditTask(taskID);
  renderSubtasksInEditTask(taskID);
}


// Focus

function setFocusOnInput(id) {
  let input = document.getElementById(id);
  input.focus();
}

// PRIO Buttons

let currentTaskPrio;

function selectPrio(prio) {
  let prioColors = ['#ff3d00','#ffa800','#7ae229'];
  let selectedPrioButton = document.getElementById(`prio-button-${prio}`);
  removePrioSelection();
  selectedPrioButton.classList.add('selected-prio');
  document.getElementsByClassName('selected-prio')[0].style = `background-color: ${prioColors[prio - 1]};`;
  currentTaskPrio = prio;
}


function removePrioSelection() {
  if (document.getElementsByClassName('selected-prio')[0]) {
    document.getElementsByClassName('selected-prio')[0].style = `background-color: var(--color-white);`
    document.getElementsByClassName('selected-prio')[0].classList.remove('selected-prio');
  }
}

// Date

function currentDate() {
  return new Date().toISOString().split("T")[0];
}

// Assigned To
let contactsOpen = false;

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


function loadContactsIntoDropdown(taskID) {
  let container = document.getElementById('assigned-to-contacts');
  container.innerHTML = '';
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    container.innerHTML += /*html*/`
      <li class="assigned-to-contacts-list-item" onclick="toggleAssignment(${taskID},${contact['id']},'contact-${i}-checkbox')">
        <div class="assigned-to-contact">
          <div class="profile-badge bc-${contact['badge-color']} width-40px border-2px">${contact['initials']}</div>
          <div class="contact-name">${contact['name']} ${checkIfCurrentUser(contact['id'])}</div>
        </div>
        <img id="contact-${i}-checkbox" src="${checkIfAssignedTo(taskID,contact['id'])}" alt="">
      </li>
    `;
  }
}


function checkIfAssignedTo(taskID,userID) {
  let task = tasks.find(task => task['id'] == taskID);
  let isAssigned = task['assigned_to'].includes(userID);
  if (isAssigned) {
    return '/assets/img/check_button_checked.svg';
  } else {
    return '/assets/img/check_button_unchecked.svg';
  }
}



function toggleAssignment(taskID,userID,imgID) {
  let checkBoxImg = document.getElementById(imgID);
  let task = tasks.find(task => task['id'] == taskID);
  let isAssigned = task['assigned_to'].includes(userID);
  if (isAssigned) {
    let index = task['assigned_to'].indexOf(userID);
    task['assigned_to'].splice(index,1);
    checkBoxImg.src = '/assets/img/check_button_unchecked.svg';
  } else {
    task['assigned_to'].push(userID);
    checkBoxImg.src = '/assets/img/check_button_checked.svg';
  };
  // TODO: save tasks
}



function checkIfCurrentUser(contactID) {
  if (contactID == currentUser['id']) {
    return '(You)';
  } else {
    return '';
  }
}

/**
 * 
 * 
 * @param {number} taskID id of the currentTask
 */
function renderAssignedUserBadgesEditTask(taskID) {
  let task = tasks.find(task => task['id'] == taskID);
  let assignedUsers = task['assigned_to'];
  let container = document.getElementById('assigned-contact-badges-container');
  container.innerHTML = '';
  for (let i = 0; i < assignedUsers.length; i++) {
    let user = users.find(u => u['id'] == assignedUsers[i]);
    container.innerHTML += /*html*/`
      <div class="profile-badge bc-${user['badge-color']} width-40px">${user['initials']}</div>
    `;
  };
}


function renderSubtasksInEditTask(taskID) {
  let task = tasks.find(task => task['id'] == taskID);
  let subtasks = task['subtasks'];
  let container = document.getElementById('popup-task-edit-subtasks-container');
  container.innerHTML = '';
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    container.innerHTML += /*html*/`
      <div id="popup-task-edit-subtask-${i}" class="subtask-list-item">
          <ul style="margin-left: 16px;">
              <li>${subtask['subtask']}</li>
          </ul>
          <div class="subtask-buttons-container">
              <button class="btn-edit" onclick="editSubtask(${taskID},${i})">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0_81758_502" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9"/>
                      </mask>
                      <g mask="url(#mask0_81758_502)">
                      <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                      </g>
                  </svg>    
              </button>
              <div class="v-line-separator"></div>
              <button class="btn-delete" onclick="deleteSubtask(${taskID},${i})">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0_81758_217" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9"/>
                      </mask>
                      <g mask="url(#mask0_81758_217)">
                      <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                      </g>
                  </svg>
              </button>
          </div>
      </div>
    `;
  }
}


function editSubtask(taskID,subtaskIndex) {
  let task = tasks.find(task => task['id'] == taskID);
  let subtask = task['subtasks'][subtaskIndex];
  let container = document.getElementById(`popup-task-edit-subtask-${subtaskIndex}`);
  container.innerHTML = /*html*/`
    <input id="subtask-edit-input" class="subtask-edit-input" type="text" value="${subtask['subtask']}">
    <div class="subtask-buttons-container">
      <button class="btn-delete" onclick="deleteSubtask(${taskID},${subtaskIndex})" >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_81758_217" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_81758_217)">
              <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
              </g>
          </svg>
      </button>
      <div class="v-line-separator"></div>
      <button class="btn-accept width-24px" onclick="saveSubtask(${taskID},${subtaskIndex})">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.55021 9.15L14.0252 0.675C14.2252 0.475 14.4627 0.375 14.7377 0.375C15.0127 0.375 15.2502 0.475 15.4502 0.675C15.6502 0.875 15.7502 1.1125 15.7502 1.3875C15.7502 1.6625 15.6502 1.9 15.4502 2.1L6.25021 11.3C6.05021 11.5 5.81687 11.6 5.55021 11.6C5.28354 11.6 5.05021 11.5 4.85021 11.3L0.550207 7C0.350207 6.8 0.254374 6.5625 0.262707 6.2875C0.27104 6.0125 0.375207 5.775 0.575207 5.575C0.775207 5.375 1.01271 5.275 1.28771 5.275C1.56271 5.275 1.80021 5.375 2.00021 5.575L5.55021 9.15Z" fill="#2A3647"/>
        </svg>
      </button>
    </div>
  `;
}


function saveSubtask(taskID,subtaskIndex) {
  let task = tasks.find(task => task['id'] == taskID);
  let subtask = task['subtasks'][subtaskIndex];
  let input = document.getElementById(`subtask-edit-input`);
  subtask['subtask'] = input.value;
  renderSubtasksInEditTask(taskID);
  // TODO: save Task
}

function deleteSubtask(taskID,subtaskIndex) {
  let task = tasks.find(task => task['id'] == taskID);
  task['subtasks'].splice(subtaskIndex,1);
  renderSubtasksInEditTask(taskID);
  // TODO: save task
}

function addNewSubtask(taskID) {
  let task = tasks.find(task => task['id'] == taskID);
  let input = document.getElementById(`input-subtasks`);
  let newSubtask = {
      done: false,
      subtask: `${input.value}`,
  };
  task['subtasks'].push(newSubtask);
  dropNewSubtask();
  renderSubtasksInEditTask(taskID);
}

function dropNewSubtask() {
  let input = document.getElementById(`input-subtasks`);
  input.value = '';
  document.activeElement.blur();
}

















/* ============================= */
/* ===== DRAG & DROP MOUSE ===== */
/* ============================= */

let currentDraggedElement;
let taskWidth;


/**
 * function called ondragstart of task-container Element
 * - sets currentDraggedElement
 * - creates dragable Clone
 * 
 * @param {number} id - current task-container id
 * @param {event} ev 
 */
function startDragging(id,ev) {
  currentDraggedElement = id;
  let task = document.getElementById(`task-${id}-container`);
  taskWidth = task.offsetWidth;
  let visibleTaskClone = task.cloneNode(true);
  visibleTaskClone.id = 'visibleTaskClone';
  visibleTaskClone.style = `
    pointer-events: none;
    opacity: 0;
    position: absolute;
    left:  ${ev.pageX - ev.offsetX};
    top:  ${ev.pageY - ev.offsetY};
    transform: translate(-${ev.offsetX}px,-${ev.offsetY}px);
  `;
  document.body.appendChild(visibleTaskClone);
  ev.dataTransfer.setDragImage(visibleTaskClone, ev.offsetX, ev.offsetY);
  dragScrollActive = true; // for dragScroll
}



/**
 * function called ondragover task-section
 * - cancel the dafault action of a div for ondragenter and ondragover to allow ondrop
 * 
 * @param {event} event 
 */
function allowDrop(event,id) {
  event.preventDefault();
  createTaskDropIndication(id);
}



/**
 * function called ondrop over task-section
 * - change status of the current task
 * - render all tasks to update view
 * 
 * @param {string} taskStateCategory e.g. 'to-do', 'done' ...
 */
function moveTo(taskStateCategory) {
  let index = tasks.findIndex(task => task['id'] == currentDraggedElement);
  tasks[index]['status'] = taskStateCategory;
  tasks.push(tasks.splice(index,1)[0]); //move task to the last position in the array
  renderAllTasks();
}



/**
 * function called ondrag of task-container
 * - let the visible clone follow the cursor
 * 
 * @param {event} event 
 */
function drag(event) {
  visibleTaskClone = document.getElementById('visibleTaskClone');
  if (visibleTaskClone) {
    document.body.style.overflow = 'hidden'; // to stop the element from interacting with the body
    visibleTaskClone.style.opacity = 1;
    visibleTaskClone.style.left = event.pageX + 'px';
    visibleTaskClone.style.top = event.pageY + 'px';
    if (event.pageX == 0 || event.pageY == 0) { // if mouse is outside the page => hide the element
      visibleTaskClone.style.opacity = 0;
    }
  }
}



/**
 * function called ondragend of task-container
 * - removes the visible clone
 */
function dragEnd(ev) {
  let visibleTaskClone = document.getElementById('visibleTaskClone');
  document.body.style.overflow = 'auto';
  visibleTaskClone.style.opacity = 0;
  visibleTaskClone.remove();
  dragScrollActive = false;
}





let dropIndicationExists = false;


/**
 * add html for to indicate task drop
 * 
 * @param {string} id - of the section tasks container e.g. 'section-to-do-tasks-container'
 */
function createTaskDropIndication(id) {
  let tasksContainer = document.getElementById(id);
  hideNoTaskContainer(id);
  if (!dropIndicationExists) {
    tasksContainer.innerHTML += /*html*/`
      <div id="task-container-indication" style="min-width: ${taskWidth}px;"></div> 
    `;
    dropIndicationExists = true;
  }
}


/**
 * remove html for task drop indication
 * 
 * @param {string} id - of the section tasks container e.g. 'section-to-do-tasks-container'
 */
function removeTaskDropIndication(id) {
  dropIndicationExists = false;
  let dashedContainer = document.getElementById('task-container-indication');
  if (dashedContainer) {
    dashedContainer.remove();
  };
  showNoTaskContainer(id);
}



/**
 * add display: none to no-task-container
 * 
 * @param {string} id - of the section tasks container e.g. 'section-to-do-tasks-container'
 */
function hideNoTaskContainer(id) {
  let tasksContainer = document.getElementById(id);
  // let notaskContainer = tasksContainer.getElementsByClassName('no-task-container')[0];
  if (tasksContainer.getElementsByClassName('no-task-container')[0] != null) {
    tasksContainer.getElementsByClassName('no-task-container')[0].classList.add('d-none');
  }
}



/**
 * remove display: none from no-task-container
 * 
 * @param {string} id - of the section tasks container e.g. 'section-to-do-tasks-container'
 */
function showNoTaskContainer(id) {
  let tasksContainer = document.getElementById(id);
  let notaskContainer = tasksContainer.getElementsByClassName('no-task-container')[0];
  if (notaskContainer) {
    notaskContainer.classList.remove('d-none');
  }
}



/* ============================= */
/* ===== DRAG & DROP TOUCH ===== */
/* ============================= */

let dragScrollActive = false;
let startTaskSection;


/**
 * function called ontouchstart of task-container Element
 * - sets currentDraggedElement
 * - creates dragable Clone
 * 
 * @param {number} id - current task-container id
 * @param {event} ev  - touchstart
 */
function startTouchDragging(id,ev) {
  startTaskSection = getDraggedOverZone(ev);
  currentDraggedElement = id;
  let task = document.getElementById(`task-${id}-container`);
  taskWidth = task.offsetWidth;
  task.classList.toggle('grabbed-task'); // indicate grabbed element
  let offsetX = ev.touches[0].pageX - ev.target.getBoundingClientRect().left;
  let offsetY = ev.touches[0].pageY - ev.target.getBoundingClientRect().top;
  let visibleTaskClone = task.cloneNode(true);
  visibleTaskClone.id = 'visibleTaskClone';
  visibleTaskClone.style = `
    opacity: 0;
    position: absolute;
    left:  ${ev.touches[0].pageX - offsetX};
    top:  ${ev.touches[0].pageY - offsetY};
    transform: translate(-${offsetX}px,-${offsetY}px);
  `;
  document.body.appendChild(visibleTaskClone);
  dragScrollActive = true;
}

let currentDraggedOverContainer= ''; 

/**
 * function called ontouchmove of task-container
 * - let the visible clone follow the cursor
 * 
 * @param {event} event - touchmove
 */
function touchDrag(event) {
  if (onlongtouch) {
    visibleTaskClone = document.getElementById('visibleTaskClone');
    if (event.cancelable) {
      event.preventDefault(); // prevent touch scrolling while holding the element
      event.stopPropagation();
    }
    if (visibleTaskClone) {
      visibleTaskClone.style.opacity = 1;
      visibleTaskClone.style.left = event.changedTouches[0].pageX + 'px';
      visibleTaskClone.style.top = event.changedTouches[0].pageY + 'px';
    }
    // check if touch is in dragzone
    let dragoverContainerID = getDraggedOverZone(event);
    // console.log(dragoverContainerID);
    dragoverContainerID += '-tasks-container';
    // console.log(dropIndicationExists,currentDraggedOverContainer,dragoverContainerID);
    // if there is no dashed container => create one and hide the empty box
    if (!dropIndicationExists && currentDraggedOverContainer != dragoverContainerID && dragoverContainerID != '') {
      createTaskDropIndication(dragoverContainerID);
      currentDraggedOverContainer = dragoverContainerID;
    } else if (dropIndicationExists && currentDraggedOverContainer != dragoverContainerID) {
      removeTaskDropIndication(currentDraggedOverContainer);
      // currentDraggedOverContainer = dragoverContainerID;
  }
  }
  
}

function getDraggedOverZone(event) {
  let toDo = document.getElementById('section-to-do').getBoundingClientRect();
  let inProgress = document.getElementById('section-in-progress').getBoundingClientRect();
  let awaitFeedback = document.getElementById('section-await-feedback').getBoundingClientRect();
  let done = document.getElementById('section-done').getBoundingClientRect();
  // check if touch is in dropzone
  let droppedIn_toDo = checkIfDropIsInZone(toDo,event);
  let droppedIn_inProgress = checkIfDropIsInZone(inProgress,event);
  let droppedIn_awaitFeedback = checkIfDropIsInZone(awaitFeedback,event);
  let droppedIn_done = checkIfDropIsInZone(done,event);
  let dropzones = [droppedIn_toDo,droppedIn_inProgress,droppedIn_awaitFeedback,droppedIn_done];
  let containers = ['section-to-do','section-in-progress','section-await-feedback','section-done'];
  let dropID = startTaskSection;
  for (let i = 0; i < dropzones.length; i++) {
    if(dropzones[i]) {
       dropID = containers[i];
    }; 
  };
  return dropID;
}


/**
 * 
 * @param {event} event - touchend
 */
function touchDrop(event) {
  dragEnd();
  let dragoverContainerID = getDraggedOverZone(event); 
  // define dropzones
  // let toDo = document.getElementById('section-to-do').getBoundingClientRect();
  // let inProgress = document.getElementById('section-in-progress').getBoundingClientRect();
  // let awaitFeedback = document.getElementById('section-await-feedback').getBoundingClientRect();
  // let done = document.getElementById('section-done').getBoundingClientRect();
  // // check if touch is in dropzone
  // let droppedIn_toDo = checkIfDropIsInZone(toDo,event);
  // let droppedIn_inProgress = checkIfDropIsInZone(inProgress,event);
  // let droppedIn_awaitFeedback = checkIfDropIsInZone(awaitFeedback,event);
  // let droppedIn_done = checkIfDropIsInZone(done,event);
  // let dropzones = [droppedIn_toDo,droppedIn_inProgress,droppedIn_awaitFeedback,droppedIn_done];
  // move to Area
  // touchMovetoDropzone(dropzones);
  touchMovetoDropzone(dragoverContainerID);
  if (dragoverContainerID == '') {
    removeTaskDropIndication(startTaskSection);
  } else {
    removeTaskDropIndication(dragoverContainerID);
  };
  dragScrollActive = false;
}



/**
 * check if the last touch position is inside a task section (dropzone)
 * 
 * @param {object} dropContainer - section.getBoundingClientRect() -> Bounding Box of section
 * @param {event} event  - touchend
 * @returns 
 */
function checkIfDropIsInZone(dropContainer,event) {
  let touchX = event.changedTouches[0].pageX;
  let touchY = event.changedTouches[0].pageY;
  return (dropContainer.right > touchX &&
          dropContainer.left < touchX &&
          dropContainer.bottom > touchY &&
          dropContainer.top < touchY);
}



/**
 * check in which dropzone the task was dropped and move it there
 * 
 * @param {array} dropzones - array of all dropzone states
 */
// function touchMovetoDropzone(dropzones) {
//   let inAnyDropZone = false;
//   for (let i = 0; i < dropzones.length; i++) {
//       if (dropzones[i]) {
//         moveTo(taskStateCategories[i]);
//         inAnyDropZone = true;
//     }
//   }
//   if (!inAnyDropZone) {
//     document.getElementsByClassName('grabbed-task')[0].classList.remove('grabbed-task');
//   } 
// }

function touchMovetoDropzone(id) {
  if (id != '') {
    let stateCatgory = id.replace('section-','');
    // console.log(stateCatgory);
    moveTo(stateCatgory)
  } else {
    document.getElementsByClassName('grabbed-task')[0].classList.remove('grabbed-task');
  }
}



/**
 * scroll in main container when touchDragging a task-container
 */
function dragScroll() {
  // Vertical Scroll
  if (dragScrollActive) {
    let header = document.getElementsByTagName('header')[0].getBoundingClientRect();
    let footer = document.getElementsByTagName('footer')[0].getBoundingClientRect();
    let visibleTaskClone = document.getElementById('visibleTaskClone').getBoundingClientRect();
    if (visibleTaskClone.top < header.bottom) {
      document.getElementsByTagName('main')[0].scrollTop -= 10;
    }
    if (visibleTaskClone.bottom > footer.top) {
      document.getElementsByTagName('main')[0].scrollTop += 10;
    }
  }
}

setInterval(dragScroll, 25);


// LONG TOUCH
let onlongtouch = false;
let timer = false;
let duration = 1000;

function touchStart(id,event){
  if (!timer) {
    timer = setTimeout(function() {
      onlongtouch = true;
      startTouchDragging(id,event);
    }, duration);
  }
}

function touchEnd(event){
  if (timer) {
    clearTimeout(timer)
    timer = false;
    if (onlongtouch) {
      touchDrop(event);
    }
    onlongtouch = false;
  }
}

