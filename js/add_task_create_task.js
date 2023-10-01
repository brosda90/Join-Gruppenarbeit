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
        sortTaskContacts(taskContacts);
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


async function loadCurrentFromStorage() {   //check witch user is logged in or set user to guest
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


async function sortTaskContacts(arr) {   //sort contacts from a-z
    sortedContactList = [...arr];
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


function checkUserState(userid) {   //check user state in contact list 
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


function reloadContactList() {   //reload contact after added new contact
    initAddTask()
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
    const categoryInput = document.getElementById('categoryInput');

    categorySelector.innerHTML = selectedValue;
    checkCategoryColor(selectedValue);
    categoryInput.classList.remove('brd-focus');
    selectCategory();
}


function checkCategoryColor(selectedValue) {   //set category color
    if (selectedValue == 'Technical Task') {
        categoryColor = 5;
    } else {
        categoryColor = 10;
    }
}


function showContacts() {   //show all Contacts in dropdown Menu
    let arrow = document.getElementById('contactsArrow');
    let checkboxes = document.getElementById('checkBoxes');
    let input = document.getElementById('searchContact');
    if (!expanded) {
        openContactDropDown(arrow, checkboxes, input)
    } else {
        closeContactDropDown(arrow, checkboxes, input)
    }
}


function openContactDropDown(arrow, checkboxes, input) {   //open contacts drop down menu
    checkboxes.classList.add('d-block');
    input.classList.add('brd-focus');
    expanded = true;
    arrow.src = "./assets/img/arrow_up.svg"
}


function closeContactDropDown(arrow, checkboxes, input) {   //close contacts drop down menu
    checkboxes.classList.remove('d-block');
    input.classList.remove('brd-focus');
    expanded = false;
    arrow.src = "./assets/img/arrow_drop_down.svg"
    document.getElementById('searchContactInput').value = "";
    searchContacts();
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


function setNewTaskData() {   //set new task from values
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


async function pushNewTask(newTask) {   //push new Task
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


function enterKeyDownCreateSub(event) {   //set new sub task on enter key button
    if (event.keyCode === 13) {
        event.preventDefault();
        createSubTask();
    }
}


function enterKeyDownEditSub(event, index) {   //edit sub task on enter key button
    let input = document.getElementById(`editSubTask${index}`)
    if (event.keyCode === 13) {
        event.preventDefault();
        if (input.value != '') {
            setNewSubValue(index);
        } else {
            deleteSub(index);
        }
    }
}