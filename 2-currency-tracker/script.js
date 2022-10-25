async function drawVisualisation() {

    // Maak een lege visualisatie aan.
    let visualisation = echarts.init(document.getElementById('visualisation'));
    window.onresize = () => visualisation.resize();
    visualisation.showLoading();

    // De volgende code wordt iedere 5000 milliseconden uitgevoerd (5 seconden).
    setInterval(async function () {

        // Haal data op.
        let response = await getJson('https://api.coincap.io/v2/rates');
        let valutaData = [
            {
                value: response.data.find(obj => obj.id == "euro").rateUsd,
                name: 'Euro',
                title: {
                    offsetCenter: ['-30%', '80%']
                },
                detail: {
                    offsetCenter: ['-30%', '95%']
                }
            },
            {
                value: response.data.find(obj => obj.id == "british-pound-sterling").rateUsd,
                name: 'Pond',
                title: {
                    offsetCenter: ['30%', '80%']
                },
                detail: {
                    offsetCenter: ['30%', '95%']
                }
            },
        ];

        // Configureer de visualisatie.
        /** @type EChartsOption */
        let option = {
            series: [
                {
                    type: 'gauge',
                    min: 0.8,
                    max: 1.4,
                    progress: {
                        show: true,
                        overlap: true,
                        roundCap: true
                    },
                    data: valutaData,
    
                    label: {
                        show: true
                    },
                    detail: {
                        width: 100,
                        height: 14,
                        fontSize: 10,
                        color: '#fff',
                        backgroundColor: 'auto',
                        borderRadius: 3,
                        formatter: '{value}'
                    }
                }
            ]
        }

        // Stuur de configuratie door naar de visualisatie.
        visualisation.setOption(option);

        // Verberg het laadscherm.
        visualisation.hideLoading();

    }, 5000)
}

window.addEventListener('load', drawVisualisation);
