import UserSchema from "../schema/User.schema.js";

export const checkExistingEmail = async (req, res, next) => {
      const { email } = req.body;

      if (!email) {
            return res.status(400).send({ status: 400, message: "Bad request" });
      }

      try {
            const existingUser = await UserSchema.findOne({ email });

            if (existingUser) {
                  return res.status(409).send({
                        status: 409,
                        message: "This email already exists",
                  });
            }

            next();
      } catch (error) {
            console.error("Email check error:", error);
            res.status(500).send({ status: 500, message: "Server error" });
      }
};
