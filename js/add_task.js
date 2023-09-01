function selectPrio(button) {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');

    checkPrio(button, urgent, medium, low)
}

function checkPrio(button, urgent, medium, low) {
    if (button == 1) {
        urgent.classList.toggle('selectedSvg');
    }
    if (button == 2) {
        medium.classList.toggle('selectedSvg');
    }
    if (button == 3) {
        low.classList.toggle('selectedSvg');
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
        medium.classList.toggle('disableBtn');
        low.classList.toggle('disableBtn');
    }
    if (button == 2) {
        medium.classList.toggle('mediumBtn');
        urgent.classList.toggle('disableBtn');
        low.classList.toggle('disableBtn');
    }
    if (button == 3) {
        low.classList.toggle('lowBtn');
        medium.classList.toggle('disableBtn');
        urgent.classList.toggle('disableBtn');
    }
}