async function drawVisualisation() {

    // Maak een lege visualisatie aan.
    let visualisation = echarts.init(document.getElementById('visualisation'));
    window.onresize = () => visualisation.resize();
    visualisation.showLoading();

    // Configureer de visualisatie.
    /** @type EChartsOption */
    let option = {
        backgroundColor: '#000',
        globe: {
            environment: './img/starfield.jpg',
            baseTexture: './img/world-topography.jpg',
            heightTexture: './img/world-topography.jpg',
            displacementScale: 0.04,
            displacementQuality: 'high',
            shading: 'realistic',
            realisticMaterial: {
                roughness: 0.9,
            },
            postEffect: {
                enable: true,
            },
            light: {
                main: {
                    intensity: 5,
                    shadow: true
                },
                ambientCubemap: {
                    texture: './img/pisa.hdr',
                    diffuseIntensity: 0.2,
                }
            },
            viewControl: {
                autoRotate: false
            },
        }
    };

    // Stuur de configuratie door naar de visualisatie.
    visualisation.setOption(option);

    // Verberg het laadscherm.
    visualisation.hideLoading();

    // Haal data op.
    setInterval(async function () {
        let response = await getJson('https://api.wheretheiss.at/v1/satellites/25544');
        option.series = [{
            type: 'scatter3D',
            coordinateSystem: 'globe',
            symbol: 'circle',
            symbolSize: 15,
            data: [[response.longitude, response.latitude, 1]],
            label: {
                show: true,
                formatter: 'International Space Station'
            },
            itemStyle: {
                color: '#ffff00'
            },
            textStyle: {
                fontSize: 30,

            },
            animation: true,
            animationDurationUpdate: 5000
        }];
        visualisation.setOption(option);
    }, 5000)

}
window.addEventListener('load', drawVisualisation);
