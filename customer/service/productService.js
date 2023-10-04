const BASE_URL = "https://650aaf0ddfd73d1fab08b325.mockapi.io/products";

const getProductList = () => {
    return axios({
        url: BASE_URL,
        method: 'GET'
    })
};

const getProductById = (id) => {
    return axios({
        url: `${BASE_URL}/${id}`,
        method: 'GET'
    })
};