import UserSchema from "../schema/User.schema.js";

export const sendusers = async (req, res) => {
      const id = req.user._id

      try {
            const friendsid = await UserSchema.findById(id);

            if (!friendsid || !friendsid.friends || friendsid.friends.length === 0) {
                  return res.send([]);
            }

            const friends = await UserSchema.find({ _id: { $in: friendsid.friends } });

            res.send(friends);

      } catch (error) {
            console.error(error);
            res.status(500).send({ status: 500, message: "Internal Server Error" });
      }
};
