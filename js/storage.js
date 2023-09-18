const STORAGE_TOKEN = '6E3ZJQ08T28HLNYDZ6RRN8U79V2FL0N375M0W6KJ';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res && res.data) { 
            return res.data.value;
        }
        return null; // return null, wenn keine Daten gefunden werden
    });
}


// Basis-Funktionen
let contactList = [];
let userList = [];
let sortedContactList = [];
let lastContactId = 0;

async function userAndContacts() {
    contactList = await loadFromStorage('contacts', contactList);
    userList = await loadFromStorage('users', userList);
}


async function loadFromStorage(key = 'contacts', defaultList = []) {
    let tempData;
    tempData = await loadData(key, defaultList);
    return tempData;
}


function sortMyList(myArray) {
    if(contactList.length > 1) {
        return sortContacts(myArray);
    } else {
        return myArray;
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

// #####
userAndContacts();
