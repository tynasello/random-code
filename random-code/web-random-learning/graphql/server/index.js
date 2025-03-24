const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { mainCards, animals, animalClasses } = require('./db');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { mainCards, animals, animalClasses },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🏃‍♂️ at ${url}`);
});
