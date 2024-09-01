const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomThoughts, getRandomEmail, getRandomReaction, getRandomArrItem } = require('./data');

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

  

  // Add users to the collection and await the results
  const createdUsers = await User.create(users);

  // Create thoughts with random usernames and reactions
  const thoughts = getRandomThoughts(25).map(thought => ({
    thoughtText: thought.thoughts, // thought text as a string
    username: getRandomName(), // Assign a random username from the created users
    reactions: [
      {
        reactionBody: getRandomReaction(), 
        username: getRandomName(), // Random user for the reaction
      }
    ],
  }));

  // Add thoughts to the collection and await the results
  await Thought.create(thoughts);


  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});