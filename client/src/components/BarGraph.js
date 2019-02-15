import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default ({data: hashtags}) => {
    let dataAxis = [];
    let data = [];
    if(hashtags){
        hashtags.forEach(({hashTag, count}) => {
            if(hashTag && count !== undefined){
                // name
                dataAxis.push(hashTag);
                // frequency
                data.push(count);
            }
        })
    }
    let yMax = 500;
    let dataShadow = [];

    for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }

    const config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
            var labelOption = {
                normal: {
                    rotate: config.rotate,
                    align: config.align,
                    verticalAlign: config.verticalAlign,
                    position: config.position,
                    distance: config.distance
                }
            };
        }
    };

    var labelOption = {
        normal: {
            show: true,
            position: config.position,
            distance: config.distance,
            align: config.align,
            verticalAlign: config.verticalAlign,
            rotate: config.rotate,
            formatter: '{c}',
            fontSize: 16,
            rich: {
                name: {
                    textBorderColor: '#fff'
                }
            }
        }
    };

    const options = {
        title: {
            text: '10 Popular hashtags in last hour',
            subtext: 'Atria Power assignment'
        },
        xAxis: {
            data: dataAxis,
            axisLabel: {
                // inside: true,
                textStyle: {
                    color: '#000'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: { color: 'rgba(0,0,0,0.05)' }
                },
                barGap: '-100%',
                barCategoryGap: '20%',
                data: dataShadow,
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#00f'
                    },
                    emphasis: {
                        color: '#00f'
                    }
                },
                label: labelOption,
                data: data
            }
        ]
    };
    return(
        data.length ? 
        (<ReactEcharts
            option={options}
            style={{ height: '400px', width: '100%', paddingTop: 50 }}
        />) : (<h2>Chart Data not available.</h2>)
    );
}
