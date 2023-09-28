// get Element
const getElm = (elm) => document.querySelector(elm);

const getProductList = () => {
  const promise = axios({
    method: "GET",
    url: "https://6500588718c34dee0cd4bf43.mockapi.io/products",
  });

  promise
    // get data thành công
    .then((result) => {
      renderTable(result.data);
    })
    // get data thất bại
    .catch((err) => {
      console.log(err);
    });
  // // Luôn luôn chạy dù thành công, thất bại
  // .finally(() => {
  //   console.log("finally");
  // });
};
getProductList();
const renderTable = (productList) => {
  let htmlContent = "";
  for (let i = 0; i < productList.length; i++) {
    let product = productList[i];
    htmlContent += `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img src='${product.img}' width="50px"/></td>
            <td>${product.desc}</td>
            <td>Sửa || Xóa</td>
        </tr>
    `;
  }
  getElm("#tablePhone").innerHTML = htmlContent;
};
