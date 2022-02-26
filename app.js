const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/tasks');

const app = express();

const dbUri = 'mongodb+srv://akii:akanshu7699662622@cluster0.xwrtq.mongodb.net/Nodetuts?retryWrites=true&w=majority';
mongoose.connect(dbUri)
    .then((response) => {
        app.listen(3000, () => {
            console.log("Server connected at port 3000");
        });
    })
    .catch(err => {
        console.log(err);
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.redirect('/tasks');
});
app.get('/tasks', (req, res) => {
    Task.find()
        .then((result) => {
            console.log(result);
            res.render('index', { title: "My Tasks", tasks: result });
        })
        .catch(err => {
            console.log(err);
        });

});

app.post('/tasks', (req, res) => {
    const task = new Task({
        description: req.body.description,
        completed: false
    });
    task.save()
        .then(result => {
            res.redirect('/tasks');
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/tasks/create', (req, res) => {
    res.render('create', { title: "Create Task" });
});

app.get('/tasks/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, { completed: true })
        .then(result => {
            res.redirect('/tasks');
        })
});

app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/tasks' });
        })
        .catch(err => {
            console.log(err);
        });
});