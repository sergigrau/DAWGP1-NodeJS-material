/*
 * Exemple de treball amb DAO
 * @author sergi grau, sergi.grau@fje.edu
 * @version 1.0
 * date 21.01.2021
 * format del document UTF-8
 *
 * CHANGELOG
 * date 21.01.2021
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes el Clot
 */
var http = require("http");
var url = require("url");
var querystring = require("querystring");

function iniciar() {
	function onRequest(request, response) {
		var partsURL = url.parse(request.url);
		console.log("Petició per a  " + partsURL.pathname + " rebuda.");
		response.writeHead(200, {
			"Content-Type" : "text/plain; charset=utf-8"
		});

		response.end();
	}


	http.createServer(onRequest).listen(8888);
	console.log("Servidor iniciat.");
}

exports.iniciar = iniciar;
