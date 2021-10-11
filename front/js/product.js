const fetchProduct = async () => {
    const queryString_Url_id = window.location.search;
    const product =
        "http://localhost:3000/api/products/" + queryString_Url_id.slice(4);
    await fetch(product)
        .then((res) => res.json())
        .then((data) => {
            products = data;
        })
        .catch((error) => console.log(error));
};
const display = () => {
    if (products.length === 0) {
        console.log("Pas de produits");
    } else {
        const img = document.createElement("img");
        const item_img = document.getElementsByClassName("item__img");
        document.title = products.name;
        img.setAttribute("src", products.imageUrl);
        img.setAttribute("alt", products.altTxt);

        item_img[0].appendChild(img);

        title.textContent = `${products.name}`;
        price.textContent = `${(products.price / 10).toFixed(2)}`;
        description.textContent = `${products.description}`;

        let colorsProduct = [];
        products.colors.map((color) => {
            const option = document.createElement("option");
            option.setAttribute("value", color);
            option.textContent = color;
            colors.appendChild(option);
        });
        colors.innerHTML += `${colorsProduct.join("")}`;
    }
};

const addToCard = () => {
    const addToCartId = document.getElementById("addToCart");

    addToCartId.addEventListener("click", (e) => {
        const color = document.getElementById("colors").value;
        const quantity = parseInt(document.getElementById("quantity").value);
        const productLocalStorageName = products.name + " color: " + color;

        if (quantity > 100 || quantity === 0 || color === "") {
            console.log("Choisissez une quantité entre 1-100 et une couleur");
            alert("Choisissez une quantité entre 1-100 et une couleur");
        } else if (localStorage.getItem(productLocalStorageName) === null) {
            products.quantity = quantity;
            products.color = color;
            localStorage.setItem(
                productLocalStorageName,
                JSON.stringify(products)
            );
            console.log(products.name + "a bien était ajouter a votre panier");
        } else if (localStorage.getItem(productLocalStorageName) !== null) {
            products.quantity = parseInt(quantity);
            products.color = color;
            localStorage.setItem(
                productLocalStorageName,
                JSON.stringify(products)
            );
            console.log(products.name + "a bien était ajouter a votre panier");
        } else {
            console.log("Une erreur est survenue");
        }
    });
    const allStorage = () => {
        let values = [];
        let keys = Object.keys(localStorage);
        let i = keys.length;

        for (let index = 0; index < i; index++) {
            values.push(localStorage.getItem(keys[index]));
        }
        return values;
    };
    allStorage().forEach((element) => {
        console.log(JSON.parse(element));
    });
};
fetchProduct()
    .then(() => display())
    .then(() => addToCard());
