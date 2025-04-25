import mongoose, { Schema } from 'mongoose'

const chat = new Schema({
      text: { type: String, required: true },
      from: { type: String, required: true }, // yuborgan odam idsi
      to: { type: String, required: true }, // qabul qiladigon odam idsi
})

export default mongoose.models['chats'] || mongoose.model("chats", chat)