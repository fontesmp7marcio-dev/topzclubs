async function test() {
  const url = `https://www.fotmob.com/api/data/search/suggest?term=dinamo%20zagreb&lang=pt-BR&hits=8`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

test();
