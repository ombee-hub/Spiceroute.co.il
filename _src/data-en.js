// English content — taken from spiceroute.co.il/home-en, accommodation-en, about-en, contact-en (Nov 2026)
// Items marked "translated" did not exist on the English site and were translated from the Hebrew site.

const nav = [
  ['rooms.html', 'Accommodation'],
  ['facilities.html', 'The Inn'],
  ['story.html', 'Our Story'],
  ['activities.html', 'Arava Attractions'],
  ['gallery.html', 'Gallery'],
  ['contact.html', 'Contact Us'],
];

const AMEN_SHARED = ['BBQ corner', 'Shared, fully equipped kitchen', 'Shared showers', 'Shared restrooms', 'Air conditioning', 'Seating areas & zulas', 'Mattresses', 'Electricity', 'Lighting', 'Mats', 'Large fridge', 'Drinking & cooking water'];

// keyed by the Hebrew slug; prices/images/galleries come from data.js
const rooms = {
  'group-tents': {
    title: 'Large Bedouin Tents', kicker: 'Authentic Bedouin Style',
    teaser: 'Three spacious tents for groups and extended families of 15–35 guests. A private tent for each group, mattresses and mats, true to the local style.',
    text: ['Experience the desert the traditional way. Our three spacious tents are designed specifically for groups and extended families (15–35 guests) seeking a shared, bonding experience. Each group enjoys a private tent, fully equipped with electricity, soft lighting, and heating for winter nights. Sleeping arrangements are on comfortable mattresses and mats, true to the local style.', 'Good to know: Please bring your own sleeping bags, pillows, and linens, or rent a fresh bedding set from us in advance. (Please note: Minimum occupancy applies on weekends and holidays).'],
    amenities: AMEN_SHARED,
  },
  'small-huts': {
    title: 'Small Desert Huts', kicker: 'The Desert Charm',
    teaser: 'A private, air-conditioned hut with its own zula, campfire and BBQ just outside the door. The desert — with four walls around you.',
    text: ['Looking for an authentic desert experience with the comfort of four walls? Our huts offer the perfect balance of simplicity and convenience. Each hut is fully private, air-conditioned, and heated in winter. Just outside your door, you’ll enjoy a private "Zula" (shaded lounging area) and a personal campfire spot.', 'Sleeping Arrangement: Mattress-style sleeping on mats. Please Note: Guests are requested to bring their own bedding (sheets, pillows, and blankets/sleeping bags).'],
    amenities: AMEN_SHARED,
  },
  'huts': {
    title: 'Large Desert Huts', kicker: 'The Desert Charm',
    teaser: 'Spacious private huts for small groups and families of 8–10 guests — air-conditioned in summer, heated in winter, with a zula and campfire outside.',
    text: ['Looking for an authentic desert experience with the comfort of four walls? Our huts offer the perfect balance of simplicity and convenience. Designed for small groups and families (8–10 guests), each hut is fully private, air-conditioned, and heated in winter. Just outside your door, you’ll enjoy a private "Zula" (shaded lounging area) and a personal campfire spot.', 'Sleeping Arrangement: Mattress-style sleeping on mats. Please Note: Guests are requested to bring their own bedding (sheets, pillows, and blankets/sleeping bags).'],
    amenities: AMEN_SHARED,
  },
  'desert-cabins': {
    title: 'Private Desert Cabins', kicker: 'Exclusive Desert Experience',
    teaser: 'Five cabins on the hill overlooking the Khan, each with a private balcony facing the view and its own heated plunge pool.',
    text: ['Perched on a hill overlooking the Khan, our five cabins offer the perfect blend of authentic design and boutique hotel comfort. Ideal for couples and families seeking intimacy and silence, these suites allow you to enjoy a luxurious stay while remaining deeply connected to the open landscape.', 'The Highlight: Each cabin features a private balcony facing the view and its own private heated plunge pool – perfect for a relaxing soak under the stars, winter or summer.'],
    amenities: ['Double bed', 'TV with yes', 'Air conditioning', 'Private shower & restroom', 'Equipped kitchenette', 'Gas stove', 'Seating areas & zulas', 'Wi-Fi', 'Mini-bar fridge', 'BBQ', 'Coffee machine', 'Plunge pool, heated in the cold months', 'Lounge corner with 4 luxury mattresses'],
  },
  'glamping-hut': {
    title: 'The Glamping Hut', kicker: 'Glamping in the Arava',
    teaser: 'An earthy desert exterior wrapping a stylish, hotel-standard interior — air-conditioned, with a private ensuite bathroom.',
    text: ['From the outside, it blends seamlessly with the rugged desert landscape. But open the door, and you will discover a hidden gem. Our Glamping Hut offers the best of both worlds: an authentic, earthy exterior wrapping a stylish, hotel-standard interior.', 'The unit is fully air-conditioned and features a private ensuite bathroom and shower. Outside, enjoy your own private "Zula" lounging area and campfire spot, the ultimate way to experience the silence and the stars in total comfort.'],
    amenities: ['Double bed', 'Sofa bed', 'Air conditioning', 'Private shower & restroom', 'Shared, fully equipped kitchen', 'Seating areas & zulas', 'Electricity', 'Lighting', 'BBQ'],
  },
};

// keyed by facility id from data.js
const facilities = {
  breakfast: { tag: 'Included', title: 'Breakfast', short: 'A rich and colorful start to your day: freshly chopped salads, savory spreads, warm pastries, and sweet herbal tea. Just sit back and savor the morning silence.' },
  madfuna: { tag: 'Bedouin dinner', title: 'The Madfouna Feast', short: 'Chicken and root vegetables slow-cooked underground on hot coals for hours, served with seasoned rice and fresh salads — a true taste of the desert (pre-order).' },
  'heated-pool': { tag: 'All year round', title: 'The Heated Pool', short: 'Even when the desert nights turn chilly, our covered, heated pool remains inviting — the perfect place to unwind after a long hike.' },
  kitchen: { tag: 'Self-catering', title: 'The Communal Kitchen', short: 'Our spacious kitchen gives you the freedom to prepare your own meals, from a quick morning coffee to a full family dinner.' },
  farm: { tag: 'Our residents', title: 'The Petting Farm', short: 'Come say hello to our resident camels, donkeys, goats and farm animals — touch, feed, and connect with nature.' },
  bonfires: { tag: 'Shared spaces', title: 'Sunsets & Bonfires', short: 'Watch the sky turn fiery red over the dunes, then gather around a crackling bonfire — this is where the best memories are made.' },
  'big-pool': { tag: 'In season', title: 'The Large Pool', short: 'Our main open-air pool (in season) faces the wild open landscape — a cool dip in the middle of the desert.' }, // translated
};

// long texts for en/facilities.html — the first paragraphs come from home-en; the rest translated from the Hebrew facilities page
const facilitiesLong = {
  breakfast: ['A rich and colorful start to your day. Enjoy tables laden with freshly chopped salads, savory spreads, warm pastries, and sweet herbal tea. Everything is served in abundance — simple and delicious, exactly as breakfast should be.', 'This is your moment to start the day calmly, without looking at the clock. Just sit back facing the view, dip fresh pita bread, and savor the special silence of the morning hours at the Inn. It’s the best way to recharge (and fill up) before heading out to explore the area or settling in for a lazy day at the Inn.'],
  madfuna: ['Experience the ancient Bedouin tradition of "buried" cooking. Chicken and root vegetables are slow-cooked underground on hot coals for hours, absorbing the smoky aromas of the earth. The result is a succulent, melt-in-your-mouth meal served with seasoned rice and fresh salads, a true taste of the desert.', 'Dinner here is much more than food – it’s a whole event of togetherness. The concept is sharing: the meal is served on a huge central platter, so everyone can taste and enjoy the abundance together — perfect for families and groups of friends. We believe food brings people closer, and in the desert you feel it even more. To prepare it fresh and hot for you, the feast is served by pre-order only — just let us know, and we’ll take care of filling your table.'],
  'heated-pool': ['Even when the desert nights turn chilly, our waters remain inviting. Step into our covered, heated pool for a soothing soak. It is the perfect place to unwind, relax tired muscles after a long hike, and enjoy a moment of pure tranquility, no matter the season.', 'Housed in a beautifully designed structure that echoes the desert landscape, the pool is open all year round — for a quiet night swim or a winter afternoon. It sits right next to the large open-air pool (active in the warm seasons), completing the water experience at the Inn.'],
  kitchen: ['For those who love to cook or just want a light snack, our spacious kitchen awaits. It offers you the freedom to prepare your own meals, from a quick morning coffee to a full family dinner, just the way you like it.', 'Cook like at home, in the heart of the desert. The communal kitchen is the culinary heart of the Inn: all you need to bring is your cookware and food, and the kitchen is freely available to you throughout your stay.'],
  farm: ['A heartwarming experience for all ages. Come say hello to our resident camels, donkeys, dwarf goats and rabbits. It is a wonderful opportunity for children (and adults!) to touch, feed, and connect with nature in the most direct and gentle way.', 'The animals are an inseparable part of the calm atmosphere we cultivate at the Inn. Meeting them offers a rare moment to pause from the daily rush and observe the slow, natural rhythm of life.'],
  bonfires: ['As the day ends, the desert puts on a show. Watch the sky turn fiery red over the dunes, then gather around a crackling bonfire. Whether with a guitar, sweet herbal tea, or just silence, this is where the best memories are made under the stars.', 'Shared spaces are scattered throughout the Inn, inviting you to find your own corner: secluded benches for watching the desert sunset, shady nooks for an afternoon rest, and campfire areas that come alive at night.'],
  'big-pool': ['Our main pool is the place to be when the temperatures rise (open in season). It lies under the open sky, unroofed and unheated, looking straight out over the wild, open landscape. The cool water is exactly what you need in the middle of the desert — the perfect refreshment facing the mountains.'],
};

// en/activities.html — translated from the Hebrew page (same order as data.js activities)
const activityCats = { act: 'Activities', trail: 'Trails', food: 'Food & Wine' };
const activities = [
  { title: 'Paintball in Tsofar – Etgar BaTamar', near: 'Walking distance from the Inn',
    text: ['Ready for the ultimate challenge? At "Etgar BaTamar" – experiential paintball in the Arava – you’re invited into a desert battlefield! Among giant date palms in Moshav Tsofar awaits the perfect arena to release some adrenaline.', 'A perfect outing for groups, families and couples – a bonding, adrenaline-filled experience in the most special location in the south.'],
    info: '5-minute walk from the Inn · +972-58-6879996' },
  { title: 'Shepherd for a Day – Adi Etrog', near: 'Walking distance from the Inn',
    text: ['A small, homey sheep and goat farm in Moshav Tsofar invites you to take part in caring for the animals and making cheese. The yard is home to goats, sheep and dogs trained to herd the flock.', 'Start with a demonstration and try hand-milking, make cheese from the milk you collected, and watch the trained dogs help the shepherd guide the herd. In lambing season you can pet and bottle-feed the lambs and kids. Finish with coffee and cake, homemade bread and cheese. Visits by appointment.'],
    info: '5-minute walk from the Inn · Bookings: Adi +972-52-3868909' },
  { title: 'Moa Winery',
    text: ['In 1984, Yehuda and Tzvia Friedman came to Moshav Tsofar in the Arava and founded their family farm. In 2014 the family decided to fulfil another dream and open a small family winery.', 'The old packing house, two empty flower coolers and a basic winemaking course gave them the idea of making wine in the Arava. The grapes come from the Ruchot plateau near Mitzpe Ramon, for a unique desert wine that embodies the Incense Route and the desert.'] },
  { title: 'An Evening of Stars',
    text: ['What do the constellations mean? How does the North Star always stay in the north? And why do so many stars have Arabic names? We’ll answer all of these and look at our solar system, the galaxy and even beyond it – with the naked eye, binoculars and a telescope.', 'Beside us: a campfire with tea and snacks, or even a lavish dinner.'],
    info: 'Moshav Tsofar · Rotem +972-55-4329588' },
  { title: 'Nanu Café',
    text: ['Nanu is a home of food, art and coffee. Most of the produce comes from the Arava – from local farmers, artists and seasonal crops. The coffee is local, and so are the people.', 'The menu is fresh, varied, seasonal and changes daily. Nanu sits in the artists’ village of Tzukim, next to the gallery.'],
    info: 'Phone: +972-55-4329467' },
  { title: 'Where to Eat in the Central Arava?',
    text: ['Arava Tourism has gathered all of the region’s restaurants and culinary experiences in one place. Follow the link and find the option that suits you best. Bon appétit!'] },
  { title: 'Hatzeva Loop (cycling)',
    text: ['An easy ride for the whole family, beginners and children, starting from the eastern entrance gate of Moshav Hatzeva.', 'Head north on the Peace Road for about 2 km to the lookout (a short walk among the marl gullies is recommended) and continue on the green trail. After 3.1 km, at the junction with the blue trail, turn right to the Hatzeva reservoir and continue north along the bank of Nahal HaArava. After 1.6 km cross the stream on the paved road and ride south between the greenhouses, and finally (3.8 km) cross back to the western bank and climb back to the moshav gate.'] },
  { title: 'The Springs Route & the Incense Route',
    text: ['A unique route for professional and amateur cyclists, with climbs and descents in and out of the streambeds and springs – one of the few places in Israel offering such an experience close to comfortable lodging.', 'The springs emerge along the fault line where the eastern Negev Highlands meet the Arava Valley. Among them is Ein Tamid, hidden in a palm-lined gully with remains of ancient agriculture; south of it is a lookout named after Idan Gadish, who studied the Arabian oryx and its reintroduction to the Negev; and about 2 km southeast of Ein Shahak lies Ein Duhan, whose brackish water serves many of the area’s animals.'] },
  { title: 'Desert Escape',
    text: ['A navigation game in the Tzukim landscape for all ages, families and groups of any size. The game takes place around the community of Tzukim and lasts about two hours. It can be played in Hebrew or English and adapted to the size of the group.'] },
  { title: 'Vidor Visitor Center',
    text: ['Get to know the Arava up close: a multi-sensory tour including a 3D film, display greenhouses with the best of Arava crops, and an intriguing interactive space where you can make it rain and become farmers for a moment.'] },
  { title: 'What to Do in the Arava',
    text: ['The Arava Tourism website has plenty of information about everything there is to do in our region – trails, attractions, events and more.'] },
];

const mapLabels = {
  1: 'Bedouin Tent 1', 2: 'Bedouin Tent 2', 3: 'Bedouin Tent 3', 4: 'Desert Huts & Glamping', 5: 'Camping Area', 6: 'Desert Cabins',
  7: 'Petting Farm', 8: 'Kiosk / Breakfast / Staff Kitchen', 9: 'Communal Kitchen', 10: 'Swimming Pools', 11: 'Restrooms & Showers',
  12: 'Main Parking', 13: 'Cabins Parking', 14: 'EV Charging Station', 15: 'Safe zone',
};

module.exports = { nav, rooms, facilities, facilitiesLong, activities, activityCats, mapLabels };
