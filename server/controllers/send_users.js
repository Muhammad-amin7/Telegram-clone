import UserSchema from "../schema/User.schema.js";

export const sendusers = async (req, res) => {
      const id = req.user._id;
      try {
            const allusers = await UserSchema.find();
            const filteredUsers = allusers.filter(user => user._id.toString() !== id.toString()); // Exclude the user with the same id
            res.status(200).send({ status: 200, users: filteredUsers });

      } catch (error) {
            console.error(error);
            res.status(500).send({ status: 500, message: "Internal Server Error" });
      }
};
