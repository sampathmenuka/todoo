const express = require('express');
const router = express.Router();
 const TodoController = require('../controller/TodoController');
 const middleware = require('../middleware/middleware');

 router.post('/create',middleware, TodoController.createTodo);
 router.post('/pending',middleware, TodoController.findAllPendingTodos);
 router.post('/completed', middleware,TodoController.findAllCompleteTodos);
 router.post('/find-by-id/:id',middleware, TodoController.findTodoById);
 router.post('/update-status/:id',middleware, TodoController.updateTodoContent);
 router.post('update-content/:id',middleware, TodoController.updateTodoContent);
 router.post('/delete/:id', middleware,TodoController.deleteTodoById);

 module.exports = router;