import jwt from "jsonwebtoken";

export const createJWT = (id) => {
      if (!id) {
            return false;
      }

      try {
            const token = jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" });
            return token;
      } catch (error) {
            console.error("JWT yaratishda xatolik yuz berdi:", error);
            return false;
      }
};

