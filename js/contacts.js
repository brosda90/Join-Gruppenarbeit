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


function saveNewContact() {
    // New Contact
}


function saveEditContact() {
    // Edit Contact
}