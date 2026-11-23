// מחולל האתר הסטטי — מריצים מתיקיית Web:  node _src/build.js
const fs = require('fs'), path = require('path');
const { site, nav, rooms, facilities, mapPoints, activities, activityCats, gallery } = require('./data');
const legal = require('./legal');
const EN = require('./data-en');
const OUT = path.join(__dirname, '..');
let IMG = 'images/';
const img = f => IMG + (/\.\w+$/.test(f) ? f : f + '.webp');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nis = n => '₪' + n.toLocaleString('en-US');
const wa = text => `https://wa.me/${site.phoneIntl}?text=${encodeURIComponent(text)}`;

// ---------- icons ----------
const I = {
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  wa: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v7h4v-7h3l1-4h-4V8z"/>',
  ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrow: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4m8-4v4"/>',
  waze: '<path d="M13.218 0C9.915 0 6.835 1.49 4.723 4.148c-1.515 1.913-2.31 4.272-2.31 6.706v1.739c0 .894-.62 1.738-1.862 1.813-.298.025-.547.224-.547.522-.05.82.82 2.31 2.012 3.502.82.844 1.788 1.515 2.832 2.036a3 3 0 0 0 2.955 3.528 2.966 2.966 0 0 0 2.931-2.385h2.509c.323 1.689 2.086 2.856 3.974 2.21 1.64-.546 2.36-2.409 1.763-3.924a12.84 12.84 0 0 0 1.838-1.465 10.73 10.73 0 0 0 3.18-7.65c0-2.882-1.118-5.589-3.155-7.625A10.899 10.899 0 0 0 13.218 0zm0 1.217c2.558 0 4.967.994 6.78 2.807a9.525 9.525 0 0 1 2.807 6.78A9.526 9.526 0 0 1 20 17.585a9.647 9.647 0 0 1-6.78 2.807h-2.46a3.008 3.008 0 0 0-2.93-2.41 3.03 3.03 0 0 0-2.534 1.367v.024a8.945 8.945 0 0 1-2.41-1.788c-.844-.844-1.316-1.614-1.515-2.11a2.858 2.858 0 0 0 1.441-.846 2.959 2.959 0 0 0 .795-2.036v-1.789c0-2.11.696-4.197 2.012-5.861 1.863-2.385 4.62-3.726 7.6-3.726zm-2.41 5.986a1.192 1.192 0 0 0-1.191 1.192 1.192 1.192 0 0 0 1.192 1.193A1.192 1.192 0 0 0 12 8.395a1.192 1.192 0 0 0-1.192-1.192zm7.204 0a1.192 1.192 0 0 0-1.192 1.192 1.192 1.192 0 0 0 1.192 1.193 1.192 1.192 0 0 0 1.192-1.193 1.192 1.192 0 0 0-1.192-1.192zm-7.377 4.769a.596.596 0 0 0-.546.845 4.813 4.813 0 0 0 4.346 2.757 4.77 4.77 0 0 0 4.347-2.757.596.596 0 0 0-.547-.845h-.025a.561.561 0 0 0-.521.348 3.59 3.59 0 0 1-3.254 2.061 3.591 3.591 0 0 1-3.254-2.061.64.64 0 0 0-.546-.348z"/>',
  ext: '<path d="M14 4h6v6m0-6-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
  leaf: '<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14zm0 0 7-7"/>',
};
const FILLED = new Set(['wa', 'waze']);
const icon = (n, cls = '') => `<svg class="ic${FILLED.has(n) ? ' ic--fill' : ''} ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;

// ---------- language context ----------
// LANG / IMG / ROOT are switched to English before the en/ pages are generated (see build-en at the bottom)
let LANG = 'he', ROOT = '';
const EN_FILES = new Set(['index.html', 'rooms.html', ...rooms.map(r => `room-${r.slug}.html`), 'story.html', 'facilities.html', 'activities.html', 'gallery.html', 'contact.html', 'terms.html', 'privacy.html', 'accessibility.html', 'thank-you.html']);
const S = {
  he: {
    skip: 'דילוג לתוכן', home: 'לעמוד הבית', mainNav: 'ראשי', chooseLang: 'בחירת שפה', book: 'הזמנת חופשה', menu: 'תפריט',
    joinEyebrow: 'רוצים להישאר מעודכנים?', joinTitle: 'חופשות ברגע האחרון ומבצעים בלעדיים', joinText: 'הצטרפו לקבוצת הוואטסאפ של החאן — ונעדכן אתכם ראשונים.', joinBtn: 'הצטרפות לקבוצה',
    about: 'מתחם אירוח מדברי בלב הערבה, מאחורי מושב צופר, על תוואי הדרך הנבטית העתיקה.',
    navTitle: 'ניווט', roomsTitle: 'לינה', talkTitle: 'יצירת קשר', address: site.address, waze: 'ניווט עם Waze',
    a11y: 'הצהרת נגישות', privacy: 'מדיניות פרטיות', terms: 'תקנון ותנאי שימוש',
    credit: 'עיצוב ובנייה ע״י', creditLabel: 'עיצוב ובנייה ע״י OMBee (נפתח בחלון חדש)',
    waFab: 'שלחו לנו וואטסאפ', lbLabel: 'תצוגת תמונה', close: 'סגירה', prev: 'הקודמת', next: 'הבאה',
    facebook: 'פייסבוק', instagram: 'אינסטגרם', whatsapp: 'וואטסאפ',
    upTo: n => `עד ${n} אורחים`, from: 'החל מ-', night: ' / לילה', details: 'לפרטים',
    mapEyebrow: 'מפת החאן 2026', mapTitle: 'הכירו את המתחם', mapText: 'רחפו מעל המספרים כדי לגלות מה נמצא איפה — מהאוהלים הבדואים ועד הבריכות ופינת החי.',
    mapAlt: 'מפה מאוירת של מתחם חאן דרך הבשמים, עם 15 נקודות ממוספרות', lodging: 'מתחמי הלינה', public: 'מתקנים ציבוריים',
    legendLodging: [['1', '1–3', 'אוהלים בדואים'], ['4', '4', 'אזור החושות והגלמפינג'], ['5', '5', 'מתחם הקמפינג'], ['6', '6', 'בקתות מדבר']],
    titleHome: `${site.name} | חופשה מדברית ולינה בערבה`, rights: 'כל הזכויות שמורות לחאן דרך הבשמים', siteName: site.name, locale: 'he_IL',
  },
  en: {
    skip: 'Skip to content', home: 'Home', mainNav: 'Main', chooseLang: 'Choose language', book: 'Book Now', menu: 'Menu',
    joinEyebrow: 'Want to stay updated?', joinTitle: 'Last-minute getaways & exclusive deals', joinText: 'Join the Inn’s WhatsApp group and be the first to hear about them.', joinBtn: 'Join the group',
    about: 'A desert hospitality oasis in the heart of the Arava, just behind Moshav Tsofar, along the ancient Nabatean Incense Route.',
    navTitle: 'Explore', roomsTitle: 'Accommodation', talkTitle: 'Contact Us', address: 'Moshav Tsofar, 8683000, Central Arava, Israel', waze: 'Navigate with Waze',
    a11y: 'Accessibility Statement', privacy: 'Privacy Policy', terms: 'Terms & Conditions',
    credit: 'Design & development by', creditLabel: 'Design & development by OMBee (opens in a new window)',
    waFab: 'Message us on WhatsApp', lbLabel: 'Image viewer', close: 'Close', prev: 'Previous', next: 'Next',
    facebook: 'Facebook', instagram: 'Instagram', whatsapp: 'WhatsApp',
    upTo: n => `Up to ${n} guests`, from: 'From ', night: ' / night', details: 'Details',
    mapEyebrow: 'Inn map 2026', mapTitle: 'Explore the Inn', mapText: 'Hover over the numbers to discover what’s where — from the Bedouin tents to the pools and the petting farm.',
    mapAlt: 'Illustrated map of the Spice Route Inn with 15 numbered points', lodging: 'Accommodation', public: 'Facilities',
    legendLodging: [['1', '1–3', 'Bedouin Tents'], ['4', '4', 'Desert Huts & Glamping'], ['5', '5', 'Camping Area'], ['6', '6', 'Desert Cabins']],
    titleHome: 'Spice Route Inn | Authentic Desert Lodging in the Arava', rights: 'All rights reserved to Spice Route Inn', siteName: 'Spice Route Inn', locale: 'en_US',
  },
};
const T = () => S[LANG];
const navFor = () => (LANG === 'he' ? nav : EN.nav);
const roomsFor = () => (LANG === 'he' ? rooms : rooms.map(r => ({ ...r, ...EN.rooms[r.slug] })));
const facilitiesFor = () => (LANG === 'he' ? facilities : facilities.map(f => ({ ...f, ...EN.facilities[f.id], long: EN.facilitiesLong[f.id] })));
const bookingUrl = () => (LANG === 'he' ? site.booking : site.booking.replace('lang=HE', 'lang=EN'));
const flag = c => `<img class="lang-flag" src="${IMG}flag-${c === 'he' ? 'il' : 'uk'}.webp" alt="" width="20" height="13">`;

// links to the same page in each language (falls back to the home page when a page has no English version)
function langLinks(file) {
  const heHref = LANG === 'he' ? '#' : `../${file}`;
  const enHref = LANG === 'en' ? '#' : `en/${EN_FILES.has(file) ? file : 'index.html'}`;
  return [['he', heHref, 'עברית'], ['en', enHref, 'English']]
    .map(([c, h, t]) => `<a href="${h}" lang="${c}"${c === LANG ? ' aria-current="true"' : ''}>${flag(c)}${t}</a>`).join('');
}

// ---------- layout ----------
function header(active, file) {
  const t = T();
  const links = navFor().map(([h, x]) => `<a href="${h}"${h === active ? ' aria-current="page"' : ''}>${x}</a>`).join('');
  const logo = LANG === 'he'
    ? `<img class="logo__img logo__img--light" src="${IMG}logo-spiceroute-full-light.webp" alt="${site.name} – חוויה מדברית בערבה" width="190" height="51">
      <img class="logo__img logo__img--dark" src="${IMG}logo-spiceroute-full.webp" alt="" width="190" height="51">`
    : `<img src="${IMG}logo-spiceroute.webp" alt="" width="68" height="40">
      <span class="logo__txt"><b>Spice Route Inn</b><small>Desert experience in the Arava</small></span>`;
  return `
<a class="skip" href="#main">${t.skip}</a>
<header class="hdr" data-hdr>
  <div class="hdr__in">
    <button class="burger" aria-controls="nav" aria-expanded="false" aria-label="${t.menu}">${icon('menu')}</button>
    <a class="logo" href="index.html" aria-label="${t.siteName} – ${t.home}">
      ${logo}
    </a>
    <nav class="nav" id="nav" aria-label="${t.mainNav}">
      <div class="drawer-head">
        <a class="drawer-logo" href="index.html"><img src="${IMG}${LANG === 'he' ? 'logo-spiceroute-full.webp' : 'logo-spiceroute.webp'}" alt="${t.siteName}" height="44">${LANG === 'he' ? '' : '<b>Spice Route Inn</b>'}</a>
        <button class="drawer-x" type="button" aria-label="${t.close}">${icon('close')}</button>
      </div>
      <div class="drawer-links">${links}</div>
      <div class="drawer-cta">
        <a class="btn btn-primary btn-block" href="${bookingUrl()}" target="_blank" rel="noopener">${icon('calendar')} ${t.book}</a>
        <div class="drawer-contact"><a href="tel:+${site.phoneIntl}">${icon('phone')}<bdi dir="ltr">${LANG === 'he' ? site.phone : '+972-52-3666476'}</bdi></a><a href="${site.waze}" target="_blank" rel="noopener">${icon('waze')}Waze</a></div>
      </div>
      <div class="drawer-lang" aria-label="${t.chooseLang}">${langLinks(file)}</div>
    </nav>
    <div class="nav-scrim" data-scrim hidden></div>
    <div class="hdr__act">
      <div class="lang">
        <button class="lang-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="${t.chooseLang}">
          ${flag(LANG)} ${LANG === 'he' ? 'עב' : 'EN'}
          <svg class="lang-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="lang-menu">${langLinks(file)}</div>
      </div>
      <a class="btn btn-primary btn-sm" href="${bookingUrl()}" target="_blank" rel="noopener">${t.book}</a>
    </div>
  </div>
</header>`;
}

function footer() {
  const t = T();
  const waHref = LANG === 'he' ? site.whatsapp : `https://wa.me/${site.phoneIntl}?text=${encodeURIComponent('Hi, I’m contacting you from the Spice Route Inn website and would like more information')}`;
  const brand = LANG === 'he'
    ? `<img src="${IMG}logo-spiceroute-full.webp" alt="${site.name} – חוויה מדברית בערבה" width="220" height="59" class="ftr__logo">`
    : `<a class="logo logo--ftr" href="index.html"><img src="${IMG}logo-spiceroute.webp" alt="" width="68" height="40"><span class="logo__txt"><b>Spice Route Inn</b><small>Desert experience in the Arava</small></span></a>`;
  return `
<section class="joinband">
  <div class="wrap joinband__in">
    <div>
      <p class="eyebrow">${t.joinEyebrow}</p>
      <h2>${t.joinTitle}</h2>
      <p>${t.joinText}</p>
    </div>
    <a class="btn btn-light" href="${site.waGroup}" target="_blank" rel="noopener">${icon('wa')} ${t.joinBtn}</a>
  </div>
</section>
<footer class="ftr">
  <div class="wrap ftr__grid">
    <div class="ftr__brand">
      ${brand}
      <p>${t.about}</p>
      <div class="social">
        <a href="${site.facebook}" target="_blank" rel="noopener" aria-label="${t.facebook}">${icon('fb')}</a>
        <a href="${site.instagram}" target="_blank" rel="noopener" aria-label="${t.instagram}">${icon('ig')}</a>
        <a href="${waHref}" target="_blank" rel="noopener" aria-label="${t.whatsapp}">${icon('wa')}</a>
      </div>
    </div>
    <div>
      <h3>${t.navTitle}</h3>
      <ul>${navFor().map(([h, x]) => `<li><a href="${h}">${x}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h3>${t.roomsTitle}</h3>
      <ul>${roomsFor().map(r => `<li><a href="room-${r.slug}.html">${r.title}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h3>${t.talkTitle}</h3>
      <ul class="ftr__contact">
        <li>${icon('phone')}<a href="tel:${LANG === 'he' ? site.phone.replace(/-/g, '') : '+' + site.phoneIntl}" dir="ltr">${LANG === 'he' ? site.phone : '+972-52-3666476'}</a></li>
        <li>${icon('mail')}<a href="mailto:${site.email}">${site.email}</a></li>
        <li>${icon('pin')}<span>${t.address}</span></li>
        <li>${icon('waze')}<a href="${site.waze}" target="_blank" rel="noopener">${t.waze}</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap ftr__bottom">
    <span>© ${new Date().getFullYear()} ${t.rights}</span>
    <span><a href="accessibility.html">${t.a11y}</a> · <a href="privacy.html">${t.privacy}</a> · <a href="terms.html">${t.terms}</a></span>
    <a class="credit" href="https://ombee.co.il" target="_blank" rel="noopener" aria-label="${t.creditLabel}"><span>${t.credit}</span><img src="${IMG}ombee-logo.webp" alt="OMBee" width="84" height="25"></a>
  </div>
</footer>
<a class="fab" href="${waHref}" target="_blank" rel="noopener" aria-label="${t.waFab}">${icon('wa')}</a>
<div class="lb" data-lb hidden role="dialog" aria-modal="true" aria-label="${t.lbLabel}">
  <button class="lb__x" data-lb-close aria-label="${t.close}">${icon('close')}</button>
  <button class="lb__nav lb__prev" data-lb-prev aria-label="${t.prev}">${icon('arrow')}</button>
  <figure><img alt=""><figcaption></figcaption></figure>
  <button class="lb__nav lb__next" data-lb-next aria-label="${t.next}">${icon('arrow')}</button>
</div>`;
}

const SITE_URL = 'https://spiceroute.co.il/';
function page(file, { title, desc = '', active = file, body, ogImg = '6-dji_fly_20251214_104250_0502_1765750140758_photo.webp' }) {
  const t = T();
  const full = file === 'index.html' ? t.titleHome : `${title} | ${t.siteName}`;
  const alt = EN_FILES.has(file)
    ? `<link rel="alternate" hreflang="he" href="${SITE_URL}${file}">
<link rel="alternate" hreflang="en" href="${SITE_URL}en/${file}">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}${file}">` : '';
  const html = `<!doctype html>
<html lang="${LANG}" dir="${LANG === 'he' ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${IMG}${ogImg}">
<meta property="og:locale" content="${t.locale}">
${alt}
<meta name="theme-color" content="#2a1d14">
<link rel="icon" href="${IMG}logo-spiceroute.webp" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${ROOT}css/style.css">

</head>
<body>
${header(active, file)}
<main id="main">
${body}
</main>
${footer()}
<script src="${ROOT}js/main.js" defer></script>
<script src="${ROOT}js/lang.js" defer></script>
<script src="${ROOT}js/cookies.js" defer></script>
<script src="${ROOT}js/a11y.js" defer></script>
</body>
</html>
`;
  const dir = LANG === 'he' ? OUT : path.join(OUT, 'en');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, file), html);
  console.log('✓', LANG === 'he' ? file : 'en/' + file);
}

// ---------- shared blocks ----------
const pageHero = (eyebrow, title, image, sub = '') => `
<section class="phero">
  <img class="phero__img" src="${img(image)}" alt="" fetchpriority="high">
  <div class="phero__in wrap">
    <p class="eyebrow eyebrow--light">${eyebrow}</p>
    <h1>${title}</h1>
    ${sub ? `<p class="phero__sub">${sub}</p>` : ''}
  </div>
  <svg class="dune" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 80V48c160-30 330-44 520-22s330 40 520 18 300-40 400-30v66z"/></svg>
</section>`;

const sectionHead = (eyebrow, title, text = '', center = false) => `
<div class="shead${center ? ' shead--c' : ''} reveal">
  <p class="eyebrow">${eyebrow}</p>
  <h2>${title}</h2>
  ${text ? `<p class="lead">${text}</p>` : ''}
</div>`;

const roomCard = r => {
  const t = T();
  return `
<article class="rcard reveal">
  <a href="room-${r.slug}.html" class="rcard__media">
    <img src="${img(r.img)}" alt="${r.title}" loading="lazy">
    <span class="chip">${icon('users')} ${t.upTo(r.cap)}</span>
  </a>
  <div class="rcard__body">
    <p class="eyebrow">${r.kicker}</p>
    <h3><a href="room-${r.slug}.html">${r.title}</a></h3>
    <p>${r.teaser}</p>
    <div class="rcard__foot">
      <span class="price"><small>${t.from}</small>${nis(r.prices.week.from)}<small>${t.night}</small></span>
      <a class="btn btn-outline btn-sm" href="room-${r.slug}.html">${t.details}</a>
    </div>
  </div>
</article>`;
};

const roomsGrid = (exclude) => `<div class="rgrid rgrid--${exclude ? 4 : 5}">${roomsFor().filter(r => r.slug !== exclude).map(roomCard).join('')}</div>`;

// facility tiles link to the facilities page in both languages
const facilityTiles = () => `
<div class="ftiles">
${facilitiesFor().map((f, i) => {
  const tag = `a href="facilities.html#${f.id}"`;
  return `
  <${tag} class="ftile reveal" style="--d:${i * 60}ms">
    <img src="${img(f.img)}" alt="${f.title}" loading="lazy">
    <span class="ftile__shade"></span>
    <span class="ftile__txt"><small>${f.tag}</small><b>${f.title}</b><span>${f.short}</span></span>
  </${tag.split(' ')[0]}>`;
}).join('')}
</div>`;

const mapBlock = () => {
  const t = T();
  const label = (n, he) => (LANG === 'he' ? he : EN.mapLabels[n]);
  return `
<section class="sec sec--paper" id="map">
  <div class="wrap">
    ${sectionHead(t.mapEyebrow, t.mapTitle, t.mapText, true)}
    <div class="kmap reveal">
      <div class="kmap__fig">
        <img src="${IMG}khan-map.webp" alt="${t.mapAlt}" loading="lazy">
        ${mapPoints.map(([n, x, y, he, k]) => `<button class="kmap__pt kmap__pt--${k}" style="left:${x}%;top:${y}%" data-pt="${n}" aria-label="${n} – ${label(n, he)}"><span>${label(n, he)}</span></button>`).join('')}
      </div>
      <div class="kmap__legend">
        <div><h3>${t.lodging}</h3><ol>
          ${t.legendLodging.map(([pt, b, x]) => `<li data-pt="${pt}"><b>${b}</b> ${x}</li>`).join('')}
        </ol></div>
        <div><h3>${t.public}</h3><ol>
          ${mapPoints.filter(p => p[4] === 'public').map(([n, , , he]) => `<li data-pt="${n}"><b>${n}</b> ${label(n, he)}</li>`).join('')}
        </ol></div>
      </div>
    </div>
  </div>
</section>`;
};

// ================= PAGES =================

// ---- HOME ----
page('index.html', {
  title: 'ראשי',
  desc: 'מחפשים לינה בערבה? ברוכים הבאים לחאן דרך הבשמים בצופר! אוהלים בדואים, חושות ממוזגות ובקתות מפנקות מול נוף מדברי עוצר נשימה.',
  body: `
<section class="hero">
  <div class="hero__media"><img src="${IMG}6-dji_fly_20251214_104250_0502_1765750140758_photo.webp" alt="מבט אווירי על חאן דרך הבשמים, דקלים והרי אדום ברקע" fetchpriority="high"></div>
  <div class="hero__in wrap">
    <p class="hero__loc">${icon('pin')} אי שם ליד באר צופר, ערבה תיכונה</p>
    <h1 class="hero__title"><span>מדבר.</span> <span>שקט.</span> <span>פשטות.</span></h1>
    <p class="hero__sub">להתנתק מהרעש ולהתחבר לקצב המדברי. חווית אירוח בערבה, בדיוק כמו שהיא צריכה להיות.</p>
    <div class="hero__cta">
      <a class="btn btn-primary" href="${site.booking}" target="_blank" rel="noopener">${icon('calendar')} בדיקת זמינות</a>
      <button class="btn btn-ghost" data-video="${site.video}">${icon('play')} צפו בסרטון</button>
    </div>
  </div>
  <svg class="dune" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 80V48c160-30 330-44 520-22s330 40 520 18 300-40 400-30v66z"/></svg>
</section>

<section class="sec intro" id="intro">
  <div class="wrap intro__grid">
    <div class="intro__txt reveal">
      <p class="eyebrow">ברוכים הבאים לחאן</p>
      <h2>הזמן עוצר מלכת</h2>
      <p class="lead">בין דיונות החול לזריחות של צופר, יצרנו עבורכם מרחב לנשימה.</p>
      <p>חאן דרך הבשמים הוא נקודת מפגש בין אירוח מדברי אותנטי לפינוק מודרני ומדויק. בין אם אתם זוג שמחפש שקט בבקתה פרטית, או קבוצת חברים סביב המדורה – המדבר כאן הוא התפאורה, ואתם במרכז.</p>
      <a class="btn btn-outline" href="story.html">הסיפור שלנו</a>
    </div>
    <div class="intro__art reveal">
      <div class="arch"><img src="${IMG}DSC_3055-1.webp" alt="מרפסת בקתת מדבר עם בריכת שכשוך" loading="lazy"></div>
      <div class="intro__stamp"><img src="${IMG}DSC08921.webp" alt="שש-בש ליד המדורה" loading="lazy"></div>
    </div>
  </div>
  <div class="wrap stats reveal">
    <div><b>2000</b><span>שנת ההקמה</span></div>
    <div><b>30</b><span>דונם של מדבר</span></div>
    <div><b>5</b><span>סגנונות לינה</span></div>
    <div><b>2 ק״מ</b><span>מהעיר הנבטית מואה</span></div>
  </div>
</section>

<section class="sec sec--sand">
  <div class="wrap">
    ${sectionHead('בחרו את החופשה שלכם', 'אפשרויות הלינה בחאן', 'אירוח מדברי, בקצבים שונים: בקתות מאובזרות ומבודדות למי שמחפש פינוק ופרטיות, חושות ואוהלים מרווחים לחוויה משותפת, ומתחם קמפינג ללינה באוהלים משלכם.')}
    ${roomsGrid()}
    <div class="center"><a class="btn btn-outline" href="rooms.html">לכל אפשרויות הלינה</a></div>
  </div>
</section>

<section class="sec sec--night">
  <div class="wrap">
    ${sectionHead('להתחבר לקצב של המדבר', 'מתחם חאן דרך הבשמים', 'חווית האירוח בחאן ממשיכה הרבה מעבר לפתח החדר: טבילה בבריכות מול הנוף האינסופי, מפגש עם בעלי החיים, וארוחות על מחצלות ומזרונים — ממש כמו שאכלו הנוודים בדרך הבשמים.')}
    ${facilityTiles()}
  </div>
</section>

<section class="story-band">
  <img src="${IMG}Timeline-1-1.webp" alt="" loading="lazy">
  <div class="wrap story-band__in reveal">
    <p class="eyebrow eyebrow--light">דע מאין באת</p>
    <blockquote>"כשהערב יורד והמדורות נדלקות, הלב של החאן פועם בקצב איטי ונעים, תחת שמיים זרועי כוכבים."</blockquote>
    <p>על נתיב הבשמים העתיק, שבו צעדו שיירות הגמלים הנבטיות לפני אלפי שנים — אנחנו ממשיכים את דרכם של המארחים הקדומים.</p>
    <a class="btn btn-ghost" href="story.html">לסיפור שלנו</a>
  </div>
</section>

${mapBlock()}

<section class="sec">
  <div class="wrap">
    ${sectionHead('רגעים מהחאן', 'גלריה', '', true)}
    <div class="mosaic reveal" data-gallery>
      ${['DSC00674', '15-DSC05363', 'DSCF4444-1-1', 'DSC09825', '48-DSC07783-1', 'DSC00002'].map(g => `<a href="${img(g)}" data-lb-item><img src="${img(g)}" alt="" loading="lazy"></a>`).join('')}
    </div>
    <div class="center"><a class="btn btn-outline" href="gallery.html">לגלריה המלאה</a></div>
  </div>
</section>
<div class="vmodal" data-vmodal hidden role="dialog" aria-modal="true" aria-label="סרטון"><button class="lb__x" data-vclose aria-label="סגירה">${icon('close')}</button><div class="vmodal__box"></div></div>`,
});

// ---- ROOMS ----
page('rooms.html', {
  title: 'אפשרויות לינה בערבה',
  desc: 'מגלמפינג ובקתות עם שכשוכית ועד אוהלים בדואים למשפחות וקבוצות. מצאו את אפשרות הלינה המדברית המושלמת עבורכם בחאן דרך הבשמים.',
  body: `
${pageHero('תן לשים ת׳ראש על דיונה', 'אפשרויות הלינה בחאן', 'DSC00790.webp')}
<section class="sec">
  <div class="wrap">
    ${sectionHead('הלינה בחאן', 'לכל אחד הדרך שלו לחוות את המדבר', 'יש מי שמחפש את הקרבה לאדמה ולקמפינג, ויש מי שמעדיף לסיים את היום בבקתה מפנקת מול הנוף. יצרנו כאן מגוון אפשרויות אירוח, שכולן משתלבות בנוף ומזמינות אתכם להוריד הילוך.')}
    <div class="rlist">
    ${rooms.map((r, i) => `
      <article class="rrow reveal">
        <a class="rrow__media arch" href="room-${r.slug}.html"><img src="${img(r.img)}" alt="${r.title}" loading="lazy"></a>
        <div class="rrow__body">
          <span class="rrow__n">0${i + 1}</span>
          <p class="eyebrow">${r.kicker}</p>
          <h3>${r.title}</h3>
          <p>${r.text[0]}</p>
          <ul class="facts">
            <li>${icon('users')} עד ${r.cap} אורחים</li>
            <li>${icon('calendar')} ${r.prices.week.min}</li>
            <li class="price"><small>החל מ-</small>${nis(r.prices.week.from)}<small> / לילה</small></li>
          </ul>
          <div class="btns">
            <a class="btn btn-primary" href="room-${r.slug}.html">לפרטים ומחירים</a>
          </div>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
${mapBlock()}`,
});

// ---- ROOM PAGES ----
for (const r of rooms) {
  const p = r.prices;
  const bookHref = r.book === 'online' ? site.booking : wa(`היי, אשמח לבדוק זמינות ב${r.title} בחאן דרך הבשמים`);
  const priceBox = (label, o) => o ? `
    <div class="pbox">
      <h4>${label}</h4>
      ${o.min ? `<p class="pbox__min">${o.min}</p>` : ''}
      <p class="pbox__from"><small>החל מ-</small>${nis(o.from)}<small> / לילה</small></p>
      ${o.for ? `<p>עבור ${o.for} אנשים</p>` : ''}
      ${o.adult ? `<p>תוספת למבוגר ${nis(o.adult)} / לילה</p>` : ''}
      ${o.child ? `<p>תוספת לילד (2–12) ${nis(o.child)} / לילה</p>` : ''}
    </div>` : '';
  page(`room-${r.slug}.html`, {
    title: r.title, active: 'rooms.html', ogImg: r.img,
    desc: r.teaser,
    body: `
${pageHero(r.kicker, r.title, r.img)}
<section class="sec">
  <div class="wrap room">
    <div class="room__main">
      <nav class="crumbs" aria-label="פירורי לחם"><a href="index.html">ראשי</a> / <a href="rooms.html">אפשרויות לינה</a> / <span>${r.title}</span></nav>
      <ul class="facts facts--big">
        <li>${icon('users')}<span><small>תפוסה מקסימלית</small>${r.cap} אנשים</span></li>
        <li>${icon('clock')}<span><small>צ׳ק אין</small>15:00</span></li>
        <li>${icon('clock')}<span><small>צ׳ק אאוט</small>11:00</span></li>
      </ul>
      <div class="prose reveal">${r.text.map(t => `<p>${t}</p>`).join('')}</div>
      <h2 class="h-sm">מתקנים ואבזור ב${r.title}</h2>
      <ul class="amen reveal">${r.amenities.map(a => `<li>${icon('check')}${a}</li>`).join('')}</ul>
      <h2 class="h-sm">גלריה</h2>
      <div class="rgal" data-gallery>
        ${r.gallery.map(g => `<a href="${img(g)}" data-lb-item><img src="${img(g)}" alt="${r.title}" loading="lazy"></a>`).join('')}
      </div>
    </div>
    <aside class="room__side">
      <div class="pcard">
        <p class="eyebrow">מחירון</p>
        ${priceBox('אמצע שבוע', p.week)}
        ${priceBox('סוף שבוע', p.weekend)}
        ${p.holiday ? `<div class="pbox"><h4>חגים</h4><p class="pbox__min">${p.holiday}</p></div>` : ''}
        <a class="btn btn-primary btn-block" href="${bookHref}" target="_blank" rel="noopener">${r.book === 'online' ? icon('calendar') : icon('wa')} בדיקת זמינות</a>
        <a class="btn btn-outline btn-block" href="tel:${site.phone.replace(/-/g, '')}">${icon('phone')} ${site.phone}</a>
        <p class="pcard__note">המחירים כוללים מע״מ. <a href="terms.html">תקנון ותנאי שימוש</a></p>
      </div>
    </aside>
  </div>
</section>
<section class="sec sec--night">
  <div class="wrap">
    ${sectionHead('להתחבר לקצב של המדבר', 'מה עוד מחכה לכם בחאן', 'חווית האירוח בחאן ממשיכה הרבה מעבר לפתח החדר שלכם.')}
    ${facilityTiles()}
  </div>
</section>
<section class="sec sec--sand">
  <div class="wrap">
    ${sectionHead('אולי יתאים לכם גם', 'אפשרויות לינה נוספות')}
    ${roomsGrid(r.slug)}
  </div>
</section>`,
  });
}

// ---- FACILITIES ----
page('facilities.html', {
  title: 'מתחם החאן',
  desc: 'מה מחכה לכם בחאן שלנו? בריכה מחוממת, פינות זולה, אזורי מדורה ומטבח מאובזר. כל מה שצריך לחופשה נוחה בלב המדבר.',
  body: `
${pageHero('להתחבר לקצב של המדבר', 'מתחם חאן דרך הבשמים', '2-dji_fly_20251214_113032_0517_1765750026587_photo.webp', 'פינות חמד מוצלות, בריכות, מטבח מאובזר ופינת חי — כל מה שצריך כדי להתנתק מהשגרה.')}
<section class="sec">
  <div class="wrap">
    <nav class="pills reveal" aria-label="מתקנים">${facilities.map(f => `<a href="#${f.id}">${f.title}</a>`).join('')}</nav>
    <div class="flist">
    ${facilities.map((f, i) => `
      <article class="frow reveal" id="${f.id}">
        <div class="frow__media arch"><img src="${img(f.img)}" alt="${f.title}" loading="lazy"></div>
        <div class="frow__body">
          <span class="tag">${f.tag}</span>
          <h2>${f.title}</h2>
          ${f.long.map(t => `<p>${t}</p>`).join('')}
          ${f.id === 'madfuna' ? `<a class="btn btn-primary" href="${wa('היי, אשמח להזמין סעודת מאד׳פונה')}" target="_blank" rel="noopener">${icon('wa')} להזמנת הסעודה</a>` : ''}
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
${mapBlock()}
<section class="sec sec--sand">
  <div class="wrap">
    ${sectionHead('בחרו את החופשה שלכם', 'אפשרויות הלינה בחאן')}
    ${roomsGrid()}
  </div>
</section>`,
});

// ---- STORY ----
const chapters = [
  ['ההתחלה', 'שורשים בערבה', 'IMG-20231218-WA0035.webp', 'הכול התחיל בשנת 2000, ממש כאן, מאחורי מושב צופר. דבי רבינס, בת המקום שגדלה על ברכי החקלאות והעשייה בערבה, חלמה לחבר אנשים לקסם של המדבר. בתחילה, המקום שימש כמרכז אינטימי לטיולי חמורים ופעילויות שטח, מתוך רצון להפגיש את המבקרים עם הטבע בצורה הכי בלתי-אמצעית שיש. עם השנים, מתוך הקשבה לביקוש של המטיילים שחיפשו מקום להניח בו את הראש אחרי יום של טיול, המקום גדל והתפתח. מה שהתחיל כיוזמה מקומית צמח להיות "חאן דרך הבשמים" – מתחם אירוח שמשתרע כיום על פני 30 דונם ומנוהל באווירה משפחתית על ידי צוות צעיר ומסור, הממשיך את חזון האירוח המקורי.'],
  ['המיקום', 'על נתיב הבשמים העתיק', '45-dji_fly_20251213_150732_0451_1765631888721_photo.webp', 'המיקום שלנו אינו מקרי. החאן שוכן כ-2 ק"מ מערבית לכביש הערבה, על תוואי "דרך הבשמים" ההיסטורית. זוהי הדרך העתיקה שבה צעדו שיירות הגמלים הנבטיות לפני אלפי שנים, כשהן נושאות מור ולבונה מחצי האי ערב אל נמלי הים התיכון. ממש בסמוך אלינו (כ-2 ק"מ דרומה) נמצאת העיר הנבטית העתיקה "מואה", ששימשה בעבר כחאן דרכים עבור אותן שיירות. הקרבה הזו, שהוכרה כאתר מורשת עולמית על ידי אונסק"ו (UNESCO), מעניקה לשהות בחאן משמעות נוספת. אנחנו רואים בעצמנו ממשיכי דרכם של המארחים הקדומים – תחנה של מנוחה, מים וצל בלב המדבר, מול הרי אדום המרשימים הנישאים ממזרח.'],
  ['החוויה', 'החאן היום', '60-DSC05998.webp', 'כיום, חאן דרך הבשמים הוא שילוב מדויק בין הפשטות המדברית לנוחות מודרנית. המקום מציע חוויית אירוח מגוונת – החל מלינה באוהלים וחושות שמחזירה את הקצב הטבעי לחיים, ועד ליחידות אירוח מפנקות. הלב של המקום נשאר נאמן למסורת: כבוד לשקט של המדבר, חיבור לטבע, ואהבה גדולה לאנשים. בין אם אתם מגיעים לסדנה, לחופשה משפחתית או סתם כדי להתנתק – אנחנו כאן כדי לתת לכם להרגיש בבית, באמצע שום-מקום.'],
];
page('story.html', {
  title: 'הסיפור שלנו',
  desc: 'הכירו את הסיפור שמאחורי חאן דרך הבשמים בצופר. חלום על אירוח מדברי, אהבה גדולה לערבה וחיבור אמיתי לטבע.',
  body: `
${pageHero('דע מאין באת', 'הסיפור שלנו', 'Timeline-1-1.webp')}
<section class="sec">
  <div class="wrap">
    ${sectionHead('אדם, מדבר ומה שביניהם', 'סיפור על אהבה למדבר', 'הסיפור של חאן דרך הבשמים הוא סיפור על אהבה למדבר, על חקלאות שהפכה לאירוח, ועל דרך עתיקה שעדיין פועמת מתחת לפני השטח.', true)}
    <ol class="timeline">
      ${chapters.map(([k, t, im, txt], i) => `
      <li class="tl reveal">
        <div class="tl__media arch"><img src="${IMG}${im}" alt="${t}" loading="lazy"></div>
        <div class="tl__body">
          <span class="tl__n">${['2000', 'דרך הבשמים', 'היום'][i]}</span>
          <p class="eyebrow">${k}</p>
          <h3>${t}</h3>
          <p>${txt}</p>
        </div>
      </li>`).join('')}
    </ol>
  </div>
</section>
<section class="story-band">
  <img src="${IMG}6-dji_fly_20251214_104250_0502_1765750140758_photo.webp" alt="" loading="lazy">
  <div class="wrap story-band__in reveal">
    <blockquote>"אנחנו כאן כדי לתת לכם להרגיש בבית, באמצע שום-מקום."</blockquote>
    <a class="btn btn-primary" href="rooms.html">לאפשרויות הלינה</a>
  </div>
</section>`,
});

// ---- ACTIVITIES ----
page('activities.html', {
  title: 'אטרקציות בערבה',
  desc: 'מתכננים חופשה בערבה? ריכזנו עבורכם את מיטב האטרקציות, מסלולי הטיול, המסעדות והפעילויות המומלצות באזור החאן ומושב צופר.',
  body: `
${pageHero('המלצות של החאן', 'מה עושים בערבה', '45-dji_fly_20251213_150732_0451_1765631888721_photo.webp', 'אטרקציות, מסלולי טיול, מסעדות ופעילויות באזור החאן ומושב צופר.')}
<section class="sec">
  <div class="wrap">
    <div class="filters reveal" role="group" aria-label="סינון לפי תחום עניין">
      <button class="is-on" data-filter="all" aria-pressed="true">הכל</button>
      ${Object.entries(activityCats).map(([k, v]) => `<button data-filter="${k}" aria-pressed="false">${v}</button>`).join('')}
    </div>
    <div class="agrid">
    ${activities.map(a => `
      <article class="acard reveal" data-cat="${a.cat}">
        <div class="acard__media"><img src="${img(a.img)}" alt="${a.title}" loading="lazy"><span class="chip">${activityCats[a.cat]}</span></div>
        <div class="acard__body">
          ${a.near ? `<p class="acard__near">${icon('leaf')} ${a.near}!</p>` : ''}
          <h3>${a.title}</h3>
          <div class="acard__txt">${a.text.map(t => `<p>${t}</p>`).join('')}</div>
          ${a.text.join('').length > 260 ? '<button class="more" data-more>קראו עוד</button>' : ''}
          ${a.info ? `<p class="acard__info">${icon('phone')} ${a.info}</p>` : ''}
          ${a.link ? `<a class="btn btn-outline btn-sm" href="${a.link}" target="_blank" rel="noopener">למידע נוסף</a>` : ''}
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`,
});

// ---- GALLERY ----
page('gallery.html', {
  title: 'גלריה',
  desc: 'תמונות מחאן דרך הבשמים: בקתות, חושות, אוהלים, בריכות, מדורות ושקיעות בלב הערבה.',
  body: `
${pageHero('רגעים מהחאן', 'גלריה', 'DSCF7725.webp')}
<section class="sec">
  <div class="wrap">
    <div class="masonry" data-gallery>
      ${gallery.map(g => `<a href="${img(g)}" data-lb-item class="reveal"><img src="${img(g)}" alt="חאן דרך הבשמים" loading="lazy"></a>`).join('')}
    </div>
  </div>
</section>`,
});

// ---- CONTACT ----
page('contact.html', {
  title: 'צור קשר',
  desc: 'יש לכם שאלה? רוצים לתאם לינה לקבוצה? צוות חאן דרך הבשמים זמין עבורכם. השאירו פרטים, שלחו וואטסאפ או חייגו ונשמח לעזור.',
  body: `
${pageHero('הזמנות ובירורים', 'צרו איתנו קשר', 'DSC08886.webp', 'עבורנו, האירוח מתחיל עוד לפני שהגעתם למדבר.')}
<section class="sec">
  <div class="wrap contact">
    <div class="contact__info reveal">
      <h2>חאן דרך הבשמים</h2>
      <p>בין אם זו שאלה קטנה על הדרך, התלבטות לגבי החדר המתאים או בקשה מיוחדת שתשדרג לכם את החופשה – אנחנו כאן כדי להקשיב, לייעץ ולדאוג לכל פרט.</p>
      <p>מתחם אירוח מדברי בלב הערבה, מאחורי מושב צופר, על תוואי הדרך הנבטית העתיקה. המקום משלב בין הפשטות והשקט של המדבר לבין אירוח חם ומפנק — בריכות, פינות זולה מוצלות, פינת חי וארוחות עשירות, והכל מול הנוף הפתוח של הערבה. נשמח לארח גם אתכם!</p>
      <ul class="clist">
        <li><a href="tel:${site.phone.replace(/-/g, '')}">${icon('phone')}<span><small>טלפון</small>${site.phone}</span></a></li>
        <li><a href="${site.whatsapp}" target="_blank" rel="noopener">${icon('wa')}<span><small>וואטסאפ</small>שלחו הודעה</span></a></li>
        <li><a href="mailto:${site.email}">${icon('mail')}<span><small>מייל</small>${site.email}</span></a></li>
        <li><a href="${site.waze}" target="_blank" rel="noopener">${icon('pin')}<span><small>כתובת</small>${site.address}</span></a></li>
      </ul>
    </div>
    <form class="cform reveal" data-waform novalidate>
      <h2>השאירו פרטים</h2>
      <p class="cform__note">הטופס פותח הודעת וואטסאפ מוכנה אלינו — כך נחזור אליכם הכי מהר.</p>
      <div class="row2">
        <label>שם מלא<input name="name" required autocomplete="name"></label>
        <label>טלפון<input name="phone" type="tel" required autocomplete="tel" inputmode="tel"></label>
      </div>
      <div class="row2">
        <label>תאריך הגעה<input name="from" type="date"></label>
        <label>מספר לילות<input name="nights" type="number" min="1" value="1"></label>
      </div>
      <div class="row2">
        <label>סוג לינה<select name="room"><option value="">עוד לא יודעים</option>${rooms.map(r => `<option>${r.title}</option>`).join('')}</select></label>
        <label>מספר אורחים<input name="guests" type="number" min="1" value="2"></label>
      </div>
      <label>הודעה<textarea name="msg" rows="4"></textarea></label>
      <button class="btn btn-primary btn-block" type="submit">${icon('wa')} שליחה</button>
    </form>
  </div>
</section>
<section class="mapframe">
  <iframe title="מפת הגעה לחאן דרך הבשמים" src="https://maps.google.com/maps?q=${encodeURIComponent('חאן דרך הבשמים, צופר')}&z=12&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</section>`,
});

// ---- LEGAL ----
for (const [file, key] of [['terms.html', 'terms'], ['privacy.html', 'privacy'], ['accessibility.html', 'accessibility']]) {
  const L = legal[key];
  page(file, {
    title: L.title, desc: `${L.title} – ${site.name}`,
    body: `
<section class="legal-hero"><div class="wrap"><p class="eyebrow">${site.name}</p><h1>${L.title}</h1><p>${L.updated}</p></div></section>
<section class="sec"><div class="wrap"><article class="prose prose--legal">${L.html}</article></div></section>`,
  });
}

// ---- THANK YOU ----
page('thank-you.html', {
  title: 'תודה על ההזמנה', desc: 'תודה על ההזמנה בחאן דרך הבשמים',
  body: `
<section class="thanks">
  <img src="${IMG}DSC09825.webp" alt="" class="thanks__bg">
  <div class="wrap thanks__in">
    <img src="${IMG}logo-spiceroute.webp" alt="" width="150">
    <h1>תודה לכם על ההזמנה!</h1>
    <p>אנחנו כאן לכל שאלה ומחכים לכם בחאן.</p>
    <div class="btns">
      <a class="btn btn-primary" href="${site.whatsapp}" target="_blank" rel="noopener">${icon('wa')} וואטסאפ</a>
      <a class="btn btn-ghost" href="tel:${site.phone.replace(/-/g, '')}">${icon('phone')} ${site.phone}</a>
      <a class="btn btn-ghost" href="activities.html">מה עושים בערבה</a>
    </div>
  </div>
</section>`,
});


// =================================================================
// ENGLISH  →  en/   (text from spiceroute.co.il/home-en, accommodation-en, about-en, contact-en)
// =================================================================
LANG = 'en'; IMG = '../images/'; ROOT = '../';
const legalEn = require('./legal-en');
const roomsEn = roomsFor();
const minEn = s => s.replace('מינימום לילה אחד', 'Minimum 1 night').replace('מינימום 2 לילות', 'Minimum 2 nights');
const waEn = text => `https://wa.me/${site.phoneIntl}?text=${encodeURIComponent(text)}`;

// ---- HOME ----
page('index.html', {
  title: 'Home',
  desc: 'Looking for a desert getaway? Welcome to Spice Route Inn! Bedouin tents, glamping, and private cabins facing breathtaking views.',
  body: `
<section class="hero">
  <div class="hero__media"><img src="${IMG}6-dji_fly_20251214_104250_0502_1765750140758_photo.webp" alt="Aerial view of the Spice Route Inn, palm trees and the Edom mountains" fetchpriority="high"></div>
  <div class="hero__in wrap">
    <p class="hero__loc">${icon('pin')} Hidden near Tsofar, in the heart of the Arava</p>
    <h1 class="hero__title hero__title--long"><span>Experience</span> <span>the magic of</span> <span>the Israeli desert.</span></h1>
    <p class="hero__sub">Escape the rush and embrace the silence. A true desert experience in the Arava, just as nature intended.</p>
    <div class="hero__cta">
      <a class="btn btn-primary" href="${bookingUrl()}" target="_blank" rel="noopener">${icon('calendar')} Check availability</a>
      <button class="btn btn-ghost" data-video="${site.video}">${icon('play')} Watch the video</button>
    </div>
  </div>
  <svg class="dune" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 80V48c160-30 330-44 520-22s330 40 520 18 300-40 400-30v66z"/></svg>
</section>

<section class="sec intro" id="intro">
  <div class="wrap intro__grid">
    <div class="intro__txt reveal">
      <p class="eyebrow">Welcome to the Inn</p>
      <h2>Where Time Stands Still</h2>
      <p class="lead">Between the sand dunes and the breathtaking sunrises, we have created a space to simply breathe.</p>
      <p>Spice Route Inn (Khan Derech HaBesamim) offers a unique blend of authentic desert hospitality and refined modern comfort. Whether you are a couple seeking silence in a private cabin, or a group of friends gathering around the bonfire, the desert sets the stage, and you are at the heart of the experience.</p>
      <a class="btn btn-outline" href="story.html">Our story</a>
    </div>
    <div class="intro__art reveal">
      <div class="arch"><img src="${IMG}DSC_3055-1.webp" alt="Desert cabin terrace with a plunge pool" loading="lazy"></div>
      <div class="intro__stamp"><img src="${IMG}DSC08921.webp" alt="Backgammon by the bonfire" loading="lazy"></div>
    </div>
  </div>
  <div class="wrap stats reveal">
    <div><b>2000</b><span>Founded</span></div>
    <div><b>7</b><span>Acres of desert</span></div>
    <div><b>5</b><span>Ways to stay</span></div>
    <div><b>2 km</b><span>From the Nabatean city of Moa</span></div>
  </div>
</section>

<section class="sec sec--sand">
  <div class="wrap">
    ${sectionHead('Plan Your Stay', 'Accommodation at Spice Route Inn', 'Find the perfect rhythm for your desert adventure. Whether you crave the solitude and comfort of our private cabins, the authentic communal vibe of our Bedouin tents and huts, or the simplicity of pitching your own tent under the open sky. Different styles, one shared experience: the silence of the desert and our signature warm hospitality.')}
    ${roomsGrid()}
    <div class="center"><a class="btn btn-outline" href="rooms.html">View Accommodation</a></div>
  </div>
</section>

<section class="sec sec--night">
  <div class="wrap">
    ${sectionHead('Desert Oasis', 'The Spice Route Inn', 'We have created a world designed to reconnect you with nature and tranquility. Take a refreshing dip in our pools overlooking the endless desert landscape, meet the animals in our friendly farm corner, or enjoy traditional meals served on colorful mats and cushions—echoing the feasts of ancient nomads along the Spice Route.')}
    ${facilityTiles()}
  </div>
</section>

<section class="story-band">
  <img src="${IMG}Timeline-1-1.webp" alt="" loading="lazy">
  <div class="wrap story-band__in reveal">
    <p class="eyebrow eyebrow--light">Our story</p>
    <blockquote>“As night falls and the bonfires are lit, the heart of the Inn beats to a slower, ancient rhythm under a canopy of stars.”</blockquote>
    <p>On the ancient Incense Route, where Nabatean camel caravans marched thousands of years ago — we see ourselves as the modern successors of those ancient hosts.</p>
    <a class="btn btn-ghost" href="story.html">Read our story</a>
  </div>
</section>

${mapBlock()}

<section class="sec">
  <div class="wrap">
    ${sectionHead('Moments at the Inn', 'Gallery', '', true)}
    <div class="mosaic reveal" data-gallery>
      ${['DSC00674', '15-DSC05363', 'DSCF4444-1-1', 'DSC09825', '48-DSC07783-1', 'DSC00002'].map(g => `<a href="${img(g)}" data-lb-item><img src="${img(g)}" alt="" loading="lazy"></a>`).join('')}
    </div>
    <div class="center"><a class="btn btn-outline" href="gallery.html">View the full gallery</a></div>
  </div>
</section>
<div class="vmodal" data-vmodal hidden role="dialog" aria-modal="true" aria-label="Video"><button class="lb__x" data-vclose aria-label="Close">${icon('close')}</button><div class="vmodal__box"></div></div>`,
});

// ---- ACCOMMODATION ----
page('rooms.html', {
  title: 'Accommodation | Cabins, Tents & Glamping',
  desc: 'From private plunge pool cabins to traditional Bedouin tents for groups. Find your perfect desert accommodation at Spice Route Inn.',
  body: `
${pageHero('Drift Away on the Desert Sands', 'Accommodation at Spice Route Inn', 'DSC00790.webp')}
<section class="sec">
  <div class="wrap">
    ${sectionHead('Stay With Us', 'There is no single way to experience the desert', 'Some seek a raw connection to the earth and the magic of camping, while others prefer to end the day in a pampering cabin facing the endless view. We have created a range of accommodation options that blend naturally into the landscape, inviting you to simply slow down, breathe, and find your own pace.')}
    <div class="rlist">
    ${roomsEn.map((r, i) => `
      <article class="rrow reveal">
        <a class="rrow__media arch" href="room-${r.slug}.html"><img src="${img(r.img)}" alt="${r.title}" loading="lazy"></a>
        <div class="rrow__body">
          <span class="rrow__n">0${i + 1}</span>
          <p class="eyebrow">${r.kicker}</p>
          <h3>${r.title}</h3>
          <p>${r.text[0]}</p>
          <ul class="facts">
            <li>${icon('users')} Up to ${r.cap} guests</li>
            <li>${icon('calendar')} ${minEn(r.prices.week.min)}</li>
            <li class="price"><small>From </small>${nis(r.prices.week.from)}<small> / night</small></li>
          </ul>
          <div class="btns"><a class="btn btn-primary" href="room-${r.slug}.html">Details & prices</a></div>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
${mapBlock()}`,
});

// ---- ROOM PAGES ----
for (const r of roomsEn) {
  const p = r.prices;
  const bookHref = r.book === 'online' ? bookingUrl() : waEn(`Hi, I’d like to check availability for the ${r.title} at Spice Route Inn`);
  const priceBox = (label, o) => o ? `
    <div class="pbox">
      <h4>${label}</h4>
      ${o.min ? `<p class="pbox__min">${minEn(o.min)}</p>` : ''}
      <p class="pbox__from"><small>From </small>${nis(o.from)}<small> / night</small></p>
      ${o.for ? `<p>For ${o.for} guests</p>` : ''}
      ${o.adult ? `<p>Extra adult ${nis(o.adult)} / night</p>` : ''}
      ${o.child ? `<p>Extra child (2–12) ${nis(o.child)} / night</p>` : ''}
    </div>` : '';
  page(`room-${r.slug}.html`, {
    title: r.title, active: 'rooms.html', ogImg: r.img, desc: r.teaser,
    body: `
${pageHero(r.kicker, r.title, r.img)}
<section class="sec">
  <div class="wrap room">
    <div class="room__main">
      <nav class="crumbs" aria-label="Breadcrumbs"><a href="index.html">Home</a> / <a href="rooms.html">Accommodation</a> / <span>${r.title}</span></nav>
      <ul class="facts facts--big">
        <li>${icon('users')}<span><small>Max occupancy</small>${r.cap} guests</span></li>
        <li>${icon('clock')}<span><small>Check-in</small>15:00</span></li>
        <li>${icon('clock')}<span><small>Check-out</small>11:00</span></li>
      </ul>
      <div class="prose reveal">${r.text.map(t => `<p>${t}</p>`).join('')}</div>
      <h2 class="h-sm">Amenities</h2>
      <ul class="amen reveal">${r.amenities.map(a => `<li>${icon('check')}${a}</li>`).join('')}</ul>
      <h2 class="h-sm">Gallery</h2>
      <div class="rgal" data-gallery>
        ${r.gallery.map(g => `<a href="${img(g)}" data-lb-item><img src="${img(g)}" alt="${r.title}" loading="lazy"></a>`).join('')}
      </div>
    </div>
    <aside class="room__side">
      <div class="pcard">
        <p class="eyebrow">Rates</p>
        ${priceBox('Midweek', p.week)}
        ${priceBox('Weekend', p.weekend)}
        ${p.holiday ? `<div class="pbox"><h4>Holidays</h4><p class="pbox__min">${minEn(p.holiday)}</p></div>` : ''}
        <a class="btn btn-primary btn-block" href="${bookHref}" target="_blank" rel="noopener">${r.book === 'online' ? icon('calendar') : icon('wa')} Check availability</a>
        <a class="btn btn-outline btn-block" href="tel:+${site.phoneIntl}" dir="ltr">${icon('phone')} +972-52-3666476</a>
        <p class="pcard__note">Prices include VAT. <a href="terms.html">Terms & Conditions</a></p>
      </div>
    </aside>
  </div>
</section>
<section class="sec sec--night">
  <div class="wrap">
    ${sectionHead('Desert Oasis', 'More to enjoy at the Inn', 'The hospitality continues far beyond the door of your room.')}
    ${facilityTiles()}
  </div>
</section>
<section class="sec sec--sand">
  <div class="wrap">
    ${sectionHead('You might also like', 'More ways to stay')}
    ${roomsGrid(r.slug)}
  </div>
</section>`,
  });
}

// ---- OUR STORY ----
const chaptersEn = [
  ['The Beginning', 'Roots in the Arava', 'IMG-20231218-WA0035.webp', '2000', 'It all began in the year 2000, right here behind Moshav Tsofar. Debbie Rabins, a daughter of the Arava raised on local agriculture, dreamed of connecting people to the magic of the desert. At first, the site served as an intimate hub for donkey tours and outdoor activities, born from a desire to create a direct, unmediated encounter with nature. Over the years, listening to travelers seeking a place to rest their heads after a long day, the place evolved. What started as a local initiative blossomed into the Spice Route Inn, a sprawling complex now covering 7 acres (30 dunams), managed with a warm family atmosphere by a dedicated young team who continue the original vision of hospitality.'],
  ['The Location', 'On the Ancient Spice Route', '45-dji_fly_20251213_150732_0451_1765631888721_photo.webp', 'Incense Route', 'Our location is no coincidence. The Inn sits just 2km west of the main Arava road, directly on the historic path of the Incense Route. This is the very trail where Nabatean camel caravans marched thousands of years ago, carrying myrrh and frankincense from the Arabian Peninsula to the Mediterranean ports. Just a stone’s throw away (about 2km south) lies the ancient Nabatean city of Moa, which once served as a roadside inn for those same caravans. This proximity to a UNESCO World Heritage Site adds a layer of depth to your stay. We see ourselves as the modern successors of those ancient hosts—offering a station of rest, water, and shade in the heart of the desert, facing the majestic Edom Mountains to the east.'],
  ['The Experience', 'The Spice Route Inn Today', '60-DSC05998.webp', 'Today', 'Today, the Spice Route Inn is a precise blend of desert simplicity and modern comfort. We offer a diverse hospitality experience—from sleeping in tents and huts that restore your natural rhythm, to pampering private units. Yet, the heart of the place remains true to tradition: a deep respect for the desert silence, a connection to nature, and a genuine love for people. Whether you are here for a workshop, a family vacation, or simply to disconnect—we are here to make you feel at home, in the middle of nowhere.'],
];
page('story.html', {
  title: 'Our Story | The Vision Behind Spice Route Inn',
  desc: 'Discover the story behind Spice Route Inn in Tzofar. A dream of desert hospitality, love for the Arava, and a true connection to nature.',
  body: `
${pageHero('“The desert shall rejoice, and blossom as the rose.” (Isaiah 35:1)', 'Our Story', 'Timeline-1-1.webp')}
<section class="sec">
  <div class="wrap">
    ${sectionHead('The people & the desert', 'A story of love for the desert', 'The story of the Spice Route Inn is a story of love for the desert, of agriculture transforming into hospitality, and of an ancient path that still pulses beneath the surface.', true)}
    <ol class="timeline">
      ${chaptersEn.map(([k, t, im, n, txt]) => `
      <li class="tl reveal">
        <div class="tl__media arch"><img src="${IMG}${im}" alt="${t}" loading="lazy"></div>
        <div class="tl__body">
          <span class="tl__n">${n}</span>
          <p class="eyebrow">${k}</p>
          <h3>${t}</h3>
          <p>${txt}</p>
        </div>
      </li>`).join('')}
    </ol>
  </div>
</section>
<section class="story-band">
  <img src="${IMG}6-dji_fly_20251214_104250_0502_1765750140758_photo.webp" alt="" loading="lazy">
  <div class="wrap story-band__in reveal">
    <blockquote>“We are here to make you feel at home, in the middle of nowhere.”</blockquote>
    <a class="btn btn-primary" href="rooms.html">View Accommodation</a>
  </div>
</section>`,
});

// ---- GALLERY ----
page('gallery.html', {
  title: 'Gallery',
  desc: 'Photos of Spice Route Inn: cabins, huts, Bedouin tents, pools, bonfires and sunsets in the heart of the Arava.',
  body: `
${pageHero('Moments at the Inn', 'Gallery', 'DSCF7725.webp')}
<section class="sec">
  <div class="wrap">
    <div class="masonry" data-gallery>
      ${gallery.map(g => `<a href="${img(g)}" data-lb-item class="reveal"><img src="${img(g)}" alt="Spice Route Inn" loading="lazy"></a>`).join('')}
    </div>
  </div>
</section>`,
});

// ---- CONTACT ----
page('contact.html', {
  title: 'Contact Us | Reservations & Inquiries',
  desc: 'Have a question? Planning a group stay? The Spice Route Inn team is here for you. Leave a message, WhatsApp, or call us today.',
  body: `
${pageHero('Reservations & inquiries', 'Contact Us', 'DSC08886.webp', 'For us, hospitality begins long before you arrive in the desert.')}
<section class="sec">
  <div class="wrap contact">
    <div class="contact__info reveal">
      <h2>Spice Route Inn</h2>
      <p>Whether you need directions, help choosing the perfect accommodation, or have a special request to make your stay unforgettable—we are here to listen, advise, and handle every detail.</p>
      <p>A desert hospitality oasis located in the heart of the Arava, situated just behind Moshav Tsofar along the ancient Nabatean Incense Route. The Inn blends the silence and simplicity of the desert with warm, indulgent hospitality, offering a wide range of accommodation styles. Our guests enjoy a spacious, lush complex featuring swimming pools, shaded lounging areas, a petting farm, and hearty meals, all facing the open, endless desert landscape. We look forward to welcoming you!</p>
      <ul class="clist">
        <li><a href="tel:+${site.phoneIntl}">${icon('phone')}<span><small>Phone</small><bdi dir="ltr">+972-52-3666476</bdi></span></a></li>
        <li><a href="${waEn('Hi, I’m contacting you from the Spice Route Inn website and would like more information')}" target="_blank" rel="noopener">${icon('wa')}<span><small>WhatsApp</small>Send us a message</span></a></li>
        <li><a href="mailto:${site.email}">${icon('mail')}<span><small>Email</small>${site.email}</span></a></li>
        <li><a href="${site.waze}" target="_blank" rel="noopener">${icon('pin')}<span><small>Address</small>Moshav Tsofar, 8683000, Central Arava, Israel</span></a></li>
      </ul>
    </div>
    <form class="cform reveal" data-waform novalidate>
      <h2>Send us a message</h2>
      <p class="cform__note">The form opens a ready-made WhatsApp message to us — the fastest way to get an answer.</p>
      <div class="row2">
        <label>Full name<input name="name" required autocomplete="name"></label>
        <label>Phone<input name="phone" type="tel" required autocomplete="tel" inputmode="tel"></label>
      </div>
      <div class="row2">
        <label>Arrival date<input name="from" type="date"></label>
        <label>Nights<input name="nights" type="number" min="1" value="1"></label>
      </div>
      <div class="row2">
        <label>Accommodation<select name="room"><option value="">Not sure yet</option>${roomsEn.map(r => `<option>${r.title}</option>`).join('')}</select></label>
        <label>Guests<input name="guests" type="number" min="1" value="2"></label>
      </div>
      <label>Message<textarea name="msg" rows="4"></textarea></label>
      <button class="btn btn-primary btn-block" type="submit">${icon('wa')} Send Message</button>
    </form>
  </div>
</section>
<section class="mapframe">
  <iframe title="Map to Spice Route Inn" src="https://maps.google.com/maps?q=${encodeURIComponent('חאן דרך הבשמים, צופר')}&z=12&hl=en&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</section>`,
});

// ---- LEGAL ----
for (const [file, key] of [['terms.html', 'terms'], ['privacy.html', 'privacy'], ['accessibility.html', 'accessibility']]) {
  const L = legalEn[key];
  page(file, {
    title: L.title, desc: `${L.title} – Spice Route Inn`,
    body: `
<section class="legal-hero"><div class="wrap"><p class="eyebrow">Spice Route Inn</p><h1>${L.title}</h1><p>${L.updated}</p></div></section>
<section class="sec"><div class="wrap"><article class="prose prose--legal">${L.html}</article></div></section>`,
  });
}

// ---- THANK YOU ----
page('thank-you.html', {
  title: 'Thank you for your booking', desc: 'Thank you for booking at Spice Route Inn',
  body: `
<section class="thanks">
  <img src="${IMG}DSC09825.webp" alt="" class="thanks__bg">
  <div class="wrap thanks__in">
    <img src="${IMG}logo-spiceroute.webp" alt="" width="150">
    <h1>Thank you for your booking!</h1>
    <p>We’re here for any question and look forward to welcoming you at the Inn.</p>
    <div class="btns">
      <a class="btn btn-primary" href="${waEn('Hi, I just booked at Spice Route Inn and have a question')}" target="_blank" rel="noopener">${icon('wa')} WhatsApp</a>
      <a class="btn btn-ghost" href="tel:+${site.phoneIntl}" dir="ltr">${icon('phone')} +972-52-3666476</a>
    </div>
  </div>
</section>`,
});


// ---- THE INN (facilities) ----
page('facilities.html', {
  title: 'The Inn | Facilities, Heated Pool & Atmosphere',
  desc: 'What awaits you at the Inn? A heated pool, shaded zulas, campfire areas and a fully equipped kitchen — everything you need for a comfortable stay in the heart of the desert.',
  body: `
${pageHero('Desert Oasis', 'The Spice Route Inn', '2-dji_fly_20251214_113032_0517_1765750026587_photo.webp', 'Shaded corners, pools, an equipped kitchen and a petting farm — everything you need to disconnect.')}
<section class="sec">
  <div class="wrap">
    <nav class="pills reveal" aria-label="Facilities">${facilitiesFor().map(f => `<a href="#${f.id}">${f.title}</a>`).join('')}</nav>
    <div class="flist">
    ${facilitiesFor().map(f => `
      <article class="frow reveal" id="${f.id}">
        <div class="frow__media arch"><img src="${img(f.img)}" alt="${f.title}" loading="lazy"></div>
        <div class="frow__body">
          <span class="tag">${f.tag}</span>
          <h2>${f.title}</h2>
          ${f.long.map(t => `<p>${t}</p>`).join('')}
          ${f.id === 'madfuna' ? `<a class="btn btn-primary" href="${waEn('Hi, I’d like to pre-order the Madfouna feast')}" target="_blank" rel="noopener">${icon('wa')} Pre-order the feast</a>` : ''}
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
${mapBlock()}
<section class="sec sec--sand">
  <div class="wrap">
    ${sectionHead('Plan Your Stay', 'Accommodation at Spice Route Inn')}
    ${roomsGrid()}
  </div>
</section>`,
});

// ---- ARAVA ATTRACTIONS ----
const activitiesEn = activities.map((a, i) => ({ ...a, ...EN.activities[i] }));
page('activities.html', {
  title: 'Arava Attractions',
  desc: 'Planning a getaway in the Arava? The best attractions, trails, restaurants and activities around the Inn and Moshav Tsofar.',
  body: `
${pageHero('Recommended by the Inn', 'What to Do in the Arava', '45-dji_fly_20251213_150732_0451_1765631888721_photo.webp', 'Attractions, trails, restaurants and activities around the Inn and Moshav Tsofar.')}
<section class="sec">
  <div class="wrap">
    <div class="filters reveal" role="group" aria-label="Filter by interest">
      <button class="is-on" data-filter="all" aria-pressed="true">All</button>
      ${Object.entries(EN.activityCats).map(([k, v]) => `<button data-filter="${k}" aria-pressed="false">${v}</button>`).join('')}
    </div>
    <div class="agrid">
    ${activitiesEn.map(a => `
      <article class="acard reveal" data-cat="${a.cat}">
        <div class="acard__media"><img src="${img(a.img)}" alt="${a.title}" loading="lazy"><span class="chip">${EN.activityCats[a.cat]}</span></div>
        <div class="acard__body">
          ${a.near ? `<p class="acard__near">${icon('leaf')} ${a.near}!</p>` : ''}
          <h3>${a.title}</h3>
          <div class="acard__txt">${a.text.map(t => `<p>${t}</p>`).join('')}</div>
          ${a.text.join('').length > 300 ? '<button class="more" data-more>Read more</button>' : ''}
          ${a.info ? `<p class="acard__info">${icon('phone')} ${a.info}</p>` : ''}
          ${a.link ? `<a class="btn btn-outline btn-sm" href="${a.link}" target="_blank" rel="noopener">More info</a>` : ''}
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`,
});

console.log('done.');
