document.addEventListener("DOMContentLoaded", function () {
  initContacts();
});

let contactList = [];
let sortedContactList = [];
let lastContactId = 0;

// ############################################################
// ----- Vorläufige Funktionen zum Testen
// ############################################################

function openAddCon() {
  document.getElementById("popup-addcon").classList.add("inview");
}

function openEditCon() {
  document.getElementById("popup-editcon").classList.toggle("inview");
}

function openContact(id) {
  renderSingleView(id);
  document.getElementById("contact-single").classList.remove("d-none");
  unselectContactList();
  selectContactList(id);
}

function unselectContactList() {
  let obj = document.getElementsByClassName("contact-listbox");
  for (let i = 0; i < obj.length; i++) {
    obj[i].classList.remove("select");
  }
}

function selectContactList(id) {
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
function oldidToIndex(id, arr = contactList) {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (id == arr[i].id) {
      index = i;
    }
  }
  return index;
}

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
  await loadContactsFromStorage();
  await loadLastContactId();
  renderContactList();
}

async function loadContactsFromStorage() {
  let tempData;
  tempData = await loadData("contacts", contactList);
  contactList = tempData;
  if (contactList.length > 1) {
    sortContacts(contactList);
  } else {
    sortedContactList = contactList;
  }
}

async function loadLastContactId() {
  let tempData;
  tempData = await loadData("lastContactId", 0);
  lastContactId = +JSON.parse(tempData);
}

async function loadData(key, defaultValue) {
  let loadedData = await getItem(key);
  if (loadData == null) {
    await saveData(key, defaultValue);
  } else {
    return JSON.parse(loadedData);
  }
}

async function saveData(key, value) {
  let saveData = await setItem(key, JSON.stringify(value));
  if (saveData.status == "success") {
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
async function saveNewContact() {
  let newDataSet = readNewInputs();
  await saveData("lastContactId", ++lastContactId);
  clearAddPopup();
  contactList.push(newDataSet[0]);
  await saveData("contacts", contactList);
  sortContacts(contactList);
  renderContactList();
  document.getElementById("contactsuccess").classList.add("shortpopup");
  setTimeout(() => {
    document.getElementById("contactsuccess").classList.remove("shortpopup");
  }, "800");
}

function readNewInputs() {
  return [
    {
      id: lastContactId,
      name: document.getElementById("addconname").value,
      initials: initialsFrom(document.getElementById("addconname").value),
      email: document.getElementById("addconemail").value,
      phone: document.getElementById("addconphone").value,
      "badge-color": randomBadgeColor(),
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
  let id = document.getElementById("editconid").value;
  let index = idToIndex(id, contactList);
  contactList[index].name = document.getElementById("editconname").value;
  contactList[index].initials = initialsFrom(
    document.getElementById("editconname").value
  );
  contactList[index].email = document.getElementById("editconemail").value;
  contactList[index].phone = document.getElementById("editconphone").value;
  await saveData("contacts", contactList);
  sortContacts(contactList);
  renderContactList();
  renderSingleView(id);
  openEditCon();
}

// ############################################################
async function deleteContact(id) {
  let index = idToIndex(id, contactList);
  contactList.splice(index, 1);
  await saveData("contacts", contactList);
  sortContacts(contactList);
  renderContactList();
  closeContact();
  document.getElementById("popup-editcon").classList.remove("inview");
}

// ############################################################
function sortContacts(arr) {
  sortedContactList = arr;
  sortedContactList.sort((c1, c2) =>
    c1.initials < c2.initials ? -1 : c1.initials > c2.initials ? 1 : 0
  );
}

// ############################################################
// ----- Render-Funktionen für Contacts im Allgemeinen --------
// ############################################################
function renderContactList() {
  let newContent = "";
  let firstLetter = "";
  for (let i = 0; i < sortedContactList.length; i++) {
    if (sortedContactList[i].initials[0] != firstLetter) {
      firstLetter = sortedContactList[i].initials[0];
      newContent += renderLetterbox(sortedContactList[i].initials[0]);
    }
    newContent += renderListEntry(i);
  }
  if (newContent == "") {
    newContent += renderLetterbox();
  }
  document.getElementById("contact-list").innerHTML = newContent;
}

function renderLetterbox(letter = "No Contacts") {
  return `
        <div class="contact-letterbox">
            <span class="contact-letter">${letter}</span>
        </div>
        <div class="contact-hr"></div>
    `;
}

function renderListEntry(i) {
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
                <span class="contact-listbox-name">${sortedContactList[i].name}</span>
                <span class="contact-listbox-mail">${sortedContactList[i].email}</span>
            </div>
        </div>
    `;
}

// ############################################################
function renderSingleView(id) {
  let index = idToIndex(id, sortedContactList);
  document.getElementById("contact-single-info-badge-text").innerHTML =
    sortedContactList[index].initials;
  document.getElementById("contact-single-info-name-text").innerHTML =
    sortedContactList[index].name;
  document.getElementById("contact-single-info-email-text").innerHTML =
    sortedContactList[index].email;
  document.getElementById("contact-single-info-phone-text").innerHTML =
    sortedContactList[index].phone;
  document.getElementById(
    "contact-single-info-badge-circle"
  ).className = `contact-single-info-badge-circle bg-contact-${sortedContactList[index]["badge-color"]}`;
  document.getElementById("options").innerHTML = renderOptions(id);
  document.getElementById("contact-single-info-options").innerHTML =
    renderOptions(id);
  renderPopupEdit(id);
}

function renderOptions(id) {
  let content = "";
  content += renderOptionEdit(id);
  content += renderOptionDelete(id);
  return content;
}

function renderOptionEdit(id) {
  let content = `
        <div class="options-row" onclick="openEditCon(${id})">
            <div class="options-imgbox">
                <img class="options-img" src="./assets/img/edit.png">
            </div>
            <span>Edit</span>
        </div>
    `;
  return content;
}

function renderOptionDelete(id) {
  let content = `
        <div class="options-row" onclick="deleteContact(${id})">
            <div class="options-imgbox">
                <img class="options-img" src="./assets/img/delete.png">
            </div>
            <span>Delete</span>
        </div>
    `;
  return content;
}

// ############################################################
function renderPopupEdit(id) {
  let index = idToIndex(id, sortedContactList);
  document.getElementById(
    "popup-person-imgbox"
  ).className = `popup-person-imgbox bg-contact-${sortedContactList[index]["badge-color"]}`;
  document.getElementById("popup-person-imgbox-text").innerHTML =
    sortedContactList[index].initials;
  document.getElementById("editconid").value = sortedContactList[index].id;
  document.getElementById("editconname").value = sortedContactList[index].name;
  document.getElementById("editconemail").value =
    sortedContactList[index].email;
  document.getElementById("editconphone").value =
    sortedContactList[index].phone;

  document.getElementById("popup-editcon-btn-delete").innerHTML = `
        <button onclick='deleteContact(${id})' type="button" class="btn light">Delete</button>
    `;
}
