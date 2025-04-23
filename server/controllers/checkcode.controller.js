import confirmationCode from "../schema/confirmationCode.js";
import UserSchema from "../schema/User.schema.js";

export const checkCode = async (req, res) => {
      const { email, code } = req.body;

      try {
            console.log(email + "Email");
            console.log(code + "code");

            const findEmail = await confirmationCode.findOne({ target: email });
            const findUser = await UserSchema.findOne({ email });

            if (!findEmail) {
                  return res.status(404).send({ status: 404, message: "Kod topilmadi" });
            }

            if (findEmail.code === code) {
                  res.status(200).send({ status: 200, info: findUser });
            } else {
                  res.status(401).send({ status: 401, message: "Kod noto'g'ri" });
            }
      } catch (error) {
            console.error(error);
            res.status(500).send({ status: 500, message: "Serverda xatolik yuz berdi" });
      }
};
