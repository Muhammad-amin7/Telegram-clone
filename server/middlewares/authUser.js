import { decode_token } from "../utils/token_decode.js";
import UserSchema from "../schema/User.schema.js";

export const authMiddleware = async (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ status: 401, message: "Token topilmadi" });
      }

      const token = authHeader.split(" ")[1];

      try {
            const userId = decode_token(token);
            const user = await UserSchema.findById(userId);

            if (!user) {
                  return res.status(401).json({ status: 401, message: "Foydalanuvchi topilmadi" });
            }

            req.user = user;
            next();
      } catch (error) {
            console.error("Middleware error:", error);
            return res.status(500).json({ status: 500, message: "Tokenni tekshirishda xatolik" });
      }
};
