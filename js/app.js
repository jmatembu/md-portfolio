(function (window) {
	var validator = {};

	/**
	 * Checks if the input parameter is an email address, consisting of three parts.
	 */
	validator.isEmailAddress = function(input) {
		var isEmail = false,
			posAtSymbol = input.indexOf('@'),
			posPeriod = input.indexOf('.');

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (posAtSymbol > 0 && posAtSymbol < input.length - 1) {
			isEmail = true;
			if (posPeriod < posAtSymbol || posPeriod === input.length -1 || posPeriod === posAtSymbol + 1 || input.charAt(posPeriod + 1) === '.') {
				isEmail = false;
			}
		}

		return isEmail;
	};

	/**
	 * Checks if the input parameter is a valid phone number for Uganda.
	 */
	validator.isPhoneNumber = function(input) {

		var result = false,
			phoneNumber = "" + input;

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (!phoneNumber.startsWith('+')) {
			return false;
		} else if (phoneNumber.length !== 16) {
			return false;
		} else if (phoneNumber.charAt(4) !== " " && phoneNumber.charAt(7) !== " " && phoneNumber.charAt(11) !== " ") {
			return false;
		}

		// Start from index 1 to ignore the '+' symbol
		for (var i = 1; i < phoneNumber.length; i++) {
			
			if (Number(phoneNumber.charAt(i))) {
				result = true;
			} else {
				result = false;
			}

		}

		return result;
	};

	/**
	 * Returns the input parameter text with all symbols removed
	 */
	validator.withoutSymbols = function(input) {
		var string = "" + input;
		var result = "";

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		for (var i = 0; i < string.length; i++) {
			if((string.charAt(i).toLowerCase() >= "a" && string.charAt(i) <= "z" ) || 
				string.charAt(i) === " " || Number(string.charAt(i))) {
				result+=string.charAt(i);
			}
		}

		return result;
	};

	/**
	 * Checks if the input parameter text is a valid date, taking a valid date as any 
	 * string that can be turned into a JavaScript Date Object.
	 */
	validator.isDate = function(input) {

		var date = new Date(input.toString());

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}


		return date !== "Invalid Date" && !isNaN(date);
	};

	/**
	 * Checks if the input parameter is a date that comes after the reference date
	 */
	validator.isBeforeDate = function(input, reference) {

		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		if (this.isDate(input) && this.isDate(reference)) {
			return new Date(input.toString()) < new Date(reference.toString());
		}

		return false;
	};

	/**
	 * Checks if the input parameter is a date that comes before the reference date
	 */
	validator.isAfterDate = function(input, reference) {

		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		if (this.isDate(input) && this.isDate(reference)) {
			return new Date(input.toString()) > new Date(reference.toString());
		}

		return false;
	};

	/**
	 * Checks if the input parameter is a date that comes before today
	 */
	validator.isBeforeToday = function(input) {

		input = new Date(input);

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (this.isDate(input)) {
			return input < new Date();
		}

		return false;
	};

	validator.isAfterToday = function(input) {

		input = new Date(input);

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (this.isDate(input)) {
			return input > new Date();
		}

		return false;
	};

	/**
	 * Checks the input parameter and returns true if it is an empty string
	 */
	validator.isEmpty = function(input) {
		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (input == false) {
			return true;
		}

		return false;
	};

	/**
	 * Checks if the input text parameter contains one or more of the words within the words array
	 */
	validator.contains = function(input, words) {

		var string = input.toLowerCase(),
			i,
			word = "",
			charAfterWord,
			charBeforeWord,
			wordMarkers = ["'", "\"", ",", ".", ":", ";", "-", "!", "?", "(", ")", "...", " ", undefined],
			isWordMarker = function(value) {
				return wordMarkers.indexOf(value) >= 0;
			};

		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		for (i = 0; i < words.length; i++) {

			word = words[i].toLowerCase();
			charBeforeWord = string.charAt(string.indexOf(word) - 1);
			charAfterWord = string.charAt(string.indexOf(word) + word.length);

			if (string.indexOf(word) >= 0 && 
				isWordMarker(charBeforeWord) && 
				isWordMarker(charAfterWord)) {
				return true;
			}
	
		}

		return false;
	};

	/**
	 * Checks if the input text parameter does not contain any of the words within the words array.
	 */
	validator.lacks = function(input, words) {

		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		if (this.contains(input, words)) {
			return false;
		}

		return true;
	};

	/**
	 * Checks that the input text parameter contains only strings found within the strings array.
	 */
	validator.isComposedOf = function(input, strings) {

		var result = false,
			i,
			len,
			start = 0,
			end = 0,
			string = "";

		input = input.toLowerCase();

		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		for (i = 0, len = strings.length; i < len; i++) {

			string = strings[i].toLowerCase();

			if (input.indexOf(string) >= 0) {

				start = input.indexOf(string);
				end = string.length - 1;

				input = input.slice(start, end);
			}

		}

		return this.isEmpty(input);
	};

	/**
	 * Checks if the input parameter’s character count is less than or equal to the n parameter.
	 */
	validator.isLength = function(input, n) {
		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		return input.length <= n;
	};

	/**
	 * Checks if the input parameter’s character count is greater than or equal to the n parameter.
	 */
	validator.isOfLength = function(input, n) {
		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		return input.length >= n;
	};

	/**
	 * Checks if the input parameter's character count is equal to the n parameter.
	 */
	validator.equalsLength = function(input, n) {

		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		return input.length === n;
	}

	/**
	 * Counts the number of words in the input parameter.
	 */
	validator.countWords = function(input) {

		var i, len,
			word = "",
			temp = 0,
			words = [],
			isWordMarker = function(value) {
				var wordMarkers = ["'", "\"", ",", ".", ":", ";", "-", "!", "?", "(", ")", "...", " ", undefined];

				return wordMarkers.indexOf(value) >= 0;
			},
			hasWordMarker = function(value) {

				for (var i = 0; i < value.length; i++) {
					if (isWordMarker(value[i])) {
						return true;
					}
				}

				return false;

			};

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		input = input.trim();		

		if (input.length === 0) {
			return 0;
		} else if (hasWordMarker(input) && input.length > 0) {
			for (i = 0, len = input.length; i < len; i++) {

				if (isWordMarker(input[i])) {
					word = input.slice(temp, i);
					temp = i + 1;
					words.push(word);
				}
			}	
		} else {
			return 1;
		}
		

		return words.length;
	};

	/**
	 * Checks if the input parameter has a word count less than or equal to the n parameter.
	 */
	validator.lessWordsThan = function(input, n) {
		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}
		return this.countWords(input) <= n;
	};

	/**
	 * Checks if the input parameter has a word count greater than or equal to the n parameter.
	 */
	validator.moreWordsThan = function(input, n) {
		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		return this.countWords(input) >= n;
	};

	/**
	 * Checks that the input parameter matches all of the following:
	 * 	- input is greater than or equal to the floor parameter
	 *	- input is less than or equal to the ceil parameter..
	 */
	validator.isBetween = function(input, floor, ceil) {
		if (arguments.length < 3) {
			throw "Function requires 3 parameters, " + arguments.length + " given";
		}

		return this.countWords(input) >= floor && this.countWords(input) <= ceil;
	};

	/**
	 * Checks that the input parameter string is only composed of the following characters: a—z, A—Z, or 0—9.
	 */
	validator.isAlphanumeric = function(input) {
		var code, i, len;

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		for (i = 0, len = input.length; i < len; i++) {
			code = input.charCodeAt(i);
			if(!(code >= 48 && code <= 57) && !(code >= 65 && code <= 90) && !(code >= 97 && code <= 122 )) {
				return false;
			}
		}

		return true;
	};

	/**
	 * Checks that the input parameter string is only composed of alphabetic characters.
	 */
	validator.isAlpha = function(input) {
		var code, i, len;

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		for (i = 0, len = input.length; i < len; i++) {
			code = input.charCodeAt(i);
			if(!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122 )) {
				return false;
			}
		}

		return true;
	};

	/**
	 * Checks that the input parameter string is only composed of numerals.
	 */
	validator.isNumeric = function(input) {

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (isNaN(Number(input))) {
			return false;
		}

		return true;
	};

	/**
	 * Checks if the input parameter has leading or trailing whitespaces
	 * or too many spaces between words
	 */
	validator.isTrimmed = function(input) {
		
		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (input.charAt(0) === " " || 
			input.charAt(input.length - 1) === " " || 
			input.indexOf("  ") >= 0) {
			return false;
		}

		return true;
	};

	/**
	 * Checks if the input parameter is a credit card or bank card number.
	 */
	validator.isCreditCard = function(input) {

		var string = input.toUpperCase();

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if ((string.length === 16 && this.isAlphanumeric(string)) || 
			(string.length === 19 && 
				(string.charAt(4) === "-" && 
					string.charAt(9) === "-" && 
					string.charAt(14) === "-")
				)
			) {
			return true;
		}

		return false;
	};

	/**
	 * Checks if the input string is a hexadecimal color, such as #3677bb.
	 */
	validator.isHex = function(input) {
		var code, i, len;

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if ((input.length === 7 || input.length === 4) && input.charAt(0) === "#") {
			for (i = 1, len = input.length; i < len; i++) {
				code = input.charCodeAt(i);
				if(!(code >= 48 && code <= 57) && 
					!(code >= 65 && code <= 70) && 
					!(code >= 97 && code <= 102 )) {
					return false;
				}
			}
		} else {
			return false;
		}

		return true;
	};

	/**
	 * Checks if the input string is an RGB color, such as rgb(200, 26, 131).
	 */
	validator.isRGB = function(input) {

		var arr = [], i, len, num, string = "";

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (input.indexOf("rgb(") >= 0 && input.charAt(input.length - 1) === ")") {

			string = input.replace("rgb(", "");
			string = string.replace(")", "");
			arr = string.split(",");

			if (!!arr && arr.length === 3) {
				for (i = 0, len = arr.length; i < len; i++) {
					num = Number(arr[i]);
					if (!(num >= 0 && num <= 255)) {
						return false;
					}
				}

				return true;	
			}
	
		}

		return false;
	};

	/**
	 * Checks if the input string is an HSL color, such as hsl(122, 1, 1).
	 */
	validator.isHSL = function(input) {

		var arr = [], i, len, string = "";

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (input.indexOf("hsl(") >= 0 && input.charAt(input.length - 1) === ")") {
			
			string = input.replace("hsl(", "");
			string = string.replace(")", "");
			arr = string.split(",");

			if (!!arr && arr.length === 3 &&
				(Number(arr[0]) >= 0 && Number(arr[0]) <= 360) && 
				(Number(arr[1]) >= 0 && Number(arr[1]) <= 1) && 
				(Number(arr[2]) >= 0 && Number(arr[2]) <= 1)) {
				return true;
			}

		}

		return false;
	};

	/**
	 * Checks if the input parameter is a hex, RGB, or HSL color type.
	 */
	validator.isColor = function(input) {
		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (this.isHex(input) || this.isRGB(input) || this.isHSL(input)) {
			return true;
		}

		return false;
	};

	window.validator = validator;
})(window);
(function(window) {

	var calculator = {},
		screen = document.getElementById('screen'),
		clearButton = document.getElementById('clearScreen'),
		deleteButton = document.getElementById('delete'),
		numButtons = document.querySelectorAll('.num'),
		equalsButton = document.getElementById('equals'),
		clearInput = function(element) {
			return element.value = "";
		},
		deleteCharacter = function(element) {
			var string = element.value,
				newString = string.substr(0, string.length - 1);

			element.value = newString;
		},
		calculate = function(string) {
			return eval(string);
		};

	clearButton.addEventListener('click', function() {
		return clearInput(screen);
	});

	deleteButton.addEventListener('click', function() {
		return deleteCharacter(screen);
	});

	equalsButton.addEventListener('click', function() {
		var equation = screen.value;
		screen.value = eval(equation);
	})


	for (var i = 0; i < numButtons.length; i++) {
		numButtons[i].addEventListener('click', function(event) {
			screen.value = screen.value + event.target.value;
		});
	}

})(window);


/*********Login Form*********/
(function(){

	var form = document.querySelector('form.login-form'),
		email = form.elements.email,
		password = form.elements.password,

		clearError = function() {

			this.className = "";
			this.previousElementSibling.className = "error";
			this.previousElementSibling.textContent = "";

		},

		validateForm = function() {

			var passwordInput = password.value,
				emailInput = email.value;

			if (validator.isEmpty(emailInput)) {

				email.className = "invalid";
				email.previousElementSibling.className = "error active";
				email.previousElementSibling.textContent = "Please provide your email address, we need it to identify you.";
				
			} else if (!validator.isEmailAddress(emailInput)) {

				email.className = "invalid";
				email.previousElementSibling.className = "error active";
				email.previousElementSibling.textContent = "The email is of an invalid format. Emails are usually in this format: 'username@domain.com'";
				
			}

			if (validator.isEmpty(passwordInput)) {

				password.className = "invalid";
				password.previousElementSibling.className = "error active";
				password.previousElementSibling.textContent = "Please provide the password to your account.";

			}

		};

	email.addEventListener('input', function(e) {

		var input = email.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(input) || validator.isEmailAddress(input)) {

			doClearError();

		}

	}, false);

	password.addEventListener('input', function(e) {

		var input = password.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(input) || validator.isLength(input, 5)) {

			doClearError();

		}

	}, false);


	form.addEventListener('submit', function(e) {

		e.preventDefault();

		validateForm();

		// Do something with the form's data

	}, false);

})();
(function(window) {

	"use strict";

	var shoppingCartSection = document.getElementById('shoppingCart'),
		toggleBtn = document.getElementById('toggleShoppingCart'),
		totalCartItemLabel = document.getElementById('totalCartItemsLabel'),
		cartSubTotalLabel = document.getElementById('cartSubTotal'),
		cartShippingLabel = document.getElementById('cartShipping'),
		cartTotalLabel = document.getElementById('cartTotal'),
		addCouponElement = document.getElementById('addCoupon'),
		couponInput = document.getElementById('couponInput'),
		toCartProducts = document.getElementsByClassName('add-to-cart'),
		storeElement = document.querySelector('.store'),
		store = {
			items: [
				{
					id: "p101",
					title: "Product 101",
					price: 24.99,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "images/product-1.jpg",
					thumbnail: "images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p102",
					title: "Product 102",
					price: 19.99,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "images/product-1.jpg",
					thumbnail: "images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p103",
					title: "Product 103",
					price: 9.99,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "images/product-1.jpg",
					thumbnail: "images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p104",
					title: "Product 104",
					price: 29.99,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "images/product-1.jpg",
					thumbnail: "images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p105",
					title: "Product 105",
					price: 20,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "images/product-1.jpg",
					thumbnail: "images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p106",
					title: "Product 106",
					price: 24.99,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "images/product-1.jpg",
					thumbnail: "images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p107",
					title: "Product 107",
					price: 22,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "images/product-1.jpg",
					thumbnail: "images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p108",
					title: "Product 108",
					price: 18,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "images/product-1.jpg",
					thumbnail: "images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p109",
					title: "Product 109",
					price: 19,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "images/product-1.jpg",
					thumbnail: "images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p110",
					title: "Product 110",
					price: 12,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "images/product-1.jpg",
					thumbnail: "images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p111",
					title: "Product 111",
					price: 26,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "images/product-1.jpg",
					thumbnail: "images/product_thumbnail.jpg",
					quantity: 1
					
				},
				{
					id: "p112",
					title: "Product 112",
					price: 12,
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
					img: "images/product-1.jpg",
					thumbnail: "images/product_thumbnail.jpg",
					quantity: 1
				}
			],
			promos: [
				{
					name: "MEGABLAST",
					amount: 0.05
				},
				{
					name: "IWANTTHIS",
					amount: 0.1,
					product: "p112"
				},
				{
					name: "GETTHEM",
					amount: 0.15,
					products: ["p112", "p111", "p110", "p109", "p101"]
				}
			],
			getItem: function(id) {

				var i;

				for (i = this.items.length - 1; i >= 0; i--) {
					if (this.items[i].id === id) {
						return this.items[i];
					}
				}

				throw "Product " + id + " was not found in store";
			},
			getPromo: function(code) {

				for (var i = this.promos.length - 1; i >= 0; i--) {
					if (code == this.promos[i].name) {
						return this.promos[i];
					}
				}

				return false;
			}
		},
		cart = {},
		toggleVisibility = function(element) {

			var classes = element.classList;

			if (classes.contains('hidden')) {

				element.classList.remove('hidden');
				setLabel(toggleBtn, 'Hide Cart');

			} else {

				element.classList.add('hidden');
				setLabel(toggleBtn, 'View Cart');

			}
		},

		/**
		 * Build the HTML structure of the product to be added 
		 * into the cart and on to the page.
		 *
		 * @params Object product
		 * return DOM Nodes
		 */
		buildProductHTML = function(product) {
			// Create elements
			var liCartProduct = document.createElement('li'),
				ulCartProductDetails = document.createElement('ul'),
				liCartProductName = document.createElement('li'),
				imgProduct = document.createElement('img'),
				spanProductName = document.createElement('span'),
				productName = document.createTextNode(product.title),

				liCartProductQuantity = document.createElement('li'),
				inputQuantity = document.createElement('input'),
				liCartProductPrice = document.createElement('li'),
				spanProductPrice = document.createElement('span'),
				productPrice = document.createTextNode('$' + product.price),
				liCartProductAction = document.createElement('li'),
				buttonRemove = document.createElement('button'),
				iconRemove = document.createElement('i');
				
			/**
			 * Create HTML structure
			 */

			// List item with product name and image
			liCartProductName.setAttribute('class', 'cartProductName');
			imgProduct.setAttribute('src', product.thumbnail);
			liCartProductName.appendChild(imgProduct);
			spanProductName.appendChild(productName);
			liCartProductName.appendChild(spanProductName);
			
			// List item with product quantity
			liCartProductQuantity.setAttribute('class', 'cartProductQuantity');
			inputQuantity.setAttribute('type', 'number');
			inputQuantity.setAttribute('value', '1');
			inputQuantity.setAttribute('min', '0');
			inputQuantity.setAttribute('id', 'quantity_' + product.id);
			inputQuantity.addEventListener('change', changeItemQuantity, false);
			liCartProductQuantity.appendChild(inputQuantity);

			// List item with product price
			liCartProductPrice.setAttribute('class', 'cartProductPrice');
			spanProductPrice.appendChild(productPrice);
			liCartProductPrice.appendChild(spanProductPrice);
			
			// List item with product remove action.
			liCartProductAction.setAttribute('class', 'cartProductAction');
			buttonRemove.setAttribute('class', 'close');
			buttonRemove.setAttribute('title', 'Remove ' + product.title + ' from Shopping Cart');
			buttonRemove.setAttribute('id', 'remove_' + product.id);
			iconRemove.setAttribute('class', 'ti-trash');
			buttonRemove.appendChild(iconRemove);
			buttonRemove.addEventListener('click', removeProductHTML, false);
			liCartProductAction.appendChild(buttonRemove);
			
			// Product Details
			ulCartProductDetails.setAttribute('class', 'cartProductDetails');
			ulCartProductDetails.appendChild(liCartProductName);
			ulCartProductDetails.appendChild(liCartProductQuantity);
			ulCartProductDetails.appendChild(liCartProductPrice);
			ulCartProductDetails.appendChild(liCartProductAction);

			// Cart product list item
			liCartProduct.setAttribute('class', 'cartProduct');
			liCartProduct.appendChild(ulCartProductDetails);

			return liCartProduct;
		},

		/**
		 * Render the HTML of a product into the cart.
		 *
		 * @params Object product
		 */
		renderCartItemHTML = function(product) {
			
			var listOfProductsInCart = document.querySelector('.cartProductList');

			listOfProductsInCart.appendChild(buildProductHTML(product));

		},

		/**
		 * Extract id embedded in an element's id attribute
		 *
		 * @params Event event
		 * return String id
		 */
		extractProductId = function(event) {

			var id;

			// Check is user clicked on icon or what a parent element to the icon
			// Then get id attribute from element that has been clicked on
			if (event.target.nodeName === "I") {
			
				id = event.target.parentElement.getAttribute('id');
			
			} else {
			
				id = event.target.getAttribute('id');
			
			}

			id = id.substr(id.indexOf('_') + 1);

			return id;
		},

		/**
		 * Remove the HTML of the product
		 *
		 * @params Event event
		 */
		removeProductHTML = function(event) {

			var product, id = extractProductId(event);
			
			

			product = store.getItem.call(cart, id);
			cart.removeItem(product.id);
			setLabel(totalCartItemLabel, cart.count());
			setLabel(cartTotalLabel, cart.getTotal()); // Total amount of items in cart
			event.target.parentElement.parentElement.parentElement.remove();

			if (cart.count() === 0) {
				
				toggleVisibility(shoppingCartSection);
			
			}

		},

		/**
		 * Recalculate total amount when the shopper changes the item quantity.
		 *
		 * @params Event event
		 */
		changeItemQuantity = function(event) {

			var id = event.target.getAttribute('id').substr(9),
				quantity = event.target.value * 1, // Convert the value to a number
				product = store.getItem.call(cart, id);
			
			product.quantity = quantity;
			setLabel(cartTotalLabel, cart.getTotal()); // Total amount of items in cart
			
			if (quantity === 0) {
				// Remove product if user reduces quantity to zero.
				removeProductHTML(event);

			}
			
		},
		
		/**
		 * Set the text content of any element
		 */
		setLabel = function(element, label) {

			element.textContent = label;
		
		},

		/**
		 * Round off numbers
		 */
		round = function(value, decimals) {
		
		  	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
		
		};
	// Promo code used by shopper
	cart.promo = ""; 
	// Items selected by shopper
	cart.items = [];
	
	/**
	 * Count the number of items in the cart
	 *
	 * return Number
	 */
	cart.count = function() {
	
		return this.items.length;
	
	};

	/**
	 * Remove an item from cart
	 *
	 * params @id String The unique identifier for each item in the cart
	 */
	cart.removeItem = function(id) {

		for (var i = this.items.length - 1; i >= 0; i--) {

			if (this.items[i].id === id) {
				// Reset quantity to 1, the initial value.
				this.items[i].quantity = 1; 
				// Remove item from the cart
				return this.items.splice(i, 1);
			}

		}

	};

	/**
	 * Calculate the total order amount taking into consideration
	 * possibility of shoppers with promo codes
	 */
	cart.getTotal = function() {

		var result = 0,
			discount = 0;
		// Calculate the total if we have one or more items in the cart
		if (this.count() > 0) {
			// TODO: Refactor this code
			for (var i = this.items.length - 1; i >= 0; i--) {
				
				discount = this.items[i].price - (this.items[i].price * this.promo.amount);
				
				if (this.promo !== "" && this.promo.name === "IWANTTHIS" && this.items[i].id === this.promo.product) {
					
					result += discount * this.items[i].quantity;

				} else if (this.promo !== "" && this.promo.name === "GETTHEM") {

					if (this.promo.products.indexOf(this.items[i].id) >= 0) {

						result += discount * this.items[i].quantity;

					} else {

						result += this.items[i].price * this.items[i].quantity;

					}

				} else if (this.promo !== "" && this.promo.name === "MEGABLAST") {
					
					result += discount * this.items[i].quantity;

				} else {

					result += this.items[i].price * this.items[i].quantity;

				}
								
			}
			// Resetting the promo code back to an empty string
			// allows shopper to use a different coupon
			this.promo = "";

		}

		// Final total order amount rounded off to 2 decimal places
		return round(result, 2);
	};

	/**
	 * Add product to cart
	 *
	 * @params Event
	 */
	cart.addToCart = function(event) {

		event.preventDefault();

		var id = "", product = {};

		// The shopper might click on the icon or the link itself
		// either way, we need to get the id
		if (event.target.nodeName === "I") {
		
			id = event.target.parentElement.parentElement.parentElement.getAttribute('id');
		
		} else if (event.target.nodeName === "A") {
		
			id = event.target.parentElement.parentElement.getAttribute('id');
		
		}

		function inCart(value) {

			return value.id !== id;

		}

		// Pick the product from the store
		product = store.getItem(id);

		if (cart.items.every(inCart)) {
			// Add the product to the cart object
			cart.items.push(product);
			// Render the HTML with product info into the cart
			renderCartItemHTML(product);
		}
		
		// Show number or items in the cart
		setLabel(totalCartItemLabel, cart.count());
		// Calculate and show the total amount of products in cart
		setLabel(cartTotalLabel, cart.getTotal()); 

		event.stopPropagation();
	};

	toggleBtn.addEventListener('click', function(event) {
		
		toggleVisibility(shoppingCartSection);
	
	});

	toggleVisibility(shoppingCartSection);

	addCouponElement.addEventListener('click', function(event) {
		
		var promoInput = event.target.previousElementSibling.value,
			promo = store.getPromo(promoInput);

		if (promo) {
			// Add the promo code to cart
			cart.promo = promo;
			// Calculate the total amount
			setLabel(cartTotalLabel, cart.getTotal());
		
		}

		
	});

	// Listen to those shopper "add-to-cart" clicks
	storeElement.addEventListener('click', cart.addToCart, false);
	
	// The initial number products in cart, which is usually 0.
	// Could just set the element text to 0. :)
	setLabel(totalCartItemLabel, cart.count());

})(window);
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
