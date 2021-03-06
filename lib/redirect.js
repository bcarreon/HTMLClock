redirect_init();

function redirect_init() {
	var params = {};
	var queryString = location.hash.substring(1);
	var regex = /([^&=]+)=([^&]*)/g
	var m;

	if (location.search && location.search.indexOf("error") <= 1) {
		console.log("error");
		window.close();
		return;
	}

	while (m = regex.exec(queryString)) {
		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}

	window.opener.imgurReturn(params.access_token);
	window.close();
}