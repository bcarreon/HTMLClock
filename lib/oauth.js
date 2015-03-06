init({"client_id":"835c141b5b20ce1", "type":"token", "callback_function":"alertUsername()"});

var client_id;
var type;
var callback_function;

function login() {
	window.open("https://api.imgur.com/oauth2/authorize?client_id=" + client_id + "&response_type=" + type);
}

function alertUsername() {

}

function init(json) {
	client_id = json.client_id;
	type = json.type;
	callback_function = json.callback_function;
}