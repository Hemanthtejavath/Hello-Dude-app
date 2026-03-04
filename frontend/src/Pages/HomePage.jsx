import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPinIcon,
  UsersIcon,
  UserPlusIcon,
  CheckCircleIcon,
  SearchIcon,
} from "lucide-react";
import {
  getRecommendedUser,
  getUserFriends,
  getOutgoingFriendReqs,
  sendFriendRequest,
} from "../lib/api";
import NoFriends from "../components/NoFriends";
import { FriendCard } from "../components/FriendCard";
import { getLanguageFlag } from "../components/FriendCard";

const EMPTY_ARRAY = [];

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestIds, setOutgoingRequest] = useState(new Set());
  const [pendingUserId, setPendingUserId] = useState(null);
  const [suggestionSearch, setSuggestionSearch] = useState("");

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUser } = useQuery({
    queryKey: ["Users", suggestionSearch],
    queryFn: () => getRecommendedUser(suggestionSearch),
  });

  const { data: outgoingFriendReqsData } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });
  const outgoingFriendReqs = outgoingFriendReqsData ?? EMPTY_ARRAY;

  const { mutate: sendRequestMutation } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["outgoingFriendReqs"],
      }),
  });

  useEffect(() => {
    const outgoingIds = new Set(
      outgoingFriendReqs.map((req) => req.recipient._id),
    );
    setOutgoingRequest(outgoingIds);
  }, [outgoingFriendReqs]);

  return (
    <div className="p-2 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notificationpage" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="leading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriends />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter">
              Meet New Learners
            </h1>
            <p className="text-base-content/70 mb-8">
              Start building your network by connecting with amazing people
              around you. Send friend requests and grow your circle.
            </p>
          </div>

          <label className="input input-bordered flex items-center gap-2 max-w-md mb-6">
            <SearchIcon className="size-4 opacity-70" />
            <input
              type="text"
              className="grow"
              placeholder="Search suggestions by name, location, or language"
              value={suggestionSearch}
              onChange={(e) => setSuggestionSearch(e.target.value)}
            />
          </label>

          {loadingUser ? (
            <div className="felx justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                {suggestionSearch
                  ? "No users matched your search"
                  : "No recommendations available"}
              </h3>
              <p className="text-base-content opacity-70">
                {suggestionSearch
                  ? "Try another search term."
                  : "Check back later for new language partners!"}
              </p>
            </div>
          ) : (
            // recommonded user box
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="bg-base-200 rounded-2xl p-6
                   border border-base-300
                   shadow-sm hover:shadow-xl
                   transition-all duration-300
                   h-fit self-start"
                  >
                    {/* Top Section */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden">
                        <img
                          src={user.profilePic || null}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-base">{user.name}</h3>

                        {user.location && (
                          <div className="flex items-center text-sm opacity-70 mt-1">
                            <MapPinIcon className="size-4 mr-1" />
                            {user.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="flex items-center gap-1 badge badge-success badge-sm px-3 py-2">
                        {getLanguageFlag(user.nativeLanguage)}
                        Native: {capitalize(user.nativeLanguage)}
                      </span>

                      <span className="flex items-center gap-1 badge badge-outline badge-sm px-3 py-2">
                        {getLanguageFlag(user.learningLanguage)}
                        Learning: {capitalize(user.learningLanguage)}
                      </span>
                    </div>

                    {/* Bio */}
                    {user.bio && (
                      <p className="text-sm opacity-70 mt-4 ">{user.bio}</p>
                    )}

                    {/* Action Button */}
                    <button
                      className={`btn w-full mt-6 rounded-xl ${
                        hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                      }`}
                      onClick={() => {
                        setPendingUserId(user._id);

                        // Optimistically mark as "request sent" to avoid UI flicker
                        setOutgoingRequest((prev) => {
                          const next = new Set(prev);
                          next.add(user._id);
                          return next;
                        });

                        sendRequestMutation(user._id, {
                          onError: () => {
                            // Revert optimistic update if the request fails
                            setOutgoingRequest((prev) => {
                              const next = new Set(prev);
                              next.delete(user._id);
                              return next;
                            });
                          },
                          onSettled: () => {
                            setPendingUserId(null);
                          },
                        });
                      }}
                      disabled={
                        hasRequestBeenSent || pendingUserId === user._id
                      }
                    >
                      {hasRequestBeenSent ? (
                        <>
                          <CheckCircleIcon className="size-4 mr-2" />
                          Request Sent
                        </>
                      ) : (
                        <>
                          <UserPlusIcon className="size-4 mr-2" />
                          Send Friend Request
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;

const capitalize = (str = "") => str.charAt(0).toUpperCase() + str.slice(1);
