// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

/*var stringifiableObjects = [
  9, 
  null, 
  true, 
  false,
  'Hello world',
  [],
  [8],
  ['hi'],
  [8, 'hi'],
  [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999],
  [8, [[], 3, 4]],
  [[[['foo']]]],
  {},
  {'a': 'apple'},
  {'foo': true, 'bar': false, 'baz': null},
  {'boolean, true': true, 'boolean, false': false, 'null': null },
  // basic nesting
  {'a': {'b': 'c'}},
  {'a': ['b', 'c']},
  [{'a': 'b'}, {'c': 'd'}],
  {'a': [], 'c': {}, 'b': true}
];

// used for stringifyJSON spec
// hint: JSON does not allow you to stringify functions or
// undefined values, so you should skip those key/value pairs.

unstringifiableValues = [
  {
    'functions': function() {},
    'undefined': undefined
  }
]; */

var isNumber = function(obj) {
	return ((typeof(obj) === 'number') && (obj !== Infinity) && (obj !== -Infinity) && (obj.toString() !== 'NaN'));
};

var isNull = function(obj) {
	return (obj === null || obj === Infinity || obj === - Infinity || obj.toString() === 'NaN');
};

var stringifyArray = function(obj) {
	var stringifiedArr = "";

	obj.forEach(function(element, i) {
		if ((element === undefined || typeof(element) === 'function') && i === obj.length - 1) {
			stringifiedArr += "null" ;
		}
		else if ((element === undefined || typeof(element) === 'function') && i !== obj.length - 1) {
			stringifiedArr += "null" + ",";
		}
		else if (i === obj.length - 1) {
			stringifiedArr += stringifyJSON(obj[i]);
		}
		else {
			stringifiedArr += stringifyJSON(obj[i]) + ",";
		}
	});	
	return "[" + stringifiedArr + "]";
};

var stringifyObject = function(obj) {
	var stringifiedObj = "";
	var keysArr = Object.keys(obj);

	for (var key in obj) {
		if (obj[key] === undefined || typeof(obj[key]) === 'function') {
			stringifiedObj = stringifiedObj;
		}
		else if (key === keysArr[keysArr.length - 1]) {
			stringifiedObj += stringifyJSON(key) + ":" + stringifyJSON(obj[key]);
		}
		else {
			stringifiedObj += stringifyJSON(key) + ":" + stringifyJSON(obj[key]) + ",";
		}
	}
	return "{" + stringifiedObj + "}";	
};

var stringifyJSON = function(obj) {
	if (isNumber(obj) || typeof(obj) === 'boolean') {
		return obj.toString();
	}

	else if (isNull(obj)) {
		return "null";
	}

	else if (typeof(obj) === 'string') {
		return '\"' + obj + '\"';
	}

	else if (Array.isArray(obj)) {
		return stringifyArray(obj);
	}

	else if (typeof(obj) === 'object') {
		return stringifyObject(obj);
	}
  
};

