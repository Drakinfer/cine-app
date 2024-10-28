const languageMapping: { [key: string]: string } = {
  kw: 'Cornique',
  ff: 'Peul',
  gn: 'Guarani',
  id: 'Indonésien',
  lu: 'Luba-Katanga',
  nr: 'Ndebele',
  os: 'Ossète',
  ru: 'Russe',
  se: 'Same du Nord',
  so: 'Somali',
  es: 'Espagnol',
  sv: 'Suédois',
  ta: 'Tamoul',
  te: 'Télougou',
  tn: 'Tswana',
  uk: 'Ukrainien',
  uz: 'Ouzbek',
  el: 'Grec',
  co: 'Corse',
  dv: 'Maldivien',
  kk: 'Kazakh',
  ki: 'Kikuyu',
  or: 'Oriya',
  si: 'Cinghalais',
  st: 'Sotho',
  sr: 'Serbe',
  ss: 'Swati',
  tr: 'Turc',
  wa: 'Wallon',
  cn: 'Cantonais',
  bi: 'Bichlamar',
  cr: 'Cree',
  cy: 'Gallois',
  eu: 'Basque',
  hz: 'Herero',
  ho: 'Hiri Motu',
  ka: 'Géorgien',
  kr: 'Kanouri',
  km: 'Khmer',
  kj: 'Kuanyama',
  to: 'Tongien',
  vi: 'Vietnamien',
  zu: 'Zoulou',
  zh: 'Mandarin',
  ps: 'Pachto',
  mk: 'Macédonien',
  ae: 'Avestique',
  az: 'Azerbaïdjanais',
  ba: 'Bachkir',
  sh: 'Serbo-croate',
  lv: 'Letton',
  lt: 'Lituanien',
  ms: 'Malais',
  rm: 'Romanche',
  as: 'Assamais',
  gd: 'Gaélique écossais',
  ja: 'Japonais',
  ko: 'Coréen',
  ku: 'Kurde',
  mo: 'Moldave',
  mn: 'Mongol',
  nb: 'Norvégien Bokmål',
  om: 'Oromo',
  pi: 'Pali',
  sq: 'Albanais',
  vo: 'Volapük',
  bo: 'Tibétain',
  da: 'Danois',
  kl: 'Groenlandais',
  kn: 'Kannada',
  nl: 'Néerlandais',
  nn: 'Norvégien Nynorsk',
  sa: 'Sanskrit',
  am: 'Amharique',
  hy: 'Arménien',
  bs: 'Bosniaque',
  hr: 'Croate',
  mh: 'Marshallais',
  mg: 'Malgache',
  ne: 'Népalais',
  su: 'Soundanais',
  ts: 'Tsonga',
  ug: 'Ouïghour',
  cs: 'Tchèque',
  jv: 'Javanais',
  ro: 'Roumain',
  sm: 'Samoan',
  tg: 'Tadjik',
  wo: 'Wolof',
  br: 'Breton',
  fr: 'Français',
  ga: 'Irlandais',
  ht: 'Haïtien',
  kv: 'Komi',
  mi: 'Maori',
  th: 'Thaï',
  xx: 'Aucune langue',
  af: 'Afrikaans',
  av: 'Avar',
  bm: 'Bambara',
  ca: 'Catalan',
  ce: 'Tchétchène',
  de: 'Allemand',
  gv: 'Manx',
  rw: 'Kinyarwanda',
  ky: 'Kirghiz',
  ln: 'Lingala',
  sn: 'Shona',
  yi: 'Yiddish',
  be: 'Biélorusse',
  cu: 'Vieux-slave',
  dz: 'Dzongkha',
  eo: 'Espéranto',
  fi: 'Finnois',
  fy: 'Frison',
  ie: 'Interlingue',
  ia: 'Interlingua',
  it: 'Italien',
  ng: 'Ndonga',
  pa: 'Panjabi',
  pt: 'Portugais',
  rn: 'Rundi',
  fa: 'Persan',
  ch: 'Chamorro',
  cv: 'Tchouvache',
  en: 'Anglais',
  hu: 'Hongrois',
  ii: 'Yi',
  kg: 'Kikongo',
  li: 'Limbourgeois',
  ml: 'Malayâlam',
  nv: 'Navajo',
  ny: 'Chichewa',
  sg: 'Sango',
  tw: 'Twi',
  ab: 'Abkhaze',
  ar: 'Arabe',
  ee: 'Éwé',
  fo: 'Féroïen',
  ik: 'Inupiaq',
  ks: 'Cachemiri',
  lb: 'Luxembourgeois',
  nd: 'Ndebele',
  oc: 'Occitan',
  sk: 'Slovaque',
  tt: 'Tatar',
  ve: 'Venda',
  ay: 'Aymara',
  fj: 'Fidjien',
  gu: 'Gujarati',
  io: 'Ido',
  lo: 'Laotien',
  la: 'Latin',
  no: 'Norvégien',
  oj: 'Ojibwa',
  pl: 'Polonais',
  qu: 'Quechua',
  sl: 'Slovène',
  sc: 'Sarde',
  sw: 'Swahili',
  tl: 'Tagalog',
  ur: 'Ourdou',
  bg: 'Bulgare',
  hi: 'Hindi',
  yo: 'Yoruba',
  ak: 'Akan',
  an: 'Aragonais',
  bn: 'Bengali',
  et: 'Estonien',
  gl: 'Galicien',
  ha: 'Haoussa',
  ig: 'Igbo',
  iu: 'Inuktitut',
  lg: 'Ganda',
  mr: 'Marathi',
  mt: 'Maltais',
  my: 'Birman',
  na: 'Nauruan',
  sd: 'Sindhi',
  xh: 'Xhosa',
  za: 'Zhuang',
  aa: 'Afar',
  is: 'Islandais',
  ty: 'Tahitien',
  ti: 'Tigrigna',
  tk: 'Turkmène',
  he: 'Hébreu'
};

export default languageMapping;
