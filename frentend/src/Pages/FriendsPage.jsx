import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircleIcon,
  ClockIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

import {
  getOutgoingFriendReqs,
  getRecommendedUser,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import NoFriends from "../components/NoFriends";
import { FriendCard, getLanguageFlag } from "../components/FriendCard";

const EMPTY_ARRAY = [];

const FriendsPage = () => {
  const queryClient = useQueryClient();
  const [pendingUserId, setPendingUserId] = useState(null);
  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["Users"],
    queryFn: getRecommendedUser,
  });

  const { data: outgoingFriendReqsData } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const outgoingFriendReqs = outgoingFriendReqsData ?? EMPTY_ARRAY;

  useEffect(() => {
    const outgoingIds = new Set(
      outgoingFriendReqs.map((req) => req?.recipient?._id).filter(Boolean),
    );
    setOutgoingRequestIds(outgoingIds);
  }, [outgoingFriendReqs]);

  const pendingCount = useMemo(
    () => outgoingFriendReqs.length,
    [outgoingFriendReqs],
  );

  const { mutate: sendRequestMutation } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["outgoingFriendReqs"],
      }),
  });

  return (
    <div className="p-2 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Friends
            </h1>
            <p className="text-base-content/70">
              Manage your friends and discover new people.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link to="/notificationpage" className="btn btn-outline btn-sm">
              <UsersIcon className="mr-2 size-4" />
              Friend Requests
            </Link>
            <div className="btn btn-ghost btn-sm pointer-events-none">
              <ClockIcon className="mr-2 size-4" />
              Pending:{" "}
              <span className="ml-1 badge badge-primary">{pendingCount}</span>
            </div>
          </div>
        </div>

        {/* Friends list */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your Friends</h2>

          {loadingFriends ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
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
        </section>

        {/* Pending outgoing requests */}
        {outgoingFriendReqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Pending Requests</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {outgoingFriendReqs.map((req) => (
                <div
                  key={req._id}
                  className="card bg-base-200 border border-base-300 shadow-sm"
                >
                  <div className="card-body p-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar size-10 rounded-full overflow-hidden bg-base-300">
                        <img
                          src={req?.recipient?.profilePic || undefined}
                          alt={req?.recipient?.name || "Recipient"}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">
                          {req?.recipient?.name || "Unknown user"}
                        </div>
                        <div className="text-xs opacity-70">Request sent</div>
                      </div>
                      <div className="badge badge-outline">
                        <ClockIcon className="size-3 mr-1" />
                        Pending
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Discover */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Discover People</h2>
            <p className="text-base-content/70">
              Send a request to connect with new learners.
            </p>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No recommendations available
              </h3>
              <p className="text-base-content/70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="bg-base-200 rounded-2xl p-6 border border-base-300 shadow-sm hover:shadow-xl transition-all duration-300 h-fit self-start"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-base-300">
                        <img
                          src={user.profilePic || undefined}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base truncate">
                          {user.name}
                        </h3>
                        {user.location && (
                          <div className="text-sm opacity-70 mt-1 truncate">
                            {user.location}
                          </div>
                        )}
                      </div>
                    </div>

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

                    {user.bio && (
                      <p className="text-sm opacity-70 mt-4">{user.bio}</p>
                    )}

                    <button
                      className={`btn w-full mt-6 rounded-xl ${
                        hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                      }`}
                      onClick={() => {
                        setPendingUserId(user._id);

                        // Optimistic UI (avoid flicker)
                        setOutgoingRequestIds((prev) => {
                          const next = new Set(prev);
                          next.add(user._id);
                          return next;
                        });

                        sendRequestMutation(user._id, {
                          onError: () => {
                            setOutgoingRequestIds((prev) => {
                              const next = new Set(prev);
                              next.delete(user._id);
                              return next;
                            });
                          },
                          onSettled: () => setPendingUserId(null),
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

export default FriendsPage;

const capitalize = (str = "") => str.charAt(0).toUpperCase() + str.slice(1);
