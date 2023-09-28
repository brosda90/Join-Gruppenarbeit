document.addEventListener('click', hideUserOptions);

let loggedInUserID = +localStorage.getItem("loggedInUserID");
let loggedInUser = localStorage.getItem("loggedInUser");
let isNotAUser = true;

if(!loggedInUserID || !loggedInUser) {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInUserID");
    let comeFrom = document.location.pathname;
    if (!comeFrom.includes("legal_notice.html") && !comeFrom.includes("privacy_policy.html")) {
        window.location.href = 'index.html';
    }
} else {
    isNotAUser = false;
    initLoggedInUser();
}


async function initLoggedInUser() {
    await loadHeaderUsersFromStorage();
    if(loggedInUserID != -2 && useridToIndex(loggedInUserID, userList) == -1) {
        userLogout();
    } else {
        renderHeaderUserName();
    }
}


function hideUserOptions(event) {
    const userOptions = document.getElementById('useroptions');
    const userButtonName = document.getElementById('user-name');
    const userButton = document.getElementById('user-icon');
    if(!userOptions.contains(event.target) && !userButton.contains(event.target) && event.target !== userButtonName) {
        userOptions.classList.remove('inview');
    }
}


function msgBox(text = 'To edit please register and log in.') {
    document.getElementById('msgbox-text').innerHTML = text;
    document.getElementById("msgbox").classList.add("shortpopup");
    setTimeout(() => {
        document.getElementById("msgbox").classList.remove("shortpopup");
    }, "4000");
}


// ab hier erst nutzbar wenn weitere Daten geladen sind.
function useridToIndex(id, arr = userList) {
    return arr.findIndex(function (item, i) {
        return item.id === id;
    });
  }
  

async function loadHeaderUsersFromStorage() {
    let tempData;
    tempData = await loadData('users', userList);
    userList = tempData;
}


async function renderHeaderUserName() {
    let index = useridToIndex(loggedInUserID, userList);
    let obj = document.getElementById('user-name');
    if(obj === null) {
        window.location.reload();
    } else {
        loggedInUserID == -2 ? obj.innerHTML = 'G' : obj.innerHTML = userList[index].initials;
    }
}


function userLogout() {
    localStorage.removeItem('loggedInUserID');
    localStorage.removeItem('loggedInUser');
    window.location.href = "index.html";
}


function useroptions(close = false) {
    let obj = document.getElementById('useroptions');
    close ? obj.classList.remove('inview') : obj.classList.toggle('inview');
}


function browserBack() {
    useroptions(true);
    history.back();
}