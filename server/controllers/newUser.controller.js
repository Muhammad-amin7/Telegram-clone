import UserSchema from "../schema/User.schema.js"

export const newUser = async (req, res) => {
      const { firstName, lastName, email, status, username, bio, img, dob } = req.body

      try {
            const addDate = await new UserSchema({
                  firstName: firstName,
                  lastName: lastName || "",
                  email: email,
                  status: status,
                  username: username,
                  bio: bio || " ",
                  img: img || " ",
                  dob: dob || " "
            })

            await addDate.save()

            return res.status(200).send({ status: 200 })
      } catch (error) {
            return res.status(500).send({ status: 500, message: "Server error" })
      }
}