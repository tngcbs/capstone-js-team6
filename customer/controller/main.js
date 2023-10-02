const fetchProductList = () => {
    getProductList()
        .then((res) => {
            renderProductList(res.data);
        })
        .catch((err) => {
            console.log("fetchProductList Error: ", err);
        });
};

fetchProductList();