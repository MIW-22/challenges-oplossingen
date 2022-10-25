async function drawVisualisation() {

  let response = await getJson('https://meowfacts.herokuapp.com');
  let catFact = response.data[0];
  writeOnPage(catFact);

}

window.addEventListener('load', drawVisualisation);