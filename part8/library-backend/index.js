const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

mongoose.set('strictQuery', false);
const Book = require('./models/book');
const Author = require('./models/author');

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  });

const typeDefs = `
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // if there's no name or genre return all books
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      } else if (args.author) {
        // if only author's name is provided 
        const author = await Author.findOne({ name: args.author });
        const book = await Book.find({});
        if (book.author === author._id) {
          return author.name
        }
      } else if (args.genre) {
        console.log(args.genre)
        // if only genre is provided 
        const findBook = await Book.collection.find(args.genre);
        console.log(findBook)
      }

    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: (root) => {
      let count = 0;

      // check the occurence of authors in the book array
      for (const key of books) {
        if (key.author === root.name) {
          count += 1;
        }
      }

      return count
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const bookToAdd = new Book({ ...args });
      const findAuthor = await Author.findOne({ name: args.author });

      // if the author is already in the array, use the existing id
      if (findAuthor) {
        await bookToAdd.save().catch(err => {
          throw new GraphQLError('adding book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              err
            }
          });
        });

        bookToAdd.author = findAuthor;

        return bookToAdd
      }

      // else create a new entry for authors and books
      try {
        const authorToAdd = new Author({ name: args.author });
        await authorToAdd.save();
        bookToAdd.author = authorToAdd;
        await bookToAdd.save();
      } catch (err) {
        throw new GraphQLError('adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            err
          }
        });
      }

      return bookToAdd
    },
    editAuthor: async (root, args) => {
      const findAuthor = await Author.findOne({ name: args.name });
      findAuthor.born = args.setBornTo;

      // throw an error if there's no author
      try {
        await findAuthor.save();
      } catch (err) {
        throw new GraphQLError('editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            err
          }
        });
      }

      return findAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
});