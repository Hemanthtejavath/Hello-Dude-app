import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api.js";

//we are creating a custom hook called userAuthUser that uses the useQuery hook from tanstack query to fetch the authenticated user data from the /auth/me endpoint and returns the loading state, authenticated user data, and any error that occurs during the fetch.

export const userAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // Disable automatic retries on failure
  });

  return {
    isLoading: authUser.isLoading,
    authData: authUser?.data,
    authError: authUser.error,
  };
};
