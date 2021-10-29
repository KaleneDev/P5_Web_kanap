const fetchProducts = async () => {
    await fetch("http://localhost:3000/api/products")
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
        products.map((product) => {
            const href = document.createElement("a");
            const article = document.createElement("article");
            const img = document.createElement("img");
            const h3 = document.createElement("h3");
            const p = document.createElement("p");

            href.setAttribute("href", "./product.html?id=" + product._id);
            img.setAttribute("src", product.imageUrl);
            img.setAttribute("alt", product.altTxt);
            h3.className = "productName";
            p.className = "productDescription";

            h3.textContent  = product.name;
            p.textContent  = product.description;

            href.appendChild(article);
            article.appendChild(img);
            article.appendChild(h3);
            article.appendChild(p);

            document.getElementById("items").appendChild(href);
        });
    }
};
fetchProducts().then(() => display());

