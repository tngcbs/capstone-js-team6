import products from "../models/products.js";
import checkEmp from "../util/validation.js";
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
const clearErrorSpans = () => {
  getElm("#tbname").textContent = "";
  getElm("#tbprice").textContent = "";
  getElm("#tbscreen").textContent = "";
  getElm("#tbbackCam").textContent = "";
  getElm("#tbfrontCam").textContent = "";
  getElm("#tbimg").textContent = "";
  getElm("#tbdesc").textContent = "";
  getElm("#tbtype").textContent = "";
};
//add Product

getElm("#btnAddPhone").onclick = () => {
  const products = getInfor();
  let check =
    checkEmp(products.name, "#tbname", "Tên không được để trống") &
    checkEmp(products.price, "#tbprice", "Giá không được để trống") &
    checkEmp(products.screen, "#tbscreen", "Màn hình không được để trống") &
    checkEmp(
      products.backCamera,
      "#tbbackCam",
      "Camera sau không được để trống"
    ) &
    checkEmp(
      products.frontCamera,
      "#tbfrontCam",
      "Camera trước không được để trống"
    ) &
    checkEmp(products.img, "#tbimg", "Link hình ảnh không được để trống") &
    checkEmp(products.desc, "#tbdesc", "Thông tin không được để trống") &
    checkEmp(products.type, "#tbtype", "Loại sản phẩm không được để trống");
  if (check) {
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
  }
};

getElm("#addPhoneForm").onclick = () => {
  resetForm();
  getElm("#btnAddPhone").style.display = "inline-block";
  getElm("#btnUpdate").style.display = "none";
};

//edit Product
window.editProduct = (id) => {
  clearErrorSpans();
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
  let check =
    checkEmp(products.name, "#tbname", "Tên không được để trống") &
    checkEmp(products.price, "#tbprice", "Giá không được để trống") &
    checkEmp(products.screen, "#tbscreen", "Màn hình không được để trống") &
    checkEmp(
      products.backCamera,
      "#tbbackCam",
      "Camera sau không được để trống"
    ) &
    checkEmp(
      products.frontCamera,
      "#tbfrontCam",
      "Camera trước không được để trống"
    ) &
    checkEmp(products.img, "#tbimg", "Link hình ảnh không được để trống") &
    checkEmp(products.desc, "#tbdesc", "Thông tin không được để trống") &
    checkEmp(products.type, "#tbtype", "Loại sản phẩm không được để trống");

  if (check) {
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
  }
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

window.filterProductByPrice = () => {
  let selectedValue = getElm("#priceSelect").value;
  const promise = axios({
    method: "GET",
    url: "https://650aaf0ddfd73d1fab08b325.mockapi.io/products",
  });

  promise
    .then((result) => {
      let dataSort = result.data.sort((a, b) => {
        return selectedValue === "increase"
          ? a.price - b.price
          : b.price - a.price;
      });
      renderTable(dataSort);
    })
    .catch((err) => {
      console.log(err);
    });
};

window.searchName = () => {
  var name = document.querySelector("#keyWorld").value.trim()?.toLowerCase();

  const promise = axios({
    method: "GET",
    url: "https://650aaf0ddfd73d1fab08b325.mockapi.io/products",
  });

  promise
    .then(function (res) {
      //tìm kiếm tên người dùng nhập
      const result = res.data.filter((obj) => {
        return obj.name.toLowerCase().includes(name);
      });
      console.log("result.length: ", result.length);

      result.length === 0
        ? (getElm("#tablePhone").innerHTML = `Không tìm thấy sản phẩm`)
        : renderTable(result);
    })
    .catch(function (err) {
      console.log("err", err);
    });
};
