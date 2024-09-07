const fs = require('fs');

const cities = [
  { name: 'New York City', code: 'JFK', country: 'USA' },
  { name: 'Los Angeles', code: 'LAX', country: 'USA' },
  { name: 'London', code: 'LHR', country: 'UK' },
  { name: 'Tokyo', code: 'NRT', country: 'Japan' },
  { name: 'Sydney', code: 'SYD', country: 'Australia' },
];

const hotelNames = [
  'Grand Hotel',
  'Elite Suites',
  'Luxury Inn',
  'Royal Palace',
  'Comfort Stay'
];

const generateRandomRating = () => {
  return (Math.random() * 3 + 6).toFixed(1); // Ratings between 7.0 and 10.0
};

const generateRandomPrice = () => {
  return Math.floor(Math.random() * 400) + 100; // Prices between 100 and 500 per night
};

const generateHotels = () => {
  const hotels = [];

  cities.forEach((city) => {
    hotelNames.forEach((hotelName, index) => {
      const hotel = {
        name: `${hotelName} ${index + 1}`,
        address: `${index + 1} Main Street, ${city.name}, ${city.country}`,
        stars: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
        rating: generateRandomRating(),
        amenities: [
          'Free Wi-Fi',
          'Swimming pool',
          'Fitness center',
          'Restaurant',
          'Bar',
          'Room service'
        ],
        price_per_night: generateRandomPrice()
      };
      hotels.push(hotel);
    });
  });

  return hotels;
};

const hotels = generateHotels();

fs.writeFileSync('hotels.json', JSON.stringify(hotels, null, 2), 'utf-8');

console.log('hotels.json has been generated with 25 hotels.');
