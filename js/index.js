const tableHead = ``;

let products = [];

let productName;
let productPrice;
let productCat;
let productDis;

const productTable = document.getElementById('productTable');

let checkName = false;
let checkprice = false;
let checkCat = false;
let checkDis = false;

function checkProductName() {
    let name = productName.value;

    // console.log('name: ' + name);

    if (name.length == 0) {
        document.getElementById('nameErrorMsg').innerText = 'Enter a valid name';
        return false
    }
    document.getElementById('nameErrorMsg').innerText = '';
    return true;
}

function checkProductPrice() {
    let price = +productPrice.value;

    // console.log('price: ' + price);

    if (isNaN(price) || price <= 0) {
        document.getElementById('priceErrorMsg').innerText = 'Enter a valid price';
        return false;
    }
    document.getElementById('priceErrorMsg').innerText = '';
    return true;
}

function checkProductCat() {
    let category = '';
    category = productCat.value;

    // console.log('category: ' + category);

    if (category.length == 0) {
        document.getElementById('catErrorMsg').innerText = 'Enter a valid category';
        return false;
    }
    document.getElementById('catErrorMsg').innerText = '';
    return true;
}
function checkProductDis() {
    let descreption = productDis.value;

    // console.log('dis: ' + descreption);

    if (descreption.length == 0) {
        document.getElementById('disErrorMsg').innerText = 'Enter a valid descreption';
        return false;
    }
    document.getElementById('disErrorMsg').innerText = '';
    return true;
}

//adding products
function addProduct(thisProductIndex) {

    if (thisProductIndex == -1) { //tell if the function is called by adding or updating
        productName = document.getElementById('productName');
        productPrice = document.getElementById('productPrice');
        productCat = document.getElementById('productCat');
        productDis = document.getElementById('productDis');
    }

    let canAdd = false;
    checkName = checkProductCat();
    checkprice = checkProductName();
    checkCat = checkProductPrice();
    checkDis = checkProductDis();

    // console.log(checkName);
    // console.log(checkprice);
    // console.log(checkCat);
    // console.log(checkDis);

    canAdd = checkName && checkprice && checkCat && checkDis;
    // console.log(canAdd);
    if (canAdd) {
        if (thisProductIndex == -1) {
            products.push(
                {
                    name: productName.value,
                    price: productPrice.value,
                    category: productCat.value,
                    discribe: productDis.value
                }
            )
        }
        else if (thisProductIndex > -1 && thisProductIndex < products.length) {
            products[thisProductIndex] = {
                name: productName.value,
                price: productPrice.value,
                category: productCat.value,
                discribe: productDis.value
            }
        }

        displayProduct();
        productName.value = '';
        productPrice.value = '';
        productCat.value = '';
        productDis.value = '';
    }
}

//display products
function displayProduct() {

    let tableBody = '';
    console.log(products);

    if (productTable.children.length === 0) {
        console.log('creating head');
        productTable.innerHTML =
            `<thead id = "tableHead" class = " text-center">
        <th>Index</th>
        <th>Name</th>
        <th>Price $</th>
        <th>Category</th>
        <th>Descreption</th>
        <th>Update</th>
        <th>Delete</th>
    </thead>
    <tbody id = "tableBody" class = " text-center"></tbody>`;
    }
    else if (products.length == 0) {
        document.getElementById('productTable').innerHTML = "";
        return;
    }

    for (let productIndex = 0; productIndex < products.length; productIndex++) {

        tableBody += `<tr id = "product${productIndex + 1}">
        <td>${productIndex + 1}</td>
        <td>${products[productIndex].name}</td>
        <td>$${products[productIndex].price}</td>
        <td>${products[productIndex].category}</td>
        <td>${products[productIndex].discribe}</td>
        <td><button onclick=\"updatProduct(${productIndex})\" class="btn btn-warning">Update</button></td>
        <td><button onclick=\"deleteProduct(${productIndex})\" class="btn btn-danger">Delete</button></td>
    </tr>`;
    }

    document.getElementById('tableBody').innerHTML = tableBody;
}

function deleteProduct(targetedIndex) {

    products.splice(targetedIndex, 1);
    displayProduct();

}

function updatProduct(targetedIndex) {

    let updatingBox = `<div class="container">
            <h3>Updating product</h3>
                <div class=" form-group m-4">
                    <label for="">Product Name</label>
                    <input type="text" class=" form-control" id="updatingName" value = "${products[targetedIndex].name}">
                    
                    <h6 id="updatingNameErrorMsg" class=" text-danger"></h6>
    
                </div>
                <div class=" form-group m-4">
                    <label for="">Product Price</label>
                    <input type="text" class=" form-control" id="updatingPrice" value = "${products[targetedIndex].price}">
                    
                    <h6 id="updatingPriceErrorMsg" class=" text-danger"></h6>
    
                </div>
                <div class=" form-group m-4">
                    <label for="">Product Category</label>
                    <input type="text" class=" form-control" id="updatingCat" value = "${products[targetedIndex].category}">
                    
                    <h6 id="updatingCatErrorMsg" class=" text-danger"></h6>
    
                </div>
                <div class=" form-group m-4">
                    <label for="">Product Descreption</label>
                    <input type="text" class=" form-control" id="updatingDis" value = "${products[targetedIndex].discribe}">
                    
                    <h6 id="updatingDisErrorMsg" class=" text-danger"></h6>
    
                </div>
    
                <button class="btn btn-primary" id = "updateDone" onclick="updateDone(${targetedIndex}, updatingSpace)">Done</button>
        </div>`;

    const updatingSpace = document.getElementById('updatingSpace');
    updatingSpace.style.opacity = 1;
    updatingSpace.innerHTML = updatingBox;
}

function updateDone(targetedIndex, updatingSpace) {

    console.log('updating', targetedIndex + 1);
    productName = document.getElementById('updatingName');
    productPrice = document.getElementById('updatingPrice');
    productCat = document.getElementById('updatingCat');
    productDis = document.getElementById('updatingDis');
    addProduct(targetedIndex);
    updatingSpace.innerHTML = "";
    updatingSpace.style.opacity = 0;

}
