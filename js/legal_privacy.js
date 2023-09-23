document.addEventListener("DOMContentLoaded", async function () {
    await initLegalPrivacy();
});


async function initLegalPrivacy() {
    if(isNotAUser == true) {
        document.getElementById('nav-menu').classList.add('d-none');
    }
}
