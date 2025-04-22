import mongoose, { Schema } from "mongoose";

const confirmationCode_baze = new Schema({
      target: { type: Schema.Types.Mixed, required: true }, //nomeri yoki email adresi
      type: { type: String, required: true }, //email or phone 
      code: { type: String, required: true }, //code
      created_at: { type: Date, default: Date.now }, // kod qoshilgandan kegin 5 minut bazada turadi
});

export default mongoose.model("Confirmation Codes", confirmationCode_baze);
