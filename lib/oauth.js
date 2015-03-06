init({"client_id":"835c141b5b20ce1", "type":"token", "callback_function":"alertUsername()"});

var client_id;
var type;
var callback_function;

function login() {
	window.open("https://api.imgur.com/oauth2/authorize?client_id=" + client_id + "&response_type=" + type);
}

function alertUsername(access_token) {
	var url = "https://api.imgur.com/3/account/me";
	$.ajax({
	   type: 'GET',
	   url: url,
	   headers: {"Authorization": "Bearer " + access_token}
	}).done(function(data) { 
	   alert("Hello " + data.data.url);
	}).fail(function(data) {
	   console.log("Failure occured on trying to show username.");
	   console.log(data);
	});
}

function imgurReturn(access_token) {
    if (access_token) {
        alertUsername(access_token);
    } else {
        console.log("No acceess token provided.");
    }
}

function init(json) {
	client_id = json.client_id;
	type = json.type;
	callback_function = json.callback_function;
}