/*
 * Servidor HTTP millorat amb Node JS. Utilitza una funció refactorizada.
 * 2 peticions perque navegador demana el favicon, fa un d'URL per a preparar
 * l'encaminament
 * @author sergi grau, sergi.grau@fje.edu
 * @version 1.0
 * date 14.02.2014
 * format del document UTF-8
 *
 * CHANGELOG
 * 08.10.2015
 * - Servidor HTTP bàsic amb Node JS
 * 01.11.2021
 * - Actualització a NodeJS 17
 *
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes el Clot
 */
var http = require("http");
var url = require("url");

function iniciar() {
    function onRequest(req, res) {
        const baseURL = req.protocol + '://' + req.headers.host + '/';
        const reqUrl = new URL(req.url, baseURL);
        console.log(reqUrl);
        console.log("Petició per a  " + reqUrl.pathname + " rebuda.");
        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8"
        });
        res.write('camí: ' + reqUrl.pathname + '\n');
        res.write('consulta: ' + reqUrl.search + '\n');
        // searchParams retorna un objecte del tipus URLSearchParams
        res.write('parametre: ' + reqUrl.searchParams.get('parametre') + '\n');
        res.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Servidor iniciat.");
}

exports.iniciar = iniciar;