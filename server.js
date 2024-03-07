const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    // TODO: Send all jobs
    res.send('Get');
});

app.post('/', (req, res) => {
    // TODO: Add job to the list of jobs
    res.send('Post');
});

app.put('/', (req, res) => {
    // TODO: Update job
    res.send('Put');
});

app.delete('/', (req, res) => {
    // TODO: Delete job
    res.send('Delete');
});



app.listen(port, () => {
    console.log(`App listening on ${port}`);
});