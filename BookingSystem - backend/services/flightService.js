const flights = require('../data/flights.json');
const cities = require('../data/cities.json');

// In-memory cache for getFlights results
const flightCache = {};

// Function to get flights based on origin and destination
function getFlights(origin, destination) {
    const cacheKey = `${origin}-${destination}`;

    // Validate that the origin exists in the cities list
    const validOrigin = cities.find(city => city.code === origin);
    if (!validOrigin) {
        throw new Error(`Invalid origin: ${origin}`);
    }

    // Validate that the destination exists in the cities list
    const validDestination = cities.find(city => city.code === destination);
    if (!validDestination) {
        throw new Error(`Invalid destination: ${destination}`);
    }

    // Check cache for result
    if (flightCache[cacheKey]) {
        return flightCache[cacheKey];
    }

    // Filter flights based on origin and destination
    const validFlights = flights.filter(flight => flight.from === origin && flight.to === destination);

    // Cache the result
    flightCache[cacheKey] = validFlights;
    
    return validFlights;
}

module.exports = { getFlights };
