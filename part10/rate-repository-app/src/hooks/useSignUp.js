import { useMutation } from "@apollo/client";
import { SIGN_UP_MUTATION } from "../graphql/mutations";

export default function useSignUp() {
  const [mutate, result] = useMutation(SIGN_UP_MUTATION);

  const signUp = async ({ username, password }) => {
    const user = {
      username,
      password
    }
    console.log(user)
    const { data } = await mutate({
      variables: {
        user
      }
    });

    console.log(data);
  };

  return [signUp, result];
}