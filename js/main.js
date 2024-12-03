var productNameInp = document.getElementById("productName");
var productPriceInp = document.getElementById("productPrice");
var productCategoryInp = document.getElementById("productCategory");
var productDescInp = document.getElementById("productDesc");
var productImageInp = document.getElementById("productImage");
var productList = [];
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var currentIndex;
if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct(productList);
}
var regex= {
  productName : { 
    value :/^[A-Z][a-z0-9]{5,8}$/,
   isValid: false
  
  },
  productPrice : {
    value: /^([1-9][0-9]|100)/,
   isValid: false
  },

  productCategory: {
    value:/(tv|phone|screens|laptob|others)/i,
   isValid: false
  },
  productDesc : {
    value:/.{4,}/,
   isValid: false
}
}

function addProduct() {
  
  var product = {
    
    name: productNameInp.value,
    price: productPriceInp.value,
    category: productCategoryInp.value,
    desc: productDescInp.value,
   img: `images/${productImageInp.files[0]?.name}`
  }
  productList.push(product);
  setLocalStorage();
  displayProduct(productList);
  updataInputValue();
  addBtn.disabled = true
}
function displayProduct(list) {
  var cartona = ``;
  for (var i = 0; i < list.length; i++) {
    cartona += ` <div class="col-md-4">
            <div class="item border border-2 border-danger rounded rounded-2 overflow-hidden">
                <img src="${list[i].img}" class="w-100" alt="">
                <div class="p-3 text-white text-center">
                    <h2 class="h3"> name: ${list[i].newName ? list[i].newName : list[i].name}</h2>
                    <p>desc:${list[i].desc} </p>
                    <h3 class="h5"><span>price:</span> ${list[i].price}</h3>
                    <h3 class="h5">category:${list[i].category}</h3>
                    <button onclick="getDataToUpdate(${i})" class="btn btn-outline-warning my-2 w-100" >update</button>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100">delete</button>
                </div>
            </div>
        </div>`;
  }
  document.getElementById("myData").innerHTML = cartona;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  setLocalStorage();
  displayProduct(productList);
}

function updataInputValue(config) {
  productNameInp.value = config ? config.name : null;
  productDescInp.value = config ? config.desc : null;
  productPriceInp.value = config ? config.price : null;
  productCategoryInp.value = config ? config.category : null;
}

function getDataToUpdate(index) {
  updataInputValue(productList[index]);
  currentIndex = index;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}
function updateProduct() {
  console.log("hello", currentIndex);
  productList[currentIndex].name = productNameInp.value;
  productList[currentIndex].price = productPriceInp.value;
  productList[currentIndex].category = productCategoryInp.value;
  productList[currentIndex].desc = productDescInp.value;
  displayProduct(productList);
  setLocalStorage();
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  updataInputValue();
}
function setLocalStorage() {
  localStorage.setItem("productList", JSON.stringify(productList));
}
function search(searhValue) {
  var searchItems = [];
  for (i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searhValue.toLowerCase())) {
        productList[i].newName=productList[i].name.toLowerCase().replace(searhValue.toLowerCase(),`<span class="text-danger">${searhValue.toLowerCase()}</span>`)
      searchItems.push(productList[i]);
    }
    displayProduct(searchItems);
  }
}
function validateProductInput(element) {



  if(regex[element.id].value.test(element.value) == true ) {
  element.nextElementSibling.classList.add('d-none')
    element.classList.add("is-valid");
    element.classList.remove("is-invalid")
    regex[element.id].isValid = true

  }else{
    element.nextElementSibling.classList.remove('d-none')
    element.classList.remove("is-valid");
    element.classList.add("is-invalid")
    regex[element.id].isValid = false
  }
  toggleBtn()
}
function toggleBtn(){
  if(regex.productName.isValid &&regex.productPrice.isValid &&regex.productCategory.isValid &&regex.productDesc.isValid){
    addBtn.disabled =false
  }else{
    addBtn.disabled =true
  }
}
