let expanded = false;
let selectTrigger = document.querySelector('.select-trigger');

let addedContacts = [];
let addedContactInitial = [];
let addedSubTasks = [];


function init() {
    renderContacts();
}


function renderContacts() {
    let assignedToContact = document.getElementById('checkBoxes');
    assignedToContact.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        assignedToContact.innerHTML += renderContactHTML(i, contact);
        addedContactInitial.push(contact['initials']);
    }

}

function selectPrio(button) {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');

    checkPrio(button, urgent, medium, low)
}

function checkPrio(button, urgent, medium, low) {
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

function selectBtn(button) {
    let urgent = document.getElementById('urgentBtn');
    let medium = document.getElementById('mediumBtn');
    let low = document.getElementById('lowBtn');

    checkBtn(button, urgent, medium, low);
}

function checkBtn(button, urgent, medium, low) {
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

function today() {
    document.getElementById('dateToday').min = new Date().toISOString().split("T")[0];
}

function createTask() {
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

function addNewTask(title, description, priority, date, category, assignedTo, subtasks) {
    let newTask = {
        'id': tasks.length + 1,
        'category': category,
        'title': title,
        'description': description,
        'due_date': date,
        'priority': priority,
        'assigned_to': assignedTo,
        'subtasks': subtasks,
    };

    tasks.push(newTask);
    console.log(tasks);
    clearTaskInput();
}

function getSelectedPrio() {
    let selectedPriority;
    if (document.getElementById('urgentBtn').classList.contains('urgentBtn')) {
        selectedPriority = 1;
    } else if (document.getElementById('mediumBtn').classList.contains('mediumBtn')) {
        selectedPriority = 2;
    } else {
        selectedPriority = 3;
    };

    return selectedPriority;
}

function getSubtasks() {
    let subtasks = [];
    let subtaskInputs = document.querySelectorAll('subTaskInput input');
    subtaskInputs.forEach(function (input) {
        subtasks.push(input.value);
    });
    return subtasks;
}

function selectCategory() {
    let arrow = document.getElementById('categoryArrow');
    let options = document.getElementById('allOptions');

    options.classList.toggle('d-none');
    if (options.classList.contains('d-none')) {
        arrow.src = "./assets/img/arrow_drop_down.svg"
    } else {
        arrow.src = "./assets/img/arrow_up.svg"
    };
}

function selectOption(option) {
    const selectedValue = option.textContent;
    const categorySelector = document.getElementById('chosenCategory');
    categorySelector.innerHTML = selectedValue;
    selectCategory();
}

function showContacts() {
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
    }
}

function addedContact(index) {
    let checked = document.getElementById(`check${index}`);
    let src = checked.getAttribute("src");
    let id = index + 1;

    if (src === './assets/img/check_button_unchecked.svg') {
        checked.src = './assets/img/check_button_checked.svg';
        addedContacts.push(id);  
    } else if (src === './assets/img/check_button_checked.svg') {
        checked.src = './assets/img/check_button_unchecked.svg';
        const indexOfId = addedContacts.indexOf(id);
        if (indexOfId !== -1) {
            addedContacts.splice(indexOfId, 1);
        }
    };
    renderContactInitials();
    showContactsSum();
}

function renderContactInitials() {
    let contactInitialDivs = document.querySelectorAll('.contact-initial');
    
    for (let i = 0; i < contactInitialDivs.length; i++) {
        const contactInitialDiv = contactInitialDivs[i];
        const contactInitial = addedContactInitial[i];

        if (addedContacts.includes(i + 1)) {
            contactInitialDiv.innerHTML = contactInitial;
        } else {
            contactInitialDiv.innerHTML = '';
        }
    }
}


function showContactsSum() {
    let sumContacts = document.getElementById('sumAddedContacts');

    sumContacts.innerHTML = addedContacts.length + ' added Contacts';
}

function createSubTask() {
    let newSubTask = document.getElementById('newSub');
    let showSubs = document.getElementById('subTaskList');

    addedSubTasks.push(newSubTask.value);
    newSubTask.value = '';
    showSubs.innerHTML = '';

    for (let j = 0; j < addedSubTasks.length; j++) {
      const sub = addedSubTasks[j];
        showSubs.innerHTML += `<li>${sub}</li>`;
    };
}

function clearTaskInput() {
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

function resetTaskData() {
    let category = document.getElementById('chosenCategory');

    category.innerHTML = 'Select task Category';
    addedContacts = [];
    addedSubTasks = [];

    showContactsSum();
    resetCheckBoxArrow();
}

function resetCheckBoxArrow() {
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
}

function renderContactHTML(index, contact) {
    return `
        <div id="contact${index}" class="singleContact option item" onclick="addedContact(${index})">
            <span>${contact['name']}</span>
            <img id="check${index}" src="./assets/img/check_button_unchecked.svg">
        </div>`;
}