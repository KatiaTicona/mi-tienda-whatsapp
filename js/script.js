// Datos de productos (puedes agregar más)
const productos = [
  {
    id: 1,
    nombre: "Hamburguesa Clásica",
    precio: 12.90,
    imagen: "assets/hamburguesa.jpg"
  },
  {
    id: 2,
    nombre: "Pizza Margarita",
    precio: 18.50,
    imagen: "assets/pizza.jpg"
  },
  {
    id: 3,
    nombre: "Salchipapas",
    precio: 8.90,
    imagen: "assets/salchipapas.jpg"
  },
  // Agrega más productos aquí...
];

// Variables del carrito
let carrito = [];

// Renderizar productos
function renderProductos() {
  const contenedor = document.getElementById('lista-productos');
  contenedor.innerHTML = '';

  productos.forEach(producto => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>S/ ${producto.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

// Agregar al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const item = carrito.find(i => i.id === id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
  const contenedor = document.getElementById('items-carrito');
  contenedor.innerHTML = '';

  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio * item.cantidad;

    const div = document.createElement('div');
    div.className = 'item-carrito';
    div.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <span>S/ ${(item.precio * item.cantidad).toFixed(2)}</span>
      <button onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    contenedor.appendChild(div);
  });

  document.getElementById('total-precio').textContent = total.toFixed(2);
  document.getElementById('contador').textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

// Eliminar del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Pedir por WhatsApp
document.getElementById('btn-pedir').addEventListener('click', () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "Hola, quiero hacer este pedido:\n\n";

  carrito.forEach(item => {
    mensaje += `• ${item.nombre} x${item.cantidad} - S/ ${(item.precio * item.cantidad).toFixed(2)}\n`;
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  mensaje += `\n*Total: S/ ${total.toFixed(2)}*`;

  // Reemplaza con tu número (formato internacional)
  const numeroWhatsApp = "51946734127"; // Ejemplo: Perú

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');

  // Opcional: vaciar carrito después de pedir
  // carrito = [];
  // actualizarCarrito();
});

// Inicializar
renderProductos();