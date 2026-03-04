import { userAuthUser } from "../hooks/userAuthUser";
import { Link } from "react-router-dom";
import { LANGUAGES } from "../constants";

const ProfilePage = () => {
  const { authData } = userAuthUser();
  const user = authData?.user;

  return (
    <div className="min-h-screen bg-base-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl backdrop-blur-lg bg-base-200/40 border border-base-300 rounded-2xl shadow-xl p-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user?.profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{user?.name || "User Name"}</h1>

            <p className="text-base-content/70 mt-1">
              {user?.email || "Email not available"}
            </p>

            {user?.bio && (
              <p className="mt-3 italic text-base-content/60">"{user.bio}"</p>
            )}
          </div>
        </div>

        <div className="divider my-8"></div>

        {/* Languages Section */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-base-100/50 rounded-xl p-4">
            <h2 className="font-semibold text-lg mb-2">Native Language</h2>
            <p className="text-base-content/70">
              {LANGUAGES[user?.nativeLanguage]}{" "}
              {user?.nativeLanguage || "Not specified"}
            </p>
          </div>

          <div className="bg-base-100/50 rounded-xl p-4">
            <h2 className="font-semibold text-lg mb-2">Learning Language</h2>
            <p className="text-base-content/70">
              {LANGUAGES[user?.learningLanguage]}{" "}
              {user?.learningLanguage || "Not specified"}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-10">
          <Link to="/">
            <button className="btn btn-primary px-8">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
