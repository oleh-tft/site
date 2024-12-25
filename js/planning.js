let container = document.querySelector(".acc-plan");
let templateList = document.querySelector("#template-list").innerHTML;
let current = 0;

function renderLists() {
    container.innerHTML = "";
    for (let i = 0; i < plans.length; i++) {
        let html = Mustache.render(templateList, {
            id: i,
            accCollapsed: i != current ? "collapsed" : "",
            accShow: i == current ? "show" : "",
            listName: plans[i].listName,
            itemList: plans[i].itemList,
            index: function () {
                return plans[i].itemList.indexOf(this) + 1;
            }
        });
        container.insertAdjacentHTML("beforeend", html);
    }
    addAccordion();
    addDeleteButtons();
}

function addAccordion() {
    let btnAccordion = document.querySelectorAll(".acc-button-nm");

    for (let i = 0; i < btnAccordion.length; i++) {
        btnAccordion[i].addEventListener("click", () => {
            current = i;
        });
    }
}

function addDeleteButtons() {
    for (let i = 0; i < container.children.length; i++) {
        let items = container.children[i].querySelectorAll(".plan-item");
        for (let j = 0; j < items.length; j++) {
            items[j].querySelector(".btn-delete-item").addEventListener("click", function() {
                plans[i].remove(j);
                renderLists();
            });
        }
    }
}

renderLists();

$(document).ready(function () {
    $(".delete-yes").click(function() {
        plans.splice(current, 1);
        renderLists();
    });
});