let container = document.querySelector(".acc-plan");
let templateList = document.querySelector("#template-list").innerHTML;

function numberInc(max) {
    let num = 0;
    for (let i = 0; i < max; i++) {
        num = i;
    }
    return num;
}

function renderLists() {
    container.innerHTML = "";
    for (let i = 0; i < plans.length; i++) {
        let html = Mustache.render(templateList, {
            id: i,
            accCollapsed: i != 0 ? "collapsed" : "",
            accShow: i == 0 ? "show" : "",
            listName: plans[i].listName,
            itemList: plans[i].itemList,
            index: function () {
                return plans[i].itemList.indexOf(this) + 1;
            }
        });
        container.insertAdjacentHTML("beforeend", html);
    }
}

renderLists();

/*
function addDeleteButtons() {
    for (let i = 0; i < container.children; i++) {
        let btnDeleteWrap = document.createElement("div");
        btnDeleteWrap.classList.add("btn-delete-plan", "d-flex", "justify-content-end", "mt-4");

        let btnDelete = document.createElement("button");
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute("data-bs-toggle", "modal");
        btnDelete.setAttribute("data-bs-target", "#deleteModal");
        btnDelete.classList.add("btn", "btn-outline-danger");
        btnDelete.textContent = "Вилучити список";
        btnDelete.dataset.id = i;

        btnDeleteWrap.append(btnDelete);
    }
}
*/

let btnDelete = document.querySelectorAll(".btn-delete-plan");

console.log(plans.length);

function addDeleteButtons() {
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click", () => { 
            container.children[i].remove();
    });
    }
}

addDeleteButtons();