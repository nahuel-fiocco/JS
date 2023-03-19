let cant = 0
let product = ''

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    agregarAlCarrito();
  }
});

const agregarAlCarrito = () => {
  cant += document.getElementById("cantidad").value
  parseInt(cant)
  product = document.getElementById("producto").value
  console.log(`la cantidad es ${cant} y el producto es ${product}`)
}

// let cant = document.getElementById("cantidad").value
// let product = document.getElementById("producto").value