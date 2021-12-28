const { DynamoDB } = require('aws-sdk');

const db = new DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const bookResolvers = {
  Query: {
    async getBooks() {
      const { Items } = await db
        .scan({
          TableName,
        })
        .promise();

      return Items;
    },

    async getBook(_, { name }) {
      const { Item } = await db
        .get({
          TableName,
          Key: {
            name,
          },
        })
        .promise();

      return Item;
    },
  },
  Mutation: {
    async createBook(_, { createBookInput }) {
      await db
        .put({
          TableName,
          Item: createBookInput,
        })
        .promise();

      return createBookInput;
    },

    async updateBook(_, { updateBookInput }) {
      const { name, author } = updateBookInput;
      try {
        const { Attributes } = await db
          .update({
            TableName,
            Key: {
              name,
            },
            UpdateExpression: 'set author = :author',
            ExpressionAttributeValues: {
              ':author': author,
            },
            ReturnValues: 'ALL_NEW',
          })
          .promise();

        console.log({ Attributes });

        return Attributes;
      } catch (error) {
        console.log({ error });
        return {};
      }
    },

    async deleteBook(_, { name }) {
      try {
        await db
          .delete({
            TableName,
            Key: {
              name,
            },
          })
          .promise();

        return true;
      } catch (error) {
        console.log({ error });
        return false;
      }
    },
  },
};

module.exports = bookResolvers;
