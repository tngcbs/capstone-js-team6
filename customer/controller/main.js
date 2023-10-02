const fetchProductList = () => {
    getProductList()
        .then((res) => {
            renderProductList(res.data);
        })
        .catch((err) => {
            console.log('fetchProductList Error: ', err);
        });
};

fetchProductList();

const filterProductByType = () => {
    let typeSelect = getElement('#typeSelect');
    let value = typeSelect.value;
    getProductList()
        .then((res) => {
            let productList = res.data;
            let result = productList.filter((product) => {
                return product.type.includes(value);
            });
            renderProductList(result);
        })
        .catch((err) => {
            console.log('filterProductByType Error: ', err);
        });
};