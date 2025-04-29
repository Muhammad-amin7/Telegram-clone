import UserSchema from "../schema/User.schema.js"

export const addfriends = async (req, res) => {
      const id = req.user._id
      const friend = req.params.friend

      try {
            const thisuser = await UserSchema.findById(id)
            if (!thisuser) return res.status(404).send({ status: 404, message: "user did not found" })
            thisuser.friends.push(to)
            thisuser.save()
            res.status(200).send({ status: 200, message: "Do'st muvaffaqiyatli qo'shildi" });
      } catch (error) {
            console.error(error);
            res.status(500).send({ status: 500, message: "Xatolik yuz berdi" })
      }
}