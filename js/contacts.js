document.addEventListener('DOMContentLoaded', function () {
    initContacts();
});


let contactList = [];
let sortedContactList = [];
let lastContactId = 0;


// ############################################################
// ----- Vorläufige Funktionen zum Testen
// ############################################################

function openAddCon() {
    document.getElementById('popup-addcon').classList.toggle('inview');
}


function openEditCon() {
    document.getElementById('popup-editcon').classList.toggle('inview');
}


function openContact(boolean) {
    if(boolean) {
        document.getElementById('contact-list').classList.add('d-none');
        document.getElementById('contact-single').classList.remove('d-none');
    } else {
        document.getElementById('contact-list').classList.remove('d-none');
        document.getElementById('contact-single').classList.add('d-none');
    }
}


function notClose(event) {
    event.stopPropagation();
}


// ############################################################
// ----- Wichtige Funktionen für Alle Contacts-Zugriffe  ------
// ############################################################
function idToIndex(id, arr = contactList) { // Die Index-Position im Array aus der ID ermitteln
    let index = -1;
    for(let i = 0; i < arr.length; i++) {
        if(id == arr[i].id) {
            index = i;
        }
    }
    return index;
}


function initialsFrom(string) { // Die Initialen vom Namen erstellen
    let wordlist = string.split(" ");
    let words = wordlist.length;
    let result = '';
    if(words == 1 && wordlist[0].length >= 2) {
        for(let i = 0; i < 2; i++) {
            result += wordlist[0][i];
        }
    } else if(words >= 2) {
        for(let i = 0; i < 2; i++) {
            result += wordlist[i][0];
        }
    }
    return result.toUpperCase();
}
// ############################################################
// ----- Wichtige Funktionen für Contacts im Allgemeinen ------
// ############################################################
async function initContacts() {
    await loadContactsFromStorage();
    cLog('contactList:', contactList);
    await loadLastContactId();
    cLog('lastContactId:', lastContactId);
    document.getElementById('contact-list').innerHTML = renderContactList();
}


async function loadContactsFromStorage() {
    let tempData;
    tempData = await loadData('contacts', contactList);
    contactList = tempData;
    if(contactList.length > 1) {
        sortContacts(contactList);
    } else {
        sortedContactList = contactList;
    }
}


async function loadLastContactId() {
    let tempData;
    tempData = await loadData('lastContactId', 0);
    lastContactId = +JSON.parse(tempData);
}


async function loadData(key, defaultValue) {
    let loadData = await getItem(key);
    if(loadData == null) {
        await saveData(key, defaultValue);
    } else {
        return JSON.parse(loadData);
    }
}


async function saveData(key, value) {
    let saveData = await setItem(key, JSON.stringify(value));
    console.log(saveData);
    if(saveData.status == 'success') {
        return true;
    } else {
        return false;
    }
}


function cLog(text, value) {
    console.log(text);
    console.log(value);
}



// ############################################################
async function saveNewContact() { // Neuen Kontakt auch im Storage speichern
    // From New Contact-Popup
    let newDataSet = [{
        'id': lastContactId,
        'name': document.getElementById('addconname').value,
        'initials' : initialsFrom(document.getElementById('addconname').value),
        'email': document.getElementById('addconemail').value,
        'phone': document.getElementById('addconphone').value,
        'badge-color': randomBadgeColor()
    }];
    await saveData('lastContactId', ++lastContactId);
    clearAddPopup();
    cLog('contactList:', contactList);
    cLog('newDataSet:', newDataSet);
    contactList.push(newDataSet[0]);
    await saveData('contacts',contactList);
    sortContacts(contactList);
    document.getElementById('contact-list').innerHTML = renderContactList();
}


function randomBadgeColor() {
    return Math.floor(Math.random() * 15);
}


function clearAddPopup() {
    document.getElementById('popup-addcon').classList.toggle('inview');
    document.getElementById('addconname').value = '';
    document.getElementById('addconemail').value = '';
    document.getElementById('addconphone').value = '';
}


function saveEditContact(id) { // Änderung auch im Storage speichern
    // From Edit Contact-Popup
    let index = idToIndex(id, contactList);
    contactList[index].name = document.getElementById('editconname').value;
    contactList[index].initials = initialsFrom(document.getElementById('editconname').value);
    contactList[index].email = document.getElementById('editconemail').value;
    contactList[index].phone = document.getElementById('editconphone').value;
    sortContacts(contactList);
}


// ############################################################
function sortContacts(arr) {
    sortedContactList = arr;
    sortedContactList.sort(
        (c1, c2) => 
        (c1.initials < c2.initials) ? -1 : (c1.initials > c2.initials) ? 1 : 0);
    cLog('SortContacts:', sortedContactList);            
}


// ############################################################
// ----- Render-Funktionen für Contacts im Allgemeinen --------
// ############################################################
function renderContactList() {
    let newContent = '';
    let firstLetter = '';
    for (let i = 0; i < sortedContactList.length; i++) {
        if(sortedContactList[i].initials[0] != firstLetter) {
            firstLetter = sortedContactList[i].initials[0];
            newContent += renderLetterbox(sortedContactList[i].initials[0]);
        }
        newContent += renderListEntry(i);
    }
    if(newContent == '') {
        newContent += renderLetterbox();
    }
    return newContent;
}


function renderLetterbox(letter = 'No Contacts') {
    return `
        <div class="contact-letterbox">
            <span class="contact-letter">${letter}</span>
        </div>
        <div class="contact-hr"></div>
    `;
}


function renderListEntry(i) {
    return `
        <div class="contact-listbox" onclick="openContact(1)">
            <div class="contact-listbox-badgebox">
                <div class="contact-listbox-badge">
                    <div class="contact-listbox-badge-circle bg_contact_${sortedContactList[i]['badge-color']}">
                        <span class="contact-listbox-badge-text">${sortedContactList[i].initials}</span>
                    </div>
                </div>
            </div>
            <div class="contact-listbox-namebox">
                <span class="contact-listbox-name">${sortedContactList[i].name}</span>
                <span class="contact-listbox-mail">${sortedContactList[i].email}</span>
            </div>
        </div>
    `;
}