$(function() {
	var url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=content";
	
	$.ajax({
		url: url,
		type: 'GET',
		data: {titles: "computers"},
		contentType: 'application/json; charset=utf-8',
		success: function(data)	{
			console.log(data);
		}
	});
});