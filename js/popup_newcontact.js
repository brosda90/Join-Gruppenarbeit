function openAddCon() {
    document.getElementById('popup-addcon').classList.add('inview');
}


function initialsFrom(string) {
    let wordlist = string.split(" ");
    let words = wordlist.length;
    let result = '--';
    if(words == 1) {
        result = wordlist[0][0];
        result += (wordlist[0].length > 1) ? wordlist[0][1] : '-';
    } else if(words > 1) {
        result = wordlist[0][0] + wordlist[1][0];
    }
    return result.toUpperCase();
}


async function loadLastContactId() {
    let tempData;
    tempData = await loadData('lastContactId', 0);
    lastContactId = +JSON.parse(tempData);
}


async function saveData(key, value) {
    let saveData = await setItem(key, JSON.stringify(value));
    if(saveData.status == 'success') {
        return true;
    } else {
        return false;
    }
}


async function saveNewContact() {
    let newDataSet = readNewInputs();
    await saveData('lastContactId', ++lastContactId);
    clearAddPopup();
    contactList.push(newDataSet[0]);
    await saveData('contacts',contactList);
    sortContacts(contactList);
    renderContactList();
    document.getElementById('contactsuccess').classList.add('shortpopup');
    setTimeout(() => {
        document.getElementById('contactsuccess').classList.remove('shortpopup');
    }, '800');
}


function readNewInputs() {
    return [{
        'id': lastContactId,
        'name': document.getElementById('addconname').value,
        'initials' : initialsFrom(document.getElementById('addconname').value),
        'email': document.getElementById('addconemail').value,
        'phone': document.getElementById('addconphone').value,
        'badge-color': randomBadgeColor()
    }];
}


function randomBadgeColor() {
    return Math.floor(Math.random() * 15);
}


function clearAddPopup() {
    document.getElementById('popup-addcon').classList.remove('inview');
    document.getElementById('addconname').value = '';
    document.getElementById('addconemail').value = '';
    document.getElementById('addconphone').value = '';
}


