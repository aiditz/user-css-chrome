chrome.storage.sync.get('user_css', (ret) => {
	if (typeof ret.user_css != 'undefined') {
		localStorage['user_css'] = ret.user_css;
	}
});

chrome.storage.onChanged.addListener((changes, namespace) => {
   if (namespace == "sync" && typeof changes.user_css != "undefined") {
		console.log("settings changed", changes);
		localStorage['user_css'] = changes.user_css.newValue;
   }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.method == "getCSS") {
		var href = request.href;

		console.log('requested styles for', href);

		var user_css = localStorage['user_css'];
		var lines = user_css.split("\n");
		var tmp = [];

		var section = "";
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];

			if (line.indexOf("##") == 0) {
				section = line.substr(2).trim().split(",");
				continue;
			}

			if (section[0] == "GLOBAL" || section.length == 0) {
				tmp.push(line);
			} else {
				for (var j = 0; j < section.length; j++) {
					if (href.indexOf(section[j].trim()) != -1) {
						tmp.push(line);
					}
				}
			}
		}

		sendResponse({user_css: tmp.join("\n")});

	} else {
		console.warn('unknown method', request.method);
		sendResponse({});
	}
});
