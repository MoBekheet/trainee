if (localStorage.getItem("data") == null) {
  var productsContainer = [];
} else {
  var productsContainer = JSON.parse(localStorage.getItem("data"));
  displayProducts()
}


var productName = document.getElementById("productName"),

  productPrice = document.getElementById("productPrice"),

  productComp = document.getElementById("productComp"),

  productDesc = document.getElementById("productDesc"),

  msg = document.getElementById("msg"),

  alerts = document.querySelector(".alert"),

  submit = document.getElementById("submit"),

  isUpdate = false,

  selectedIndex = null;


var bgArr = [
  'images/one.jpg',
  'images/4.jpeg',
  'images/team-bw-2.jpg',
  'images/team-bw-1.jpg',
  'images/two.png',
  'images/team-bw-3.jpg'
];


submit.addEventListener("click", function () {
  if (productName.value == "" || productPrice.value == "" || productComp.value == "" || productDesc.value == "") {
    msg.innerHTML = "ALL FIELDS ARE REQUIRED";
  } else {
    if (validate()) {
      var product = {
        name: productName.value.trim(),
        price: productPrice.value.trim(),
        comp: productComp.value.trim(),
        desc: productDesc.value.trim(),
        urlImg: bgArr[Math.floor(Math.random() * bgArr.length)]
      };
      if (selectedIndex === null) {
        productsContainer.push(product);
      } else {
        productsContainer.splice(selectedIndex, 1, product);
        selectedIndex = null;
      }
      localStorage.setItem("data", JSON.stringify(productsContainer));
      displayProducts();
      submit.innerHTML = "Add Product";
      isUpdate == false;
      msg.innerHTML = "";
      productName.value = "";
      productPrice.value = "";
      productComp.value = "";
      productDesc.value = "";
    }
  }
});
;
function validate() {
  var nameValid = /^[A-Z][a-zA-Z]{2,10}/,
      priceValid = /[1-9][0-9]{1,5}/,
      errors = "";
  if (nameValid.test(productName.value) == false) {
    alerts.classList.add("d-block");
    errors += "<p>Product name must start with upper case</p>";
    alerts.innerHTML = errors;
  }
  if (priceValid.test(productPrice.value) == false) {
    alerts.classList.add("d-block");
    errors += "<p>The product price starts from 20 to 20,000</p>";
    alerts.innerHTML = errors;
  }
  if (errors.length > 0) {
    return false;
  } else {
    alerts.classList.remove("d-block");
    return true;
  }
}

function displayProducts() {
  var data = "";
  for (var i = 0; i < productsContainer.length; i++) {
    data += `
      <div class="col-md-3">
        <div class="card my-4">
          <img src="${productsContainer[i].urlImg}" class="card-img-top" alt="">
          <div class="card-body">
            <h3 class="py-1"> ${productsContainer[i].name}</h3>
            <h4 class="text-danger">${productsContainer[i].price}</h4>
            <p class="text-dark">${productsContainer[i].comp}</p>
            <p class="text-muted">${productsContainer[i].desc}</p>
            <button type="button" onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
            <button type="button" onclick="updateProduct(${i})" class="btn btn-info">Edit</button>
          </div>
        </div>
      </div>
    `
    document.getElementById("productRow").innerHTML = data;
  }
  return data;
};


document.getElementById("inptSearch").addEventListener("keyup", function () {
  var itemSearch = "";
  for (var i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.toLowerCase().includes(this.value.trim())) {
      itemSearch += `
        <div class="col-md-3">
          <div class="card my-4">
            <img src="${productsContainer[i].urlImg}" class="card-img-top" alt="">
            <div class="card-body">
              <h3 class="py-1"> ${productsContainer[i].name}</h3>
              <h4 class="text-danger">${productsContainer[i].price}</h4>
              <p class="text-dark">${productsContainer[i].comp}</p>
              <p class="text-muted">${productsContainer[i].desc}</p>
              <button type="button" onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
              <button type="button" onclick="updateProduct(${i})" class="btn btn-info">Edit</button>
            </div>
          </div>
        </div>
      `
    }
    var searchResult = document.getElementById("searchResult");
    this.value.length == 0
    ? itemSearch = searchResult.innerHTML = ""
    : searchResult.innerHTML = itemSearch;

  }
});


function deleteProduct(i) {
  productsContainer.splice(i, 1);
  displayProducts();
  localStorage.setItem("data", JSON.stringify(productsContainer));
};


function updateProduct(i) {
  isUpdate = true;
  selectedIndex = i;
  submit.innerHTML = "Update Product";
  productName.value = productsContainer[i].name;
  productPrice.value = productsContainer[i].price;
  productComp.value = productsContainer[i].comp;
  productDesc.value = productsContainer[i].desc;
  productName.focus();
};