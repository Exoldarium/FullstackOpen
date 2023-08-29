import { useMutation } from "@apollo/client";
import { REVIEW_MUTATION } from "../graphql/mutations";

export default function useCreateReview() {
  const [mutate, result] = useMutation(REVIEW_MUTATION);

  const create = async ({ ownerName, rating, repositoryName, text }) => {
    const parsedRating = Number(rating);
    const res = await mutate({
      variables: {
        review: {
          ownerName,
          rating: parsedRating,
          repositoryName,
          text
        }
      }
    });
  };


  return [create, result];
}