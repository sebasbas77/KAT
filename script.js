document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const codigo = document.getElementById('codigo').value;
    const producto = document.getElementById('producto').value;
    const proveedor = document.getElementById('proveedor').value;
    const cantidad = document.getElementById('cantidad').value;
    const fecha = document.getElementById('fecha').value;
    const devolucion = document.getElementById('devolucion').value;
    const condiciones = document.getElementById('condiciones').value;

    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const today = new Date();
    const expirationDate = new Date(fecha);
    const timeDiff = expirationDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    newRow.classList.add(getRowClass(daysLeft));

    newRow.innerHTML = `
        <td>${codigo}</td>
        <td>${producto}</td>
        <td>${daysLeft}</td>
    `;

    newRow.addEventListener('click', function() {
        document.getElementById('detailCodigo').innerText = codigo;
        document.getElementById('detailProducto').innerText = producto;
        document.getElementById('detailProveedor').innerText = proveedor;
        document.getElementById('detailCantidad').innerText = cantidad;
        document.getElementById('detailFecha').innerText = fecha;
        document.getElementById('detailDevolucion').innerText = devolucion;
        document.getElementById('detailCondiciones').innerText = condiciones;

        document.getElementById('productDetails').style.display = 'block';
    });

    document.getElementById('productForm').reset();
});

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
