import mongoose from "mongoose";
import { Schema, model } from "mongoose";


const programSchema =  new Schema({
    name: { type: String, required: true },
    goal: { type: String, required: true },
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
},
{ timestamps: true }
);


export const Program = model("Program",programSchema);


