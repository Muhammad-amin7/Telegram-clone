import UserSchema from "../schema/User.schema.js";

export const sendusers = async (req, res) => {
      try {
            const allusers = await UserSchema.find();
            res.status(200).send({ status: 200, users: allusers });

      } catch (error) {
            console.error(error);
            res.status(500).send({ status: 500, message: "Internal Server Error" });
      }
};
