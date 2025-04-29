import UserSchema from "../schema/User.schema.js";

export const addfriends = async (req, res) => {
      const id = req.user._id; 
      const friend = req.params.to;  

      try {
            const thisuser = await UserSchema.findById(id);
            if (!thisuser)
                  return res.status(404).send({ status: 404, message: "User not found" });

            const friendUser = await UserSchema.findById(friend);
            if (!friendUser)
                  return res.status(404).send({ status: 404, message: "Friend not found" });

            thisuser.friends.push(friend);
            await thisuser.save();

            friendUser.friends.push(id);
            await friendUser.save();

            res.status(200).send({ status: 200, message: "Friend added successfully" });
      } catch (error) {
            console.error(error);
            res.status(500).send({ status: 500, message: "An error occurred" });
      }
};
