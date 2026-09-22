(function () {
  function init() {
    const bar = document.querySelector('[data-kap-sticky-atc]');
    if (!bar) return;

    const nativeAddToCart = document.querySelector(
      'product-form button[type="submit"], form[action*="/cart/add"] button[type="submit"]'
    );

    const trigger = nativeAddToCart || document.querySelector('form[action*="/cart/add"]');
    if (trigger) {
      const target = document.querySelector('product-form') || trigger.closest('form') || trigger;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            bar.classList.toggle('is-visible', !entry.isIntersecting);
          });
        },
        { rootMargin: '0px 0px -40% 0px' }
      );
      observer.observe(target);
    }

    const btn = bar.querySelector('[data-kap-sticky-atc-button]');
    if (btn && nativeAddToCart) {
      btn.addEventListener('click', () => nativeAddToCart.click());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
