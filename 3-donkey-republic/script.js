async function drawVisualisation() {

  // Maak een lege visualisatie aan.
  let visualisation = echarts.init(document.getElementById('visualisation'));
  window.onresize = () => visualisation.resize();
  visualisation.showLoading();

  // Haal het stratenplan van Gent op.
  let gent = await getJson('https://data.stad.gent/api/v2/catalog/datasets/straten-gent/exports/geojson');
  echarts.registerMap('gent', { geoJSON: gent })

  // Haal de locaties van de fietsstations op.
  let stations = await getJson('https://gent.opendatasoft.com/api/records/1.0/search/?dataset=donkey-republic-deelfietsen-stations-locaties&q=&rows=1000');

  // Haal de actuele beschikbaarheden van de fietsen op.
  let beschikbaarheden = await getJson('https://data.stad.gent/api/records/1.0/search/?dataset=donkey-republic-beschikbaarheid-deelfietsen-per-station&q=&rows=1000');

  let punten = beschikbaarheden.records
    .map(obj => {
      let station = stations.records.find(station => station.fields.station_id == obj.fields.station_id);
      if (station) {
        return [station.fields.lon, station.fields.lat, obj.fields.num_bikes_available];
      }
    })
    .filter(el => el !== undefined);

  // Verberg het laadscherm.
  visualisation.hideLoading();

  // Stel de configuratie op
  /** @type EChartsOption */
  let option = {
    title: {
      text: 'Donkey Republic beschikbaarheid'
    },
    dataset: {
      source: punten
    },
    geo: {
      map: 'gent',
      roam: true,
      geoIndex: 0
    },
    series: [
      {
        name: 'Donkey Republic beschikbaarheden',
        type: 'scatter',
        coordinateSystem: 'geo',
        geoIndex: 0,
        encode: {
          label: 2
        },
        symbolSize: 20,
        label: {
          show: true,
          color: '#fff',
          fontSize: 15
        }
      }
    ]
  };

  // Laad de configuratie in.
  visualisation.setOption(option);
}

window.addEventListener('load', drawVisualisation);