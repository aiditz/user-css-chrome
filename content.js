function inject_css(css) {

	var style = $("<style>")
		.attr('type', 'text/css')
		.text(css);

	$("head").append(style);
}

chrome.runtime.sendMessage({method: "getCSS", href: location.href}, function(response) {
	console.log('got styles', response);

	var user_css = response.user_css;

	inject_css(user_css);

});

