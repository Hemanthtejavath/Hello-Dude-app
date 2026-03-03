import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api.js";
import toast from "react-hot-toast";

const userLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Immediately clear auth data
      queryClient.setQueryData(["authUser"], null);

      toast.success("Logged out successfully!");
    },
  });

  return { logoutMutation, isPending, error };
};

export default userLogout;
