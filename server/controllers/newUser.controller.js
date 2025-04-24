import UserSchema from "../schema/User.schema.js"
import { createJWT } from "../utils/createJWT.js"

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
            const token = createJWT(addDate._id)

            return res.status(200).send({ status: 200, access_token: token })
      } catch (error) {
            return res.status(500).send({ status: 500, message: "Server error" })
      }
}