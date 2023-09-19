let expanded = false;
let selectTrigger = document.querySelector('.select-trigger');

let taskStatus = localStorage.getItem('taskStatus') || 'to-do';
let taskContacts = [];
let loadedTasks = [];
let addedContacts = [];
let addedContactInitial = [];
let badges = [];
let addedSubTasks = [];

  //-------------------------------------------------//
 //------- Storage load and Render Functions -------//
//-------------------------------------------------//

async function initAddTask() {
    await includeHTML()
    await loadContactsFromStorage();
    await loadTasksFromRemoteStorage();
    renderContacts();
}

async function loadContactsFromStorage() {
    taskContacts = JSON.parse(await getItem('contacts'));
    if(taskContacts.length > 1) {
        sortContacts(taskContacts);
    } else {
        sortedContactList = taskContacts;
    }
}

async function loadTasksFromRemoteStorage () {
    loadedTasks = JSON.parse(await getItem('tasks'));
}

function sortContacts(arr) {
    sortedContactList = arr;
    sortedContactList.sort(
        (c1, c2) => 
        (c1.initials < c2.initials) ? -1 : (c1.initials > c2.initials) ? 1 : 0);
}

function renderContacts() {   //render Contacts
    let assignedToContact = document.getElementById('contactDropDown');
    assignedToContact.innerHTML = '';

    for (let i = 0; i < sortedContactList.length; i++) {
        const contact = sortedContactList[i];

        assignedToContact.innerHTML += renderContactHTML(i, contact);
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

function addedContactsCheckBox(checked, src, id, badge, index) {   //toggle Checkbox icon of each Contact
    if (src === './assets/img/check_button_unchecked.svg') {
        checked.src = './assets/img/check_button_checked.svg';
        addedContacts.push(id);
        badges.push(badge);
        addedContactInitial.push(taskContacts[index]['initials']);
        document.getElementById('searchContactInput').value = "";
    } else if (src === './assets/img/check_button_checked.svg') {
        checked.src = './assets/img/check_button_unchecked.svg';
        const indexOfId = addedContacts.indexOf(id);
        if (indexOfId !== -1) {
            addedContacts.splice(indexOfId, 1);
            badges.splice(indexOfId, 1);
            addedContactInitial.splice(indexOfId, 1);
        }
    };
}

function checkContactLength() {   //check if any Contacts are added and displays Initial Badges
    let contactDisplay = document.getElementById('contactInitial');

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
    selectCategory();
}

function showContacts() {   //show all Contacts in dropdown Menu
    let arrow = document.getElementById('contactsArrow');
    let checkboxes = document.getElementById('checkBoxes');
    if (!expanded) {
        checkboxes.classList.add('d-block');
        expanded = true;
        arrow.src = "./assets/img/arrow_up.svg"
    } else {
        checkboxes.classList.remove('d-block');
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
        const contactName = contact.getElementsByTagName('span')[0].textContent.toLowerCase();

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
    let checked = document.getElementById(`check${index}`);
    let src = checked.getAttribute("src");
    let id = taskContacts[index]['id'];   //set index from Contacts to ID
    let badge = taskContacts[index]['badge-color'];

    addedContactsCheckBox(checked, src, id, badge, index);

    checkContactLength();
    renderContactInitials();
}

function createSubTask() {   //create and push Subtask
    let newSubTask = document.getElementById('newSub');
    let showSubs = document.getElementById('subTaskList');
    let subInputCover = document.getElementById('subTaskInputCover');

    if (newSubTask.value === '') {
        subInputCover.classList.add('brd-red');
        setTimeout(function () {
            subInputCover.classList.remove('brd-red');
        }, 2000);
        toggleSubTaskInput();
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

    if (checked === true) {
        let title = document.getElementById('titleInput').value;
        let description = document.getElementById('descriptionInput').value;
        let priority = getSelectedPrio();
        let date = document.getElementById('dateToday').value;
        let category = document.getElementById('chosenCategory').innerHTML;
        let assignedTo = addedContacts;
        let subtasks = addedSubTasks;
        document.getElementById('checkBoxes').classList.remove('d-block');

        addNewTask(title, description, priority, date, category, assignedTo, subtasks);
    };
}

async function addNewTask(title, description, priority, date, category, assignedTo, subtasks) {   //push new created Task
    await loadTasksFromRemoteStorage();
    let newTask = {
        'id': loadedTasks.length + 1,
        'status': taskStatus,
        'category': category,
        'title': title,
        'description': description,
        'due_date': date,
        'priority': priority,
        'assigned_to': assignedTo,
        'subtasks': subtasks,
    };

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

  //------------------------------//
 //------- Edit Functions -------//
//------------------------------//

function editSubElement(index) {   //edit Sub Task
    let subValue = document.getElementById(`editSubTask${index}`);

    toggleEditSubInput(index);

    subValue.value = addedSubTasks[index];
}

function setNewSubValue(index) {   //set new Sub Task Value
    let newSubValue = document.getElementById(`editSubTask${index}`).value;
    addedSubTasks[index] = newSubValue;

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
    return `
        <div id="contact${index}" class="singleContact option item" onclick="addedContact(${index})">
            <div class="singleContactInitialName">
                <div class="profile-badge bc-${contact['badge-color']} brd-white">${contact['initials']}</div>
                <span>${contact['name']}</span>
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