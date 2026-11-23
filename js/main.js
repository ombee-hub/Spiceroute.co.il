/* חאן דרך הבשמים — main.js */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const WA = '972523666476';
  const EN = document.documentElement.lang === 'en';
  const RTL = document.documentElement.dir === 'rtl';

  /* header: solid on scroll (always solid on pages without a dark hero) */
  const hdr = $('[data-hdr]');
  const hasHero = $('.hero, .phero, .thanks');
  const onScroll = () => hdr.classList.toggle('is-solid', !hasHero || scrollY > 40);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  /* mobile menu */
  const burger = $('.burger'), nav = $('#nav'), scrim = $('[data-scrim]'), drawerX = $('.drawer-x');
  let scrimTimer;
  const setNav = open => {
    clearTimeout(scrimTimer);
    if (open) scrim.hidden = false; else scrimTimer = setTimeout(() => { scrim.hidden = true; }, 350);
    requestAnimationFrame(() => {
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    });
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) setTimeout(() => drawerX.focus(), 50); else burger.focus({ preventScroll: true });
  };
  burger.addEventListener('click', () => setNav(!nav.classList.contains('is-open')));
  drawerX.addEventListener('click', () => setNav(false));
  scrim.addEventListener('click', () => setNav(false));
  $$('a', nav).forEach(a => a.addEventListener('click', () => { if (nav.classList.contains('is-open')) setNav(false); }));
  addEventListener('resize', () => { if (innerWidth > 1100 && nav.classList.contains('is-open')) setNav(false); });

  /* reveal on scroll */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* lightbox */
  const lb = $('[data-lb]');
  let items = [], idx = 0, lastFocus;
  const show = i => {
    idx = (i + items.length) % items.length;
    const a = items[idx];
    $('img', lb).src = a.href;
    $('img', lb).alt = $('img', a)?.alt || '';
    $('figcaption', lb).textContent = `${idx + 1} / ${items.length}`;
  };
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ''; lastFocus?.focus(); };
  $$('[data-gallery]').forEach(g => {
    const list = $$('[data-lb-item]', g);
    list.forEach((a, i) => a.addEventListener('click', e => {
      e.preventDefault(); lastFocus = a; items = list; show(i);
      lb.hidden = false; document.body.style.overflow = 'hidden'; $('[data-lb-close]', lb).focus();
    }));
  });
  $('[data-lb-close]', lb).addEventListener('click', closeLb);
  $('[data-lb-prev]', lb).addEventListener('click', () => show(idx - 1));
  $('[data-lb-next]', lb).addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  let tx = 0;
  lb.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
  lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) show(idx + ((d < 0) === RTL ? -1 : 1)); });

  /* video modal */
  const vm = $('[data-vmodal]');
  const closeVm = () => { if (!vm) return; vm.hidden = true; $('.vmodal__box', vm).innerHTML = ''; document.body.style.overflow = ''; };
  $$('[data-video]').forEach(b => b.addEventListener('click', () => {
    $('.vmodal__box', vm).innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.video}?autoplay=1&rel=0" title="${EN ? 'Spice Route Inn video' : 'סרטון חאן דרך הבשמים'}" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
    vm.hidden = false; document.body.style.overflow = 'hidden';
  }));
  vm && $('[data-vclose]', vm).addEventListener('click', closeVm);
  vm && vm.addEventListener('click', e => { if (e.target === vm) closeVm(); });

  addEventListener('keydown', e => {
    if (e.key === 'Escape') { if (!lb.hidden) closeLb(); closeVm(); if (nav.classList.contains('is-open')) setNav(false); }
    if (!lb.hidden && e.key === 'ArrowLeft') show(idx + (RTL ? 1 : -1));
    if (!lb.hidden && e.key === 'ArrowRight') show(idx + (RTL ? -1 : 1));
  });

  /* map: legend <-> hotspots */
  $$('.kmap__legend li').forEach(li => {
    const pts = li.dataset.pt === '1' ? ['1', '2', '3'] : [li.dataset.pt];
    const set = on => pts.forEach(p => $(`.kmap__pt[data-pt="${p}"]`)?.classList.toggle('is-hot', on));
    li.addEventListener('mouseenter', () => set(true));
    li.addEventListener('mouseleave', () => set(false));
  });

  /* activities filter */
  const filters = $$('[data-filter]');
  filters.forEach(b => b.addEventListener('click', () => {
    filters.forEach(x => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', x === b); });
    $$('.acard').forEach(c => { c.hidden = b.dataset.filter !== 'all' && c.dataset.cat !== b.dataset.filter; });
  }));
  $$('[data-more]').forEach(b => b.addEventListener('click', () => {
    const t = b.previousElementSibling.classList.toggle('is-open');
    b.textContent = t ? (EN ? 'Show less' : 'הצג פחות') : (EN ? 'Read more' : 'קראו עוד');
  }));

  /* contact form -> WhatsApp */
  const form = $('[data-waform]');
  form && form.addEventListener('submit', e => {
    e.preventDefault();
    const f = form.elements; let ok = true;
    ['name', 'phone'].forEach(n => { const bad = !f[n].value.trim(); f[n].classList.toggle('is-err', bad); if (bad) ok = false; });
    if (!ok) { form.querySelector('.is-err').focus(); return; }
    const L = EN
      ? { hi: 'Hi, I’m contacting you from the Spice Route Inn website 🌴', name: 'Name', phone: 'Phone', from: 'Arrival', nights: 'Nights', room: 'Accommodation', guests: 'Guests' }
      : { hi: 'היי, אני פונה מהאתר של החאן 🌴', name: 'שם', phone: 'טלפון', from: 'תאריך הגעה', nights: 'מספר לילות', room: 'סוג לינה', guests: 'מספר אורחים' };
    const lines = [
      L.hi,
      `${L.name}: ${f.name.value}`, `${L.phone}: ${f.phone.value}`,
      f.from.value && `${L.from}: ${f.from.value.split('-').reverse().join('/')}`,
      f.nights.value && `${L.nights}: ${f.nights.value}`,
      f.room.value && `${L.room}: ${f.room.value}`,
      f.guests.value && `${L.guests}: ${f.guests.value}`,
      f.msg.value && `\n${f.msg.value}`,
    ].filter(Boolean);
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  });
})();
