async function drawVisualisation() {

  // Maak een lege visualisatie aan.
  let visualisation = echarts.init(document.getElementById('visualisation'));
  window.onresize = () => visualisation.resize();
  visualisation.showLoading();

  // Haal data op
  let response = await getJson('https://geo.irceline.be/realtime/ows?service=WFS&version=1.3.0&request=GetFeature&typeName=realtime:pm10_24hmean_station&outputFormat=json');
  let gent = response.features.find(obj => obj.properties.ab_eoi_code == 'BETR701').properties.value;
  let brussel = response.features.find(obj => obj.properties.ab_eoi_code == 'BETREG1').properties.value;
  let antwerpen = response.features.find(obj => obj.properties.ab_eoi_code == 'BETR805').properties.value;

  // Configureer de visualisatie.
  /** @type EChartsOption */
  let option = {
    title: {
      text: "Luchtvervuiling (PM10 in µg/m3)"
    },
    legend: {},
    dataset: {
      source: [['stad', 'µg PM10/m3'],
      ['Gent', gent],
      ['Brussel', brussel],
      ['Antwerpen', antwerpen]],
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    series: [
      { type: 'bar' },
    ]
  }
  // Stuur de configuratie door naar de visualisatie.
  visualisation.setOption(option);

  // Verberg het laadscherm.
  visualisation.hideLoading();

}

window.addEventListener('load', drawVisualisation);