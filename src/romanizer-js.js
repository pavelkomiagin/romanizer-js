'use strict';

var Romanizer = function(a, b) {
  var romanChars  = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];
  var arabicNumbers = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];

  var romanize = function(arabic) {
    var romanized = '';
    var arabicNumber;
    
    arabic = parseInt(arabic);

    if (isNaN(arabic) || arabic < 1 || arabic > 3999) {
      throw new Error('Expected input number between 0 and 4000');
    }

    romanChars.forEach(function (value, index) {
      arabicNumber = arabicNumbers[index];
      while (arabic >= arabicNumber) {
        romanized += value;
        arabic -= arabicNumber;
      }
    });

    return romanized;
  };
  
  function deromanize(roman) {
    var arabicResult = 0;
    var max = roman.length
    var counter = 0;
    var currentIndex;
    var nextIndex;
    var currentArabicNumber;
    var nextArabicNumber;
    
    roman = roman.toUpperCase();
    
    if (roman.replace(/[IVXDLCM]/gi, '').length) {
      throw new Error('Not valid symbols in roman numeral');
    }
    
    while (counter < max) {
        currentIndex = romanChars.indexOf(roman.charAt(counter));
        nextIndex = romanChars.indexOf(roman.charAt(counter + 1));
        currentArabicNumber = arabicNumbers[currentIndex];
        nextArabicNumber = arabicNumbers[currentIndex]
        
        if (counter + 1 < max && nextArabicNumber > currentArabicNumber) {
            arabicResult += nextArabicNumber - currentArabicNumber;
            counter += 2;
        } else {
            arabicResult += currentArabicNumber;
            counter += 1;
        }
    }
    
    return arabicResult;
  };

  return {
    deromanize: deromanize,
    romanize: romanize
  };
};

module.exports = Romanizer;
