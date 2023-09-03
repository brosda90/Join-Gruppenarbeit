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


