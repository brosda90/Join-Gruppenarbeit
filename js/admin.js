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


async function resetLastContactId() {
    document.getElementById('b1').disabled = true;
    const obj = document.getElementById('i1').value;
    await saveData("lastContactId", obj);
    await loadLastContactId();
    cLog('lastContactId:', lastContactId);
    document.getElementById('b1').disabled = false;
}


async function resetContactList() {
    let btn = document.getElementById('b2');
    btn.disabled = true;
    await saveData("contacts", []);
    contactList = await loadFromStorage('contacts', []);
    cLog('resetContactList:', contactList);
    btn.disabled = false;
}


async function reloadContacts() {
    let btn = document.getElementById('b3');
    btn.disabled = true;
    await saveData('contacts', dataContactList);
    contactList = await loadFromStorage('contacts', []);
    cLog('reloadContacts:', contactList);
    btn.disabled = false;
}


async function insertUsers() {
    let btn = document.getElementById('b4');
    btn.disabled = true;
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
    btn.disabled = false;
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
    let btn = this.querySelector('button');
    btn.disabled = true;
    btn.disabled = false;
}


async function repairBadgeColor() {
    let btn = document.getElementById('b5');
    btn.disabled = true;
    for(i = 0; i < contactList.length; i++) {
        if(contactList[i][badgecolor] ) {
            contactList[i]['badge-color'] = contactList[i].badgecolor;
            delete contactList[i]['badgecolor'];
        }
    }
    await saveData("contacts", contactList);
    userList = await loadFromStorage('users', userList);
    cLog('insertUsers cL:', contactList);
    btn.disabled = false;
}

