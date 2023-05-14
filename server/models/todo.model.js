const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  description: { type: String, required: true },
  priority : String,
  completed: { type: Boolean, default : false , required: true }
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
