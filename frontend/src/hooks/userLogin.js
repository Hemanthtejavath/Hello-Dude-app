import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../lib/api";

const userLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        toast.success("Loged Successfully !"));
    },
  });
  return { loginMutation: mutate, isPending, error };
};

export default userLogin;
