import mongoose from "mongoose";

export const makeId = (id) => new mongoose.Types.ObjectId(id);
