import mongoose, { Schema } from 'mongoose'

const userinfo_schema = new Schema({
      firstName: { type: String, required: true }, //ismi
      lastName: { type: String, required: false }, // familyasi
      telephone: { type: Number, required: true }, // nomeri
      email: { type: String, required: true }, //nomerdan kegin email sorasin 
      status: { type: Boolean, required, default: false }, // online yoki ofline
      username: { type: String, required: false }, //username
      bio: { type: String, required: flase, default: " " }, // bio
})

export default mongoose.model("Confirmation Codes", userinfo_schema);