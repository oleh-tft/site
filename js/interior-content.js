const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-plus" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>';

const manufacturers = [
    {
        name: "Adirondak",
        link: "https://adirondak.com.ua/"
    },
    {
        name: "Interia",
        link: "https://interia.com.ua/"
    },
    {
        name: "LIGNO",
        link: "https://ligno.com.ua/"
    },
    {
        name: "SKLO+GLAS",
        link: "http://glascom.com.ua/"
    },
    {
        name: "Woodsoft",
        link: "https://woodsoft.ua/"
    },
    {
        name: "Елегант",
        link: "https://www.mebli-elegant.com.ua/"
    },
    {
        name: "Скіф",
        link: "https://mebliskif.com.ua/"
    },
    {
        name: "Яворина",
        link: "https://yavorina.com.ua/"
    }
];

const currency = [
    "грн",
    "$"
];

class Item {
    constructor(manufacturerId, img, title, price, currencyId) {
        this.manufacturer = manufacturerId;
        this.img = img;
        this.title = title;
        this.price = price;
        this.currency = currencyId;
    }

    get manufacturerLink() {
        return manufacturers[this.manufacturer].link;
    }

    get manufacturerName() {
        return manufacturers[this.manufacturer].name;
    }
}

const items = [
    new Item(1, "assets/example/furn-1.jpg", "Prostir", "78 683", 0),
    new Item(1, "assets/example/furn-2.jpg", "Stelmakh", "65 211", 0),
    new Item(1, "assets/example/furn-3.jpg", "Delta", "9 480", 0),
    new Item(1, "assets/example/furn-4.jpg", "Circle", "19 789", 0),
    new Item(1, "assets/example/furn-5.jpg", "Candy", "3 816", 0),
    new Item(1, "assets/example/furn-6.jpg", "Console", "3 542", 0),
    new Item(2, "assets/example/furn-7.jpg", "Підліткова шафа Rainbow 3-дверна", "599", 1),
    new Item(2, "assets/example/furn-8.jpg", "Дерев'яний комод Rainbow", "242", 1),
    new Item(2, "assets/example/furn-9.jpg", "Дерев'яний письмовий стіл Rainbow", "245", 1),
    new Item(2, "assets/example/furn-10.jpg", "Дерев'яний пенал Rainbow", "159", 1),
    new Item(6, "assets/example/furn-11.jpg", "М'яке крісло \"Марті\"", "6 174", 0),
    new Item(6, "assets/example/furn-12.jpg", "М'яке крісло \"Орфей\"", "9 765", 0),
    new Item(4, "assets/example/furn-13.jpg", "Bari II", "18 200", 0),
    new Item(4, "assets/example/furn-14.jpg", "Bari", "18 700", 0),
    new Item(4, "assets/example/furn-15.jpg", "Valencia", "17 900", 0),
    new Item(4, "assets/example/furn-16.jpg", "Modena", "20 600", 0),
    new Item(4, "assets/example/furn-17.jpg", "Lima", "19 900", 0),
    new Item(4, "assets/example/furn-18.jpg", "Elim II single", "17 500", 0),
    new Item(1, "assets/example/furn-19.jpg", "Joy", "27 837", 0),
    new Item(1, "assets/example/furn-20.jpg", "Baxter", "32 170", 0),
    new Item(1, "assets/example/furn-21.jpg", "Venus", "33 438", 0),
    new Item(1, "assets/example/furn-22.jpg", "Mosaic", "54 741", 0),
    new Item(1, "assets/example/furn-23.jpg", "Grand Nobel", "46 192", 0),
];

let itemsList = document.querySelector("#interior-items");
let template = document.querySelector("#item-template").innerHTML;
let page = 0;

function updateItems() {
    for (let i = 0; i < 12; i++) {
        let id = i + page * 12;
        if (items[id] === undefined) break;
        let html = Mustache.render(template, items[id]);
        itemsList.insertAdjacentHTML("beforeend", html);
    }
}

updateItems();

let pageBtn = document.querySelectorAll(".page-switch");
pageBtn.forEach(btn => btn.addEventListener("click", () => {
    pageBtn[page].classList.remove("active");
    page = parseInt(btn.textContent);
    btn.parentElement.classList.add("active");
    updateItems();
}));

/*
for (const item of items) {
    let manuf = manufacturers[item.manufacturer];

    let mainCol = document.createElement("div");
    mainCol.classList.add("col");

    let cardItem = document.createElement("div");
    cardItem.classList.add("card", "card-item");

    let manufDiv = document.createElement("div");
    manufDiv.classList.add("manuf");

    let manufLink = document.createElement("a");
    manufLink.classList.add("link-secondary");
    manufLink.setAttribute("href", manuf.link);
    manufLink.textContent = manuf.name;
    manufDiv.append(manufLink);

    let itemImg = document.createElement("img");
    itemImg.classList.add("card-img-top");
    itemImg.setAttribute("src", item.img);

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("card-body", "d-flex", "justify-content-between", "align-items-center");

    let itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");

    let itemTitle = document.createElement("h5");
    itemTitle.classList.add("card-title");
    itemTitle.textContent = item.title;

    let itemPrice = document.createElement("p");
    itemPrice.classList.add("card-text");
    itemPrice.textContent = `${item.price} ${currency[item.currency]}`;
    itemInfo.append(itemTitle);
    itemInfo.append(itemPrice);

    let btnAdd = document.createElement("button");
    btnAdd.classList.add("btn-add");
    btnAdd.setAttribute("type", "button");
    btnAdd.setAttribute("title", "Додати до списку планування");
    btnAdd.innerHTML = svg;

    itemDiv.append(itemInfo);
    itemDiv.append(btnAdd);

    cardItem.append(manufDiv);
    cardItem.append(itemImg);
    cardItem.append(itemDiv);

    mainCol.append(cardItem);
    itemsList.append(mainCol);
}
*/