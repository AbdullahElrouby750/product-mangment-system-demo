const tableHead = ``;

let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
products.sort((a, b) => a.name.localeCompare(b.name));


// console.log(products);

let productName;
let productPrice;
let productCat;
let productDis;

const productTable = document.getElementById('productTable');

let checkName = false;
let checkprice = false;
let checkCat = false;
let checkDis = false;


//global for the sorting
let productsList = [];
let searchProductsList = [];


displayProduct(products);



// commone regex
const lengthRegex = /(\w{2,})/;
const upperCaseregex = /^[A-Z]/;
const allowedCahrRegex = /\w+/;
function updatelocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
}

function checkProductName(thisProductIndex) {
    let name = productName.value;
    productName.style.border = "5px solid red";
    productName.classList.add("Error");

    // console.log('name: ' + name);
    if (!lengthRegex.test(name)) {
        thisProductIndex == -1 ?
            document.getElementById('nameErrorMsg').innerText = 'Product name should be at least 2 characters long' :
            document.getElementById('updatingNameErrorMsg').innerText = 'Product name should be at least 2 characters long';
        return false;
    }
    else if (!upperCaseregex.test(name)) {
        thisProductIndex == -1 ?
            document.getElementById('nameErrorMsg').innerText = 'Product name must start with uppercase letter' :
            document.getElementById('updatingNameErrorMsg').innerText = 'Product name must start with uppercase letter';
        return false;
    }
    else if (!allowedCahrRegex.test(name)) {
        thisProductIndex == -1 ?
            document.getElementById('nameErrorMsg').innerText = 'Product name should only contain alphanumeric characters and underscores' :
            document.getElementById('updatingNameErrorMsg').innerText = 'Product name should only contain alphanumeric characters and underscores';
        return false;
    }

    thisProductIndex == -1 ?
        document.getElementById('nameErrorMsg').innerText = '' :
        document.getElementById('updatingNameErrorMsg').innerText = '';

    productName.style.border = "5px solid green";
    productName.classList.remove("Error");

    return true;
}

function checkProductPrice(thisProductIndex) {
    let price = +productPrice.value;
    const regex = /^(?!-)(?!0(\.0+)?$)([1-9]\d*(\.\d*)?)$/

    // console.log(regex.test(price));

    // console.log('price: ' + price);/


    productPrice.style.border = "5px solid red";
    productPrice.classList.add("Error");


    if (!regex.test(price) || price < 0) {
        thisProductIndex == -1 ?
            document.getElementById('priceErrorMsg').innerText = 'Product price must be a positive integer >= 1' :
            document.getElementById('updatingPriceErrorMsg').innerText = 'Product price must be a positive integer >= 1';
        return false;
    }

    thisProductIndex == -1 ?
        document.getElementById('priceErrorMsg').innerText = '' :
        document.getElementById('updatingPriceErrorMsg').innerText = '';

    productPrice.style.border = "5px solid green";
    productPrice.classList.remove("Error");

    return true;
}

function checkProductCat(thisProductIndex) {
    let category = '';
    category = productCat.value;

    // console.log('category: ' + category);



    productCat.style.border = "5px solid red";
    productCat.classList.add("Error");

    if (!lengthRegex.test(category)) {
        thisProductIndex == -1 ?
            document.getElementById('catErrorMsg').innerText = 'Product category should be at least 2 characters long' :
            document.getElementById('updatingCatErrorMsg').innerText = 'Product category should be at least 2 characters long';
        return false;
    }
    else if (!upperCaseregex.test(category)) {
        thisProductIndex == -1 ?
            document.getElementById('catErrorMsg').innerText = 'Product category must start with uppercase letter' :
            document.getElementById('updatingCatErrorMsg').innerText = 'Product category must start with uppercase letter';
        return false;
    }
    else if (!allowedCahrRegex.test(category)) {
        thisProductIndex == -1 ?
            document.getElementById('catErrorMsg').innerText = 'Product category should only contain alphanumeric characters and underscores' :
            document.getElementById('updatingCatErrorMsg').innerText = 'Product category should only contain alphanumeric characters and underscores';
        return false;
    }

    thisProductIndex == -1 ?
        document.getElementById('catErrorMsg').innerText = '' :
        document.getElementById('updatingCatErrorMsg').innerText = '';

    productCat.style.border = "5px solid green";
    productCat.classList.remove("Error");

    return true;
}
function checkProductDis(thisProductIndex) {
    let descreption = productDis.value;

    // console.log('dis: ' + descreption);
    const lengthRegex = /(\w{4,})/;
    const upperCaseregex = /^[A-Z1-9]/;



    productDis.style.border = "5px solid red";
    productDis.classList.add("Error");

    if (!lengthRegex.test(descreption)) {
        thisProductIndex == -1 ?
            document.getElementById('disErrorMsg').innerText = 'Product descreption should be at least 4 characters long' :
            document.getElementById('updatingDisErrorMsg').innerText = 'Product descreption should be at least 4 characters long';
        return false;
    }
    else if (!upperCaseregex.test(descreption)) {
        thisProductIndex == -1 ?
            document.getElementById('disErrorMsg').innerText = 'Product descreption must start with uppercase letter' :
            document.getElementById('updatingDisErrorMsg').innerText = 'Product descreption must start with uppercase letter';
        return false;
    }
    else if (!allowedCahrRegex.test(descreption)) {
        thisProductIndex == -1 ?
            document.getElementById('disErrorMsg').innerText = 'Product descreption should only contain alphanumeric characters and underscores' :
            document.getElementById('updatingDisErrorMsg').innerText = 'Product descreption should only contain alphanumeric characters and underscores';
        return false;
    }

    thisProductIndex == -1 ?
        document.getElementById('disErrorMsg').innerText = '' :
        document.getElementById('updatingDisErrorMsg').innerText = '';

    productDis.style.border = "5px solid green";
    productDis.classList.remove("Error");

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
    checkName = checkProductCat(thisProductIndex);
    checkprice = checkProductName(thisProductIndex);
    checkCat = checkProductPrice(thisProductIndex);
    checkDis = checkProductDis(thisProductIndex);

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
        updatelocalStorage(products);
        displayProduct(products);
        productName.value = '';
        productName.style.border = "none";

        productPrice.value = '';
        productPrice.style.border = "none";

        productCat.value = '';
        productCat.style.border = "none";

        productDis.value = '';
        productDis.style.border = "none";
    }
    return canAdd;
}

//display products
function displayProduct(list) {
    let tableBody = '';
    //global so it can be accessable from sortby()
    productsList = list;

    // console.log(productsList);

    if (productTable.children.length === 0) {
        // console.log('creating head');
        productTable.innerHTML =
            `<thead id = "tableHead" class = " text-center">
        <th>Index</th>
        <th><button name = "name" id = "nameCol" class = "sort-btn btn text-light fw-bold p-0">Name</button></th>
        <th><button name = "price" id = "priceCol" class = "sort-btn btn text-light fw-bold p-0">Price$</button></th>
        <th><button name = "category" id = "catCol" class = "sort-btn btn text-light fw-bold p-0">Category</button></th>
        <th><button name = "discribe" id = "desCol" class = "sort-btn btn text-light fw-bold p-0">Descreption</button></th>
        <th>Update</th>
        <th>Delete</th>
    </thead>
    <tbody id = "tableBody" class = " text-center"></tbody>`;
    }
    else if (productsList.length == 0) {
        document.getElementById('productTable').innerHTML = "";
        return;
    }

    for (let productIndex = 0; productIndex < productsList.length; productIndex++) {

        const updateIndex = products.indexOf(productsList[productIndex]);

        // console.log('span',productsList[productIndex].spanName);

        //check for spanName prop (array sent from search)
        tableBody += `<tr id = "product${productIndex + 1}">
        <td>${productIndex + 1}</td>
        <td>${productsList[productIndex].spanName ? productsList[productIndex].spanName : productsList[productIndex].name}</td>
        <td>$${productsList[productIndex].price}</td>
        <td>${productsList[productIndex].category}</td>
        <td>${productsList[productIndex].discribe}</td>
        <td><button onclick=\"updatProduct(${updateIndex})\" class="btn btn-warning">Update</button></td>
        <td><button onclick=\"deleteProduct(${updateIndex})\" class="btn btn-danger">Delete</button></td>
    </tr>`;
    }
    document.getElementById('tableBody').innerHTML = tableBody;


}

//sorting the table
function sortBy(fieldName) {
    const sortbtns = document.querySelectorAll(".sort-btn");
    const listToBeSorted = searchProductsList ? productsList : searchProductsList;

    console.log('Sorting by:', listToBeSorted);
    let btnIndex = 0;
    for (let i = 0; i < sortbtns.length; i ++){
        if (sortbtns[i].name === fieldName) {
            btnIndex = i;
        }
        if (sortbtns[i].name !== fieldName) {
            sortbtns[i].classList.remove('btn-warning','btn-danger');
        }
    }

    //uncheck and sort by name (defult)
    if(sortbtns[btnIndex].classList.contains('btn-danger')){
        sortbtns[btnIndex].classList.remove('btn-danger');
        sortbtns[0].classList.add('btn-warning');
        listToBeSorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    //sort by the same field descending
    else if(sortbtns[btnIndex].classList.contains('btn-warning')){
        sortbtns[btnIndex].classList.add('btn-danger');
        sortbtns[btnIndex].classList.remove('btn-warning');
        if(fieldName === 'price'){
            listToBeSorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else{
            listToBeSorted.sort((a, b) => b[fieldName].localeCompare(a[fieldName]));
        }
    }
    //sort by this field ascending
    else{
        sortbtns[btnIndex].classList.add('btn-warning');
        if(fieldName === 'price'){
            listToBeSorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else{
            listToBeSorted.sort((a, b) => a[fieldName].localeCompare(b[fieldName]));
        }
    }
    displayProduct(listToBeSorted);
}
// Attaching event listeners to the sort buttons outside of sortBy
document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        sortBy(this.name);
    });
});



//delete funtion
function deleteProduct(targetedIndex) {

    products.splice(targetedIndex, 1);
    displayProduct(products);
    updatelocalStorage(products);

}

//update function
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
    
                <button class="btn btn-success" id = "updateDone" onclick="updateDone(${targetedIndex}, updatingSpace)">Done</button>
                <button class="btn btn-warning" id = "cancelUpdate" onclick="cancelUpdate(updatingSpace)">Cancel</button>
        </div>`;

    const updatingSpace = document.getElementById('updatingSpace');
    updatingSpace.style.opacity = 1;
    updatingSpace.innerHTML = updatingBox;
}
//add the update
function updateDone(targetedIndex, updatingSpace) {

    // console.log('updating', targetedIndex + 1);
    productName = document.getElementById('updatingName');
    productPrice = document.getElementById('updatingPrice');
    productCat = document.getElementById('updatingCat');
    productDis = document.getElementById('updatingDis');


    let update = addProduct(targetedIndex);

    if (update) {
        updatingSpace.innerHTML = "";
        updatingSpace.style.opacity = 0;
    }
}
//cancel the update
function cancelUpdate(updatingSpace) {
    updatingSpace.innerHTML = "";
    updatingSpace.style.opacity = 0;
}

//search function

function searchProduct(data) {

    if (data.length > 0 || data.trim().length > 0) {
        data.toLowerCase()
        let searchProductsList = [];

        for (let index = 0; index < products.length; index++) {
            if (products[index].name.toLowerCase().includes(data.toLowerCase())) {

                //highlight the entered characters in the search
                let productCopy = { ...products[index] };
                productCopy["spanName"] = products[index].name.toLowerCase().replaceAll(data.toLowerCase(), `<span class="text-danger fw-bold">${data.toLowerCase()}</span>`);

                searchProductsList.push(productCopy);
            }
        }
        displayProduct(searchProductsList);
    }
    else {
        searchProductsList = [];
        displayProduct(products);
    }

}



