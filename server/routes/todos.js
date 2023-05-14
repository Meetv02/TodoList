
let Todo = require('../models/todo.model');

const express = require('express');
const router = new express.Router();

router.get('/',(req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.post('/add',(req, res) => {
  const { description,priority } = req.body;
  const newTodo = new Todo({
    description,
    priority,
  });

  newTodo.save()
    .then(() => res.json('Todo added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.get('/:id',(req, res) => {
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json(`Error: ${err}`));
});


router.delete('/:id',(req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json('Todo deleted.'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});


router.post('/update/:id',(req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      todo.description = req.body.description;
      todo.priority = req.body.priority;
      if(req.body.completed=='True'){
        todo.completed = true;
      }
      todo.save()
        .then(() => res.json('Todo updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
