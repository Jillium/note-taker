// const fs = require('fs');
// const path = require('path');
const express = require('express');
const { notes } = require('./Develop/db/db.json');
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3003;
const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

// app.use(express.static('public'));
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});