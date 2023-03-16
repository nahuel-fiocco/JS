document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cantidad").focus();
});

const resetearFormulario = () => {
  document.getElementById("cantidad").value = null;
  document.getElementById("producto").value = "";
  document.getElementById("cantidad").focus();
}

const agregarAlCarrito = () => {
  let cantidad = document.getElementById("cantidad").value;
  if (cantidad > 0) {
    let producto = document.getElementById("producto").value.toUpperCase();
    if (cantidad && producto) {
      let carrito = document
        .getElementById("carrito")
        .getElementsByTagName("tbody")[0];
      let filaExistente = document.querySelector("#carrito #" + producto);
      if (filaExistente) {
        let celdaCantidad = filaExistente.cells[0];
        let cantidadExistente = parseInt(celdaCantidad.innerHTML);
        let nuevaCantidad = cantidadExistente + parseInt(cantidad);
        celdaCantidad.innerHTML = nuevaCantidad;
        resetearFormulario();
        return;
      }
      let fila = carrito.insertRow();
      fila.id = producto;
      let celdaCantidad = fila.insertCell(0);
      let celdaProducto = fila.insertCell(1);
      let celdaEliminar = fila.insertCell(2);
      celdaProducto.textContent = document.getElementById("producto").value;
      celdaCantidad.textContent = document.getElementById("cantidad").value;
      celdaEliminar.innerHTML =
        '<button id="trashButton" type="button" onclick="eliminarDelCarrito(this)"><i id="trashIcon" class="fa-solid fa-trash"></i></button>';
      resetearFormulario();
    }
  } else if (cantidad == 0 || cantidad == undefined) {
    alert("la cantidad no puede ser cero");
  } else if (cantidad < 0) {
    alert(
      "vas a venderle cosas al super?\ningresaste un numero negativo jeje, ingresalo devuelta ;)"
    );
  }
  actualizarTotalProductos();
}

resetearFormulario();

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    agregarAlCarrito();
    actualizarTotalProductos();
  }
});

function eliminarDelCarrito(fila) {
  let indiceFila = fila.parentNode.parentNode.rowIndex;
  document.getElementById("carrito").deleteRow(indiceFila);
  resetearFormulario();
  actualizarTotalProductos();
}

const actualizarTotalProductos = () => {
    let total = 0;
    let filas = document.getElementById("carrito").getElementsByTagName("tbody")[0].rows;
    for (let i = 0; i < filas.length; i++) {
    total += parseInt(filas[i].cells[0].innerHTML);
    }
    if(total >= 1){
      document.getElementById("totalProductos").innerHTML = "Cant. de productos: " + total;
      if(total >= 20){
        document.getElementById('capacidadSuperada').style.visibility = 'visible';
      }
    }
    else{
      document.getElementById("totalProductos").innerHTML = "El carrito esta vacio"
    }
  }