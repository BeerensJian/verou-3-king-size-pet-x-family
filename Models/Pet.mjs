import mongoose from "mongoose";
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    birthday: {
        type: Date,
        required: true,
    },
    neutered: {
        type: String,
        enum: ["yes", "no"]
    },
    microshipNr: {
        type: Number,
    },
    breed: {
        type: String,
    },
    typeOfAnimal: {
        type: String,
        enum: ["dog", "cat", "rabbit", "hamster", "reptile", "bird", "fish", "other"]
    },
    status: {
        type: String,
        enum: ["normal", "sold", "passed-away", "missing", "unknown"]
    },
    ownerID: {
        type: String,
    }

})

export default mongoose.model("Pet", petSchema)