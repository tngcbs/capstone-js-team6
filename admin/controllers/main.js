import products from "../models/products.js";
// get Element
const getElm = (elm) => document.querySelector(elm);
const getProductList = () => {
  const promise = axios({
    method: "GET",
    url: "https://650aaf0ddfd73d1fab08b325.mockapi.io/products",
  });

  promise
    .then((result) => {
      renderTable(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
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
            <td align="center">
              <button data-bs-toggle="modal" data-bs-target="#exampleModal"
              class="btn btn-warning"
               onclick="editProduct(${product.id})">Sửa</button>
              <button class="btn btn-danger" onclick="delProduct(${product.id})">Xóa</button>

            </td>
        </tr>
    `;
  }
  getElm("#tablePhone").innerHTML = htmlContent;
};

const getInfor = () => {
  let name = getElm("#name").value;
  let price = getElm("#price").value;
  let screen = getElm("#screen").value;
  let backCamera = getElm("#backCam").value;
  let frontCamera = getElm("#frontCam").value;
  let img = getElm("#img").value;
  let desc = getElm("#desc").value;
  let type = getElm("#type").value;
  return new products(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
};

const resetForm = () => {
  getElm("#name").value = "";
  getElm("#price").value = "";
  getElm("#screen").value = "";
  getElm("#backCam").value = "";
  getElm("#frontCam").value = "";
  getElm("#img").value = "";
  getElm("#desc").value = "";
  getElm("#type").value = "";
};

//add Product

getElm("#btnAddPhone").onclick = () => {
  const products = getInfor();
  const promise = axios({
    url: "https://650aaf0ddfd73d1fab08b325.mockapi.io/products",
    method: "POST",
    data: products,
  });
  promise
    .then(() => {
      getElm("#btnClose").click();
      getProductList();
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

getElm("#addPhoneForm").onclick = () => {
  resetForm();
  getElm("#btnAddPhone").style.display = "inline-block";
  getElm("#btnUpdate").style.display = "none";
};

//edit Product
window.editProduct = (id) => {
  getElm("#btnAddPhone").style.display = "none";
  getElm("#btnUpdate").style.display = "inline-block";
  const promise = axios({
    url: `https://650aaf0ddfd73d1fab08b325.mockapi.io/products/${id}`,
    method: "GET",
  });
  promise
    .then((res) => {
      let products = res.data;
      getElm("#btnUpdate").setAttribute("data-id", products.id);
      getElm("#name").value = products.name;
      getElm("#price").value = products.price;
      getElm("#screen").value = products.screen;
      getElm("#backCam").value = products.backCamera;
      getElm("#frontCam").value = products.frontCamera;
      getElm("#img").value = products.img;
      getElm("#desc").value = products.desc;
      getElm("#type").value = products.type;
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
//Update
getElm("#btnUpdate").onclick = () => {
  let products = getInfor();
  let id = getElm("#btnUpdate").getAttribute("data-id");
  const promise = axios({
    url: `https://650aaf0ddfd73d1fab08b325.mockapi.io/products/${id}`,
    method: "PUT",
    data: products,
  });
  promise
    .then(() => {
      getProductList();
      getElm("#btnClose").click();
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

// DELETE PRODUCT
window.delProduct = (id) => {
  const promise = axios({
    url: `https://650aaf0ddfd73d1fab08b325.mockapi.io/products/${id}`,
    method: "DELETE",
  });
  promise
    .then(() => {
      getProductList();
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
const onLoading = (positionID) => {
  getElm("#formPhone").style.display = "none";
  getElm(positionID).innerHTML = `
        <div class="loading loading03" id="loadingAnimation">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
  `;
};

const offLoading = () => {
  getElm(".loading").style.display = "none";
};
