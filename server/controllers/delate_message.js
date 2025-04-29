import chatbaze from "../schema/chatbaze.js";

export const delete_message = async (req, res) => {
  const userId = req.user._id;
  const messageId = req.params.message;

  try {
    const msgdata = await chatbaze.findById(messageId);

    if (!msgdata) {
      return res.status(404).json({ error: "Xabar topilmadi" });
    }

    if (msgdata.from.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Siz bu xabarni o'chira olmaysiz" });
    }

    await chatbaze.findByIdAndDelete(messageId);
    return res.status(200).json({ message: "Xabar o'chirildi" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server xatosi" });
  }
};
