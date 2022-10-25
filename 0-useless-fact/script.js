async function drawVisualisation() {

  let response = await getJson('https://uselessfacts.jsph.pl/random.json?language=en');
  let fact = response.text;
  writeOnPage(fact);

}

window.addEventListener('load', drawVisualisation);
