const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-plus" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>';

let itemsList = document.querySelector("#interior-items");
let template = document.querySelector("#item-template").innerHTML;
let filterCategory = document.querySelector("#filter-category").innerHTML;
let filterColor = document.querySelector("#filter-color").innerHTML;
let pageBtn = document.querySelectorAll(".page-switch");
let itemCounter = document.querySelector(".item-counter");
let accCategory = document.querySelector("#flush-collapseOne");
let accManufacturer = document.querySelector("#flush-collapseTwo");
let accColor = document.querySelector("#flush-collapseThree");
let pagination = document.querySelector(".pagination");
let noItems = document.querySelector(".no-items");
let search = document.querySelector(".input-search");

let filteredItems = items;
let filters = [];
let page = 1;
let selectedItem = -1;
let localPlans = [];
let parsedJson = JSON.parse(sessionStorage.plansSaved);
for (let i = 0; i < parsedJson.length; i++) {
    localPlans[i] = new PlanList(parsedJson[i].listName, parsedJson[i].itemList);
}

document.addEventListener("DOMContentLoaded", function() {
    category.forEach(cat => {
        let html = Mustache.render(filterCategory, cat);
        accCategory.insertAdjacentHTML("beforeend", html)
    });
    manufacturers.forEach(manuf => {
        let html = Mustache.render(filterCategory, manuf);
        accManufacturer.insertAdjacentHTML("beforeend", html)
    });
    colors.forEach(col => {
        let html = Mustache.render(filterColor, col);
        accColor.insertAdjacentHTML("beforeend", html)
    });
    document.querySelectorAll(".check-filter").forEach(check => {
        check.addEventListener("click", function(e) {
            if (this.checked) {
                addFilter(this.id);
            } else {
                removeFilter(this.id);
            }
        })
    });
    search.addEventListener("change", function(e) {
        removeFilter(this.defaultValue);
        this.setAttribute('value', this.value);
        addFilter(this.value);
    });
    for (let i = 0; i < localPlans.length; i++) {
        let html = `<option value="plan-${i}">${localPlans[i].listName}</option>`;
        selectPlan.innerHTML += html;
    };
});

function updateAddToPage() {
    let addBtn = document.querySelectorAll(".btn-add");
    for (let i = 0; i < addBtn.length; i++) {
        addBtn[i].addEventListener("click", () => {
            selectedItem = addBtn[i].dataset.global;
        });
    }
    document.querySelector(".add-yes").removeEventListener("click", addAction);
    document.querySelector(".add-yes").addEventListener("click", addAction);
}

function addAction() {
    let pickedPlan = Number(selectPlan.value.replace("plan-", ""));
    localPlans[pickedPlan].add(items[selectedItem]);
    sessionStorage.plansSaved = JSON.stringify(localPlans);
}

function updatePagination() {
    if (filteredItems.length === 0) {
        pagination.classList.add("d-none");
        return;
    } else {
        pagination.classList.remove("d-none");
    }
    for (let i = 1; i <= pageBtn.length; i++) {
        let btn = pageBtn[i-1];
        btn.parentElement.classList.remove("disabled");
        btn.dataset.page = i;
        
        let maxPage = Math.ceil(filteredItems.length / 12);
        if (i > maxPage)
            btn.parentElement.classList.add("disabled");
    }
}

function updateItems(e) {
    document.querySelector(".active").classList.remove("active");
    this.parentElement.classList.add("active");
    
    renderItems();
}

function addFilter(filter) {
    filters.push(filter);
    filterItems();
}

function removeFilter(filter) {
    filters.splice(filters.findIndex(el => el == filter), 1);
    filterItems();
}

function filterItems() {
    filteredItems = [];
    if (filters.length === 0) {
        filteredItems = items;
    } else {
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < filters.length; j++) {
                if (items[i].validFilter(filters[j]) && !filteredItems.includes(items[i])) {
                    filteredItems.push(items[i]);
                }
            }
        }
    }
    changePage(1);

    document.querySelector(".active").classList.remove("active");
    document.querySelector(".page-switch").parentElement.classList.add("active");
    renderItems();
}

function renderItems() {
    if (filteredItems.length === 0) {
        noItems.classList.remove("d-none");
    } else {
        noItems.classList.add("d-none");
    }

    itemsList.innerHTML = "";
    for (let i = 0; i < 12; i++) {
        let id = i + (page - 1) * 12;
        if (filteredItems[id] === undefined) break;
        let html = Mustache.render(template, {
            index: items.indexOf(filteredItems[id]),
            item: filteredItems[id]
        });
        itemsList.insertAdjacentHTML("beforeend", html);
    }
    let itemStart = (page - 1) * 12 + 1;
    let itemEnd = Math.min(page * 12, filteredItems.length);
    itemCounter.textContent = `${itemStart} - ${itemEnd} з ${filteredItems.length}`;
    updatePagination();
    updateAddToPage();
}

function changePage(newPage) {
    page = Number(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

pageBtn.forEach(btn => btn.addEventListener("click", () => changePage(btn.dataset.page)));
pageBtn.forEach(btn => btn.addEventListener("click", updateItems));

renderItems();

let selectPlan = document.querySelector("#selectPlan");