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


async function saveNewContact() {
    if(loggedInUserID == -2) {
        msgBox();
    } else {
        lastContactId++;
        await saveData("lastContactId", lastContactId);
        let newDataSet = readNewInputs();
        let answer;
        clearAddPopup();
        contactList.push(newDataSet[0]);
        answer = await saveData("contacts", contactList);
        isSavedNewContact(answer);
    }
}


async function isSavedNewContact(answer) {
    if(answer) {
        sortedContactList = sortContacts(contactList);
        document.getElementById("contactsuccess").classList.add("shortpopup");
        setTimeout(() => {
            document.getElementById("contactsuccess").classList.remove("shortpopup");
        }, "900");
    } else {
        msgBox('Contact was not saved.');
    }
}


function readNewInputs() {
    return [{
        'id': lastContactId,
        'name': document.getElementById('addconname').value,
        'initials' : initialsFrom(document.getElementById('addconname').value),
        'email': document.getElementById('addconemail').value,
        'phone': document.getElementById('addconphone').value,
        'badge-color': randomBadgeColor(),
        "userid": -1
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


