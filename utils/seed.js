const connection = require('../config/connection');
const { Thought, User, Reaction } = require('../models');
const { getRandomName, getRandomThoughts, getRandomEmail, getRandomReaction, getRandomUser } = require('./data');

connection.once('open', async () => {
    console.log('connected');
    
    // Delete the collections if they exist
    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = [];
    const thoughts = getRandomThoughts(25);

    for (let i = 0; i < 20; i++) {
        try {
            const user = await User.create({
                username: getRandomUser(),
                email: getRandomEmail(),
                thoughts: [],
                friends: []
            });

            users.push(user);

            // Assign thoughts to the user
            const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
            const thoughtText = typeof randomThought === 'object' ? randomThought.thoughts : randomThought; // Get the thought text as a string

            const thought = await Thought.create({
                thoughtText: thoughtText,
                username: user.username,
                reactions: []
            });

            user.thoughts.push(thought._id);
            await user.save();

            // Create a reaction for the thought
            const reaction = await Reaction.create({
                reactionBody: getRandomReaction(),
                username: user.username
            });

            thought.reactions.push(reaction);
            await thought.save();
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    }

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});