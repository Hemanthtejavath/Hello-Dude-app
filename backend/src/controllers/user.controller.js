import User from "../models/User.js";
import FriendRequest from "../models/FriendsRequest.js";

export async function getRecomendedUsers(req, res) {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;
    // get current user with friends
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // exclude current user
        { _id: { $nin: currentUser.friends } }, //exclude current user's friends
        // { isOnboarding: true },
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getecommendedUser controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "name bio profilePic nativeLanguage learningLanguage",
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getFriendsd", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myid = req.user._id;
    const { id: recipientId } = req.params;

    // check if friend request already exists
    if (myid === recipientId) {
      return res
        .status(400)
        .json({ message: "You cannot send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient user not found" });
    }

    if (recipient.friends.includes(myid)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    // check if a friend request already exists between sender and recipient
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myid, recipient: recipientId },
        { sender: recipientId, recipient: myid },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    const friendRequest = new FriendRequest({
      sender: myid,
      recipient: recipientId,
    });

    await friendRequest.save();
    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Error in sendFriendRequest", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // verify that the current user is the recipient of the friend request
    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to accept this friend request",
      });
    }
    friendRequest.status = "accepted";
    friendRequest.save();

    // add each other to friends list
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.error("Error in acceptFriendRequest", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingRequests = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate("sender", "name profilePic nativeLanguage learningLanguage");

    const acceptedRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "name profilePic nativeLanguage learningLanguage");
    res.status(200).json({ incomingRequests, acceptedRequests });
  } catch (error) {
    console.error("Error in getFriendRequests", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendRequests(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate("recipient", "name profilePic nativeLanguage learningLanguage");
    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.error("Error in getOutgoingFriendRequests", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
