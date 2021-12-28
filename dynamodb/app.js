const { ApolloServer } = require('apollo-server-lambda');
const bookResolvers = require('./books/books.resolvers');
const bookTypeDefs = require('./books/books.typeDefs');

const server = new ApolloServer({
  typeDefs: bookTypeDefs,
  resolvers: bookResolvers,
});

exports.handler = server.createHandler();
