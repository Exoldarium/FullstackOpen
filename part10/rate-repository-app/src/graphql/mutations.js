import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const REVIEW_MUTATION = gql`
  mutation REVIEW_MUTATION($review: CreateReviewInput!) {
    createReview(review: $review) {
      createdAt
      id
      rating
      repositoryId
      text
      userId
    }
  }
`;