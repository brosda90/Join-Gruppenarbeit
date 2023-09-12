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


