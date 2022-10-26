async function drawVisualisation() {

    // Maak een lege visualisatie aan.
    let visualisation = echarts.init(document.getElementById('visualisation'));
    window.onresize = () => visualisation.resize();
    visualisation.showLoading();

    // Haal data op.
    let mijnData = [
        { name: 'Test', value: 5, },
        { name: 'Hello', value: 3 },
        { name: 'Datavisualisatie', value: 10 }
    ];

    // Configureer de visualisatie.
    /** @type EChartsOption */
    let option = {
        series: [{
            type: 'wordCloud',
            data: mijnData
        }]
    };

    // Stuur de configuratie door naar de visualisatie.
    visualisation.setOption(option);

    // Verberg het laadscherm.
    visualisation.hideLoading();
}

window.addEventListener('load', drawVisualisation);
