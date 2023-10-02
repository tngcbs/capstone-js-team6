const BASE_URL = "https://650aaf0ddfd73d1fab08b325.mockapi.io/products";

const getProductList = (name) => {
    return axios({
        url: BASE_URL,
        method: 'GET',
        param: {
            name: name || undefined,
        },
    })
};