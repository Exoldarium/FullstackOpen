import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN_MUTATION } from "../graphql/mutations";
import useAuthStorage from "./useContext";

export default function useSignIn() {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN_MUTATION);

  const signIn = async ({ username, password }) => {
    const credentials = {
      username,
      password
    }
    console.log(credentials)
    const { data } = await mutate({
      variables: {
        credentials
      }
    });

    await authStorage.setAccessToken(data?.authenticate?.accessToken);
    apolloClient.resetStore();
    console.log(data);
  };

  return [signIn, result];
}