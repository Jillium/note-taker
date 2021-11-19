const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./Develop/db/db.json');

const PORT = process.env.PORT || 3003;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join('public')));

// gets notes from the db.json file 
app.get('/api/notes', (req, res) => {
    res.json(notes);
})



function createNewNote(body, notesArray) {
    
    const note = body;
    notesArray.push(note)

    

    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({notes: notesArray }, null, 2)
    );

    return body;
};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
   
    return true;
  }



app.post('/api/notes', (req, res) => {
    console.log(req.body);
    req.body.id = notes.length.toString();
    
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted. ');
    } else {
        const note = createNewNote(req.body, notes)

        res.json(note);
    }
    
})


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});