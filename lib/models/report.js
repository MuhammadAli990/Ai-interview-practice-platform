import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        interview:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Interview',
            required:true
        },
        feedback:{
            type:String,
            required:true
        },
        totalRating:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

export default Report;