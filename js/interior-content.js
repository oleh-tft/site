const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-plus" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>';

let itemsList = document.querySelector("#interior-items");
let template = document.querySelector("#item-template").innerHTML;
let pageBtn = document.querySelectorAll(".page-switch");
let itemCounter = document.querySelector(".item-counter");
let page = 1;
let maxPage = Math.ceil(items.length / 12);
let localPage = [];

document.addEventListener("DOMContentLoaded", function() {
    for (let i = 1; i <= pageBtn.length; i++) {
        let btn = pageBtn[i-1];
        btn.dataset.page = i;
        
        if (i > maxPage)
            btn.parentElement.classList.add("disabled");
    }
});

function updateItems(e) {
    document.querySelector(".active").classList.remove("active");
    this.parentElement.classList.add("active");
    
    renderItems();
}

function setLocalItems() {
    for (let i = 0; i < 12; i++) {
        localPage[i] = items[i];
    }
}

function renderItems() {
    itemsList.innerHTML = "";
    for (let i = 0; i < 12; i++) {
        let id = i + (page - 1) * 12;
        if (items[id] === undefined) break;
        let html = Mustache.render(template, items[id]);
        itemsList.insertAdjacentHTML("beforeend", html);
    }
    let itemStart = (page - 1) * 12 + 1;
    let itemEnd = Math.min(page * 12, items.length);
    itemCounter.textContent = `${itemStart} - ${itemEnd} з ${items.length}`;
}

function changePage(newPage) {
    page = Number(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

pageBtn.forEach(btn => btn.addEventListener("click", () => changePage(btn.dataset.page)));
pageBtn.forEach(btn => btn.addEventListener("click", updateItems));

renderItems();