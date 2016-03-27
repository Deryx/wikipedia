var arrResults = [];
var html = '';

// Create structure for the data
function Result(title, snippet) {
	this.title = title;
	this.snippet = snippet;
}

function search() {
	// Use Ajax to handle things
	$.ajax({
		url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#subject').val(),
		dataType: 'jsonp',
		type: 'POST',
		headers: {
			'Api-User-Agent': 'Example/1.0'
		},
		success: function(data) {

			// First we clear the children from our class to make sure no previous results are showing.
			$('.results').empty();

			// Then we also clear the array with the results before providing new information.
			arrResults.length = 0;
			var resArr = data.query.search;

			//For each result, generate the html data.
			for (var result in resArr) {
				arrResults.push(new Result(resArr[result].title, resArr[result].snippet));
				html = '<a href="https://en.wikipedia.org/wiki/' + resArr[result].title + '"target="_blank"><div id="articles" class="well"><h3>' + resArr[result].title + '</h3><p>' + resArr[result].snippet.substring(0, resArr[result].snippet.lastIndexOf('.') + 1) + '</p></div></a>';

				// Displays the elements to the page
				$('.results').append(html);
			}
		}
	});

	// This will handle when to display results based on the search bar.
	if ($('#subject').val().length > 0) {
		$('.articles').css('display', 'none');

	} else if ($('#subject').val().length < 1) {
		// display everything again
		$('.articles').css('display', 'block');
	}

	// This make things tick with each key stroke
	$('#subject').unbind('keyup');
	$('#subject').keyup(function() {
		search();
	});
}

$('#subject').keyup(function() {
	search();
});

$('#btnRandom').click(function() {
	window.open("http://en.wikipedia.org/wiki/Special:Random", "_blank");
});

$('#btnClear').click(function() {
	window.location = "index.html";
});