const display = () => {
    const queryString_Url_id = window.location.search;
    orderId.textContent = queryString_Url_id.slice(4);
    localStorage.clear();
    setTimeout(() => {
        document.location.href = "http://127.0.0.1:5500/front/html/index.html";
    }, 3000);
};
display();
