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

            // Generate random friends for the user
            const randomFriendsCount = Math.floor(Math.random() * 10); // Generate a random number of friends
            const friends = users.filter((u) => u !== user).slice(0, randomFriendsCount); // Select random friends from existing users

            user.friends = friends.map((friend) => friend._id); // Assign friend IDs to the user
            user.friendCount = friends.length; // Update the friendCount field

            users.push(user);

            // Assign thoughts to the user
            const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
            const thoughtText = typeof randomThought === 'object' ? randomThought.thoughts : randomThought; // Get the thought text as a string

            const thought = await Thought.create({
                thoughtText: thoughtText,
                username: user.username,
                reactions: getRandomReaction()
            });

            user.thoughts.push(thought._id);
            await user.save();

            // Generate random reactions for the thought
            const randomReactionsCount = Math.floor(Math.random() * 5); // Generate a random number of reactions
            for (let j = 0; j < randomReactionsCount; j++) {
                const reaction = await Reaction.create({
                    reactionBody: getRandomReaction(),
                    username: user.username // Associate the reaction with the user who created it
                });

                thought.reactions.push(reaction);
                await reaction.save(); // Save the reaction
            }

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