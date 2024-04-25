
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts'; // Doğru bileşeni içe aktar
import ReactDOM from 'react-dom'; // ReactDOM'u içe aktar

// Örnek bir generateData fonksiyonu, gerçek ihtiyaçlarınıza göre değiştirebilirsiniz
function generateData(count, { min, max }) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1) + min));
}

// Sınıf ismini değiştirdim, çakışmayı önlemek için
class MyApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
          name: 'Jan',
          data: generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: 'Feb',
          data: generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: 'Mar',
          data: generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: 'Apr',
          data: generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: 'May',
          data: generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: 'Jun',
          data: generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: 'Jul',
          data: generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: 'Aug',
          data: generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: 'Sep',
          data: generateData(20, {
            min: -30,
            max: 55
          })
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'heatmap',
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            radius: 0,
            useFillColorAsStroke: true,
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
                }
              ]
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 1
        },
        title: {
          text: 'HeatMap Chart with Color Range'
        },
      },
    
    
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="heatmap" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(MyApexChart), domContainer);
