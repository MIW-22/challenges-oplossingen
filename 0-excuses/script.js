async function drawVisualisation() {

  let response = await getJson('https://excuser.herokuapp.com/v1/excuse/family/');
  let excuse = response[0].excuse;
  writeOnPage(excuse);

}

window.addEventListener('load', drawVisualisation);
