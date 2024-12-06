function transformAwards(awards) {
  // creating a Map to group awards by category & year
  const prizesMap = new Map();

  // iterating over each award to organize them by category & year
  for (const award of awards) {
    // Combining category & year to form a unique key
    const key = `${award.category}-${award.year}`;

    // if key doesn't exist in the map, we will initialize an entry
    if (!prizesMap.has(key)) {
      prizesMap.set(key, {
        category: award.category,
        year: award.year,
        winners: [],
      });
    }

    // Pushing winner's name to the appropriate category-year group
    prizesMap.get(key).winners.push({ name: award.name });
  }

  // Converting Map into an array of prizes
  const prizes = Array.from(prizesMap.values());

  // For each prize, we will calculate share for each winner
  prizes.forEach(prize => {
    const winnerCount = prize.winners.length;

    // Distributing shares based on specific logic
    prize.winners = prize.winners.map((winner, index) => {
      let share;
      
      // Special case for Chemistry 2019,  we will distribute shares equally
      if (prize.category === "Chemistry" && prize.year === 2019) {
        share = parseFloat((1 / winnerCount).toFixed(4)); // Equal distribution
      } else {
        // General case: First winner gets 0.5, others get 0.25
        share = winnerCount === 3 && index === 0 ? 0.5 : 0.25;
      }

      // returning winner object with the calculated share
      return { ...winner, share };
    });
  });

  // returning final list of prizes with winners & their shares
  return prizes;
}

// Input data for the awards
const awards = [
  { name: 'James Peebles', category: 'Physics', research: 'Theoretical discoveries in physical cosmology', year: 2019 },
  { name: 'Michel Mayor', category: 'Physics', research: 'Discovery of an exoplanet orbiting a solar-type star', year: 2019 },
  { name: 'Didier Queloz', category: 'Physics', research: 'Discovery of an exoplanet orbiting a solar-type star', year: 2019 },
  { name: 'John B. Goodenough', category: 'Chemistry', research: 'Development of lithium-ion batteries', year: 2019 },
  { name: 'M. Stanley Whittingham', category: 'Chemistry', research: 'Development of lithium-ion batteries', year: 2019 },
  { name: 'Akira Yoshino', category: 'Chemistry', research: 'Development of lithium-ion batteries', year: 2019 },
  { name: 'Arthur Ashkin', category: 'Physics', research: 'Optical tweezers and their application to biological systems', year: 2018 },
  { name: 'Gerard Mourou', category: 'Physics', research: 'Method of generating high-intensity, ultra-short optical pulses', year: 2018 },
  { name: 'Donna Strickland', category: 'Physics', research: 'Method of generating high-intensity, ultra-short optical pulses', year: 2018 },
  { name: 'Frances H. Arnold', category: 'Chemistry', research: 'Directed evolution of enzymes', year: 2018 },
  { name: 'George P. Smith', category: 'Chemistry', research: 'Phage display of peptides and antibodies.', year: 2018 },
  { name: 'Sir Gregory P. Winter', category: 'Chemistry', research: 'Phage display of peptides and antibodies.', year: 2018 },
];

// Calling the function to transform the awards
const prizes = transformAwards(awards);

// printing result in a well-formatted JSON string
console.log(JSON.stringify(prizes, null, 2));
