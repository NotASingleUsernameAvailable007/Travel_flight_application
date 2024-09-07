const fs = require('fs');

const cities = [
  { name: 'New York City', code: 'JFK' },
  { name: 'Los Angeles', code: 'LAX' },
  { name: 'London', code: 'LHR' },
  { name: 'Tokyo', code: 'NRT' },
  { name: 'Sydney', code: 'SYD' },
];

const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const generateRandomPrice = () => {
  return Math.floor(Math.random() * 1000) + 300; // Prices between 300 and 1300
};

const generateRandomStop = (from, to) => {
  // Filter out the from and to cities from potential stops
  const possibleStops = cities
    .map(city => city.code)
    .filter(code => code !== from && code !== to);

  return possibleStops[Math.floor(Math.random() * possibleStops.length)];
};

const generateFlights = () => {
  const flights = [];

  cities.forEach((cityFrom) => {
    cities.forEach((cityTo) => {
      if (cityFrom.code !== cityTo.code) {
        for (let i = 0; i < 5; i++) {
          const hasStop = Math.random() > 0.7; // 30% chance of having a stop
          const flight = {
            from: cityFrom.code,
            to: cityTo.code,
            stops: hasStop ? [generateRandomStop(cityFrom.code, cityTo.code)] : [],
            price: generateRandomPrice(),
            departure_time: generateRandomTime(),
            arrival_time: generateRandomTime(),
          };
          flights.push(flight);
        }
      }
    });
  });

  return flights;
};

const flights = generateFlights();

fs.writeFileSync('flights.json', JSON.stringify(flights, null, 2), 'utf-8');

console.log('flights.json has been generated with 100 flights.');
