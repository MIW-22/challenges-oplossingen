async function drawVisualisation() {

    // Maak een lege visualisatie aan.
    let visualisation = echarts.init(document.getElementById('visualisation'));
    window.onresize = () => visualisation.resize();
    visualisation.showLoading();

    // Haal data op.
    let mijnData = '';

    // Configureer de visualisatie.
    /** @type EChartsOption */
    let option = {
        series: [{
            type: 'wordCloud',
            data: [{
                name: 'Test',
                value: 1,
            }]
        }]
    };

    // Stuur de configuratie door naar de visualisatie.
    visualisation.setOption(option);

    // Verberg het laadscherm.
    visualisation.hideLoading();
}

window.addEventListener('load', drawVisualisation);
