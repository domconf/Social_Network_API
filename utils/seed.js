const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    const thoughts = [
        {
            thoughtText: "Should we go to the park today?",
            userName: 'John',
        },
        {
            thoughtText: 'Should we go to the mall today?',
            userName: 'Alex',
        },
        {
            thoughtText: 'Beautiful day outside!',
            userName: 'Gabrielle',
        },
        {
            thoughtText: 'Lets go to the movies!',
            userName: 'Dan',
        },
    ];

    await Thought.collection.insertMany(thoughts);

    await User.collection.insertMany([
        {
            userName: 'John123',
            email: 'john123@gmail.com',
        },
        {
            userName: 'Alex123',
            email: 'alex123@gmail.com',
        },
        {
            userName: 'Gabrielle123',
            email: 'gabrielle123@gmail.com',
        },
        {
            userName: 'Dan123',
            email: 'dan123@gmail.com',
        },
        {
            userName: 'Jane123',
            email: 'jane123@gmail.com',
        },
        {
            userName: 'Steve123',
            email: 'steve123@gmail.com',
        },
    ]);

    console.table(thoughts);
    console.info('Seeds added');
    process.exit(0);
});