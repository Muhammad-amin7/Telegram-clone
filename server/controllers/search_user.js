import UserSchema from "../schema/User.schema.js";

export const searchuser = async (req, res) => {
  const value = req.params.value?.trim(); 

  if (!value || value.length === 0) {
    return res.status(400).send({ status: 400, message: 'Ma\'lumot bo\'sh' });
  }

  try {
    const usersarray = await UserSchema.find({
      $or: [
        { username: { $regex: value, $options: 'i' } },
        { email: { $regex: value, $options: 'i' } },
      ]
    });

    return res.status(200).send({ status: 200, users: usersarray });
    
  } catch (error) {
    console.error('Qidirishda xatolik:', error);
    return res.status(500).send({ status: 500, message: 'Server xatolik yuz berdi' });
  }
}
