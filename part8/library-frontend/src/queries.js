import { gql } from "@apollo/client";

// QUERIES
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      published
      author {
        name
      }
      title
      id
      genres
    }
  }
`;

export const FILTER_BOOKS = gql`
  query FILTER_BOOKS_QUERY($genre: String) {
    allBooks(genre: $genre) {
      author {
        name
        id
      }
      published
      title
      genres
      id
    }
  }
`;

export const USER_QUERY = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

// MUTATIONS
export const ADD_BOOK = gql`
  mutation ADD_BOOK_MUTATION(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook (
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation EDIT_AUTHOR(
    $name: String!
    $setBornTo: Int!
  ) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
      name
      born
      id
      bookCount
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`;

// SUBSCRIPTIONS
export const BOOK_ADDED = gql`
  subscription BOOK_ADDED{
    bookAdded {
      published
      author {
        name
      }
      title
      genres
    }
  }
`;