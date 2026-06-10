// ══════════════════════════════════════════
//  ▶ CONFIGURACIÓN — edita estos valores
// ══════════════════════════════════════════
const WHATSAPP_NUMBER = "51946734127"; // Tu número con código de país (sin + ni espacios)
const TIENDA_NOMBRE   = "Renova";      // Nombre de tu tienda

// ══════════════════════════════════════════
//  ▶ CATÁLOGO DE PRODUCTOS
//    Campos:
//      id      → número único
//      name    → nombre del producto
//      cat     → poleras | pantalones | chaquetas | accesorios
//      price   → precio en soles
//      emoji   → ícono (o reemplaza por imagen: img:"imgs/foto.jpg")
//      sizes   → tallas disponibles
//      badge   → etiqueta opcional: "Nuevo" | "Top" | "Oferta" | quitar línea
// ══════════════════════════════════════════
const products = [
  { id:1,  name:"Polera Oversize Basic",  cat:"poleras",    price:49.90, emoji:"👕", img:"assets/prueba1.png", sizes:["XS","S","M","L","XL"],    badge:"Nuevo" },
  { id:2,  name:"Polera Gráfica Urban",   cat:"poleras",    price:59.90, emoji:"🎨", img:"assets/prueba2.png", sizes:["S","M","L","XL"] },
  { id:3,  name:"Polera Crop Essential",  cat:"poleras",    price:44.90, emoji:"✨", img:"assets/prueba3.png", sizes:["XS","S","M","L"] },
  { id:4,  name:"Polo Lino Relaxed",      cat:"poleras",    price:64.90, emoji:"🌿", img:"assets/prueba1.png", sizes:["S","M","L","XL"],         badge:"Top" },
  { id:5,  name:"Jean Skinny Clásico",    cat:"pantalones", price:89.90, emoji:"👖", img:"assets/prueba2.png", sizes:["28","30","32","34","36"] },
  { id:6,  name:"Jogger Cargo Street",    cat:"pantalones", price:79.90, emoji:"🔲", img:"assets/prueba3.png", sizes:["S","M","L","XL"],         badge:"Nuevo" },
  { id:7,  name:"Pantalón Wide Leg",      cat:"pantalones", price:95.90, emoji:"🖤", img:"assets/prueba1.png", sizes:["XS","S","M","L","XL"] },
  { id:8,  name:"Chaqueta Bomber",        cat:"chaquetas",  price:149.90,emoji:"🧥", img:"assets/prueba2.png", sizes:["S","M","L","XL"] },
  { id:9,  name:"Hoodie Premium",         cat:"chaquetas",  price:119.90,emoji:"🫧", img:"assets/prueba3.png", sizes:["S","M","L","XL","XXL"],   badge:"Top" },
  { id:10, name:"Chaqueta Denim",         cat:"chaquetas",  price:135.90,emoji:"🔵", img:"assets/prueba1.png", sizes:["XS","S","M","L","XL"] },
  { id:11, name:"Gorra Snapback",         cat:"accesorios", price:34.90, emoji:"🧢", img:"assets/prueba2.png", sizes:["Única"] },
  { id:12, name:"Bolso Tote Canvas",      cat:"accesorios", price:39.90, emoji:"👜", img:"assets/prueba3.png", sizes:["Única"] },
  { id:13, name:"Cinturón Urban",         cat:"accesorios", price:29.90, emoji:"🔗", img:"assets/prueba1.png", sizes:["S/M","L/XL"] },
  { id:14, name:"Calcetines Pack x3",     cat:"accesorios", price:24.90, emoji:"🧦", img:"assets/prueba2.png", sizes:["Única"] },
];

// ══════════════════════════════════════════
//  ESTADO INTERNO
// ══════════════════════════════════════════
let cart          = [];
let selectedSizes = {};
let toastTimer;

// ══════════════════════════════════════════
//  MODO CLARO / OSCURO
// ══════════════════════════════════════════
function toggleTheme() {
  const html = document.documentElement;
  const btn  = document.getElementById('themeBtn');
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  btn.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function loadTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('themeBtn').textContent = saved === 'dark' ? '☀️' : '🌙';
}

// ══════════════════════════════════════════
//  RENDER CATÁLOGO
// ══════════════════════════════════════════
function renderCatalog(filter) {
  const list = filter === 'all' ? products : products.filter(p => p.cat === filter);

  document.getElementById('catalog').innerHTML = list.map((p, i) => {
    // Soporte para imagen real (campo img) o emoji
    const visual = p.img
      ? `<img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'">`
      : p.emoji;

    return `
      <div class="card" id="card-${p.id}" style="animation-delay:${i * 40}ms">
        <div class="card-img">
          ${visual}
          ${p.badge ? `<div class="card-badge">${p.badge}</div>` : ''}
        </div>
        <div class="card-body">
          <div class="card-cat">${p.cat}</div>
          <div class="card-name">${p.name}</div>
          <div class="card-price">S/ ${p.price.toFixed(2)}</div>
          <div class="size-label">Talla</div>
          <div class="sizes">
            ${p.sizes.map(s => `<button class="size-opt" onclick="selectSize(${p.id},'${s}',this)">${s}</button>`).join('')}
          </div>
          <button class="add-btn" onclick="addToCart(${p.id})">+ Agregar al pedido</button>
        </div>
      </div>
    `;
  }).join('');
}

// ══════════════════════════════════════════
//  LÓGICA DEL CARRITO
// ══════════════════════════════════════════
function selectSize(id, size, btn) {
  selectedSizes[id] = size;
  document.getElementById('card-' + id)
    .querySelectorAll('.size-opt')
    .forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!selectedSizes[id] && p.sizes.length > 1) {
    showToast('⚠️ Selecciona una talla primero');
    return;
  }
  const size = selectedSizes[id] || p.sizes[0];
  const existing = cart.find(c => c.id === id && c.size === size);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name: p.name, price: p.price, emoji: p.emoji || '📦', size, qty: 1 });
  }
  updateCartUI();
  showToast(`${p.emoji || '✅'} ${p.name} agregado`, true);
  bumpCount();
}

function changeQty(id, size, delta) {
  const item = cart.find(c => c.id === id && c.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => !(c.id === id && c.size === size));
  updateCartUI();
}

function updateCartUI() {
  const totalQty = cart.reduce((s, c) => s + c.qty, 0);
  const totalAmt = cart.reduce((s, c) => s + c.price * c.qty, 0);

  document.getElementById('cartCount').textContent  = totalQty;
  document.getElementById('totalAmount').textContent = `S/ ${totalAmt.toFixed(2)}`;

  const el = document.getElementById('cartItems');
  if (cart.length === 0) {
    el.innerHTML = '<div class="cart-empty">Tu pedido está vacío.<br>Agrega productos del catálogo.</div>';
    return;
  }

  el.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-emoji">${c.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${c.name}</div>
        <div class="cart-item-detail">Talla: ${c.size}</div>
      </div>
      <div class="cart-item-right">
        <div class="cart-item-price">S/ ${(c.price * c.qty).toFixed(2)}</div>
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="changeQty(${c.id},'${c.size}',-1)">−</button>
          <span class="qty-num">${c.qty}</span>
          <button class="qty-btn" onclick="changeQty(${c.id},'${c.size}',+1)">+</button>
        </div>
        <button class="remove-item" onclick="changeQty(${c.id},'${c.size}',-99)">✕ quitar</button>
      </div>
    </div>
  `).join('');
}

// ══════════════════════════════════════════
//  ENVÍO POR WHATSAPP
// ══════════════════════════════════════════
function sendWhatsApp() {
  if (cart.length === 0) { showToast('⚠️ Agrega productos primero'); return; }

  const name    = document.getElementById('custName').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const notes   = document.getElementById('custNotes').value.trim();

  if (!name)    { showToast('⚠️ Ingresa tu nombre');    openCart(); return; }
  if (!address) { showToast('⚠️ Ingresa tu dirección'); openCart(); return; }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const items = cart.map(c =>
    `  • ${c.name} | Talla: ${c.size} | Cant: ${c.qty} | S/ ${(c.price * c.qty).toFixed(2)}`
  ).join('\n');
  const fecha = new Date().toLocaleDateString('es-PE', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  let msg = `🛍️ *PEDIDO — ${TIENDA_NOMBRE}*\n\n`;
  msg += `👤 *Cliente:* ${name}\n`;
  msg += `📍 *Dirección:* ${address}\n\n`;
  msg += `📦 *Productos:*\n${items}\n\n`;
  if (notes) msg += `📝 *Notas:* ${notes}\n\n`;
  msg += `💰 *TOTAL: S/ ${total.toFixed(2)}*\n`;
  msg += `📅 ${fecha}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ══════════════════════════════════════════
//  UI HELPERS
// ══════════════════════════════════════════
function openCart() {
  document.getElementById('cartPanel').classList.add('open');
  document.getElementById('overlay').classList.add('show');
}

function closeCart() {
  document.getElementById('cartPanel').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

function filterCat(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCatalog(cat);
}

function showToast(msg, success) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (success ? ' success' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

function bumpCount() {
  const el = document.getElementById('cartCount');
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 300);
}

function setCompanyLogo(src) {
  const logoEl = document.querySelector('.logo');
  logoEl.innerHTML = `<img src="${src}" alt="Logo de empresa">`;
}

function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('Selecciona una imagen válida');
    event.target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = reader.result;
    setCompanyLogo(dataUrl);
    document.getElementById('logoPreview').innerHTML = `<img src="${dataUrl}" alt="Vista previa del logo">`;
  };
  reader.readAsDataURL(file);
}

// Actualizar handler para también subir al servidor
document.getElementById('companyLogoInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  handleLogoUpload(e);
  if (file) uploadLogoToServer(file);
});

// Enviar archivo al servidor para persistirlo en assets/renova.jpg
function uploadLogoToServer(file) {
  const fd = new FormData();
  fd.append('logo', file, 'renova.jpg');

  return fetch('/upload-logo', { method: 'POST', body: fd })
    .then(res => res.json())
    .then(json => {
      if (!json.ok) throw new Error(json.message || 'Upload failed');
      showToast('Logo guardado en el servidor', true);
      return json;
    })
    .catch(err => {
      console.error(err);
      showToast('Error al subir el logo');
    });
}

// ══════════════════════════════════════════
//  INICIO
// ══════════════════════════════════════════
loadTheme();
document.getElementById('companyLogoInput').addEventListener('change', handleLogoUpload);

// Establecer logo por defecto desde assets/renova.jpg y mostrar vista previa
const defaultLogoPath = 'assets/renova.jpg';
setCompanyLogo(defaultLogoPath);
const previewEl = document.getElementById('logoPreview');
if (previewEl) previewEl.innerHTML = `<img src="${defaultLogoPath}" alt="Vista previa del logo">`;

renderCatalog('all');