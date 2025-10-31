const express = require('express');
const router = express.Router();
 const TodoController = require('../controller/TodoController');

 router.post('/create', TodoController.createTodo);
 router.post('/pending', TodoController.findAllPendingTodos);
 router.post('/completed', TodoController.findAllCompleteTodos);
 router.post('/find-by-id/:id', TodoController.findTodoById);
 router.post('/update-status/:id', TodoController.updateTodoContent);
 router.post('update-content/:id', TodoController.updateTodoContent);
 router.post('/delete/:id', TodoController.deleteTodoById);

 module.exports = router;