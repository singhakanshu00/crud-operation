const mongoose = require('mongoose');
const schema = mongoose.Schema;

const taskSchema = new schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;