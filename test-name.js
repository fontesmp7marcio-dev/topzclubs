function normalizeName(name) {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

function stripClubAffixes(str) {
  return str
    .replace(/\b(fc|cf|sc|ec|cd|ca|afc|ac|se|cr|fbc|rcd|rb|ss|as|fk|sk|bk|ff|if|bsc|tsg|vfb|vfl|sv|fsv|sd|ud|rc|aj|ogc|osc|sco|hsc|sl|spvc|cska|cpl|csa|crb|abc)\b/g, ' ')
    .replace(/\b(clube|esporte|sociedade|futebol|football|club|balompie|deportiva|deportivo|calcio|esportiva|regatas|paulista|mineiro|paranaense|gaucho|carioca|de|da|do|dos|das)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log("dinamo zagreb ->", normalizeName("dinamo zagreb"));
console.log("dinamo zagreb ->", stripClubAffixes(normalizeName("dinamo zagreb")));
console.log("norwich city ->", normalizeName("norwich city"));
