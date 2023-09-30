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


function toggleFocus(inputField) {   //remove focus from unfocused inputs
    const elements = ['titleInput', 'descriptionInput', 'dateToday', 'categoryInput', 'subTaskInputCover', 'searchContact'];

    elements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (elementId !== inputField) {
            element.classList.remove('brd-focus');
        }
    });
}


function closeAssignedToDropDown() {   //close contacts drop down
    let arrow = document.getElementById('contactsArrow');
    let input = document.getElementById('searchContact');
    let checkboxes = document.getElementById('checkBoxes');
    checkboxes.classList.remove('d-block');
    input.classList.remove('brd-focus');
    arrow.src = "./assets/img/arrow_drop_down.svg"
}


function closeCategoryDropDown() {   //close category drop down
    let arrow = document.getElementById('categoryArrow');
    let options = document.getElementById('allOptions');

    options.classList.add('d-none');
    arrow.src = "./assets/img/arrow_drop_down.svg"
}


function closeSubTaskInput() {   //remove focus from subtask input
    let inputCover = document.getElementById('subTaskInputCover');
    let realInput = document.getElementById('realSubInput');

    inputCover.classList.remove('d-none');
    realInput.classList.add('d-none');
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


function checkContactLength() {   //check contacts length
    const contactDisplay = document.getElementById('contactInitial');

    if (addedContacts.length === 0) {
        contactDisplay.classList.add('d-none');
    } else {
        contactDisplay.classList.remove('d-none');
    }
}


function isEmpty(inputField) {   //check if input field is empty
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