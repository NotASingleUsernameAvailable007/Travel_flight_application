// services/service.js

const { getFlights } = require('./flightService');
const { getHotels } = require('./hotelService');

module.exports = { getFlights, getHotels };
