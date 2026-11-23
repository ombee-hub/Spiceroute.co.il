/* ============================================================
   חאן דרך הבשמים — language switcher (same pattern as Aviv)
   Click-to-open dropdown. Items with a real href navigate to the
   other language's version; href="#" is the current language and
   stays put. The choice is remembered.
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'spiceroute-lang';
  var remember = function (a) {
    try { localStorage.setItem(STORE_KEY, (a.getAttribute('lang') || 'he').slice(0, 2)); } catch (err) {}
  };

  /* mobile drawer pills */
  document.querySelectorAll('.drawer-lang a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      remember(a);
      if (a.getAttribute('href') === '#') e.preventDefault();
    });
  });

  var lang = document.querySelector('.lang');
  if (!lang) return;
  var btn = lang.querySelector('.lang-btn');
  var items = lang.querySelectorAll('.lang-menu a');

  function toggle(open) {
    lang.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    if (open) items[0].focus();
  }

  btn.addEventListener('click', function () {
    toggle(!lang.classList.contains('open'));
  });

  items.forEach(function (a) {
    a.addEventListener('click', function (e) {
      remember(a);
      if (a.getAttribute('href') === '#') { /* already on this language */
        e.preventDefault();
        toggle(false);
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!lang.contains(e.target)) toggle(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lang.classList.contains('open')) {
      toggle(false);
      btn.focus();
    }
  });
})();
