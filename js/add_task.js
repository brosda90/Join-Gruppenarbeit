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
    let category = document.getElementById('categorySelector').value;
    let assignedTo = getSelectedAssignedTo();
    let subtasks = getSubtasks();

    addNewTask(title,description,priority, date, category, assignedTo, subtasks);
}

function addNewTask(title,description,priority, date, category, assignedTo, subtasks) {
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

function getSelectedAssignedTo() {
    let selectedAssignedTo = [];
    let contactSelector = document.getElementById('contactSelector');

    for (let i = 0; i < contactSelector.options.length; i++) {
        if (contactSelector.options[i].selected) {
            selectedAssignedTo.push(parseInt(contactSelector.options[i].value));
        }
    };

    return selectedAssignedTo;
}

function getSubtasks() {
    let subtasks = [];
    let subtaskInputs = document.querySelectorAll('subTaskInput input');
    subtaskInputs.forEach(function (input) {
        subtasks.push(input.value);
    });
    return subtasks;
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
}