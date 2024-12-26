const currency = [
    "грн",
    "$"
];

const manufacturers = [
    {
        id: "adirondak",
        name: "Adirondak",
        link: "https://adirondak.com.ua/"
    },
    {
        id: "interia",
        name: "Interia",
        link: "https://interia.com.ua/"
    },
    {
        id: "ligno",
        name: "LIGNO",
        link: "https://ligno.com.ua/"
    },
    {
        id: "skloglas",
        name: "SKLO+GLAS",
        link: "http://glascom.com.ua/"
    },
    {
        id: "woodsoft",
        name: "Woodsoft",
        link: "https://woodsoft.ua/"
    },
    {
        id: "elegant",
        name: "Елегант",
        link: "https://www.mebli-elegant.com.ua/"
    },
    {
        id: "skif",
        name: "Скіф",
        link: "https://mebliskif.com.ua/"
    },
    {
        id: "yavoryna",
        name: "Яворина",
        link: "https://yavorina.com.ua/"
    }
];

const category = [
    {
        id: "chair",
        name: "Стільці"
    },
    {
        id: "table",
        name: "Столи"
    },
    {
        id: "carpet",
        name: "Килими"
    },
    {
        id: "bed",
        name: "Ліжка"
    },
    {
        id: "sofa",
        name: "Дивани"
    },
    {
        id: "other",
        name: "Інше"
    }
];

const colors = [
    {
        id: "white",
        name: "Білий"
    },
    {
        id: "pink",
        name: "Рожевий"
    },
    {
        id: "purple",
        name: "Фіолетовий"
    },
    {
        id: "green",
        name: "Зелений"
    },
    {
        id: "blue",
        name: "Синій"
    },
    {
        id: "yellow",
        name: "Жовтий"
    }
];

class Item {
    constructor(manufacturerId, img, title, price, currencyId, categoryId, mainColorId) {
        this.manufacturer = manufacturerId;
        this.img = img;
        this.title = title;
        this.price = price;
        this.currency = currency[currencyId];
        this.category = category[categoryId];
        this.color = colors[mainColorId];
    }

    get manufacturerLink() {
        return manufacturers[this.manufacturer].link;
    }

    get manufacturerName() {
        return manufacturers[this.manufacturer].name;
    }

    get manufacturerId() {
        return manufacturers[this.manufacturer].id;
    }

    validFilter(filter) {
        let fil = filter.replace("check-", "");
        let validCategory = this.category.id == fil;
        let validManufacturer = this.manufacturerId == fil;
        let validColor = this.color !== undefined && this.color.id == fil;
        let validName = this.title.toLowerCase().includes(filter.toLowerCase());
        return validCategory || validManufacturer || validColor || validName;
    }
}

class PlanItem {
    itemId;
    amount;
    comment;

    constructor(itemId, amount, comment) {
        this.itemId = itemId;
        this.amount = amount;
        this.comment = comment === undefined ? "" : comment;
    }

    get img() {
        return items[this.itemId].img;
    }

    get name() {
        return items[this.itemId].title;
    }
}

class PlanList {
    listName;
    itemList = []; //array of PlanItem

    constructor(listName, itemList) {
        this.listName = listName;
        if (itemList instanceof PlanItem) {
            this.itemList = itemList;
        } else {
            for (let i = 0; i < itemList.length; i++) {
                this.itemList[i] = new PlanItem(itemList[i].itemId, itemList[i].amount, itemList[i].comment);
            }
        }
    }

    add(item) {
        this.itemList.push(new PlanItem(items.indexOf(item), 1));
    }

    remove(itemId) {
        this.itemList.splice(itemId, 1);
    }
}

const items = [
    new Item(1, "assets/example/furn-1.jpg", "Prostir", "78 683", 0, 4, 0),
    new Item(1, "assets/example/furn-2.jpg", "Stelmakh", "65 211", 0, 4, 0),
    new Item(1, "assets/example/furn-3.jpg", "Delta", "9 480", 0, 1),
    new Item(1, "assets/example/furn-4.jpg", "Circle", "19 789", 0, 5, 0),
    new Item(1, "assets/example/furn-5.jpg", "Candy", "3 816", 0, 1, 4),
    new Item(1, "assets/example/furn-6.jpg", "Console", "3 542", 0, 1),
    new Item(2, "assets/example/furn-7.jpg", "Підліткова шафа Rainbow 3-дверна", "599", 1, 5),
    new Item(2, "assets/example/furn-8.jpg", "Дерев'яний комод Rainbow", "242", 1, 5),
    new Item(2, "assets/example/furn-9.jpg", "Дерев'яний письмовий стіл Rainbow", "245", 1, 1),
    new Item(2, "assets/example/furn-10.jpg", "Дерев'яний пенал Rainbow", "159", 1, 5),
    new Item(6, "assets/example/furn-11.jpg", "М'яке крісло \"Марті\"", "6 174", 0, 0, 3),
    new Item(6, "assets/example/furn-12.jpg", "М'яке крісло \"Орфей\"", "9 765", 0, 0, 4),
    new Item(4, "assets/example/furn-13.jpg", "Bari II", "18 200", 0, 4),
    new Item(4, "assets/example/furn-14.jpg", "Bari", "18 700", 0, 4, 0),
    new Item(4, "assets/example/furn-15.jpg", "Valencia", "17 900", 0, 4, 1),
    new Item(4, "assets/example/furn-16.jpg", "Modena", "20 600", 0, 4, 3),
    new Item(4, "assets/example/furn-17.jpg", "Lima", "19 900", 0, 4, 4),
    new Item(4, "assets/example/furn-18.jpg", "Elim II single", "17 500", 0, 3, 4),
    new Item(1, "assets/example/furn-19.jpg", "Joy", "27 837", 0, 4, 4),
    new Item(1, "assets/example/furn-20.jpg", "Baxter", "32 170", 0, 3, 2),
    new Item(1, "assets/example/furn-21.jpg", "Venus", "33 438", 0, 3),
    new Item(1, "assets/example/furn-22.jpg", "Mosaic", "54 741", 0, 3, 3),
    new Item(1, "assets/example/furn-23.jpg", "Grand Nobel", "46 192", 0, 3, 4),
    new Item(2, "assets/example/furn-24.jpg", "Дерев'яний стіл SPIDER", "939", 1, 1, 0),
    new Item(2, "assets/example/furn-25.jpg", "Дерев'яний стіл \"Астер\"", "248", 1, 1),
    new Item(2, "assets/example/furn-26.jpg", "Стелаж-перегородка BLOCK", "513", 1, 5, 5),
    new Item(2, "assets/example/furn-27.jpg", "Диван HORIZON 3", "1 061", 1, 4)
];

const plansPlaceholder = [
    new PlanList("Список #1",
        [
            new PlanItem(0, 1),
            new PlanItem(3, 4, "Дуже потрібно!"),
            new PlanItem(2, 1),
            new PlanItem(5, 1, "Щось цікаве???")
        ]
    ),
    new PlanList("Список #2",
        [
            new PlanItem(6, 2),
            new PlanItem(7, 1),
            new PlanItem(8, 1),
            new PlanItem(9, 4),
            new PlanItem(10, 38, "38.")
        ]
    )
];