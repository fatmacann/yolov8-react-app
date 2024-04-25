import React from 'react';
import ReactApexChart from 'react-apexcharts';

function generateData(count, yrange) {
    var series = [];
    for (let i = 0; i < count; i++) {
        const x = (i + 1).toString();
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        series.push({ x, y });
    }
    return series;
}

const initialData = [
    { name: 'W1', data: generateData(12, { min: 0, max: 90 }) },
    { name: 'W2', data: generateData(12, { min: 0, max: 90 }) },
    { name: 'W3', data: generateData(12, { min: 0, max: 90 }) },
    { name: 'W4', data: generateData(12, { min: 0, max: 90 }) },
    { name: 'W5', data: generateData(12, { min: 0, max: 90 }) },
    { name: 'W6', data: generateData(12, { min: 0, max: 90 }) },


].reverse(); 

const colors = [
    "#F3B415", "#F27036", "#663F59", "#6A6E94", "#4E88B4", "#00A7C6",
    "#18D8D8", "#A9D794", "#46AF78", "#A93F55", "#8C5E58", "#2176FF",
    "#33A1FD", "#7A918D", "#BAFF29"
].reverse(); 

class MultipleColorChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: initialData,
            options: {
                chart: {
                    height: 450,
                    type: 'heatmap',
                    width: '100%'
                },
                plotOptions: {
                    heatmap: {
                        shadeIntensity: 0.5,
                        colorScale: {
                            ranges: [{
                                from: -30,
                                to: 5,
                                name: 'low',
                                color: '#00A100'
                            },
                            {
                                from: 6,
                                to: 20,
                                name: 'medium',
                                color: '#128FD9'
                            },
                            {
                                from: 21,
                                to: 45,
                                name: 'high',
                                color: '#FFB200'
                            },
                            {
                                from: 46,
                                to: 55,
                                name: 'extreme',
                                color: '#FF0000'
                            }]
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                colors: colors,
                xaxis: {
                    type: 'category',
                    categories: ['06:00', '08:00', '10:00',  '12:00','14:00', '16:00', '18:00',  '20:00', '22:00', '00:00', '02:00',  '04:00',]
                },
                title: {
                    text: 'HeatMap Chart '
                },
                grid: {
                    padding: {
                        right: 20
                    }
                }
            }
        };
    }

    render() {
        return (
            <React.Fragment>
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="heatmap" height={250} width={700}/>
                </div>
            </React.Fragment>
        );
    }
}

export default MultipleColorChart;
