var db = require('./_db');

var Place = require('./place');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');

var Itinerary = db.define('itinerary', {

});

module.exports = Itinerary;

