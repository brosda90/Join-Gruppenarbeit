let contactList = [];
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
    for(let i = 0; i < arr.length; i++) {
        if(id == arr[i].id) {
            return i;
        }
    }
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
async function loadContactsFromStorage() {
    let loadData = await getItem('contacts');
    console.log(loadData);
}




// ############################################################
function saveNewContact() { // Neuen Kontakt auch im Storage speichern
    // From New Contact-Popup
}


function saveEditContact() { // Änderung auch im Storage speichern
    // From Edit Contact-Popup
}