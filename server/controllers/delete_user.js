import UserSchema from "../schema/User.schema.js";

export const delete_user = async (req, res) => {
      const userId = req.user._id;

      try {
            const user = await UserSchema.findByIdAndDelete(userId);

            if (!user) {
                  return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
            }

            return res.status(200).json({ message: "Foydalanuvchi o'chirildi" });

      } catch (error) {
            console.error("Foydalanuvchini o‘chirishda xatolik:", error);
            return res.status(500).json({ error: "Server xatosi" });
      }
};
