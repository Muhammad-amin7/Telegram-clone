import mongoose, { Schema } from 'mongoose'

const userinfo_schema = new Schema({
      firstName: { type: String, required: true }, //ismi
      lastName: { type: String, required: false }, // familyasi
      email: { type: String, required: true }, //nomerdan kegin email sorasin 
      status: { type: Boolean, required: true, default: false }, // online yoki ofline
      username: { type: String, required: false }, //username
      bio: { type: String, required: false, default: " " }, // bio
      img: { type: String, required: false }, // rasmi base64 qilib saqlash 
      dob: { type: String, required: false },// rasmi base64 qilib saqlash 
      socketID: { type: String, required: false },// rasmi base64 qilib saqlash 
})

export default mongoose.models['Users'] || mongoose.model('Users', userinfo_schema);