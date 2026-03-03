import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signup } from "../lib/api";

const userSignup = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    //mutationFn is a function that performs the mutation, in this case, it sends a POST request to the /auth/signup endpoint with the form data.
    mutationFn: signup,
    //onSuccess is a callback function that is called when the mutation is successful, in this case, it invalidates the "authUser" query to refetch the authenticated user data.
    onSuccess: () => {
      //we are using the queryClient to invalidate the "authUser" query, which will trigger a refetch of the authenticated user data and update the UI accordingly.
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  return { signupMutation: mutate, isPending, error };
};

export default userSignup;
