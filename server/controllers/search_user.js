import UserSchema from "../schema/User.schema.js";

export const searchuser = async (req, res) => {
  const value = req.params.value?.trim();
  const thisuser = req.user._id;

  if (!value || value.length === 0) {
    return res.status(400).send({ status: 400, message: 'Ma\'lumot bo\'sh' });
  }

  try {
    // Find current user (to get their friends list)
    const currentUser = await UserSchema.findById(thisuser).select('friends');
    if (!currentUser) {
      return res.status(404).send({ status: 404, message: 'Foydalanuvchi topilmadi' });
    }

    // Search for users (username or email matches)
    const usersarray = await UserSchema.find({
      $or: [
        { username: { $regex: value, $options: 'i' } },
        { email: { $regex: value, $options: 'i' } },
      ]
    });

    // Filter out self and map to include isFriend flag
    const filteredUsers = usersarray
      .filter(user => user._id.toString() !== thisuser.toString())
      .map(user => ({
        _id: user._id,
        firstName: user.firstName,
        avatarType: user.avatarType,
        avatarColor: user.avatarColor,
        username: user.username,
        email: user.email,
        isFriend: currentUser.friends.includes(user._id),
      }));

    return res.status(200).send({ status: 200, users: filteredUsers });

  } catch (error) {
    console.error('Qidirishda xatolik:', error);
    return res.status(500).send({ status: 500, message: 'Server xatolik yuz berdi' });
  }
};
