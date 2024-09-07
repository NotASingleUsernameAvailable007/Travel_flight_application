// controllers/travelController.js

const { getFlights, getHotels } = require('../services/service');
const cities = require('../data/cities.json'); // Load the cities data

const searchTrips = (req, res) => {
    const { origin, budget, numberOfNights } = req.body;
  
    try {
        // Filter out the origin city from the list of cities to get possible destinations
        const destinations = cities
            .filter(city => city.code !== origin)
            .map(city => city.code);
  
        // Get flights, hotels, and return flights within the budget
        let results = destinations.map(destination => {
            const destination_city = cities.find(city => city.code === destination); // Find city details
            const origin_city = cities.find(city => city.code === origin); // Find city details

  
            // First call: Get outbound flights and filter by budget
            const validOutboundFlights = getFlights(origin, destination).filter(flight => flight.price <= budget);
  
            return validOutboundFlights.flatMap(outboundFlight => {
                const remainingBudgetAfterOutbound = budget - outboundFlight.price;
  
                // If remaining budget is already insufficient, skip to the next outbound flight
                if (remainingBudgetAfterOutbound <= 0) return [];
  
                // Hotels call: Get hotels within the remaining budget after outbound flight
                const validHotels = getHotels(destination, remainingBudgetAfterOutbound, numberOfNights).hotels;
  
                return validHotels.flatMap(hotel => {
                    const remainingBudgetAfterHotel = remainingBudgetAfterOutbound - (hotel.price_per_night * numberOfNights);
  
                    // If remaining budget is already insufficient, skip to the next hotel
                    if (remainingBudgetAfterHotel <= 0) return [];
  
                    // Return flights call: Get return flights within the remaining budget after hotel
                    const validReturnFlights = getFlights(destination, origin).filter(returnFlight => returnFlight.price <= remainingBudgetAfterHotel);
  
                    return validReturnFlights.map(returnFlight => {
                        const totalBudgetUsed = outboundFlight.price + hotel.price_per_night * numberOfNights + returnFlight.price;
                        const remainingBudget = budget - totalBudgetUsed;
  
                        return {

                            destination_code: destination,
                            destination_name: destination_city.name,
                            origin_name: origin_city.name,
                            outboundFlight,
                            hotel,
                            returnFlight,
                            totalBudgetUsed,
                            remainingBudget
                        };
                    });
                });
            });
        }).flat().filter(result => result.remainingBudget >= 0);
  
        // Sort the results by descending order of remaining budget
        results = results.sort((a, b) => b.remainingBudget - a.remainingBudget);
  
        res.json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { searchTrips };
