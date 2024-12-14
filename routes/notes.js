const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchUser = require('../middelware/fatchUser');

// routes 1 fetch all notes are avalable on user 
router.get('/fetchAllNotes',fetchUser,async(req,res)=>{
    try {
        const allNotes = await Note.find();
        res.json(allNotes);

    } catch (err) {
        console.log(err)
        res.status(500).json({errors:"Some servers error.."})
    }
})

// routes 2 add not of the user log in 
router.post('/addNot',fetchUser,async(req,res)=>{
    try {
        const {title,description} = req.body;
        const addedNot = await Note.create({
            title,description,user:req.user.id
        })
        return res.json(addedNot);

    } catch (err) {
        console.log(err)
        res.status(500).json({errors:"Some servers error.."})
    }
})

//router 3 update note of the user log in and want to update
router.put('/updateNote/:id',fetchUser,async(req,res)=>{
    const {title,description} = req.body;
    try {
        let newNote = {};

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found..");
        }

        if(title){
            newNote.title = title;
        }

        if(description){
            newNote.description = description;
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allowed to upadate...");
        }

        note = await Note.findByIdAndUpdate(req.params.id,newNote);
        return res.json(newNote);

        
    }  catch (err) {
        console.log(err)
        res.status(500).json({errors:"Some servers error.."})
    }
})

//router 4 Delete note of the user log in and want to Delete
router.delete('/deleteNote/:id',fetchUser,async(req,res)=>{
    try {
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found..");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allowed to upadate...");
        }
        
        note = await Note.findByIdAndDelete(req.params.id);
        return res.json({"success":"successfully deleted the note",note:note});

    } catch (err) {
        console.log(err)
        res.status(500).json({errors:"Some servers error.."})
    }
})

module.exports = router;
