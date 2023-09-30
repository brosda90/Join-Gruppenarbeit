document.addEventListener("DOMContentLoaded", async function () {
    await initAdmin();
});


async function initAdmin() {
    if(isLoaded == false) {
        await userAndContacts();
    }
    await loadLastContactId();
}


function cLog(text, value) {
    console.log(text);
    console.log(value);
}


function randomBadgeColor() {
    return Math.floor(Math.random() * 15);
}


function lockButton(id, lock = true) {
    document.getElementById(id).disabled = lock;
}


async function resetLastContactId() {
    lockButton('b1');
    const obj = document.getElementById('i1').value;
    await saveData("lastContactId", obj);
    await loadLastContactId();
    cLog('lastContactId:', lastContactId);
    lockButton('b1', false);
}


async function resetContactList() {
    lockButton('b2');
    await saveData("contacts", []);
    contactList = await loadFromStorage('contacts', []);
    cLog('resetContactList:', contactList);
    lockButton('b2', false);
}


async function reloadContacts() {
    lockButton('b3');
    await saveData('contacts', dataContactList);
    contactList = await loadFromStorage('contacts', []);
    cLog('reloadContacts:', contactList);
    lockButton('b3', false);
}


async function insertUsers() {
    lockButton('b4');
    let relUsers = await loadData('users', []);
    for(i = 0; i < relUsers.length; i++) {
        lastContactId++;
        let tempUser = readUser(i, relUsers);
        relUsers[i].contacts[0] = lastContactId;
        contactList.push(tempUser[0]);
        await saveData("lastContactId", lastContactId);
        await saveData("contacts", contactList);
    }
    await saveData('users', relUsers);
    userList = await loadFromStorage('users', userList);
    cLog('insertUsers cL:', contactList);
    cLog('insertUsers uL:', userList);
    lockButton('b4', false);
}


function readUser(i, relUsers) {
    return [
        {
            'id': lastContactId,
            'name': relUsers[i].name,
            'initials': relUsers[i].initials,
            'email': relUsers[i].email,
            'phone': relUsers[i].phone,
            'badge-color': randomBadgeColor(),
            'userid': relUsers[i].id
        }
    ];
}


async function nextFunction() {
    lockButton('b?');
    lockButton('b?', false);
}


async function repairBadgeColor() {
    lockButton('b5');
    for(i = 0; i < contactList.length; i++) {
        if(contactList[i][badgecolor] ) {
            contactList[i]['badge-color'] = contactList[i].badgecolor;
            delete contactList[i]['badgecolor'];
        }
    }
    await saveData("contacts", contactList);
    userList = await loadFromStorage('users', userList);
    cLog('insertUsers cL:', contactList);
    lockButton('b5', false);
}


async function resetUserList() {
    lockButton('b6');
    await saveData('users', dataUserList);
    userList = await loadFromStorage('users', userList);
    cLog('resetUserList:', userList);
    lockButton('b6', false);
}


async function emptyUsersInTasks() {
    lockButton('b7');
    let tasks = await loadData('tasks', []);
    for(i = 0; i < tasks.length; i++) {
        tasks[i].contacts = [];
    }
    await saveData('tasks', tasks);
    lockButton('b7', false);
}