const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');
const User = require('../models/user');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // if there's no name or genre return all books
      if (!args.author && !args.genre) {
        return Book
          .find({})
          .populate('author')
          .catch(err => {
            throw new GraphQLError('query failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                err
              }
            });
          })
      } else if (args.author) {
        // if only author's name is provided 
        const author = await Author.findOne({ name: args.author });
        const book = await Book.find({});
        if (book.author === author._id) {
          return author.name
        }
      } else if (args.genre) {
        console.log(args.genre)
        const findBook = await Book
          .find({ genres: { $in: [args.genre] } })
          .populate('author')
          .catch(err => {
            throw new GraphQLError('query failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                err
              }
            });
          });
        console.log(findBook)
        return findBook
      }

    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  // Author: {
  //   bookCount: (root) => {
  //     let count = 0;

  //     // check the occurence of authors in the book array
  //     for (const key of books) {
  //       if (key.author === root.name) {
  //         count += 1;
  //       }
  //     }

  //     return count
  //   }
  // },
  Mutation: {
    addBook: async (root, args, context) => {
      // throw an error if the user is not logged in
      if (!context.currentUser) {
        throw new GraphQLError('authorization failed', {
          extensions: {
            code: 'GRAPHQL_VALIDATION_FAILED',
          }
        });
      }

      const bookToAdd = new Book({ ...args });
      const findAuthor = await Author.findOne({ name: args.author });

      // if the author is already in the array, use the existing id
      if (findAuthor) {
        bookToAdd.author = findAuthor;
        await bookToAdd.save().catch(err => {
          throw new GraphQLError('adding book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              err
            }
          });
        });

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
    editAuthor: async (root, args, context) => {
      // throw an error if the user is not logged in
      if (!context.currentUser) {
        throw new GraphQLError('authorization failed', {
          extensions: {
            code: 'GRAPHQL_VALIDATION_FAILED',
          }
        });
      }

      const findAuthor = await Author.findOne({ name: args.name });

      try {
        findAuthor.born = args.setBornTo;
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
      console.log(findAuthor)
      return findAuthor
    },
    createUser: async (root, args) => {
      const newUser = new User({ ...args })

      return newUser.save().catch(err => {
        throw new GraphQLError('user creation failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            err
          }
        });
      })
    },
    login: async (root, args) => {
      const findUser = await User.findOne({ username: args.username });

      if (!findUser || args.password !== 'secret') {
        throw new GraphQLError('login failed', {
          extensions: {
            code: 'GRAPHQL_VALIDATION_FAILED',
          }
        });
      }

      const userToken = {
        username: findUser.username,
        id: findUser._id
      }

      // sign the token with the user data
      return {
        value: jwt.sign(userToken, process.env.SECRET)
      }
    }
  }
}

module.exports = resolvers;