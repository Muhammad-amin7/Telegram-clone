import UserSchema from "../schema/User.schema.js";

export const remove_friend = async (req, res) => {
  const userID = req.user._id;
  const del = req.params.to;

  try {
    const user = await UserSchema.findById(userID);

    if (!user) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }

    // Agar "del" do‘stlar ro‘yxatida bo‘lmasa
    if (!user.friends.includes(del)) {
      return res.status(400).json({ error: "Bu foydalanuvchi sizning do‘stlaringizda yo‘q" });
    }

    // Do‘stni o‘chirish
    user.friends = user.friends.filter(f => f.toString() !== del.toString());

    await user.save();

    return res.status(200).json({ message: "Do‘st o‘chirildi", friends: user.friends });

  } catch (error) {
    console.error("Do‘stni o‘chirishda xatolik:", error);
    return res.status(500).json({ error: "Server xatosi" });
  }
};
