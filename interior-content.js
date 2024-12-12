const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-plus" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>';

const manufacturers = [
    ["Adirondak", "https://adirondak.com.ua/"],
    ["Interia", "https://interia.com.ua/"],
    ["LIGNO", "https://ligno.com.ua/"],
    ["SKLO+GLAS", "http://glascom.com.ua/"],
    ["Woodsoft", "https://woodsoft.ua/"],
    ["Елегант", "https://www.mebli-elegant.com.ua/"],
    ["Скіф", "https://mebliskif.com.ua/"],
    ["Яворина", "https://yavorina.com.ua/"]
];

const currency = [
    "грн",
    "$"
];

const items = [
    {
        manufacturer: 1,
        img: "assets/example/furn-1.jpg",
        title: "Prostir",
        price: "78 683",
        currency: 0
    },
    {
        manufacturer: 1,
        img: "assets/example/furn-2.jpg",
        title: "Stelmakh",
        price: "65 211",
        currency: 0
    },
    {
        manufacturer: 1,
        img: "assets/example/furn-3.jpg",
        title: "Delta",
        price: "9 480",
        currency: 0
    },
    {
        manufacturer: 1,
        img: "assets/example/furn-4.jpg",
        title: "Circle",
        price: "19 789",
        currency: 0
    },
    {
        manufacturer: 1,
        img: "assets/example/furn-5.jpg",
        title: "Candy",
        price: "3 816",
        currency: 0
    },
    {
        manufacturer: 1,
        img: "assets/example/furn-6.jpg",
        title: "Console",
        price: "3 542",
        currency: 0
    },
    {
        manufacturer: 2,
        img: "assets/example/furn-7.jpg",
        title: "Підліткова шафа Rainbow 3-дверна",
        price: "599",
        currency: 1
    },
    {
        manufacturer: 2,
        img: "assets/example/furn-8.jpg",
        title: "Дерев'яний комод Rainbow",
        price: "242",
        currency: 1
    },
    {
        manufacturer: 2,
        img: "assets/example/furn-9.jpg",
        title: "Дерев'яний письмовий стіл Rainbow",
        price: "245",
        currency: 1
    },
    {
        manufacturer: 1,
        img: "assets/example/furn-10.jpg",
        title: "Дерев'яний пенал Rainbow",
        price: "159",
        currency: 0
    },
    {
        manufacturer: 6,
        img: "assets/example/furn-11.jpg",
        title: "М'яке крісло \"Марті\"",
        price: "6 174",
        currency: 0
    },
    {
        manufacturer: 6,
        img: "assets/example/furn-12.jpg",
        title: "М'яке крісло \"Орфей\"",
        price: "9 765",
        currency: 0
    },
];

let itemsList = document.querySelector("#interior-items");

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
    manufLink.setAttribute("href", manuf[1]);
    manufLink.textContent = manuf[0];
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
    itemPrice.textContent = `${item.price} ${item.currency}`;
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