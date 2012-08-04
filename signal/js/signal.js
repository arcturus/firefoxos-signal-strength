var chart;
var signal = window.navigator.mozMobileConnection.voice;

function requestData() {
  setTimeout(getData, 500);  
}
  
$(document).ready(function() {
  chart = new Highcharts.Chart({
    chart: {
      renderTo: 'container',
      defaultSeriesType: 'spline',
      events: {
        load: requestData
      }
    },
    title: {
          text: 'Signal Strength'
        },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150,
      maxZoom: 20 * 1000
    },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: 'dBm',
        margin: 20
      }
    },
    series: [{
      name: 'Signal',
      data: []
    }]
  });   
});

function getData() {
  var strength = signal.signalStrength;
  //var strength = Math.floor(Math.random() * 100);

  var shift = false;
  if (chart) {
    var series = chart.series[0],
    shift = series.data.length > 20;
  }

  chart.series[0].addPoint([new Date().getTime(), strength] , true, shift);
  setTimeout(getData, 1000);
}
