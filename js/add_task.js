function init() {
    createSelectBox();
}

function selectPrio(button) {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');

    checkPrio(button, urgent, medium, low)
}

function checkPrio(button, urgent, medium, low) {
    if (button == 1) {
        urgent.classList.toggle('selectedSvg');
        medium.classList.remove('selectedSvg');
        low.classList.remove('selectedSvg');
    }
    if (button == 2) {
        medium.classList.toggle('selectedSvg');
        urgent.classList.remove('selectedSvg');
        low.classList.remove('selectedSvg');
    }
    if (button == 3) {
        low.classList.toggle('selectedSvg');
        urgent.classList.remove('selectedSvg');
        medium.classList.remove('selectedSvg');
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
    if (button == 1) {
        urgent.classList.toggle('urgentBtn');
        medium.classList.remove('mediumBtn');
        low.classList.remove('lowBtn');
    }
    if (button == 2) {
        medium.classList.toggle('mediumBtn');
        urgent.classList.remove('urgentBtn');
        low.classList.remove('lowBtn');
    }
    if (button == 3) {
        low.classList.toggle('lowBtn');
        medium.classList.remove('mediumBtn');
        urgent.classList.remove('urgentBtn');
    }
}

function today() {
    document.getElementById('dateToday').min = new Date().toISOString().split("T")[0];
}


