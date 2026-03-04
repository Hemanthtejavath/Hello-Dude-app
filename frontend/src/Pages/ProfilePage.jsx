import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LANGUAGES } from "../constants";
import { userAuthUser } from "../hooks/userAuthUser";
import { updateProfile } from "../lib/api";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { authData } = userAuthUser();
  const user = authData?.user;

  const [formState, setFormState] = useState({
    name: "",
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
    profilePic: "",
  });

  useEffect(() => {
    if (!user) return;

    setFormState({
      name: user.name || "",
      bio: user.bio || "",
      nativeLanguage: user.nativeLanguage || "",
      learningLanguage: user.learningLanguage || "",
      location: user.location || "",
      profilePic: user.profilePic || "",
    });
  }, [user]);

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation(formState);
  };

  const handleRandomAvatar = () => {
    const randomSeed = Math.floor(Math.random() * 10000);
    const randomAvatar = `https://api.dicebear.com/9.x/lorelei/svg?seed=${randomSeed}`;
    setFormState((prev) => ({ ...prev, profilePic: randomAvatar }));
  };

  return (
    <div className="min-h-screen bg-base-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl backdrop-blur-lg bg-base-200/40 border border-base-300 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-1">Edit Profile</h1>
        <p className="text-base-content/70 mb-8">
          Update your details and keep your profile current.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={formState.profilePic || "https://via.placeholder.com/150"}
                  alt="Profile"
                />
              </div>
            </div>
            <div className="flex-1 w-full space-y-3">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Profile image URL"
                value={formState.profilePic}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    profilePic: e.target.value,
                  }))
                }
              />
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleRandomAvatar}
              >
                Generate Random Avatar
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formState.name}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formState.location}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Bio</span>
            </label>
            <textarea
              rows="3"
              className="textarea textarea-bordered"
              value={formState.bio}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Native Language</span>
              </label>
              <select
                className="select select-bordered"
                value={formState.nativeLanguage}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    nativeLanguage: e.target.value,
                  }))
                }
              >
                <option value="">Select language</option>
                {LANGUAGES.map((language) => (
                  <option key={`native-${language}`} value={language.toLowerCase()}>
                    {language}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Learning Language</span>
              </label>
              <select
                className="select select-bordered"
                value={formState.learningLanguage}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    learningLanguage: e.target.value,
                  }))
                }
              >
                <option value="">Select language</option>
                {LANGUAGES.map((language) => (
                  <option
                    key={`learning-${language}`}
                    value={language.toLowerCase()}
                  >
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-base-content/70">
            Email: {user?.email || "Email not available"}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" className="btn btn-primary" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </button>
            <Link to="/" className="btn btn-ghost">
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
