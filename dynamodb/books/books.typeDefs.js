const { gql } = require('apollo-server-lambda');

const bookTypeDefs = gql`
  type Book {
    name: String!
    author: String!
  }

  input CreateBookInput {
    name: String!
    author: String!
  }

  input UpdateBookInput {
    name: String
    author: String
  }

  #Queries
  type Query {
    getBooks: [Book!]!
    getBook(name: String!): Book!
  }

  #Mutations
  type Mutation {
    createBook(createBookInput: CreateBookInput): Book!
    updateBook(updateBookInput: UpdateBookInput): Book!
    deleteBook(name: String!): Boolean!
  }
`;

module.exports = bookTypeDefs;
