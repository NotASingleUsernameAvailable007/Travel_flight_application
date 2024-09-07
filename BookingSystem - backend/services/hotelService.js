const hotels = require('../data/hotels.json');
const cities = require('../data/cities.json');

// Function to get hotels based on destination, budget, and number of nights
function getHotels(destination, budget, numberOfNights) {
    // Validate that the destination exists in the cities list
    const validDestination = cities.find(city => city.code === destination);
    if (!validDestination) {
        throw new Error(`Invalid destination: ${destination}`);
    }

    // Filter hotels based on destination, budget, and number of nights
    const validHotels = hotels.filter(hotel => {
        return hotel.address.includes(validDestination.name) &&
            hotel.price_per_night * numberOfNights <= budget;
    });

    return {
        name: validDestination.name,
        hotels: validHotels
    };
}

module.exports = { getHotels };
