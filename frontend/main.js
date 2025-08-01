const apiUrl = 'http://localhost:3000/api/products';

async function fetchProducts() {
  const res = await fetch(apiUrl);
  const products = await res.json();
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${p.name}</strong> - $${p.price.toFixed(2)}<br>${p.description || ''} <button onclick="deleteProduct(${p.id})">Eliminar</button>`;
    list.appendChild(div);
  });
}

async function deleteProduct(id) {
  if (!confirm('Eliminar producto?')) return;
  const res = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  if (res.ok) fetchProducts();
  else alert('Error al eliminar');
}

document.getElementById('add-product-form').addEventListener('submit', async e => {
  e.preventDefault();
  const product = {
    name: document.getElementById('name').value.trim(),
    price: parseFloat(document.getElementById('price').value),
    description: document.getElementById('description').value.trim()
  };
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  if (res.ok) {
    e.target.reset();
    fetchProducts();
  } else {
    const err = await res.json();
    alert('Error: ' + JSON.stringify(err.errors));
  }
});

fetchProducts();
