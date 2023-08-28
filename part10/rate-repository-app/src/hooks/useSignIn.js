import { useMutation } from "@apollo/client";
import { SIGN_IN_MUTATION } from "../graphql/mutations";
import useAuthStorage from "./useContext";

export default function useSignIn() {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN_MUTATION);

  const signIn = async ({ username, password }) => {
    const credentials = {
      username,
      password
    }
    console.log(credentials)
    const res = await mutate({
      variables: {
        credentials
      }
    });

    await authStorage.setAccessToken(res?.data?.authenticate?.accessToken)
    console.log(authStorage, result);
  };


  return [signIn, result];
}