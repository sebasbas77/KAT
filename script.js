document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    const expiryList = document.getElementById('expiryList');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const productCode = document.getElementById('productCode').value.trim();
        const supplier = document.getElementById('supplier').value.trim();
        const productName = document.getElementById('productName').value.trim();
        const quantity = document.getElementById('quantity').value.trim();
        const expiryDate = document.getElementById('expiryDate').value;

        if (productCode && supplier && productName && quantity && expiryDate) {
            const product = {
                productCode, 
                supplier,
                productName,
                quantity,
                expiryDate
            };

            if (!isProductInDatabase(productCode)) {
                addProductToDatabase(product);
                displayProductExpiry(product);
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

    function displayProductExpiry(product) {
        const expiryDate = new Date(product.expiryDate);
        const today = new Date();
        const timeDiff = expiryDate - today;
        const daysToExpiry = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const li = document.createElement('li');
        li.textContent = `${product.productName} - ${daysToExpiry} días para caducar`;

        if (daysToExpiry <= 7) {
            li.classList.add('urgent');
        } else if (daysToExpiry <= 14) {
            li.classList.add('danger');
        } else if (daysToExpiry <= 30) {
            li.classList.add('warning');
        }

        expiryList.appendChild(li);
    }

    function displayAllProducts() {
        const products = loadDatabase();
        products.forEach(displayProductExpiry);
    }

    displayAllProducts();
});
