(function () {
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-kap-bundle-add]');
    if (!btn) return;
    e.preventDefault();

    const wrapper = btn.closest('.kap-bundle');
    if (!wrapper) return;

    const ids = [btn.dataset.mainVariantId]
      .concat(
        Array.from(wrapper.querySelectorAll('[data-bundle-item]')).map((el) => el.dataset.variantId)
      )
      .filter(Boolean)
      .map((id) => ({ id: Number(id), quantity: 1 }));

    if (!ids.length) return;

    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = '…';

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ items: ids }),
    })
      .then((r) => {
        if (!r.ok) throw new Error('add failed');
        return r.json();
      })
      .then(() => {
        window.location.href = window.Shopify && window.Shopify.routes && window.Shopify.routes.root
          ? window.Shopify.routes.root + 'cart'
          : '/cart';
      })
      .catch(() => {
        btn.disabled = false;
        btn.textContent = originalLabel;
      });
  });
})();
