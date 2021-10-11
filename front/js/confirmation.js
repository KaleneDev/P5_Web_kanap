const display = () => {
    orderId.textContent = localStorage.getItem("orderId");
    localStorage.clear();
    // setTimeout(() => {
    //     document.location.href = "http://127.0.0.1:5500/front/html/index.html";
    // }, 2000);
};
display();
