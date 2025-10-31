const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        default:""
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    dueData:{
        type:date
    },
    


} ,{timestamps:true});
module.exports = mongoose.model("Todo",TodoSchema)