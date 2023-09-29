let mainMenuLoaded = false;

document.addEventListener('DOMContentLoaded', async function () {
    await init();
});

async function init() {
    await includeHTML();
    await selectMenu();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let response = await fetch(file);
        if (response.ok) {
            element.innerHTML = await response.text();
        } else {
            element.innerHTML = 'Page not found';
        }
        element.removeAttribute("w3-include-html");
    }
}


function stopPropagation(event) {
    event.stopPropagation();
}


async function selectMenu() {
    let filename = document.location.pathname;
    let objs = document.getElementsByClassName('nav-menu-link');
    let id = await filenameToId(filename);
    if(id > -1) {
        objs[id].classList.add('link-selected');
    }
    mainMenuLoaded = true;
}


async function filenameToId(filename) {
    if(filename.includes("summary.html")) {
        return 0;
    } else if(filename.includes("board.html")) {
        return 1;
    } else if(filename.includes("add_task.html")) {
        return 2;
    } else if(filename.includes("contacts.html")) {
        return 3;
    }
    return -1;
}
