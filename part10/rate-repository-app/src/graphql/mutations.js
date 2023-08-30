import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

export const REVIEW_MUTATION = gql`
  mutation REVIEW_MUTATION($review: CreateReviewInput!) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;