async function drawVisualisation() {

  // Maak een lege visualisatie aan.
  let visualisation = echarts.init(document.getElementById('visualisation'));
  window.onresize = () => visualisation.resize();
  visualisation.showLoading();

  // Haal data op.
  let dier1 = await getJson('https://zoo-animal-api.herokuapp.com/animals/rand');
  let dier2 = await getJson('https://zoo-animal-api.herokuapp.com/animals/rand');
  let dier3 = await getJson('https://zoo-animal-api.herokuapp.com/animals/rand');

  let data = [['naam', 'levensduur', 'minimaal gewicht', 'maximaal gewicht'],
  [dier1.name, dier1.lifespan, dier1.weight_min, dier1.weight_max],
  [dier2.name, dier2.lifespan, dier2.weight_min, dier2.weight_max],
  [dier3.name, dier3.lifespan, dier3.weight_min, dier3.weight_max]];

  // Configureer de visualisatie.
  /** @type EChartsOption */
  let option = {
    title: {
      text: "Beestenbende"
    },
    legend: {},
    dataset: {
      source: data,
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    series: [
      { type: 'bar', label: { show: true, formatter: '{@[1]} jaar' } },
      { type: 'bar', label: { show: true, formatter: '{@[2]} kg' } },
      { type: 'bar', label: { show: true, formatter: '{@[3]} kg' } }
    ]
  }

  // Stuur de configuratie door naar de visualisatie.
  visualisation.setOption(option);

  // Verberg het laadscherm.
  visualisation.hideLoading();
}

window.addEventListener('load', drawVisualisation);

