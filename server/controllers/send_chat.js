import chatbaze from "../schema/chatbaze.js";

export const send_chat = async (req, res) => {
      const { text, to } = req.body;

      try {
            const chat = new chatbaze({
                  text,
                  to,
                  from: req.user._id,
            });

            await chat.save();
            return res.status(200).json({ status: 200, message: "Chat yuborildi" });
      } catch (error) {
            return res.status(500).json({ status: 500, message: "Chat yuborishda xatolik" });
      }
};
