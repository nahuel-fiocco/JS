document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("cantidad").focus();
  });

function agregarAlCarrito() {
    let cantidad = document.getElementById("cantidad").value;
    if(cantidad > 0){
        let producto = document.getElementById("producto").value.toUpperCase();
        if (cantidad && producto) {
            let carrito = document.getElementById("carrito").getElementsByTagName("tbody")[0];
            let filaExistente = document.querySelector('#carrito #' + producto);
            if (filaExistente) {
                let celdaCantidad = filaExistente.cells[0];
                let cantidadExistente = parseInt(celdaCantidad.innerHTML);
                let nuevaCantidad = cantidadExistente + parseInt(cantidad);
                celdaCantidad.innerHTML = nuevaCantidad;
                return;
            }
            let fila = carrito.insertRow();
            fila.id = producto;
            let celdaCantidad = fila.insertCell(0);
            let celdaProducto = fila.insertCell(1);
            let celdaEliminar = fila.insertCell(2);
            // celdaProducto.innerHTML = producto;
            // celdaCantidad.innerHTML = cantidad;
            celdaProducto.textContent = document.getElementById("producto").value;
            celdaCantidad.textContent = document.getElementById("cantidad").value;
            celdaEliminar.innerHTML = '<button type="button" onclick="eliminarDelCarrito(this)"><i class="fa-solid fa-trash"></i></button>';
            document.getElementById("cantidad").value = null;
            document.getElementById("producto").value = '';
            document.getElementById('cantidad').focus();
        }
    }
    else if(cantidad == 0 || cantidad == undefined){
        alert("debes ingresar una cantidad valida")
    }
    else if(cantidad < 0){
        alert("vas a venderle cosas al super?\ningresaste un numero negativo jeje, ingresalo devuelta ;)")
    }
}
document.getElementById("cantidad").value = null;
    document.getElementById("producto").value = '';
    document.getElementById('cantidad').focus();
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      agregarAlCarrito();
    }
  });
function eliminarDelCarrito(fila) {
    let indiceFila = fila.parentNode.parentNode.rowIndex;
    document.getElementById("carrito").deleteRow(indiceFila);
    document.getElementById("cantidad").value = null;
    document.getElementById("producto").value = '';
    document.getElementById('cantidad').focus();
}