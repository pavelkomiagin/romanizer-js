'use strict';

var Romanizer = function(a, b) {
  var romanChars  = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];
  var arabicNumbers = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];

  var romanize = function(arabic) {
    arabic = parseInt(arabic);

    if (isNaN(arabic) || arabic < 1 || arabic > 3999) {
      throw new Error('Expected input number between 0 and 4000');
    }

    var romanized = '';

    romanChars.forEach(function (value, index) {
      var arabicNumber = arabicNumbers[index];
      while (arabic >= arabicNumber) {
        romanized += value;
        arabic -= arabicNumber;
      }
    });

    return romanized;
  };

  return {
    romanize: romanize
  };
};

module.exports = {
  romanizer: new Romanizer()
};
