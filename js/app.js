(function () {
	'use strict';

	var getFactBtn = document.getElementById('get-fact');

	window.addEventListener('DOMContentLoaded', getRandomNumberFact);
	getFactBtn.addEventListener('click', getRandomNumberFact);

	function getRandomNumberFact() {
		
		var randomNumber = Math.floor(Math.random() * 200);
		var fact = document.querySelector('#number-fact p');
		var req = new XMLHttpRequest();

		req.onload = function () {
			if ( req.status === 200 && req.status < 400 ) {
				fact.innerHTML = req.responseText;
			}
		}

		req.open('GET', 'http://numbersapi.com/' + randomNumber);
		req.send();	
	}
	
}());