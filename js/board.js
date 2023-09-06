let tasks = [
  {
    id: 0,
    status: "to-do",
    category: "User Story",
    category_color: 11, 
    title: "Kochwelt Page & Recipe Recommender",
    description: "Build start page with recipe recommendation...",
    due_date: "10/05/2023",
    priority: 2,
    assigned_to: [1, 2, 3, 4, 5,6,7,8,9],
    subtasks: [
      {
        done: true,
        subtask: "Implement Recipe Recommendation",
      },
      {
        done: false,
        subtask: "Start Page Layout",
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
    due_date: "02/09/2023",
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

let taskStateCategories = ["to-do", "in-progress", "await-feedback", "done"];

/* ===================================================================================================================================== */

// Board Tasks


/**
 * Onload function to load and render the content
 */
function initBoard() {
  renderAllTasks();
}


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
  if (allTasksInState.length == 0) {
    renderNoTasksContainer(taskStateCategory, tasksContainer);
  } else {
    for (let i = 0; i < allTasksInState.length; i++) {
      const taskJSON = allTasksInState[i];
      tasksContainer.innerHTML += generateBoardTaskHTML(taskJSON);
    }
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
    <div id="task-${taskJSON['id']}-container" class="task-container" onclick="openPopup(${taskJSON['id']})" draggable="true" ondragstart="startDragging(${taskJSON['id']},event)" ondrag="drag(event)"  ondragend="dragEnd(event)" ontouchstart="startTouchDragging(${taskJSON['id']},event)" ontouchmove="touchDrag(event)" ontouchend="touchDrop(event)">
        <div class="task-category bc-${taskJSON['category_color']}">${taskJSON['category']}</div>
        <div class="task-text">
            <div class="task-title">${taskJSON['title']}</div>
            <div class="task-description">${taskJSON['description']}</div>
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
      <div class="profile-badge" style="left: -${(i * 8)}px; background-color: lightgrey;">...</div>
    `;
    }
  };
  return assignedUserBadgesHTML;
}



/* ================================================================================================================= */

// POPUP VIEW

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
        <button id="popup-task-delete-button" onclick="deleteTask()">
            <img src="./assets/img/delete_icon.svg" alt="delete-icon">
            <div>Delete</div>
        </button>
        <div class="v-line-separator"></div>
        <button id="popup-task-edit-button" onclick="editTask()">
            <img src="./assets/img/edit_icon.svg" alt="delete-icon">
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
    <div id="popup-task-assigned-to-container" class="popup-task-info-container flex-column gap-8px">
        <div class="popup-task-info-title">Assigned To:</div>
        <div class="popup-task-info">
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
      <div class="popup-task-info-container flex-column gap-8px">
        <div class="popup-task-info-title">Subtasks:</div>
        <div class="popup-task-info">
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
      <li class="subtasks-list-item">
          <img src="${checkButtonsSRC[+done]}" alt="checked-icon">
          <div>${task['subtasks'][i]['subtask']}</div>
      </li>          
    `;
  }
  return html;
}















































/* =================================================================================================================== */

// DRAG & DROP


let currentDraggedElement;


/**
 * function called ondragstart of task-container Element
 * - sets currentDraggedElement
 * - creates dragable Clone
 * 
 * @param {number} id - current task-container id
 * @param {event} event 
 */
function startDragging(id, event) {
  currentDraggedElement = id;
  let task = document.getElementById(`task-${id}-container`);
  let offsetX = event.offsetX;
  let offsetY = event.offsetY;
  let visibleTaskClone = task.cloneNode(true);
  visibleTaskClone.id = 'visibleTaskClone';
  visibleTaskClone.style.pointerEvents = 'none';
  visibleTaskClone.style.opacity = 0;
  visibleTaskClone.style.position = 'absolute';
  visibleTaskClone.style.left = event.pageX - offsetX;
  visibleTaskClone.style.top = event.pageY - offsetY;
  visibleTaskClone.style.transform = `translate(-${offsetX}px,-${offsetY}px)`;
  document.body.appendChild(visibleTaskClone);
  event.dataTransfer.setDragImage(visibleTaskClone, offsetX, offsetY);
}

function startTouchDragging(id, event) {
  currentDraggedElement = id;
  let task = document.getElementById(`task-${id}-container`);
  let offsetX = event.touches[0].pageX - event.target.getBoundingClientRect().left;
  let offsetY = event.touches[0].pageY - event.target.getBoundingClientRect().top;
  let visibleTaskClone = task.cloneNode(true);
  visibleTaskClone.id = 'visibleTaskClone';
  visibleTaskClone.style.pointerEvents = 'none'; // TODO: Touch EVENTS?
  visibleTaskClone.style.opacity = 0;
  visibleTaskClone.style.position = 'absolute';
  visibleTaskClone.style.left = event.touches[0].pageX - offsetX;
  visibleTaskClone.style.top = event.touches[0].pageY - offsetY;
  visibleTaskClone.style.transform = `translate(-${offsetX}px,-${offsetY}px)`;
  document.body.appendChild(visibleTaskClone);
  // event.dataTransfer.setDragImage(visibleTaskClone, 0, 0);
}



/**
 * function called ondragover task-section
 * - cancel the dafault action of a div for ondragenter and ondragover to allow ondrop
 * 
 * @param {event} event 
 */
function allowDrop(event) {
  event.preventDefault();
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


function touchDrag(event) {
  visibleTaskClone = document.getElementById('visibleTaskClone');
  event.preventDefault(); // prevent touch scrolling while holding the element
  if (visibleTaskClone) {
    document.body.style.overflow = 'hidden'; // to stop the element from interacting with the body
    visibleTaskClone.style.opacity = 1;
    visibleTaskClone.style.left = event.changedTouches[0].pageX + 'px';
    visibleTaskClone.style.top = event.changedTouches[0].pageY + 'px';
    if (event.changedTouches[0].pageX == 0 || event.changedTouches[0].pageY == 0) { // if mouse is outside the page => hide the element
      visibleTaskClone.style.opacity = 0;
    }
  }

  // Vertical Scroll With Item Holding
  let header = document.getElementsByTagName('header')[0].getBoundingClientRect();
  let footer = document.getElementsByTagName('footer')[0].getBoundingClientRect();

  if (event.changedTouches[0].pageY < header.bottom) {
    document.getElementsByTagName('main')[0].scrollTop -= 10;
  }
  if (event.changedTouches[0].pageY > footer.top) {
    document.getElementsByTagName('main')[0].scrollTop += 10;
  }
}


/**
 * function called ondragend of task-container
 * - removes the visible clone
 * 
 * @param {event} event 
 */
function dragEnd(event) {
  let visibleTaskClone = document.getElementById('visibleTaskClone');
  document.body.style.overflow = 'auto';
  visibleTaskClone.style.opacity = 0;
  visibleTaskClone.remove();
}


function touchDrop(event) {
  // remove visible task clone
  let visibleTaskClone = document.getElementById('visibleTaskClone');
  document.body.style.overflow = 'auto';
  visibleTaskClone.style.opacity = 0;
  visibleTaskClone.remove();

  // get dropzones
  let toDo = document.getElementById('section-to-do').getBoundingClientRect();
  let inProgress = document.getElementById('section-in-progress').getBoundingClientRect();
  let awaitFeedback = document.getElementById('section-await-feedback').getBoundingClientRect();
  let done = document.getElementById('section-done').getBoundingClientRect();

  let touchX = event.changedTouches[0].pageX;
  let touchY = event.changedTouches[0].pageY;
  
  // check if touch is in section Area
  let dropArea_toDo = (toDo.right > touchX &&
                        toDo.left < touchX &&
                        toDo.bottom > touchY &&
                        toDo.top < touchY);

  let dropArea_inProgress = (inProgress.right > touchX &&
                        inProgress.left < touchX &&
                        inProgress.bottom > touchY &&
                        inProgress.top < touchY);

  let dropArea_awaitFeedback = (awaitFeedback.right > touchX &&
                        awaitFeedback.left < touchX &&
                        awaitFeedback.bottom > touchY &&
                        awaitFeedback.top < touchY);

  let dropArea_done = (done.right > touchX &&
                        done.left < touchX &&
                        done.bottom > touchY &&
                        done.top < touchY);

  // move to Area
  if (dropArea_toDo) {
    moveTo('to-do');
  };
  if (dropArea_inProgress) {
    moveTo('in-progress');
  };
  if (dropArea_awaitFeedback) {
    moveTo('await-feedback');
  };
  if (dropArea_done) {
    moveTo('done');
  };
}