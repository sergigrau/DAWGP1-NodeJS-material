/*
 * Servidor HTTP millorat amb Node JS. 
 * Connecta amb MongoDB i realitza diverses operacions CRUD
 * @author sergi grau, sergi.grau@fje.edu
 * @version 2.0
 * date 06.04.2017
 * format del document UTF-8
 *
 * CHANGELOG
 * 08.04.2016
 * - Connecta amb MongoDB i realitza diverses operacions CRUD
 * 06.04.2017
 * - millora la sortida de les operacions realitzades amb mongodb
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes el Clot
 */
var http = require("http");
var url = require("url");

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); //utilitzem assercions

var ObjectId = require('mongodb').ObjectID;

function iniciar() {

    var ruta = 'mongodb://localhost:27017/daw2';
    MongoClient.connect(ruta, function (err, client) {
        assert.equal(null, err);
        console.log("Connexió correcta");
        var db = client.db('usuaris');
        afegirDocuments(db, err, function () { });
        //consultarDocumentMenor40(db, err, function () { });
        consultarDocument(db, err, function () { });
        esborrarTotsDocuments(db, err, function () {
            client.close();
        });
        //atenció aquestes crides són asíncrones cal tancar la connexió en la darrera
        // Malament db.close();
    });

    function onRequest(req, res) {
        const baseURL = req.protocol + '://' + req.headers.host + '/';
        const reqUrl = new URL(req.url, baseURL);
        console.log("Petició per a  " + reqUrl.pathname + " rebuda.");
        response.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8"
        });
        response.write('camí: ' + ruta + '\n');

        var consulta = reqUrl.searchParams;
        console.log(consulta);

        consulta.forEach(function (valor, clau) {
            res.write('parametre: ' + clau + '\n');
            res.write('valor: ' + valor + '\n');

        }); response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Servidor iniciat.");
}

var afegirDocuments = function (db, err, callback) {
    db.collection('usuaris').insertOne({
        "nom": "sergi",
        "anys": 45,
        "telf": "123-567-890"
    });
    db.collection('usuaris').insertOne({
        "nom": "joan",
        "anys": 30,
        "telf": "123-567-890"
    });
    assert.equal(err, null);
    console.log("Afegit document a col·lecció usuaris");
    callback();

};

var consultarDocument = function (db, err, callback) {
    var cursor = db.collection('usuaris').find({
        "nom": "sergi"
    });
    cursor.toArray((function (err, results) {
        assert.equal(err, null);

        
        if (results != null) {
            results.forEach((doc)=>{
                console.log(`nom ${doc.nom} i anys ${doc.anys}`);

            });
        } else {
            callback();
        }
    }));
};

var consultarDocumentMenor40 = function (db, err, callback) {
    var cursor = db.collection('usuaris').find({
        "anys": {
            $lt: 40
        }
    });
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc.nom, doc.anys);
        } else {
            callback();
        }
    });
};

var esborrarTotsDocuments = function (db, err, callback) {
    db.collection('usuaris').deleteMany({}, function (err, results) {
        //console.log(results);
        callback();
    });
}

exports.iniciar = iniciar;