document.addEventListener("DOMContentLoaded", async function () {
    await initContacts();
});


// ############################################################
// ----- Funktionen zum öffnen/schließen der Views ------------
// ############################################################
function openAddCon() {
    useroptions(true);
    document.getElementById("popup-addcon").classList.add("inview");
}


function openEditCon() {
    useroptions(true);
    document.getElementById("popup-editcon").classList.toggle("inview");
}


function openContact(id) {
    renderSingleView(id);
    document.getElementById("contact-single").classList.remove("d-none");
    unselectContactList();
    selectContactList(id);
}


function unselectContactList() {
    useroptions(true);
    let obj = document.getElementsByClassName("contact-listbox");
    for (let i = 0; i < obj.length; i++) {
        obj[i].classList.remove("select");
    }
}


function selectContactList(id) {
    useroptions(true);
    document.getElementById(`contact-listbox-${id}`).classList.add("select");
}


function closeContact() {
    document.getElementById("contact-single").classList.add("d-none");
    unselectContactList();
}


function notClose(event) {
    event.stopPropagation();
}


// ############################################################
// ----- Wichtige Funktionen für Alle Contacts-Zugriffe  ------
// ############################################################
function idToIndex(id, arr = contactList) {
    return arr.findIndex(function (item, i) {
        return item.id === id;
    });
}


function initialsFrom(string) {
    let wordlist = string.split(" ");
    let words = wordlist.length;
    let result = "--";
    if (words == 1) {
        result = wordlist[0][0];
        result += wordlist[0].length > 1 ? wordlist[0][1] : "-";
    } else if (words > 1) {
        result = wordlist[0][0] + wordlist[1][0];
    }
    return result.toUpperCase();
}


// ############################################################
// ----- Wichtige Funktionen für Contacts im Allgemeinen ------
// ############################################################
async function initContacts() {
    if(isLoaded == false) {
        await userAndContacts();
    }
    await loadLastContactId();
    sortedContactList = sortMyList(contactList);
    let comeFrom = document.location.pathname;
    if (comeFrom.includes("contacts.html")) {
        renderContactList();
    }
}


function cLog(text, value) {
    console.log(text);
    console.log(value);
}


// ############################################################
async function saveNewContact() {
    let newDataSet = readNewInputs();
    await saveData("lastContactId", ++lastContactId);
    clearAddPopup();
    contactList.push(newDataSet[0]);
    await saveData("contacts", contactList);
    sortedContactList = sortContacts(contactList);
    renderContactList();
    document.getElementById("contactsuccess").classList.add("shortpopup");
    setTimeout(() => {
        document.getElementById("contactsuccess").classList.remove("shortpopup");
    }, "800");
}


function readNewInputs() {
    return [
        {
            "id": lastContactId,
            "name": document.getElementById("addconname").value,
            "initials": initialsFrom(document.getElementById("addconname").value),
            "email": document.getElementById("addconemail").value,
            "phone": document.getElementById("addconphone").value,
            "badge-color": randomBadgeColor(),
            "userid": -1
        },
    ];
}


function randomBadgeColor() {
    return Math.floor(Math.random() * 15);
}


function clearAddPopup() {
    document.getElementById("popup-addcon").classList.remove("inview");
    document.getElementById("addconname").value = "";
    document.getElementById("addconemail").value = "";
    document.getElementById("addconphone").value = "";
}


// ############################################################
async function saveEditContact() {
    let id = +document.getElementById("editconid").value;
    let index = idToIndex(id, contactList);
    updateContactFields(index);
    await saveData("contacts", contactList);
    if(isCurrentUser(contactList[index].userId)) {
        await saveData("users", userList);
    }
    sortedContactList = sortContacts(contactList);
    renderContactList();
    renderSingleView(id);
    openEditCon();
}


function updateContactFields(index) {
    contactList[index].name = document.getElementById("editconname").value;
    contactList[index].initials = initialsFrom(document.getElementById("editconname").value);
    contactList[index].email = document.getElementById("editconemail").value;
    contactList[index].phone = document.getElementById("editconphone").value;
    if(isCurrentUser(contactList[index].userId)) {
        let userIndex = idToIndex(contactList[index].userid, userList);
        userList[userIndex].name = contactList[index].name;
        userList[userIndex].initials = contactList[index].initials;
        userList[userIndex].email = contactList[index].email;
        userList[userIndex].phone = contactList[index].phone;
    }
}


// ############################################################
async function deleteContact(id) {
    let index = idToIndex(id, contactList);
    contactList.splice(index, 1);
    await saveData("contacts", contactList);
    sortedContactList = sortContacts(contactList);
    renderContactList();
    closeContact();
    document.getElementById("popup-editcon").classList.remove("inview");
}


// ############################################################
function sortContacts(arr) {
    let targetArr = [...arr];
    targetArr.sort((c1, c2) =>
        c1.initials < c2.initials ? -1 : c1.initials > c2.initials ? 1 : 0
    );
    return targetArr;
}


function sortIds(arr) {
    let targetArr = [...arr];
    targetArr.sort((c1, c2) =>
        c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0
    );
    return targetArr;
}


function openMore() {
    window.location.href = "admin.html";
}


// ############################################################
// ----- Render-Funktionen für Contacts im Allgemeinen --------
// ############################################################
function renderContactList() {
    let newContent = "", firstLetter = "";
    for (let i = 0; i < sortedContactList.length; i++) {
        cLog(sortedContactList[i].name, sortedContactList[i].userid);
        let isUser = isCurrentUserInfo(sortedContactList[i].userid);
        let answer = nextLetter(sortedContactList[i].initials[0], firstLetter);
        firstLetter = answer[1];
        newContent += answer[0];
        newContent += renderListEntry(i, isUser);
    }
    if (newContent == "") {
        newContent += renderLetterbox();
    }
    document.getElementById("contact-list").innerHTML = newContent;
}


function nextLetter(currentLetter, firstLetter) {
    let newContent = "";
    if (currentLetter != firstLetter) {
        firstLetter = currentLetter;
        newContent += renderLetterbox(currentLetter);
    }
    return [newContent, firstLetter];
}


function isCurrentUserInfo(userId) {
cLog('isCurrentUserInfo:', userId);
    if(userId === loggedInUserID) {
        return " (Me)";
    } else if(userId >= 0) {
        return " (User)";
    } else {
        return "";
    }
}


function isCurrentUser(userId) {
    return (userId === loggedInUserID);
}


function renderLetterbox(letter = "No Contacts") {
    return `
        <div class="contact-letterbox">
            <span class="contact-letter">${letter}</span>
        </div>
        <div class="contact-hr"></div>
    `;
}


function renderListEntry(i, isUser = "") {
    return `
        <div id="contact-listbox-${sortedContactList[i].id}" class="contact-listbox" onclick="openContact(${sortedContactList[i].id})">
            <div class="contact-listbox-badgebox">
                <div class="contact-listbox-badge">
                    <div class="contact-listbox-badge-circle bg-contact-${sortedContactList[i]["badge-color"]}">
                        <span class="contact-listbox-badge-text">${sortedContactList[i].initials}</span>
                    </div>
                </div>
            </div>
            <div class="contact-listbox-namebox">
                <span class="contact-listbox-name">${sortedContactList[i].name}${isUser}</span>
                <span class="contact-listbox-mail">${sortedContactList[i].email}</span>
            </div>
        </div>
    `;
}


// ############################################################
function renderSingleView(id) {
    let index = idToIndex(id, sortedContactList);
    let isUser = isCurrentUserInfo(sortedContactList[index].userid);
    document.getElementById("contact-single-info-badge-text").innerHTML = sortedContactList[index].initials;
    document.getElementById("contact-single-info-name-text").innerHTML = sortedContactList[index].name + isUser;
    document.getElementById("contact-single-info-email-text").innerHTML = sortedContactList[index].email;
    document.getElementById("contact-single-info-phone-text").innerHTML = sortedContactList[index].phone;
    document.getElementById("contact-single-info-badge-circle").className = `contact-single-info-badge-circle bg-contact-${sortedContactList[index]["badge-color"]}`;
    document.getElementById("options").innerHTML = renderOptions(id);
    document.getElementById("contact-single-info-options").innerHTML = renderOptions(id);
    renderPopupEdit(id);
}


function renderOptions(id) {
    let content = "";
    if(isCurrentUserInfo(sortedContactList[idToIndex(id, sortedContactList)].userid) != " (User)") {
        content += renderOptionEdit(id);
        content += renderOptionDelete(id);
    }
    return content;
}


function renderOptionEdit(id) {
    return `
        <div class="options-row" onclick="openEditCon(${id})">
            <div class="options-imgbox">
                <img class="options-img" src="./assets/img/edit.png">
            </div>
            <span>Edit</span>
        </div>
    `;
}


function renderOptionDelete(id) {
    return `
        <div class="options-row" onclick="deleteContact(${id})">
            <div class="options-imgbox">
                <img class="options-img" src="./assets/img/delete.png">
            </div>
            <span>Delete</span>
        </div>
    `;
}


// ############################################################
function renderPopupEdit(id) {
    let index = idToIndex(id, sortedContactList);
    document.getElementById("popup-person-imgbox").className = `popup-person-imgbox bg-contact-${sortedContactList[index]["badge-color"]}`;
    document.getElementById("popup-person-imgbox-text").innerHTML = sortedContactList[index].initials;
    document.getElementById("editconid").value = sortedContactList[index].id;
    document.getElementById("editconname").value = sortedContactList[index].name;
    document.getElementById("editconemail").value = sortedContactList[index].email;
    document.getElementById("editconphone").value = sortedContactList[index].phone;
    document.getElementById("popup-editcon-btn-delete").innerHTML = `
        <button onclick='deleteContact(${id})' type="button" class="btn light">Delete</button>
    `;
}
