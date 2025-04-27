import UserSchema from "../schema/User.schema.js";

export const checkUsername = async (req, res) => {
      try {
            const username = req.params.username?.trim(); // bo'sh joylarni ham olib tashlaymiz

            if (!username) {
                  return res.status(400).send({ ok: false, message: "Username is required" });
            }

            const existingUser = await UserSchema.findOne({ username });

            if (existingUser) {
                  return res.status(409).send({ status: 409, message: "This username already exists" });
            } else {
                  return res.status(200).send({ status: 200, message: "This username is available" });
            }
      } catch (error) {
            console.error(error);
            return res.status(500).send({ ok: false, message: "Server error" });
      }
};
