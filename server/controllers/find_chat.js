import chatbaze from "../schema/chatbaze.js";

export const find_chat = async (req, res) => {
      const to = req.params.to;
      const from = req.user._id;

      try {
            if (!to || !from) {
                  return res.status(400).send({ status: 0, message: "ID xato yoki yetishmayapti" });
            }

            const send = await chatbaze.find({ from: from, to: to });
            const receiver = await chatbaze.find({ from: to, to: from });

            if (send.length > 0 || receiver.length > 0) {
                  return res.status(200).send({ status: 200, send, receiver });
            } else {
                  return res.status(404).send({ status: 404, message: "Hech qanday chat topilmadi" });
            }
      } catch (error) {
            console.error(error);
            return res.status(500).send({ status: 0, message: "Serverda xatolik yuz berdi" });
      }
};
