async function drawVisualisation() {
    // Maak een lege visualisatie aan.
    let visualisation = echarts.init(document.getElementById('visualisation'));
    window.onresize = () => visualisation.resize();
    visualisation.showLoading();

    // Haal data op.
    let inflatieData = await getJson('./inflatiecijfers.json');

    // Configureer de visualisatie.
    /** @type EChartsOption */
    let option = {
        legend: {
            show: true,
        },
        xAxis: {
            type: 'value',
            onZero: true
        },
        yAxis: {
            type: 'category',
            max: 20,
            animationDuration: 10,
            animationDurationUpdate: 10
        },
        series: [
            {
                type: 'bar',
                realtimeSort: true,
                label: {
                    show: true,
                    valueAnimation: true,
                    formatter: '{@[1]}%'
                },
                encode: {
                    x: 1,
                    y: 0
                },
            }
        ],
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
    };

    // Verberg het laadscherm.
    visualisation.hideLoading();

    // Stuur de configuratie door naar de visualisatie, iedere 3 seconden.
    let index = 2;
    let maxIndex = inflatieData[0].length - 1;
    setInterval(function () {
        let year = inflatieData[0][index];
        let data = inflatieData.map(row => [row[0], row[index] >= 0 ? row[index] : null]);

        // Configureer de titel.
        option.title = {
            text: `Inflatie in ${year}`
        };
        // Configureer de dataset.
        option.dataset = {
            sourceHeader: true,
            source: data
        }
        // Stel de configuratie in.
        visualisation.setOption(option);

        // Ga naar de volgende kolom.
        if(index < maxIndex) {
            index = index + 1;
        } else {
            index = 1;
        }

    }, 3000)



}

window.addEventListener('load', drawVisualisation);