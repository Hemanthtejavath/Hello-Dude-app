import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";

export const FriendCard = ({ friend }) => {
  const displayName = friend?.name || "Unknown user";
  const nativeLanguage = friend?.nativeLanguage || "Not set";
  const learningLanguage = friend?.learningLanguage || "Not set";

  return (
    <div
      className="bg-base-200 rounded-xl p-4 shadow-md 
                    hover:shadow-lg transition-all duration-300 
                    max-w-xs h-fit self-start"
    >
      {/* Top */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden ring ring-primary ring-offset-1">
          {friend?.profilePic ? (
            <img
              src={friend.profilePic}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-base-300" />
          )}
        </div>

        <h2 className="text-sm font-semibold truncate">{displayName}</h2>
      </div>

      {/* Languages */}
      <div className="flex flex-wrap gap-3 mt-3 text-xs">
        <div className="flex items-center gap-1 badge badge-success badge-sm">
          {getLanguageFlag(nativeLanguage)}
          Native: {nativeLanguage}
        </div>

        <div className="flex items-center gap-1 badge badge-outline badge-sm">
          {getLanguageFlag(learningLanguage)}
          Learning: {learningLanguage}
        </div>
      </div>

      {/* Bio */}
      {friend?.bio && (
        <p className="mt-3 text-xs text-base-content/70 line-clamp-2">
          {friend.bio}
        </p>
      )}

      {/* Button */}
      <Link
        to={`/chat/${friend._id}`}
        className="btn btn-primary btn-sm w-full mt-3 rounded-full"
      >
        Message
      </Link>
    </div>
  );
};

export function getLanguageFlag(language) {
  if (!language) return null;

  const lanLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[lanLower];

  if (!countryCode) return null;

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={`${lanLower} flag`}
      className="w-4 h-3 object-cover rounded-sm"
    />
  );
}
