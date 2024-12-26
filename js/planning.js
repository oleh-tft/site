let container = document.querySelector(".acc-plan");
let templateList = document.querySelector("#template-list").innerHTML;
let current = -1;
let localPlans = [];
let parsedJson = JSON.parse(sessionStorage.plansSaved);
for (let i = 0; i < parsedJson.length; i++) {
    localPlans[i] = new PlanList(parsedJson[i].listName, parsedJson[i].itemList);
}

function renderLists() {
    container.innerHTML = "";
    for (let i = 0; i < localPlans.length; i++) {
        let html = Mustache.render(templateList, {
            id: i,
            accCollapsed: i != current ? "collapsed" : "",
            accShow: i == current ? "show" : "",
            listName: localPlans[i].listName,
            itemList: localPlans[i].itemList,
            index: function () {
                return localPlans[i].itemList.indexOf(this) + 1;
            }
        });
        container.insertAdjacentHTML("beforeend", html);
    }
    addAccordion();
    addDeleteButtons();
    addRenameButtons();
}

function addAccordion() {
    let btnAccordion = document.querySelectorAll(".acc-button-nm");

    for (let i = 0; i < btnAccordion.length; i++) {
        btnAccordion[i].addEventListener("click", () => {
            if (!btnAccordion[i].classList.contains("collapsed")) {
                current = i;
            } else {
                current = -1;
            }
        });
    }
}

function addDeleteButtons() {
    for (let i = 0; i < container.children.length; i++) {
        let items = container.children[i].querySelectorAll(".plan-item");
        for (let j = 0; j < items.length; j++) {
            items[j].querySelector(".btn-delete-item").addEventListener("click", function() {
                localPlans[i].remove(j);
                sessionStorage.plansSaved = JSON.stringify(localPlans);
                renderLists();
            });
        }
    }
}

function addRenameButtons() {
    $(".btn-rename").click(function() {
        let index = $(".btn-rename").index(this);
        let newName = $(`#rename-${index}`).val().trim();
        if (newName !== "") {
            localPlans[index].listName = newName;
            sessionStorage.plansSaved = JSON.stringify(localPlans);
            renderLists();
        }
    });
}

function saveText() {
    $("[name=item-amount]").change(function(e) {
        localPlans[current].itemList[Number($(this).data("iter"))-1].amount = $(this).val();
        sessionStorage.plansSaved = JSON.stringify(localPlans);
    });
    $(".custom-comment").change(function(e) {
        localPlans[current].itemList[Number($(this).data("iter"))-1].comment = $(this).val();
        sessionStorage.plansSaved = JSON.stringify(localPlans);
    });
}

renderLists();

$(document).ready(function () {
    $(".delete-yes").click(function() {
        localPlans.splice(current, 1);
        sessionStorage.plansSaved = JSON.stringify(localPlans);
        renderLists();
    });

    $(".btn-new-plan").click(function() {
        localPlans.push(new PlanList(`Список #${localPlans.length+1}`, []));
        sessionStorage.plansSaved = JSON.stringify(localPlans);
        renderLists();
    });

    saveText();
});