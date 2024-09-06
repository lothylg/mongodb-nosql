//using chatgpt to populate random data

const usernames = [
    "PixelNomad",
    "EchoMystic",
    "LunarVoyager",
    "NeonSpecter",
    "QuantumBlaze",
    "AetherNova",
    "CrypticShadow",
    "BlitzByte",
    "SonicPulse",
    "VortexVanguard",
    "NebulaScribe",
    "FrostInferno",
    "ZenithEcho",
    "HyperChroma",
    "StellarRune",
    "RadiantCipher",
    "CyberDrift",
    "EchoWraith",
    "TempestNova",
    "GalacticVibe",
    "PhantomFury",
    "AstralGleam",
    "PulseReaper",
    "VoidWhisper",
    "CelestialPyro"
  ];

  const thoughts = [
    "The Fantastic Four's powers are always intriguing to see on screen.",
    "I wonder how the latest film will handle the team's origin story.",
    "It would be interesting to see a more faithful adaptation of the comics.",
    "The dynamic between the characters is crucial for the movie's success.",
    "Recasting the team always brings a new energy to the franchise.",
    "The special effects for the Fantastic Four's powers can make or break the film.",
    "The balance between action and character development is key.",
    "I'm curious how the film will integrate the villains like Dr. Doom or Galactus.",
    "A fresh take on their classic costumes could be exciting.",
    "The chemistry between the actors will be important for the team dynamic.",
    "How the film handles the team's relationship with other Marvel characters is interesting.",
    "Exploring their personal struggles alongside their superhero duties could add depth.",
    "I hope the film embraces the sci-fi elements of their story.",
    "The portrayal of Reed Richards' intelligence could be a highlight.",
    "I'm excited to see how the film addresses the Fantastic Four's legacy.",
    "The origin of their powers can be a pivotal part of the narrative.",
    "The movie’s direction and tone will affect its overall reception.",
    "Seeing the Fantastic Four in a modern context could offer new perspectives.",
    "I wonder if the film will reference past iterations of the franchise.",
    "The film's ability to blend humor with drama will be interesting.",
    "I hope the movie includes some iconic storylines from the comics.",
    "The visual representation of the Negative Zone could be visually stunning.",
    "Exploring the family's dynamics could add a personal touch to the film.",
    "I'm looking forward to seeing how the film handles the team's scientific adventures.",
    "The movie could benefit from a strong supporting cast to complement the main team."
  ];
  const emails = [
    "johndoe123@example.com",
    "maria.smith456@example.org",
    "alex.jones789@example.net",
    "emily.brown321@example.edu",
    "david.wilson654@example.co",
    "sophie.davis987@example.biz",
    "michael.johnson111@example.tv",
    "linda.martinez222@example.us",
    "daniel.rodriguez333@example.com",
    "olivia.garcia444@example.com",
    "noah.harris555@example.cc",
    "ava.lee666@example.pro",
    "liam.martin777@example.com",
    "isabella.clark888@example.com",
    "jacob.walker999@example.tel",
    "mia.hernandez000@example.com",
    "benjamin.wright111@example.com",
    "amelia.king222@example.com",
    "elijah.adams333@example.com",
    "chloe.thomas444@example.com",
    "aiden.carter555@example.int",
    "madison.perez666@example.com",
    "lucas.white777@example.us",
    "harper.lee888@example.com",
    "jackson.garcia999@example.tel"
  ];

  const reactions = [
    "I completely agree with this!",
    "This is such an insightful thought.",
    "I've never thought about it that way!",
    "This is exactly what I was thinking.",
    "Great point!",
    "I think this could be true.",
    "This really makes you think.",
    "I'm not so sure about this.",
    "This is a bold statement!",
    "I can see where you're coming from.",
    "This makes a lot of sense.",
    "I love this perspective.",
    "This could change everything.",
    "I'm excited to see how this plays out.",
    "This is a refreshing take!",
    "I think you’re onto something here.",
    "This could be groundbreaking.",
    "I’ve been wondering about this too.",
    "This really challenges the norm.",
    "This is a game-changer.",
    "I can definitely relate to this.",
    "This could spark some debate!",
    "This is a thought-provoking idea.",
    "I hadn’t considered this before.",
    "This could have some serious implications."
];

  
  
  
  // Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomArrString = (arr) => String(arr[Math.floor(Math.random() * arr.length)]);

// Gets a random full name
const getRandomName = () => `${getRandomArrItem(usernames)}`;

// Function to generate random assignments that we can add to student object.
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughts: getRandomArrItem(thoughts)
    });
  }
  return results;
};

// Gets a random email
const getRandomEmail = () => getRandomArrItem(emails);

const getRandomReaction = () => getRandomThoughts(thoughts);

const getRandomUser = () => getRandomArrItem(usernames);



// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts, getRandomEmail, getRandomReaction, getRandomUser };

  