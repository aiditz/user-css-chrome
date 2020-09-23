/* global CodeMirror */

var code_editor;

$(document).ready(function() {
	console.log('init options');

	chrome.storage.sync.get('user_css', function(val) {
		console.log('got sync', val);

		if (typeof val.user_css != 'undefined') {
			code_editor.setValue(val.user_css);
		}
	});

	var editor = $("#user_css");

	editor.attr('placeholder',
		"## GLOBAL\n" +
		"{ global rules go here }\n" +
		"## example.com,sample.com\n"+
		"{ rules for example.com or sample.com }\n");

	code_editor = CodeMirror.fromTextArea(editor[0],
		{
			mode: 'css',
			lineNumbers: 1,
			indentUnit: 5,
			lineWrapping: 0,
			matchBrackets: 1,
			autoCloseBrackets: 1
		});

	$("#options").on('submit', function() {
		var user_css = code_editor.getValue();

		localStorage['user_css'] = user_css;

		chrome.storage.sync.set({user_css: user_css}, () => {
			$("#message").html("Data saved");
		});

		return false;
	});


});
