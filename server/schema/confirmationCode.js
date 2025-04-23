import mongoose, { Schema } from "mongoose";

const ConfirmationCodes = new Schema({
      target: { type: String, required: true }, 
      code: { type: String, required: true }, //code
      created_at: { type: Date, default: Date.now }, // kod qoshilgandan kegin 5 minut bazada turadi
});

export default mongoose.model("Confirmation Codes", ConfirmationCodes);
