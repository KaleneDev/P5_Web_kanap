const display = () => {
    // Recuperation des key du localStorage
    const allStorage = () => {
        let values = [];
        let keys = Object.keys(localStorage);
        let i = keys.length;

        for (let index = 0; index < i; index++) {
            values.push(localStorage.getItem(keys[index]));
        }

        return values;
    };
    // Affichage des produits
    allStorage().forEach((element) => {
        const product = JSON.parse(element);
        let key = product.name + " color: " + product.color;

        //creation des elements
        const article = document.createElement("article");
        const cart__item__img = document.createElement("div");
        const cart__item__content = document.createElement("div");

        const cart__item__content__titlePrice = document.createElement("div");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");

        const cart__item__content__settings = document.createElement("div");
        const cart__item__content__settings__quantity =
            document.createElement("div");
        const pQuantity = document.createElement("p");
        const inputQuantity = document.createElement("input");
        const cart__item__content__settings__delete =
            document.createElement("div");
        const pDelete = document.createElement("p");

        const img = document.createElement("img");
        // ajout des attribute
        article.className = "cart__item";
        article.setAttribute("data-id", product._id);
        article.setAttribute("data-key", key);
        cart__item__img.className = "cart__item__img";

        cart__item__content.className = "cart__item__content";
        cart__item__content__settings__quantity.className =
            "cart__item__content__settings__quantity";
        inputQuantity.className = "itemQuantity";

        cart__item__content__titlePrice.className =
            "cart__item__content__titlePrice";

        cart__item__content__settings.className =
            "cart__item__content__settings";
        cart__item__content__settings__delete.className =
            "cart__item__content__settings__delete";
        pDelete.className = "deleteItem";

        img.setAttribute("src", product.imageUrl);
        img.setAttribute("alt", product.altTxt);
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("name", "itemQuantity");
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("value", product.quantity);
        h2.textContent = product.name;
        p.textContent = (product.price / 10).toFixed(2) + "€";
        pQuantity.textContent = "Qté :" + product.quantity;
        pDelete.textContent = "Supprimer";
        // Ajout des element dans le document
        article.appendChild(cart__item__img);
        cart__item__img.appendChild(img);

        article.appendChild(cart__item__content);
        cart__item__content.appendChild(cart__item__content__titlePrice);
        cart__item__content__titlePrice.appendChild(p);
        cart__item__content__titlePrice.appendChild(h2);
        article.appendChild(cart__item__content__settings);
        cart__item__content__settings.appendChild(
            cart__item__content__settings__quantity
        );
        cart__item__content__settings__quantity.appendChild(pQuantity);
        cart__item__content__settings__quantity.appendChild(inputQuantity);
        article.appendChild(cart__item__content__settings__delete);
        cart__item__content__settings__delete.appendChild(pDelete);

        document.getElementById("cart__items").appendChild(article);
    });
};
const changeQuantity = () => {
    const quantity = document.querySelectorAll(".itemQuantity");
    const pQuantity = document.querySelectorAll(
        ".cart__item__content__settings__quantity p"
    );

    for (let i = 0; i < quantity.length; i++) {
        quantity[i].addEventListener("change", (e) => {
            const key = e.path[3].getAttribute("data-key");
            const QuantityValue = quantity[i].value;
            const localeStorageProduct = localStorage.getItem(key);
            const product = JSON.parse(localeStorageProduct);
            product.quantity = parseInt(QuantityValue);
            localStorage.setItem(key, JSON.stringify(product));
            pQuantity[i].textContent = "Qté :" + product.quantity;
            total();
        });
    }
};
const deleteProduct = () => {
    const deleteProduct = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < deleteProduct.length; i++) {
        deleteProduct[i].addEventListener("click", (e) => {
            const key = e.path[2].getAttribute("data-key");
            localStorage.removeItem(key);
            console.log(key + "est bien supprimé !");
            location.reload();
        });
    }
};
const total = () => {
    const key = Object.keys(localStorage);
    let total = 0;
    let quantityTotal = 0;
    for (let i = 0; i < key.length; i++) {
        const localeStorageProduct = localStorage.getItem(key[i]);
        const price = JSON.parse(localeStorageProduct).price;
        const quantity = JSON.parse(localeStorageProduct).quantity;
        total += price * quantity;
        quantityTotal += quantity;
    }
    const totalQuantity = document.getElementById("totalQuantity");
    const totalPrice = document.getElementById("totalPrice");

    totalQuantity.textContent = quantityTotal;
    totalPrice.textContent = (total / 10).toFixed(2);
};
const confirmation = () => {
    const cart__order = document.querySelectorAll(".cart__order input");
    for (let i = 0; i < cart__order.length; i++) {
        cart__order[i].addEventListener("input", (e) => {
            const checkValueInput = () => {
                if (firstName.value) {
                    firstNameErrorMsg.textContent = "";
                }
                if (lastName.value) {
                    lastNameErrorMsg.textContent = "";
                }
                if (address.value) {
                    addressErrorMsg.textContent = "";
                }
                if (city.value) {
                    cityErrorMsg.textContent = "";
                }
                if (email.value) {
                    emailErrorMsg.textContent = "";
                }
            };
            checkValueInput();
        });
        order.addEventListener("click", (e) => {
            const checkValueInput = () => {
                if (!firstName.value) {
                    firstNameErrorMsg.textContent = "Prénom incorrect !";
                } else {
                    firstNameErrorMsg.textContent = "";
                }
                if (!lastName.value) {
                    lastNameErrorMsg.textContent = "Nom incorrect !";
                } else {
                    lastNameErrorMsg.textContent = "";
                }
                if (!address.value) {
                    addressErrorMsg.textContent = "Adresse incorrect !";
                } else {
                    addressErrorMsg.textContent = "";
                }
                if (!city.value) {
                    cityErrorMsg.textContent = "Ville incorrect !";
                } else {
                    cityErrorMsg.textContent = "";
                }
                if (!email.value) {
                    emailErrorMsg.textContent = "Email incorrect !";
                } else {
                    emailErrorMsg.textContent = "";
                }
            };
            checkValueInput();
        });
    }

    order.addEventListener("click", (e) => {
        e.preventDefault();
        const allStorage = () => {
            let values = [];
            let keys = Object.keys(localStorage);
            let i = keys.length;

            for (let index = 0; index < i; index++) {
                values.push(localStorage.getItem(keys[index]));
            }
            return values;
        };
        let cart = allStorage();
        let contact = {};
        let products = [];
        if (
            cart.length !== 0 &&
            firstName.value &&
            lastName.value &&
            address.value &&
            city.value &&
            email.value
        ) {
            for (let i = 0; i < cart.length; i++) {
                products.push(JSON.parse(allStorage()[i])._id);
            }
            contact.firstName = firstName.value;
            contact.lastName = lastName.value;
            contact.address = address.value;
            contact.city = city.value;
            contact.email = email.value;
            // POST
            const send = { contact, products };
            const option = {
                method: "POST",
                body: JSON.stringify(send),
                headers: {
                    "Content-Type": "application/json",
                },
            };

            fetch("http://localhost:3000/api/products/order", option)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    localStorage.clear();
                    localStorage.setItem("orderId", data.orderId);
                    document.location.href =
                        "http://127.0.0.1:5500/front/html/confirmation.html";
                });

            // alert("Votre commande à bien était pris en compte");
        } else if (cart.length === 0) {
            alert("Pas de produit dans votre panier");
            console.log("error");
        }
    });
};
display();
changeQuantity();
total();
deleteProduct();
confirmation();
