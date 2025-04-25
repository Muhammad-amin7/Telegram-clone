import UserSchema from "../schema/User.schema.js";
import { decode_token } from "../utils/token_decode.js";

export const check_token = async (req, res) => {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ status: 401, message: "Token topilmadi" });
      }

      const token = authHeader.split(" ")[1];

      try {
            const userId = decode_token(token);
            const userInfo = await UserSchema.findById(userId);

            if (!userInfo) {
                  return res.status(401).json({ status: 401, message: "Foydalanuvchi topilmadi" });
            }

            return res.status(200).json({ status: 200, info: userInfo });

      } catch (error) {
            res.status(500).json({ status: 500, message: "serverda Xatolik" });
            console.error("JWT verification error:", error);
            throw error;
      }
}
