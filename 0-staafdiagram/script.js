async function drawVisualisation() {

    // Maak een lege visualisatie aan.
    let visualisation = echarts.init(document.getElementById('visualisation'));
    window.onresize = () => visualisation.resize();
    visualisation.showLoading();

    // Haal data op.
    let mijnData = [
        ['afstudeerrichting', 'aantal studenten', 'aantal studenten met programmeerervaring'],
        ['Nieuwe Media', 4, 2],
        ['Communicatiemanagement', 3, 1],
        ['Film- en televisiestudies', 1, 0],
        ['Journalistiek', 1, 0]
    ];

    // Configureer de visualisatie.
    /** @type EChartsOption */
    let option = {
        title: {
            text: "#MIW22 do-track datavisualisatie"
        },
        legend: {},
        dataset: {
            source: mijnData,
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {},
        series: [
            { type: 'bar' },
            { type: 'bar' }
        ]
    }

    // Stuur de configuratie door naar de visualisatie.
    visualisation.setOption(option);

    // Verberg het laadscherm.
    visualisation.hideLoading();
}

window.addEventListener('load', drawVisualisation);
