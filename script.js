document.addEventListener('DOMContentLoaded', function() {
    loadProductsFromLocalStorage();
});

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const codigo = document.getElementById('codigo').value;
    const producto = document.getElementById('producto').value;
    const proveedor = document.getElementById('proveedor').value;
    const cantidad = document.getElementById('cantidad').value;
    const fecha = document.getElementById('fecha').value;
    const devolucion = document.getElementById('devolucion').value;
    const condiciones = document.getElementById('condiciones').value;

    const newProduct = {
        codigo,
        producto,
        proveedor,
        cantidad,
        fecha,
        devolucion,
        condiciones
    };

    saveProductToLocalStorage(newProduct);
    addProductToTable(newProduct);
    document.getElementById('productForm').reset();
});

function addProductToTable(product) {
    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const today = new Date();
    const expirationDate = new Date(product.fecha);
    const timeDiff = expirationDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    newRow.classList.add(getRowClass(daysLeft));

    newRow.innerHTML = `
        <td>${product.codigo}</td>
        <td>${product.producto}</td>
        <td>${daysLeft}</td>
        <td><button class="delete-btn" onclick="deleteProduct(this, '${product.codigo}')">Eliminar</button></td>
    `;

    newRow.addEventListener('click', function() {
        if (document.getElementById('productDetails').style.display === 'block' && document.getElementById('detailCodigo').innerText === product.codigo) {
            showAllProducts();
        } else {
            showProductDetails(product);
        }
    });
}

function getRowClass(daysLeft) {
    if (daysLeft <= 0) {
        return 'red';
    } else if (daysLeft <= 7) {
        return 'orange';
    } else if (daysLeft <= 30) {
        return 'yellow';
    } else {
        return '';
    }
}

function saveProductToLocalStorage(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

function loadProductsFromLocalStorage() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => addProductToTable(product));
}

function deleteProduct(button, codigo) {
    const row = button.closest('tr');
    row.remove();

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.codigo !== codigo);
    localStorage.setItem('products', JSON.stringify(products));
}

function showProductDetails(product) {
    const details = document.getElementById('productDetails');
    document.getElementById('detailCodigo').innerText = product.codigo;
    document.getElementById('detailProducto').innerText = product.producto;
    document.getElementById('detailProveedor').innerText = product.proveedor;
    document.getElementById('detailCantidad').innerText = product.cantidad;
    document.getElementById('detailFecha').innerText = product.fecha;
    document.getElementById('detailDevolucion').innerText = product.devolucion;
    document.getElementById('detailCondiciones').innerText = product.condiciones;

    details.style.display = 'block';
    hideAllProductsExcept(product.codigo);
}

function hideAllProductsExcept(codigo) {
    const rows = document.querySelectorAll('#productTable tbody tr');
    rows.forEach(row => {
        const rowCodigo = row.cells[0].innerText;
        if (rowCodigo !== codigo) {
            row.style.display = 'none';
        }
    });
}

function showAllProducts() {
    const rows = document.querySelectorAll('#productTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    document.getElementById('productDetails').style.display = 'none';
}

