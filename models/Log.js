import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  room_id: { type: String, required: true },
  card_uid: { type: String, required: true },
  role: { type: String, required: true },
  event_type: { type: String, required: true },
  event_time: { type: String, required: true },
  session_id: { type: String, default: null },
  duration: { type: Number, default: 0 }
}, { timestamps: true });

const Log = mongoose.model("Log", logSchema);

export default Log;
