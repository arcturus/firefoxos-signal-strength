var chart;
var signal = window.navigator.mozMobileConnection.voice;

function requestData() {
  setTimeout(getData, 500);  
}
  
$(document).ready(function() {
  var title = 'Signal Strength from ' + signal.network.shortName;
  chart = new Highcharts.Chart({
    chart: {
      renderTo: 'container',
      defaultSeriesType: 'spline',
      events: {
        load: requestData
      }
    },
    title: {
          text: title
        },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 500,
      maxZoom: 20 * 100,
      margin: 20
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
