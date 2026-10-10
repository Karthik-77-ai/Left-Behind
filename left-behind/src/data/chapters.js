// Planet layout in world space
export const PLANETS = {
  MOON: { pos: [-9, 0, 0], r: 3, base: '#8a8a8c', pal: ['rgba(40,40,45,', 'rgba(200,200,205,'], spin: 0.03, glow: '#9fb4d9', atm: 0.55 },
  MARS: { pos: [9, 0, 0], r: 2.6, base: '#a8522d', pal: ['rgba(90,30,15,', 'rgba(230,140,90,'], spin: 0.025, glow: '#ff9a6a', atm: 1.3 },
}

// k: 's' surface (lat/lon) | 'o' orbit | 'f' free-floating in space
export const CHAPTERS = [
  { p: '', tag: 'PROLOGUE', t: 'Left Behind', d: '1964 – 2026', hero: true,
    x: 'Since the 1960s, NASA has sent hundreds of machines toward the Moon and Mars. Some were left on purpose. Some were lost. Scroll to visit the ones still out there.',
    f: 'Two worlds · one long silence' },
  { p: 'MOON', tag: 'MOON · LUNAR SURFACE', t: 'Six Launch Pads, Still Standing', d: '1969 – 1972', k: 's', la: 0.7, lo: 23.5, c: '#8fd3ff',
    x: "Each crewed Apollo landing left its descent stage behind as a launch platform, along with flags, science stations and tools. At Tranquility Base, Apollo 11's stage still sits where Armstrong and Aldrin left it.",
    f: 'STATUS · Intentionally abandoned' },
  { p: 'MOON', tag: 'MOON · TAURUS-LITTROW', t: 'Three Parked Rovers', d: '1971 – 1972', k: 's', la: 20, lo: 30.8, c: '#8fd3ff',
    x: "Apollo 15, 16 and 17 each left a Lunar Roving Vehicle behind. Apollo 17's rover was the last driven, parked so its camera could film the lift-off of the final crew to walk on the Moon.",
    f: 'STATUS · Parked for 50+ years' },
  { p: 'MOON', tag: 'MOON · FRA MAURO', t: 'Two Golf Balls', d: 'February 1971', k: 's', la: -3.6, lo: -17.5, c: '#8fd3ff',
    x: "Apollo 14's Alan Shepard smuggled a golf club head onto the Moon and hit two balls with one hand. They are still there, a small, silly piece of lost equipment.",
    f: 'STATUS · Lost in the regolith' },
  { p: 'MOON', tag: 'MOON · DEEP SPACE', t: 'Snoopy Drifts Away', d: 'May 1969', k: 'f', w: [-4, 5, -7], c: '#8fd3ff',
    x: "After a dress rehearsal around the Moon, Apollo 10's lunar module ascent stage \"Snoopy\" was sent into orbit around the Sun. Its exact whereabouts today are not known.",
    f: 'STATUS · Lost in solar orbit' },
  { p: 'MARS', tag: 'MARS · APPROACH', t: 'Mars Observer Goes Quiet', d: 'August 1993', k: 'o', r: 1.9, s: 0.5, c: '#ff8a55',
    x: 'Days before it should have entered orbit, NASA lost contact with Mars Observer. It was never heard from again; the cause was never confirmed.',
    f: 'STATUS · Lost before arrival' },
  { p: 'MARS', tag: 'MARS · ORBIT', t: 'A Unit Mix-Up', d: '23 September 1999', k: 'o', r: 1.5, s: 0.8, c: '#ff8a55',
    x: 'Mars Climate Orbiter came in far too low. Thruster data was produced in pound-force seconds while navigation software expected newton-seconds. A tiny gap in units ended a whole mission.',
    f: 'STATUS · Burned up in the atmosphere' },
  { p: 'MARS', tag: 'MARS · SOUTH POLAR REGION', t: 'Mars Polar Lander', d: '3 December 1999', k: 's', la: -76, lo: 164, c: '#ff8a55',
    x: 'It began descent and never called home. The leading explanation is that its engines shut off too early, so it fell the rest of the way.',
    f: 'STATUS · Signal never received' },
  { p: 'MARS', tag: 'MARS · GUSEV CRATER', t: 'Spirit, Stuck in the Sand', d: '2009 – 2010', k: 's', la: -14.6, lo: 175.5, c: '#ff8a55',
    x: 'Spirit broke through soft soil and could not free itself. It became a stationary science platform until its last contact on March 22, 2010, as winter starved its solar panels.',
    f: 'STATUS · Silent since 2010' },
  { p: 'MARS', tag: 'MARS · ENDEAVOUR CRATER', t: 'Opportunity and the Dust Storm', d: 'June 2018', k: 's', la: -2.1, lo: -5.5, c: '#ff8a55',
    x: 'A planet-wide dust storm blocked the sunlight Opportunity relied on. Its last message came on June 10, 2018, after 14 years on a mission planned for 90 days. NASA ended it in February 2019.',
    f: 'STATUS · Mission over' },
  { p: 'MARS', tag: 'MARS · JEZERO CRATER', t: "Ingenuity's Last Flight", d: 'January 2024', k: 's', la: 18.4, lo: 77.5, c: '#ff8a55',
    x: 'The little helicopter planned for five flights completed 72. After a rough landing damaged its rotor blades, NASA retired it. It still stands in Jezero Crater as a monument to powered flight on another world.',
    f: 'STATUS · Grounded forever' },
  { p: 'MARS', tag: 'MARS · ORBIT', t: 'MAVEN Vanishes', d: 'Dec 2025 – Jun 2026', k: 'o', r: 1.7, s: 0.35, blink: true, c: '#ff8a55',
    x: 'On December 6, 2025, MAVEN passed behind Mars and never reappeared. Tracking data suggested it was spinning unexpectedly. In June 2026, NASA declared the mission over, calling the orbiter unrecoverable. It was the first time NASA lost a spacecraft in orbit around another planet.',
    f: 'STATUS · Declared lost, June 2026' },
  { p: '', tag: 'EPILOGUE', t: 'Everything Out There Is a Story', d: 'Still counting', hero: true,
    x: 'Every lost machine taught engineers something: about units, soil, dust and software. The next ones will carry those lessons with them.',
    f: 'Sources: NASA, Planetary Society, SPACE.com' },
]

// Scientific names (IAU / USGS) for the chapter sites, by chapter index
export const SITE_NAMES = {
  1: 'Mare Tranquillitatis', 2: 'Taurus–Littrow valley', 3: 'Fra Mauro formation', 7: 'Planum Australe',
  8: 'Gusev Crater', 9: 'Meridiani Planum', 10: 'Jezero Crater',
}
// Which procedural spacecraft model each chapter uses
export const CRAFT = { 1: 'lm', 2: 'rover', 3: 'ball', 4: 'snoopy', 5: 'orbiter', 6: 'orbiter', 7: 'lander', 8: 'mer', 9: 'mer', 10: 'heli', 11: 'orbiter' }

// Named surface features shown as labels on each world. big = maria / plains / regions, else craters & sites.
export const PLACES = {
  MOON: [
    { n: 'Mare Frigoris', la: 56, lo: 1, big: 1 }, { n: 'Mare Imbrium', la: 33, lo: -16, big: 1 },
    { n: 'Oceanus Procellarum', la: 18, lo: -57, big: 1 }, { n: 'Mare Serenitatis', la: 28, lo: 18, big: 1 },
    { n: 'Mare Tranquillitatis', la: 8.5, lo: 31, big: 1 }, { n: 'Mare Crisium', la: 17, lo: 59, big: 1 },
    { n: 'Mare Nubium', la: -21, lo: -16, big: 1 }, { n: 'Tycho', la: -43, lo: -11 },
    { n: 'Copernicus', la: 9.7, lo: -20 }, { n: 'Aristarchus', la: 23.7, lo: -47 },
    { n: 'Tranquility Base', la: 0.7, lo: 23.5, site: 1 }, { n: 'Taurus–Littrow', la: 20, lo: 30.8, site: 1 },
    { n: 'Fra Mauro', la: -3.6, lo: -17.5, site: 1 },
  ],
  MARS: [
    { n: 'Olympus Mons', la: 18.7, lo: -134 }, { n: 'Tharsis Montes', la: 1, lo: -112, big: 1 },
    { n: 'Valles Marineris', la: -13, lo: -59, big: 1 }, { n: 'Chryse Planitia', la: 28, lo: -40, big: 1 },
    { n: 'Utopia Planitia', la: 46, lo: 118, big: 1 }, { n: 'Hellas Planitia', la: -43, lo: 70, big: 1 },
    { n: 'Syrtis Major', la: 8, lo: 69, big: 1 }, { n: 'Arabia Terra', la: 22, lo: 5, big: 1 },
    { n: 'Elysium Mons', la: 25, lo: 147 }, { n: 'Planum Australe', la: -76, lo: 164, site: 1 },
    { n: 'Gusev Crater', la: -14.6, lo: 175.5, site: 1 }, { n: 'Meridiani Planum', la: -2.1, lo: -5.5, site: 1 },
    { n: 'Jezero Crater', la: 18.4, lo: 77.5, site: 1 },
  ],
}
