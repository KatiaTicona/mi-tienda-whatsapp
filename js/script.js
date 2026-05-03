/* ══════════════════════════════════════════
   FUENTES
══════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap');

/* ══════════════════════════════════════════
   VARIABLES — MODO CLARO LILA (por defecto)
══════════════════════════════════════════ */
:root,
[data-theme="light"] {
  --bg:          #f0ecf8;
  --bg2:         #e8e2f4;
  --surface:     #faf8ff;
  --surface2:    #ede8f8;
  --border:      #d8d0ee;
  --border2:     #c4b8e4;
  --accent:      #7c4dbd;
  --accent-soft: #9d71d4;
  --accent-pale: #e8dfff;
  --text:        #2a1f3d;
  --text2:       #5a4d72;
  --muted:       #9580b8;
  --muted2:      #c4b8d8;
  --green:       #25D366;
  --green-dark:  #1da851;
  --danger:      #c0392b;
  --shadow:      rgba(90,50,160,0.12);
  --shadow2:     rgba(90,50,160,0.06);
}

/* ══════════════════════════════════════════
   VARIABLES — MODO OSCURO
══════════════════════════════════════════ */
[data-theme="dark"] {
  --bg:          #100d1a;
  --bg2:         #160f22;
  --surface:     #1e1630;
  --surface2:    #261c3a;
  --border:      #342848;
  --border2:     #453358;
  --accent:      #b48ef0;
  --accent-soft: #9d71d4;
  --accent-pale: #2a1f40;
  --text:        #ede8ff;
  --text2:       #b8aad4;
  --muted:       #7860a0;
  --muted2:      #453360;
  --green:       #25D366;
  --green-dark:  #1da851;
  --danger:      #e05555;
  --shadow:      rgba(0,0,0,0.4);
  --shadow2:     rgba(0,0,0,0.2);
}

/* ══════════════════════════════════════════
   RESET & BASE
══════════════════════════════════════════ */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Jost', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  transition: background 0.4s, color 0.4s;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 15% 15%, rgba(160,100,240,0.08) 0%, transparent 50%),
    radial-gradient(circle at 85% 85%, rgba(120,60,200,0.06) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* ══════════════════════════════════════════
   HEADER
══════════════════════════════════════════ */
header {
  background: rgba(250,248,255,0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 0 2.5rem;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.4s, border-color 0.4s;
}
[data-theme="dark"] header { background: rgba(30,22,48,0.88); }

.logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 4px;
  color: var(--accent);
  user-select: none;
}

.header-right { display: flex; align-items: center; gap: 0.75rem; }

.theme-btn {
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 2px 8px var(--shadow2);
}
.theme-btn:hover { border-color: var(--accent); transform: rotate(30deg) scale(1.1); }

.cart-btn {
  background: var(--accent);
  border: none;
  color: #fff;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  cursor: pointer;
  font-family: 'Jost', sans-serif;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 4px 16px var(--shadow);
  letter-spacing: 0.5px;
}
.cart-btn:hover { background: var(--accent-soft); transform: translateY(-1px); }

.cart-count {
  background: #fff;
  color: var(--accent);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 500;
  transition: transform 0.2s;
}
.cart-count.bump { transform: scale(1.5); }

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
.hero {
  padding: 5rem 2rem 4rem;
  text-align: center;
  position: relative;
  z-index: 1;
}
.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border2), transparent);
}
.hero-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-pale);
  padding: 6px 20px;
  border-radius: 999px;
  margin-bottom: 1.5rem;
  font-weight: 500;
}
.hero h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 600;
  letter-spacing: 2px;
  line-height: 1.05;
  margin-bottom: 1.2rem;
}
.hero h1 em { color: var(--accent); font-style: italic; }
.hero > p { color: var(--muted); font-size: 0.95rem; font-weight: 300; letter-spacing: 1px; }

/* ══════════════════════════════════════════
   FILTERS
══════════════════════════════════════════ */
.filters {
  padding: 1.5rem 2.5rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  z-index: 1;
}
.filters::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 2.5rem;
  right: 2.5rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border2), transparent);
}
.filters-label {
  font-size: 0.72rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted2);
  margin-right: 0.5rem;
  font-weight: 500;
}
.filter-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  cursor: pointer;
  font-family: 'Jost', sans-serif;
  font-size: 0.85rem;
  transition: all 0.2s;
}
.filter-btn:hover { border-color: var(--accent-soft); color: var(--accent); background: var(--accent-pale); }
.filter-btn.active { border-color: var(--accent); color: var(--accent); background: var(--accent-pale); font-weight: 500; }

/* ══════════════════════════════════════════
   CATALOG
══════════════════════════════════════════ */
.catalog {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.5rem;
  padding: 2.5rem;
  position: relative;
  z-index: 1;
}
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  animation: fadeUp 0.5s ease both;
  box-shadow: 0 2px 12px var(--shadow2);
}
.card:hover { border-color: var(--accent-soft); transform: translateY(-6px); box-shadow: 0 12px 32px var(--shadow); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card-img {
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  background: linear-gradient(135deg, var(--bg2) 0%, var(--accent-pale) 100%);
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}
.card-img img { width: 100%; height: 100%; object-fit: cover; }

.card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--accent);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
}

.card-body { padding: 1.2rem; }
.card-cat { font-size: 0.65rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--accent-soft); margin-bottom: 0.4rem; font-weight: 500; }
.card-name { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 600; margin-bottom: 0.4rem; line-height: 1.3; }
.card-price { font-size: 1.1rem; font-weight: 500; color: var(--accent); margin-bottom: 1rem; }

.size-label { font-size: 0.7rem; color: var(--muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1.5px; }
.sizes { display: flex; gap: 5px; margin-bottom: 1rem; flex-wrap: wrap; }
.size-opt {
  border: 1px solid var(--border2);
  color: var(--muted);
  background: transparent;
  padding: 4px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.75rem;
  font-family: 'Jost', sans-serif;
  transition: all 0.15s;
  min-width: 34px;
  text-align: center;
}
.size-opt:hover { border-color: var(--accent-soft); color: var(--accent); background: var(--accent-pale); }
.size-opt.selected { border-color: var(--accent); color: var(--accent); background: var(--accent-pale); font-weight: 500; }

.add-btn {
  width: 100%;
  background: var(--accent-pale);
  color: var(--accent);
  border: 1px solid var(--border2);
  padding: 0.6rem;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Jost', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.2s;
}
.add-btn:hover { background: var(--accent); color: #fff; border-color: var(--accent); transform: scale(1.02); }

/* ══════════════════════════════════════════
   OVERLAY
══════════════════════════════════════════ */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(60,20,100,0.45);
  backdrop-filter: blur(4px);
  z-index: 150;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.overlay.show { opacity: 1; pointer-events: all; }

/* ══════════════════════════════════════════
   CART PANEL
══════════════════════════════════════════ */
.cart-panel {
  position: fixed;
  right: 0; top: 0;
  width: 390px;
  max-width: 100vw;
  height: 100vh;
  background: var(--surface);
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  z-index: 200;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.4s;
  box-shadow: -8px 0 32px var(--shadow);
}
.cart-panel.open { transform: translateX(0); }

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--accent-pale), var(--surface));
}
.cart-title { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 600; letter-spacing: 2px; color: var(--accent); }
.close-cart {
  background: var(--surface);
  border: 1px solid var(--border2);
  color: var(--muted);
  width: 34px; height: 34px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.close-cart:hover { border-color: var(--danger); color: var(--danger); transform: rotate(90deg); }

.cart-items-wrap { flex: 1; overflow-y: auto; padding: 1.25rem 1.75rem; }
.cart-items-wrap::-webkit-scrollbar { width: 4px; }
.cart-items-wrap::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

.cart-empty { color: var(--muted); font-size: 0.9rem; text-align: center; padding: 3rem 0; line-height: 2; }

.cart-item { display: flex; align-items: flex-start; padding: 1rem 0; border-bottom: 1px solid var(--border); gap: 10px; }
.cart-item-emoji { font-size: 1.5rem; flex-shrink: 0; }
.cart-item-info { flex: 1; min-width: 0; }
.cart-item-name { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 600; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cart-item-detail { font-size: 0.75rem; color: var(--muted); }
.cart-item-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }
.cart-item-price { font-size: 1rem; font-weight: 500; color: var(--accent); }

.qty-ctrl { display: flex; align-items: center; gap: 6px; }
.qty-btn {
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text);
  width: 24px; height: 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.qty-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-pale); }
.qty-num { font-size: 0.9rem; min-width: 18px; text-align: center; font-weight: 500; }

.remove-item { background: transparent; border: none; color: var(--muted2); cursor: pointer; font-size: 0.75rem; transition: color 0.15s; font-family: 'Jost', sans-serif; }
.remove-item:hover { color: var(--danger); }

/* ══════════════════════════════════════════
   CART FOOTER
══════════════════════════════════════════ */
.cart-footer {
  border-top: 1px solid var(--border);
  padding: 1.25rem 1.75rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  background: linear-gradient(0deg, var(--accent-pale) 0%, var(--surface) 100%);
}
.form-row { display: flex; flex-direction: column; gap: 4px; }
.form-label { font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; font-weight: 500; }
.form-input {
  background: var(--surface);
  border: 1px solid var(--border2);
  color: var(--text);
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  font-family: 'Jost', sans-serif;
  font-size: 0.88rem;
  width: 100%;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(124,77,189,0.1); }
.form-input::placeholder { color: var(--muted2); }

.cart-total { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0; border-top: 1px solid var(--border); }
.total-label { font-size: 0.8rem; color: var(--muted); text-transform: uppercase; letter-spacing: 2px; font-weight: 500; }
.total-amount { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 600; color: var(--accent); }

.whatsapp-btn {
  background: var(--green);
  color: #fff;
  border: none;
  padding: 0.9rem;
  border-radius: 14px;
  cursor: pointer;
  font-family: 'Jost', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex; align-items: center; justify-content: center;
  gap: 10px;
  transition: all 0.2s;
  width: 100%;
  box-shadow: 0 4px 16px rgba(37,211,102,0.3);
}
.whatsapp-btn:hover { background: var(--green-dark); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,211,102,0.4); }
.whatsapp-btn:active { transform: scale(0.98); }
.wa-icon { width: 20px; height: 20px; fill: #fff; flex-shrink: 0; }

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(80px);
  background: var(--surface);
  border: 1px solid var(--border2);
  color: var(--text);
  padding: 0.65rem 1.5rem;
  border-radius: 999px;
  font-size: 0.85rem;
  z-index: 400;
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
  white-space: nowrap;
  box-shadow: 0 8px 24px var(--shadow);
}
.toast.show { transform: translateX(-50%) translateY(0); }
.toast.success { border-color: var(--accent); color: var(--accent); }

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
footer {
  text-align: center;
  padding: 2.5rem 2rem;
  color: var(--muted);
  font-size: 0.8rem;
  border-top: 1px solid var(--border);
  margin-top: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media (max-width: 600px) {
  header { padding: 0 1rem; }
  .logo { font-size: 1.7rem; }
  .hero { padding: 3rem 1.25rem 2.5rem; }
  .filters { padding: 1rem 1.25rem; }
  .catalog { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; padding: 1.25rem; }
  .cart-panel { width: 100vw; }
  .cart-footer { padding: 1rem; }
  .cart-header { padding: 1rem; }
  .cart-items-wrap { padding: 1rem; }
}