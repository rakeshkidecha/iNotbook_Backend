const mongoose =  require('mongoose');

const NoteSchema = new mongoose.Schema({
    title :{
        type:String,
        required:true
    },
    decription : {
        type : String,
        required: true
    },
    date:{
        type : Date,
        defualt : Date.now
    }
})

module.exports = mongoose.model('notes',NoteSchema);