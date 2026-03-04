import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userAuthUser } from "../hooks/userAuthUser.js";
import { completeOnboarding } from "../lib/api.js";
import toast, { LoaderIcon } from "react-hot-toast";
import { useState, useEffect } from "react";
import { LANGUAGES } from "../constants/index.js";
import { User, FileText, MapPin, Globe } from "lucide-react";
const OnboardingPage = () => {
  const { authUser } = userAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    name: authUser?.name || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  // Once auth user data is loaded, pre-fill the form (including random avatar)
  useEffect(() => {
    if (!authUser) return;

    setFormState((prev) => ({
      ...prev,
      name: authUser.name || "",
      bio: authUser.bio || "",
      nativeLanguage: authUser.nativeLanguage || "",
      learningLanguage: authUser.learningLanguage || "",
      location: authUser.location || "",
      profilePic: authUser.profilePic || prev.profilePic || "",
    }));
  }, [authUser]);

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Onboarding completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to complete onboarding",
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  // Function to handle random avatar generation (placeholder)

  const handleRandomAvatar = () => {
    const randomSeed = Math.floor(Math.random() * 10000);
    const randomAvatar = `https://api.dicebear.com/9.x/lorelei/svg?seed=${randomSeed}`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Avatar generated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Complete Your Profile ✨
        </h1>
        <p className="text-center text-white/80 mb-8">
          Let’s personalize your experience
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-4 border-white/30 shadow-lg">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={40} className="text-white" />
              )}
            </div>
            {/* Random Avatar Button */}
            <button
              type="button"
              onClick={handleRandomAvatar}
              className="px-6 py-2 bg-white text-purple-600 font-medium rounded-full shadow-md hover:scale-105 transition-all duration-300 mt-3"
            >
              Generate Random Avatar 🎲
            </button>
          </div>

          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-white/70" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Bio */}
          <div className="relative">
            <FileText
              className="absolute left-3 top-3 text-white/70"
              size={20}
            />
            <textarea
              placeholder="Short Bio"
              value={formState.bio}
              onChange={(e) =>
                setFormState({ ...formState, bio: e.target.value })
              }
              rows="3"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white resize-none"
            />
          </div>

          {/* Languages Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Native Language */}
            <div>
              <label className="block text-white mb-2 font-medium">
                Native Language
              </label>

              <div className="relative">
                <Globe
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
                  size={20}
                />

                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage || ""}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-xl 
                            bg-white/15 backdrop-blur-md 
                            text-white 
                            border border-white/30 
                            focus:outline-none 
                            focus:ring-2 focus:ring-pink-300 
                            appearance-none"
                >
                  <option value="" disabled>
                    Select Native Language
                  </option>

                  {LANGUAGES.map((language) => (
                    <option
                      key={`native-${language}`}
                      value={language.toLowerCase()}
                      style={{ color: "black" }}
                    >
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Learning Language */}
            <div>
              <label className="block text-white mb-2 font-medium">
                Learning Language
              </label>

              <div className="relative">
                <Globe
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
                  size={20}
                />

                <select
                  name="learningLanguage"
                  value={formState.learningLanguage || ""}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-xl 
                          bg-white/15 backdrop-blur-md 
                          text-white 
                          border border-white/30 
                          focus:outline-none 
                          focus:ring-2 focus:ring-pink-300 
                          appearance-none"
                >
                  <option value="" disabled>
                    Select Learning Language
                  </option>

                  {LANGUAGES.map((language) => (
                    <option
                      key={`learning-${language}`}
                      value={language.toLowerCase()}
                      style={{ color: "black" }}
                    >
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-white/70" size={20} />
            <input
              type="text"
              placeholder="Location"
              value={formState.location}
              onChange={(e) =>
                setFormState({ ...formState, location: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-purple-600 font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-60"
          >
            {!isPending ? (
              <>Complete Onboarding 🚀</>
            ) : (
              <div className="flex items-center justify-center">
                <LoaderIcon className="animate-spin size-5 mr-4" />
                Onboarding...
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
