import mongoose, { Schema } from "mongoose";

const ConfirmationCodes = new Schema({
      target: { type: String, required: true },
      code: { type: String, required: true }, //code
      created_at: { type: Date, default: Date.now }, // kod qoshilgandan kegin 5 minut bazada turadi
      used: { type: Boolean, default: false },
      expires_at: { type: Date }
});

export default mongoose.models["Confirmation Codes"] || mongoose.model("Confirmation Codes", ConfirmationCodes);
