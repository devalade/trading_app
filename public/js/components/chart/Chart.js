// import {datas} from './data.js';

export const container = document.createElement('div');
const dimension = {
  WIDTH: window.innerWidth - 270,
  HEIGHT: window.innerHeight
}

// initialise chart
var chart = LightweightCharts.createChart(container, {
	width: dimension.WIDTH,
	height: dimension.HEIGHT,
  crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	}
});


// const datas = await 

// const socket = io.connect('https://streamer.cryptocompare.com/');
// subscription =  ['5~CCCAGG~BTC~USD']


// chart.subscribeCrosshairMove(param => {
//     console.log(param.hoveredMarkerId);
// });

// chart.subscribeClick(param => {
//     console.log(param.hoveredMarkerId);
// });




// Candle series
var candleSeries = chart.addCandlestickSeries();
// var data = datas.Data.Data;

// fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=50`)
// 	.then(data => console.log(data))
// 	.catch();


candleSeries.setMarkers(
	[{
		time: 1620464220,
		position: 'aboveBar',
		color: 'black',
		shape: 'arrowDown',
		title: '$ 9000'
	}]);
var minPriceLine = {
	price: 42267.71,
	color: '#00FF00',
	lineWidth: 3,
	lineType : LightweightCharts.LineType.WithSteps,
	lineStyle: LightweightCharts.LineStyle.Dotted,
	axisLabelVisible: true,
	title: 'minimum price',
};
candleSeries.createPriceLine(minPriceLine);
console.log(candleSeries);
console.log(candleSeries.createPriceLine)

// // Bolinger SMA
// var smaData = calculateSMA(data, 20);
// // console.log(smaData);
// var smaLine = chart.addLineSeries({
// 	color: 'rgba(4, 111, 232, 1)',
// 	lineWidth: 2,
// });
// smaLine.setData(smaData);

// Bolinger UpperBrand
// var upperLine = chart.addLineSeries({
// 	color: 'rgba(255, 0, 0, 1)',
// 	lineWidth: 1
// })
// upperLine.setData(upperBrand(data,20))

// Bolinger LowerBrand
// var lowerLine = chart.addLineSeries({
// 	color: 'rgba(0, 255, 0, 1)',
// 	lineWidth: 1
// })
// lowerLine.setData(lowerBand(data, 20))

// var legend = document.createElement('div');
// legend.className = 'sma-legend';
// container.appendChild(legend);
// legend.style.display = 'block';
// legend.style.left = 3 + 'px';
// legend.style.top = 3 + 'px';


function candleSeriesDatas (datas) {
	const result = datas.map((values) => {
		return { time: values.time, open: values.open, high: values.high, low: values.low, close: values.close }
	});
	return result;
}

function upperBrand(data, count) { // upperbrand deviatoin + sma
	var deviation = function(data) {
	var sum = 0;
		let maxValue = 0;
    for (var i = 0; i < data.length; i++) {
		sum += data[i].high;
		// maxValue = maxValue < data[i].high ? data[i].high : maxValue;
	}
	let stdValue = [...data.map(value => {
		return Math.pow(value.high - (sum / data.length), 2);
	})];
		// let differenceData = maxValue - (sum / data.length);
		// console.log("La difference: " + differenceData);
		stdValue = Math.sqrt(stdValue.reduce((accumulator, currentValue) => accumulator + currentValue)) / data.length - 1;
		// console.log(stdValue);
		// console.log((sum / data.length ) + differenceData*2)
		return (sum / data.length) + stdValue*20;
  };
  var result = [];
	for (var i = count - 1, len = data.length; i < len; i++){
	  	// console.log(avg(data))
		var val = deviation(data.slice(i - count + 1, i));
		result.push({ time: data[i].time, value: val});
	}
	// console.log(result);
  return result;
}

function lowerBand(data, count){ // lowerBrand deviation + sma
	const deviation = (data) => {
	let sum = 0;
	
    for (let i = 0; i < data.length; i++) {
		sum += data[i].low;
	}
	let stdValue = [...data.map(value => {
		return Math.pow(value.low - (sum / data.length), 2);
	})];
		stdValue = Math.sqrt(stdValue.reduce((accumulator, currentValue) => accumulator + currentValue)) / data.length ;
		// console.log("Ecart Type:"+ stdValue);
		// console.log((sum / data.length ) + differenceData*2)
		return (sum / data.length+1) - stdValue*20;
  	};
  	var result = [];
	for (var i = count - 1, len = data.length; i < len; i++){
		var val = deviation(data.slice(i - count + 1, i));
		result.push({ time: data[i].time, value: val});
	}
	// console.log(result);
  	return result;
}

function calculateSMA(data, count){ // SMA
  var avg = function(data) {
	  var sum = 0;
    for (var i = 0; i < data.length; i++) {
       sum += data[i].close;
	}
    return sum / data.length;
  };
  var result = [];
	for (var i = count - 1, len = data.length; i < len; i++){
	  	console.log(avg(data))
		var val = avg(data.slice(i - count + 1, i));
		result.push({ time: data[i].time, value: val});
	}
	console.log(result);
  return result;
}



// Connection to the socket io
const socket = io.connect();
// écoute du socket news
socket.on('informations', function (values) {
	fetch('https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=Kraken')
		.then(data => console.log(data))
		.catch();	
	candleSeries.setData({time: values.TS, open: values.P, high: values.P, low: values.P, close: values.P})
	// console.log(values)
});