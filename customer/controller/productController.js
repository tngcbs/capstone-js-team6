const getElement = (selector) => document.querySelector(selector);

const getElementAll = (selector) => document.querySelectorAll(selector);

const renderProductList = (productList) => {
    let stringHTML = '';

    productList.forEach((product) => {
        stringHTML += `
        <div class="product-items__detail col-lg-3 col-md-6 col-sm-12 mt-5">
        <div class="card">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">New</h6>
                <h5 class="card-title">${product.name}</h5>
            </div>
            <img src="${product.img}"
                class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <span class="card-text">From $ ${product.price}</span>
                <a href="#" class="btn btn-primary" onclick="addProductToCart(${product.id})">Buy</a>
            </div>
        </div>
    </div>   
        `;
    });

    getElement("#productList").innerHTML = stringHTML;
};

