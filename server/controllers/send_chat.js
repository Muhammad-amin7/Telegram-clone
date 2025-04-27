import { io } from "../index.js";
import chatbaze from "../schema/chatbaze.js";
import UserSchema from "../schema/User.schema.js";

export const send_chat = async (req, res) => {
      const { text, to, time } = req.body;

      try {
            const chat = new chatbaze({
                  text,
                  to,
                  time: time,
                  from: req.user._id,
            });

            const findto = await UserSchema.findById(to)

            if (findto && findto.socketID) {
                  console.log(findto);

                  io.to(findto.socketID).emit('new_message', {
                        from: req.user._id,
                        text,
                        time
                  });
                  console.log("Xabar yuborildi:", findto.socketID);
            }

            await chat.save();
            return res.status(200).json({ status: 200, message: "Chat yuborildi" });
      } catch (error) {
            console.log(error)
            return res.status(500).json({ status: 500, message: "Chat yuborishda xatolik", error: error });
      }
};
