$(document).ready(function(){
	

	

	var requestedCity = 'Atlanta,ga';
	var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + requestedCity + '&units=imperial&APPID=' + apiKey;

	$.getJSON(weatherUrl, function(weatherData){
		return setCurrWeather(weatherData);
	});

	$('#weather-search').submit(function(){
		requestedCity = $('#location-field').val();
		weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+requestedCity+'&units=imperial&APPID=' + apiKey;
		console.log(weatherUrl);
		$.getJSON(weatherUrl, function(weatherData){
			return setCurrWeather(weatherData);
		});
		event.preventDefault();

	});
		

});

function setCurrWeather(weatherData){
	var currTemp = weatherData.main.temp
	var canvas = $('#weather-canvas')
	var context = canvas[0].getContext('2d');

	var lineWidth = 5;
	var outerRadius = 70;
	var innerRadius = outerRadius-lineWidth;
	var current = 0;
	var counterClockwise = false;
	var circ = Math.PI * 2;
	var quart = Math.PI / 2;
	var shadeColor;
	function animate(currPerc){
		if(current < 32){
			shadeColor = '#d4f0ff';
		} else if(current < 59){
			shadeColor = '#129793';
		} else if( current < 75){
			shadeColor = '#7cfc00';
		} else if( current < 90 ){
			shadeColor = '#ff6600';
		} else {
			shadeColor = '#e3170d';
		};
		context.fillStyle = '#ccc';
		context.beginPath();
		context.arc(155, 75, innerRadius, 0, circ, true);
		context.closePath();
		context.fill();
		context.strokeStyle = shadeColor;

		context.lineWidth = 10;
		context.beginPath();
		context.arc(155,75, outerRadius, -(quart), ((circ) * currPerc) - quart, false);
		context.stroke();
		context.font = "48px Myriad Pro";
		context.fillStyle = 'Blue';
		context.textBaseline = 'top';
		context.fillText(currTemp, 175-outerRadius, 85-outerRadius/2);
		current++;

		if(current < currTemp ) {
			requestAnimationFrame(function(){
				animate(current/100);
			});
		}
	}
	animate();
	context.closePath();
}