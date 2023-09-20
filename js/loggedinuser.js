let loggedInUserID = +localStorage.getItem("loggedInUserID");
let loggedInUser = localStorage.getItem("loggedInUser");


if(!loggedInUserID || !loggedInUser) {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInUserID");
    window.location.href = 'index.html';
} else {
    initLoggedInUser();
}


async function initLoggedInUser() {
    await loadHeaderUsersFromStorage();
    renderHeaderUserName();
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
    let initials = [];
    let index = useridToIndex(loggedInUserID, userList);
    initials = userList[index];
    document.getElementById('user-name').innerHTML = initials.initials;
}


function userLogout() {
    localStorage.removeItem('loggedInUserID');
    localStorage.removeItem('loggedInUser');
    window.location.href = "index.html";
}


function useroptions(close = false) {
    if(close) {
        document.getElementById('useroptions').classList.remove('inview');
    } else {
        document.getElementById('useroptions').classList.toggle('inview');
    }
}


function browserBack() {
    useroptions(true);
    history.back();
}