import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
          node {
            createdAt
            description
            forksCount
            fullName
            id
            language
            name
            ownerAvatarUrl
            ownerName
            ratingAverage
            reviewCount
            stargazersCount
            url
          }
        }
      }
    }
`;

export const GET_USER = gql`
  query {
    me {
      id
      reviewCount
      username
    }
  }
`;

export const GET_SINGLE_REPO = gql`
  query repo($id: ID!){
    repository(id: $id) {
      id
      fullName
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

// other queries...