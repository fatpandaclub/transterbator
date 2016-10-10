
const dirtyWords = ["butt", "poop", "bangin'", "penis", "vajayjay", "böner"];

$(document).ready(function () {

	$('#do-translate').on('click', function() {

		var from = $('.language-from').val();
		var to = $('.language-to').val();
		var textToTranslate = $('#translate-input').val();

		translate(from, to, textToTranslate);
	});

	$('#do-calculate').on('click', function() {
		var calculateInputFirst = $('#calculate-input-first').val();
		var calculateInputSecond = $('#calculate-input-second').val();
		var calculateOperator = $('#calculate-input-operation').val();

		calculate(calculateInputFirst, calculateInputSecond, calculateOperator);
	})
});


function translate(from, to, textToTranslate) {

	$('.translation').html('');

	var textArr = textToTranslate.split(" ");
	var translatedString = "";

	var nope = getRandomInt(0, 10);
	if(nope === 1) {
		return $('.translation').append('transterbating was to hart sorrry');
	}

	$.each(textArr, function( index, value ) {
		value = $.trim(value);
		value = encodeURI(value);

  		var path = 'https://glosbe.com/gapi/translate?from=' + from + '&dest=' + to + '&format=json&phrase=' + value + '&pretty=true';

  		$.ajax({
  			url: path,
  			method: 'get',
  			async: false
  		}).done(function(data, status) {
  			console.log(data);
			if(data.tuc.length && data.tuc[0].phrase) {
				var translation = data.tuc[0].phrase.text;
				$('.translation').append(translation + " ");
				translatedString += translation + " ";
			} else {
				var notTranslated = decodeURI(value);
				//$('.translation').append(notTranslated + " ");
				//translatedString += notTranslated + " ";

				var aRandomDirtyWord = randomDirtyWord();
				$('.translation').append(aRandomDirtyWord + " ");
				translatedString += aRandomDirtyWord + " ";
			}
	    });
	});

	console.log(translatedString);
}


function calculate(calculateInputFirst, calculateInputSecond, calculateOperator) {
	var first = getRandomInt(1, 12);
	var second = calculateInputSecond;
}

function randomDirtyWord() {
    var int = getRandomInt(0, dirtyWords.length - 1);
    return dirtyWords[int];
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}