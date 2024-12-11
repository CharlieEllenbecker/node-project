const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const tasks = [{ id: 0, description: "foo" }, { id: 1, description: "bar" }]; // Temporary storage

// Get tasks
app.get('/', (req, res) => {
    return res.status(200).send(tasks);
});

// Add task, return all tasks
app.post('/', (req, res) => {
    tasks.push(req.body);
    return res.status(200).send(tasks);
});

// Update task, return all tasks
app.put('/:id', (req, res) => {
    let taskId = parseInt(req.params.id, 10); // Convert id to a number
    let task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).send(`The task with the given id ${taskId} does not exist.`);
    }

    task.description = req.body.description; // the only thing to update...

    return res.status(200).send(tasks);
});

// Delete task, return all tasks
app.delete('/:id', (req, res) => {
    let taskId = parseInt(req.params.id, 10); // Convert id to a number
    let task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).send(`The task with the given id ${taskId} does not exist.`);
    }

    tasks = tasks.filter(task => task.id === taskId);

    return res.status(200).send(tasks);
});

const port = 3001;
module.exports = app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});