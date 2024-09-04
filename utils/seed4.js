const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomThoughts, getRandomEmail, getRandomReaction } = require('./data');

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  console.log('connected');

  // Delete the collections if they exist
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (usersCheck.length) {
    await connection.dropCollection('users');
  }

  const users = [];
const usedEmails = new Set();

for (let i = 0; i < 25; i++) {
  let email;

  // Ensure a unique email is generated
  do {
    email = getRandomEmail();
  } while (usedEmails.has(email));

  usedEmails.add(email);

  users.push({
    username: getRandomName(),
    email: email,
  });
}

// Function to generate random users with thoughts and reactions
const generateUsers = (numUsers) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const user = {
      id: i + 1, 
      username: getRandomUser(),
      email: getRandomEmail(),
      thoughts: getRandomThoughts(Math.floor(Math.random() * 5) + 1), // Generate random thoughts for the user
      reactions: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => getRandomReaction()) // Generate random reactions for the user
    };
    users.push(user);
  }
  return users;
};

// Generate  random users with thoughts and reactions
const usersData = generateUsers();

console.log(usersData); // Output the generated users data

// Export the users data for use in other files
module.exports = usersData;

  // Add users to the collection and await the results
  const createdUsers = await User.create(users);

  // Create thoughts with random usernames and reactions
  const thoughts = await getRandomThoughts(25).map(thought => ({
    thoughtText: thought.thoughts, // thought text as a string
    username: getRandomName(),
    // username: getRandomName(), // Assign a random username from the created users
    reactions: [
      {
        reactionBody: getRandomReaction(), 
        username: getRandomName(), // Random user for the reaction
      }
    ],
  }));

  // Add thoughts to the collection and await the results
  const allThoughts = await Thought.create(thoughts);

  // loop over all thoughts
  // get id of each 
  // choose a random user 
  // update user's thoughts array with the thought id

  

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});