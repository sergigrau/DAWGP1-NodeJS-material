/*
 * arxiu principal que arrenca el servidor HTTP
 * @author sergi grau
 * @version 1.0
 * date 14.02.2014
 * format del document UTF-8
 *
 * CHANGELOG
 * 08.10.2015
 * - arxiu principal que arrenca el servidor HTTP
 *
 * 01.11.2021
 * actualització a Mongo Client 4.1.3
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes el Clot
 */
var server = require("./M10_servidorMongoDB");

server.iniciar();