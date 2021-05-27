var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productdesc = document.getElementById('productdesc');
var submit = document.getElementById('submit');
var sameIndex; // to use in edit 
var productContainer; // for array

// ==== if condation to now if the localStorage embty or no
if (localStorage.getItem("Product") == null) {
    productContainer = [];
}
else {
    productContainer = JSON.parse(localStorage.getItem("Product"));
    displayProduct();
}

// ============ Submit Product (Add , Edit)
function submitProduct() {
    if (submit.innerHTML == "Add Product") {
        addProduct();
    }
    else {
        saveEdit();
    }
    clearForm();
    displayProduct();
}

// ============ Add Product =========
function addProduct() {

    if (validateProductsValues() == true && validateProductPrice() == true) {
        if (validate() == true) {
            var product = {
                name: productName.value,
                price: productPrice.value,
                category: productCategory.value,
                description: productdesc.value
            };
            productContainer.push(product);
            localStorage.setItem("Product", JSON.stringify(productContainer));
            clearForm();
            displayProduct();
        } 
        else {
            window.alert(`The Inputs Must Be Required. !`)
        }
    }
    else {
        window.alert("Noooooooooo");
    }
}

// ========== To Sort Array ===========
function productSort( a, b ) {
    console.log(a,b);
    if ( a.name < b.name ){
      return -1;
    }
    else if ( a.name > b.name ){
      return 1;
    }
    else {
        return 0;
    }
  }

// =========== display Product ============
function displayProduct() {
    var cartoona = ``;
    productContainer.sort( productSort ); // call sort function and display sorting
    for (var i=0; i<productContainer.length; i++) {
        cartoona += `
                <tr>
                    <td>${i}</td>
                    <td>${productContainer[i].name}</td>
                    <td>${productContainer[i].price}</td>
                    <td>${productContainer[i].category}</td>
                    <td>${productContainer[i].description}</td>
                    <td>
                        <button class="btn btn-outline-success" onclick="editProduct(${i});">EDIT</button>
                    </td>
                    <td>
                        <button class="btn btn-outline-danger" onclick="deleteProduct(${i});">Delete</button>
                    </td>
                </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = cartoona;
}

// ============= Clear Form ===========
function clearForm() {
    productName.value = ``;
    productPrice.value = ``;
    productCategory.value = ``;
    productdesc.value = ``;
}

// ============ Validation ================
function validate() {
    if (productName.value == `` || productPrice.value == `` || productCategory.value == `` || productdesc.value == ``) {
        return false;
    }
    else {
        return true;
    }
}

// ============== Delete Product ========== 
function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem("Product", JSON.stringify(productContainer));
    displayProduct();
}

// ========== (Edit , Save) Product ========
function editProduct(index) {
    productName.value = productContainer[index].name ;
    productPrice.value = productContainer[index].price;
    productCategory.value = productContainer[index].category;
    productdesc.value = productContainer[index].description;
    submit.innerHTML = `Save Edit`;
    sameIndex = index;
}
function saveEdit() {
    if (validate() == true) {
        var editedProduct = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productdesc.value
        }
        productContainer[sameIndex] = editedProduct;
        submit.innerHTML = `Add Product`;
        localStorage.setItem("Product", JSON.stringify(productContainer));
        clearForm();
        displayProduct();
    } 
    else {
        window.alert(`The Inputs Must Be Required. !`)
    }
}

// =========== Search Product =======
function searchProduct(searchVal) {
    var cartoona = ``;
    for (var i=0; i<productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(searchVal.toLowerCase()) == true) {
            cartoona += `
                <tr>
                    <td>${i}</td>
                    <td>${productContainer[i].name}</td>
                    <td>${productContainer[i].price}</td>
                    <td>${productContainer[i].category}</td>
                    <td>${productContainer[i].description}</td>
                    <td>
                        <button class="btn btn-outline-success" onclick="editProduct(${i});">EDIT</button>
                    </td>
                    <td>
                        <button class="btn btn-outline-danger" onclick="deleteProduct(${i});">Delete</button>
                    </td>
                </tr>
        `;
        }
    }
    document.getElementById("tbody").innerHTML = cartoona;
}


// ========= Regular Expression ==========

function validateProductsValues() {
    var regex = /^[a-z ]{2,}$/i ;
    if (regex.test(productName.value) == true && regex.test(productCategory.value) == true && regex.test(productdesc.value) == true) {
        return true
    }
    else {
        return false
    }
}

function validateProductPrice() {
    var regex = /^[1-9][0-9]{1,}$/i

    if (regex.test(productPrice.value) == true) {
        return true;
    }
    else {
        return false;
    }
}
