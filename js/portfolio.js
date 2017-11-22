(function () {
	'use strict';

	var getFactBtn = document.getElementById('get-fact');
	var isGreeted = /^(.*;)?\s*greeted\s*=\s*[^;]/.test(document.cookie);
	var greeting = document.querySelector('.greeting');

	if ( ! isGreeted ) {

		setTimeout(function () {
			greeting.classList.add('reveal');
		}, 5000);

		setTimeout(function () {
			greeting.classList.remove('reveal');
		}, 15000);

		document.cookie = 'greeted=true;max-age=31556952000';
	}

	window.addEventListener('DOMContentLoaded', getRandomNumberFact);
	getFactBtn.addEventListener('click', getRandomNumberFact);

	function getRandomNumberFact() {

		var randomNumber = Math.floor(Math.random() * 200);
		var fact = document.querySelector('#number-fact p');
		var req = new XMLHttpRequest();

		req.onload = function () {
			if ( req.status === 200 && req.status < 400 ) {
				fact.innerHTML = req.responseText;
			} else {
				fact.innerHTML = 'Error: Could not load fact.';
			}
		};

		req.open('GET', 'http://numbersapi.com/' + randomNumber);
		req.send();
	}

}());
