import UserSchema from "../schema/User.schema.js";

export const addfriends = async (req, res) => {
  const id = req.user._id;
  const friend = req.params.to;

  try {
    const thisuser = await UserSchema.findById(id);
    const thisfriend = await UserSchema.findById(id)
    if (!thisuser) return res.status(404).send({ status: 404, message: "User not found" });

    if (thisuser.friends.includes(friend)) {
      return res.status(400).send({ status: 400, message: "User is already your friend" });
    }
    thisfriend.friends.push(id)
    thisuser.friends.push(friend);
    await thisuser.save();
    res.status(200).send({ status: 200, message: "Friend added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: "Server error occurred" });
  }
};
