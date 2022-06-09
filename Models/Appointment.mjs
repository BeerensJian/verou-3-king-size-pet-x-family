import mongoose from "mongoose";
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

    doctor: {
        type: String
    },
    date: {
        type: Date
    },
    notes: {
        type: String
    },
    ownerID: {
        type: String
    },
    petID: {
        type: String
    }

})

export default mongoose.model("Appointment", appointmentSchema);