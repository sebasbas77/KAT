document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const productCode = document.getElementById('productCode').value.trim();
        const supplier = document.getElementById('supplier').value.trim();
        const productName = document.getElementById('productName').value.trim();
        const quantity = document.getElementById('quantity').value.trim();
        const expiryDate = document.getElementById('expiryDate').value;
        const returnable = document.getElementById('returnable').value;
        const returnConditions = document.getElementById('returnConditions').value.trim();

        if (productCode && supplier && productName && quantity && expiryDate && returnable && returnConditions) {
            const product = {
                productCode,
                supplier,
                productName,
                quantity,
                expiryDate,
                returnable,
                returnConditions
            };

            if (!isProductInDatabase(productCode)) {
                addProductToDatabase(product);
                displayProductInTable(product);
                form.reset();
            } else {
                alert('El producto ya existe en la base de datos.');
            }
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    function isProductInDatabase(productCode) {
        const products = loadDatabase();
        return products.some(product => product.productCode === productCode);
    }

    function addProductToDatabase(product) {
        const products = loadDatabase();
        products.push(product);
        saveDatabase(products);
    }

    function loadDatabase() {
        const data = localStorage.getItem('products');
        return data ? JSON.parse(data) : [];
    }

    function saveDatabase(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }

    function displayProductInTable(product) {
        const expiryDate = new Date(product.expiryDate);
        const today = new Date();
        const timeDiff = expiryDate - today;
        const daysToExpiry = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const row = productTable.insertRow();
        row.insertCell(0).textContent = product.productCode;
        row.insertCell(1).textContent = product.supplier;
        row.insertCell(2).textContent = product.productName;
        row.insertCell(3).textContent = product.quantity;
        row.insertCell(4).textContent = product.expiryDate;
        row.insertCell(5).textContent = daysToExpiry;
        row.insertCell(6).textContent = product.returnable;
        row.insertCell(7).textContent = product.returnConditions;

        if (daysToExpiry <= 7) {
            row.classList.add('urgent');
        } else if (daysToExpiry <= 14) {
            row.classList.add('danger');
        } else if (daysToExpiry <= 30) {
            row.classList.add('warning');
        }
    }

    function displayAllProducts() {
        const products = loadDatabase();
        products.forEach(displayProductInTable);
    }

    displayAllProducts();
});
