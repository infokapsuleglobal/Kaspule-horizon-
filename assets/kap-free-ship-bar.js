/**
 * Refreshes every free-shipping progress bar on the page (PDP + cart drawer)
 * after an add-to-cart, since Horizon's native cart refresh doesn't know
 * about this custom block. Listens for the same product-form submit events
 * the theme's own add-to-cart buttons fire, then re-fetches /cart.js.
 */
(function () {
  function formatMoney(cents, currency) {
    try {
      const locale = document.documentElement.lang || 'fr-FR';
      return new Intl.NumberFormat(locale, { style: 'currency', currency: currency || 'EUR' }).format(cents / 100);
    } catch (e) {
      return (cents / 100).toFixed(2) + ' €';
    }
  }

  function refreshBars() {
    fetch('/cart.js', { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((cart) => {
        if (!cart) return;
        const bars = document.querySelectorAll('[data-kap-shipbar]');
        bars.forEach((bar) => {
          const threshold = Number(bar.dataset.thresholdCents || 4900);
          const pct = Math.min(100, Math.round((cart.total_price / threshold) * 100));
          const fill = bar.querySelector('[data-kap-shipbar-fill]');
          const label = bar.querySelector('[data-kap-shipbar-label]');
          if (fill) fill.style.inlineSize = pct + '%';
          if (label) {
            const remaining = threshold - cart.total_price;
            label.textContent =
              remaining <= 0
                ? 'Livraison offerte 🎉'
                : 'Livraison offerte dès 49 € — encore ' + formatMoney(remaining, cart.currency);
          }
        });
      })
      .catch(() => {});
  }

  document.addEventListener('submit', (e) => {
    const form = e.target.closest('form[action*="/cart/add"]');
    if (form) setTimeout(refreshBars, 500);
  });

  document.addEventListener('cart-section:restored', refreshBars);
  window.addEventListener('pageshow', refreshBars);
})();
