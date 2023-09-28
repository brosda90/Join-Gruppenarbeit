let expanded = false;
let selectTrigger = document.querySelector('.select-trigger');

let taskStatus = localStorage.getItem('taskStatus') || 'to-do';
let taskContacts = [];
let currentTaskUser = {};
let taskUsers = [];
let loadedTasks = [];
let addedContacts = [];
let sortedTaskContacts = [];
let addedContactInitial = [];
let badges = [];
let categoryColor;
let addedSubTasks = [];

//-------------------------------------------------//
//------- Storage load and Render Functions -------//
//-------------------------------------------------//

async function initAddTask() {
    await loadTaskUsersFromStorage();
    await includeHTML()
    await loadTaskContactsFromStorage();
    await loadTasksFromRemoteStorage();

    renderContacts();
}


async function loadTaskContactsFromStorage() {
    await loadCurrentFromStorage();
    taskContacts = JSON.parse(await getItem('contacts'));
    if (taskContacts.length > 1) {
        sortContacts(taskContacts);
    } else {
        sortedContactList = taskContacts;
    }
}


async function loadTasksFromRemoteStorage() {
    loadedTasks = JSON.parse(await getItem('tasks'));
}


async function loadTaskUsersFromStorage() {
    taskUsers = JSON.parse(await getItem('users'));
}


/* async function loadCurrentFromStorage() {
    let currentUserID = localStorage.getItem('loggedInUserID');
    currentTaskUser = taskUsers.find( user => user['id'] == currentUserID)
} */

async function loadCurrentFromStorage() {
    let currentUserID = localStorage.getItem('loggedInUserID');
    if (currentUserID >= 0) {
        currentTaskUser = taskUsers.find(user => user['id'] == currentUserID)
    } else if (currentUserID == -2) {
        currentTaskUser = {
            'id': -2,
            'name': 'Guest User',
            'initials': 'GU',
            'email': '',
            'password': '',
            'phone': '',
            'badge-color': 1,
            'contacts': [],
        };
    }
}


async function sortContacts(arr) {
    sortedContactList = arr;
    sortedContactList.sort(
        (c1, c2) =>
            (c1.initials < c2.initials) ? -1 : (c1.initials > c2.initials) ? 1 : 0);
    if (currentTaskUser['id'] >= 0) {
        const currentUserIndex = sortedContactList.findIndex(contact => contact['userid'] == currentTaskUser['id']);
        const currentUserContactInfo = JSON.parse(JSON.stringify(sortedContactList[currentUserIndex]));
        sortedContactList.splice(currentUserIndex, 1);
        sortedContactList.unshift(currentUserContactInfo);
    }
}


function renderContacts() {   //render Contacts
    let assignedToContact = document.getElementById('contactDropDown');
    assignedToContact.innerHTML = '';

    for (let i = 0; i < sortedContactList.length; i++) {
        const contact = sortedContactList[i];

        assignedToContact.innerHTML += renderContactHTML(i, contact);
    }
}


/* function checkIfContactIsJoinUserAddTask(userid) {   //check if Contact is registered Join User
    if (userid < 0) {
      return 'noActiveUser';
    } else {
      return '';
    }
  } */


function checkUserState(userid) {
    if (userid == currentTaskUser['id']) {
        return '(You)'
    } else if (userid < 0) {
        return '';
    } else {
        return '(User)';
    }
}


function renderContactInitials() {   //render Contact Initals from added Contacts
    let contactInitialDivs = document.getElementById('contactInitial');
    contactInitialDivs.innerHTML = '';

    for (let l = 0; l < addedContactInitial.length; l++) {
        const inital = addedContactInitial[l];

        contactInitialDivs.innerHTML += contactInitialsHTML(l, inital);
    };
}


function renderSubTaskUpdate() {   //reload edited Sub Task
    let showSubs = document.getElementById('subTaskList');
    showSubs.innerHTML = '';

    for (let j = 0; j < addedSubTasks.length; j++) {
        const sub = addedSubTasks[j]['subtask'];
        showSubs.innerHTML += renderSubHTML(sub, j);
    };
}


//---------------------------------------------------------------//
//------- Check Buttons, Input Fields and Select Elements -------//
//---------------------------------------------------------------//


function selectPrio(button) {   //set prio button icon variable
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');

    checkPrio(button, urgent, medium, low)
}


function checkPrio(button, urgent, medium, low) {   //style selected Prio Button Svg
    urgent.classList.remove('selectedSvg');
    medium.classList.remove('selectedSvg');
    low.classList.remove('selectedSvg');

    if (button == 1) {
        urgent.classList.add('selectedSvg');
    }
    if (button == 2) {
        medium.classList.add('selectedSvg');
    }
    if (button == 3) {
        low.classList.add('selectedSvg');
    }
    selectBtn(button);
}


function selectBtn(button) {   //set prio button variable
    let urgent = document.getElementById('urgentBtn');
    let medium = document.getElementById('mediumBtn');
    let low = document.getElementById('lowBtn');

    checkBtn(button, urgent, medium, low);
}


function checkBtn(button, urgent, medium, low) {   //style selected Prio Button Backgroundcolor
    urgent.classList.remove('urgentBtn');
    medium.classList.remove('mediumBtn');
    low.classList.remove('lowBtn');

    if (button == 1) {
        urgent.classList.add('urgentBtn');
    }
    if (button == 2) {
        medium.classList.add('mediumBtn');
    }
    if (button == 3) {
        low.classList.add('lowBtn');
    }
}


function today() {   //set min Date to actual Date
    document.getElementById('dateToday').min = new Date().toISOString().split("T")[0];
}


function checkInputData() {   //check required Input Data
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const dateInput = document.getElementById('dateToday');
    const categoryInput = document.getElementById('chosenCategory');
    const selectedPriority = getSelectedPrio();

    const fieldsValid = checkInputDataFields(titleInput, descriptionInput, dateInput);
    const selectsValid = checkSelectDataFields(categoryInput, selectedPriority);

    return fieldsValid && selectsValid;
}


function checkInputDataFields(titleInput, descriptionInput, dateInput) {   //check required Input Fields
    let fieldsValid = true;

    if (isEmpty(titleInput)) {
        emptyInputAlert(titleInput);
        fieldsValid = false;
    }
    if (isEmpty(descriptionInput)) {
        emptyInputAlert(descriptionInput);
        fieldsValid = false;
    }
    if (isEmpty(dateInput)) {
        emptyInputAlert(dateInput);
        fieldsValid = false;
    }

    return fieldsValid;
}


function checkSelectDataFields(categoryInput, selectedPriority) {   //check required Select Elements
    let selectsValid = true;

    if (categoryInput.innerHTML === 'Select task Category') {
        emptyInputAlert(document.getElementById('categoryInput'));
        selectsValid = false;
    }
    if (selectedPriority === 0) {
        emptyInputAlert(document.getElementById('urgentBtn'));
        emptyInputAlert(document.getElementById('mediumBtn'));
        emptyInputAlert(document.getElementById('lowBtn'));
        selectsValid = false;
    }

    return selectsValid;
}


function addedContactsCheckBox(selectedContact, checked, src, id, badge, index) {   //toggle Checkbox icon of each Contact
    if (src === './assets/img/check_button_unchecked.svg') {
        checkedCheckBox(selectedContact, checked, src, id, badge, index);
    } else if (src === './assets/img/check_button_checked.svg') {
        selectedContact.classList.remove('bg-blue', 'font-white');
        checked.src = './assets/img/check_button_unchecked.svg';
        checked.classList.remove('selectedSvg');
        const indexOfId = addedContacts.indexOf(id);
        if (indexOfId !== -1) {
            addedContacts.splice(indexOfId, 1);
            badges.splice(indexOfId, 1);
            addedContactInitial.splice(indexOfId, 1);
        }
    };
}


function checkedCheckBox(selectedContact, checked, src, id, badge, index) {   //set checked Checkbox
    selectedContact.classList.add('bg-blue', 'font-white');
    checked.src = './assets/img/check_button_checked.svg';
    checked.classList.add('selectedSvg');
    addedContacts.push(id);
    badges.push(badge);
    addedContactInitial.push(taskContacts[index]['initials']);
    document.getElementById('searchContactInput').value = "";
}


function checkContactLength() {
    const contactDisplay = document.getElementById('contactInitial');

    if (addedContacts.length === 0) {
        contactDisplay.classList.add('d-none');
    } else {
        contactDisplay.classList.remove('d-none');
    }
}


function isEmpty(inputField) {
    return inputField.value === '';
}


function emptyInputAlert(input) {   //add red border if required element is empty 
    input.classList.add('brd-red');
}


function resetInputAlert(input) {   //reset red border of empty input Field
    let reset = document.getElementById(input);
    reset.classList.remove('brd-red');
}


function resetPrioAlert(urgent, medium, low) {   //reset red border of Prio Buttons
    let urgentBtn = document.getElementById(urgent);
    let mediumBtn = document.getElementById(medium);
    let lowBtn = document.getElementById(low);
    urgentBtn.classList.remove('brd-red');
    mediumBtn.classList.remove('brd-red');
    lowBtn.classList.remove('brd-red');
}


function checkSubInputValue(subInputCover) {   //check if subtask input is empty
    subInputCover.classList.add('brd-red');
    setTimeout(function () {
        subInputCover.classList.remove('brd-red');
    }, 3000);
    toggleSubTaskInput();
}


//----------------------------------------------------//
//------- Get Values and Create Task Functions -------//
//----------------------------------------------------//


function getSelectedPrio() {  //get selected Prio Button Value for new Task
    let selectedPriority;
    if (document.getElementById('urgentBtn').classList.contains('urgentBtn')) {
        selectedPriority = 1;
    } else if (document.getElementById('mediumBtn').classList.contains('mediumBtn')) {
        selectedPriority = 2;
    } else if (document.getElementById('lowBtn').classList.contains('lowBtn')) {
        selectedPriority = 3;
    } else {
        selectedPriority = 0;
    };

    return selectedPriority;
}


function getSubtasks() {  //get Subtask Value for new Task
    let subtasks = [];
    let subtaskInputs = document.querySelectorAll('subTaskInput input');
    subtaskInputs.forEach(function (input) {
        subtasks.push(input.value);
    });
    return subtasks;
}


function selectCategory() {  //get Category for new Task
    let arrow = document.getElementById('categoryArrow');
    let options = document.getElementById('allOptions');

    options.classList.toggle('d-none');
    if (options.classList.contains('d-none')) {
        arrow.src = "./assets/img/arrow_drop_down.svg"
    } else {
        arrow.src = "./assets/img/arrow_up.svg"
    };
}


function selectOption(option) {  //show selected Category in Category selector
    const selectedValue = option.textContent;
    const categorySelector = document.getElementById('chosenCategory');
    categorySelector.innerHTML = selectedValue;
    checkCategoryColor(selectedValue);
    selectCategory();
}


function checkCategoryColor(selectedValue) {
    if (selectedValue == 'Technical Task') {
        categoryColor = 6;
    } else {
        categoryColor = 11;
    }
}


function showContacts() {   //show all Contacts in dropdown Menu
    let arrow = document.getElementById('contactsArrow');
    let checkboxes = document.getElementById('checkBoxes');
    let input = document.getElementById('searchContact');
    if (!expanded) {
        checkboxes.classList.add('d-block');
        input.classList.add('brd-focus');
        expanded = true;
        arrow.src = "./assets/img/arrow_up.svg"
    } else {
        checkboxes.classList.remove('d-block');
        input.classList.remove('brd-focus');
        expanded = false;
        arrow.src = "./assets/img/arrow_drop_down.svg"
        document.getElementById('searchContactInput').value = "";
        searchContacts();
    }
}


function searchContacts() {   //search contact in contact drop down menu
    const searchInput = document.getElementById('searchContactInput').value.toLowerCase();
    const dropDown = document.getElementById('contactDropDown');
    const taskContacts = dropDown.getElementsByClassName('singleContact');

    for (let l = 0; l < taskContacts.length; l++) {
        const contact = taskContacts[l];
        const contactName = contact.getElementsByTagName('p')[0].textContent.toLowerCase();

        if (searchInput === '') {
            contact.classList.remove('d-none');
        } else if (contactName.includes(searchInput)) {
            contact.classList.remove('d-none');
        } else {
            contact.classList.add('d-none');
        }
    }
}


function addedContact(index) {  //set each Contact ID compaired to the contact JSON from data.js
    let selectedContact = document.getElementById(`contact${index}`);
    let checked = document.getElementById(`check${index}`);
    let src = checked.getAttribute("src");
    let id = taskContacts[index]['id'];   //set index from Contacts to ID
    let badge = taskContacts[index]['badge-color'];

    addedContactsCheckBox(selectedContact, checked, src, id, badge, index);

    checkContactLength();
    renderContactInitials();
}


function createSubTask() {   //create and push Subtask
    let newSubTask = document.getElementById('newSub');
    let showSubs = document.getElementById('subTaskList');
    let subInputCover = document.getElementById('subTaskInputCover');

    if (newSubTask.value === '') {
        checkSubInputValue(subInputCover);
    } else {
        addedSubTasks.push(
            {
                done: false,
                subtask: newSubTask.value
            }
        );
        newSubTask.value = '';
        showSubs.innerHTML = '';

        for (let j = 0; j < addedSubTasks.length; j++) {
            const sub = addedSubTasks[j]['subtask'];
            showSubs.innerHTML += renderSubHTML(sub, j);
        };

        toggleSubTaskInput();
    }
}


function createTask() {   //get all Values for the new Task
    const checked = checkInputData();
    if (currentTaskUser['id'] == -2 && checked === true) {
        msgBox(text = 'To create new Task register and log in');
        setTimeout(function () {
            window.location.href = 'board.html'
        }, 3500);
    } else if (checked === true) {
        setNewTaskData();
    };
}


function setNewTaskData() {
    let title = document.getElementById('titleInput').value;
    let description = document.getElementById('descriptionInput').value;
    let priority = getSelectedPrio();
    let date = document.getElementById('dateToday').value;
    let category = document.getElementById('chosenCategory').innerHTML;
    let assignedTo = addedContacts;
    let subtasks = addedSubTasks;
    document.getElementById('checkBoxes').classList.remove('d-block');

    addNewTask(title, description, priority, date, category, assignedTo, subtasks);
}


async function addNewTask(title, description, priority, date, category, assignedTo, subtasks) {   //push new created Task
    await loadTasksFromRemoteStorage();
    let newTask = {
        'id': loadedTasks.length + 1,
        'status': taskStatus,
        'category': category,
        'category_color': categoryColor,
        'title': title,
        'description': description,
        'due_date': date,
        'priority': priority,
        'assigned_to': assignedTo,
        'subtasks': subtasks,
    };

    pushNewTask(newTask);
}


async function pushNewTask(newTask) {
    loadedTasks.push(newTask);
    await setItem('tasks', JSON.stringify(loadedTasks));
    clearTaskInput();
    window.location.href = 'board.html';
}


function clearTaskInput() {   //clear all Input Data form new created Task
    document.getElementById('titleInput').value = "";
    document.getElementById('descriptionInput').value = "";
    document.getElementById('urgentBtn').classList.remove('urgentBtn');
    document.getElementById('urgent').classList.remove('selectedSvg');
    document.getElementById('mediumBtn').classList.remove('mediumBtn');
    document.getElementById('medium').classList.remove('selectedSvg');
    document.getElementById('lowBtn').classList.remove('lowBtn');
    document.getElementById('low').classList.remove('selectedSvg');
    document.getElementById('dateToday').value = "";

    resetTaskData();
}

function enterKeyDownCreateSub(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        createSubTask();
    }
}


//------------------------------//
//------- Edit Functions -------//
//------------------------------//


function editSubElement(index) {   //edit Sub Task
    let subValue = document.getElementById(`editSubTask${index}`);

    toggleEditSubInput(index);

    subValue.value = addedSubTasks[index]['subtask'];
}


function setNewSubValue(index) {   //set new Sub Task Value
    let newSubValue = document.getElementById(`editSubTask${index}`).value;
    addedSubTasks[index]['subtask'] = newSubValue;

    renderSubTaskUpdate();
}


function deleteSub(index) {   //delete Sub Task
    if (index >= 0 && index < addedSubTasks.length) {
        addedSubTasks.splice(index, 1);
        renderSubTaskUpdate();
    }
}


//------------------------------------------//
//------- Toggle and Reset Functions -------//
//------------------------------------------//


function stopPropagation(event) {
    event.stopPropagation();
}


function setFocus(inputId) {   //set border color on focused element
    document.getElementById(inputId).classList.add('brd-focus');
    document.addEventListener('click', function (event) {

        if (event.target.id !== inputId) {
            document.getElementById(inputId).classList.remove('brd-focus');
        }
    });
}


function toggleSubTaskInput() {   //displays Sub Task Input
    let inputCover = document.getElementById('subTaskInputCover');
    let realInput = document.getElementById('realSubInput');

    inputCover.classList.toggle('d-none');
    realInput.classList.toggle('d-none');
}


function resetTaskData() {   //clear all arrays form new created Task
    let category = document.getElementById('chosenCategory');
    let subTasks = document.getElementById('subTaskList');

    category.innerHTML = 'Select task Category';
    subTasks.innerHTML = '';
    addedContacts = [];
    addedSubTasks = [];
    addedContactInitial = [];

    localStorage.removeItem('taskStatus');
    resetCheckBoxArrow();
}


function resetCheckBoxArrow() {   //resest all clicked Checkboxes 
    let arrow = document.getElementById('contactsArrow');
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });

    if (arrow.src = "./assets/img/arrow_up.svg") {
        arrow.src = "./assets/img/arrow_drop_down.svg"
    }
    document.getElementById('checkBoxes').classList.remove('d-block');

    renderContacts();
    renderContactInitials();
}


function toggleEditSubInput(index) {   //toggle Sub Task edit input
    let subListElement = document.getElementById(`listElement${index}`);
    let editSubInput = document.getElementById(`editListElement${index}`);

    subListElement.classList.toggle('d-none');
    editSubInput.classList.toggle('d-none');
}


//-------------------------------------//
//------- HTML Render Templates -------//
//-------------------------------------//

function contactInitialsHTML(index, inital) {
    return `<div class="profile-badge bc-${badges[index]} brd-white">${inital}</div>`;
}


function renderContactHTML(index, contact) {
    const contactClass = contact.userState === '(You)' ? 'currentContact' : '';

    return `
      <div id="contact${index}" class="singleContact option item brd-r10 ${contactClass}" onclick="addedContact(${index})">
        <div class="singleContactInitialName">
          <div class="font-white profile-badge bc-${contact['badge-color']} brd-white">${contact['initials']}</div>
          <p>${contact['name']}</p>
          <div>${checkUserState(taskContacts[index]['userid'])}</div>
        </div>
        <img id="check${index}" src="./assets/img/check_button_unchecked.svg">
      </div>`;
}


function renderSubHTML(sub, index) {
    return `<div id="listElement${index}" class="subListElement">
                <div class="subListInnerElement">
                    <img src="./assets/img/dot.png" alt="">
                    ${sub} 
                </div>
                <div class="subListInnerElement">
                    <img class="item" src="./assets/img/edit_icon.svg" onclick="editSubElement(${index})">
                    <div class="subBorder"></div>
                    <img class="item" src="./assets/img/delete_icon.svg" onclick="deleteSub(${index})">
                </div>
            </div>
            <div id="editListElement${index}" class="editSub d-none">
                <input id="editSubTask${index}" type="text">
                <div class="editListElementButton">
                    <img class="item" src="./assets/img/delete_icon.svg" onclick="deleteSub(${index})">
                    <div class="subBorder"></div>
                    <img  class="item" src="./assets/img/input_check.svg" onclick="setNewSubValue(${index})">
                </div>
            </div>`;
}