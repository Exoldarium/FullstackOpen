import { useQuery } from "@apollo/client";
import { USER_QUERY } from "../queries";

export function useUser() {
  const { data } = useQuery(USER_QUERY);
  if (data) {
    return data.me
  }
}