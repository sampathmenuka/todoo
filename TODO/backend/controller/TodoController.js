const Todo = require('../model/TodoSchema');
const Todo = require('../model/UserScema');

const createTodo = async(req,resp)=>{
    try{
        const {title,description,dueDate} = req.body;
        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({massage:'User not found'});
        }
        const todo = new Todo({
            user:selectedUser._id,
            title,
            description,
            dueDate
        });
        await todo.save();
        resp.status(201).json({todo});
    }catch{
        resp.status(500).json({massage:'Internal server error', error:e})
    }
    
}

const findAllPendingTodos = async(req,resp)=>{
    try{ 
        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({massage:'User not found'});
        }
        const todos = await Todo.find({user:selectedUser._id, isCompleted:false});
        resp.status(201).json({todos});
    }catch{
        resp.status(500).json({massage:'Internal server error', error:e})
    }
    
}

const findAllCompleteTodos = async(req,resp)=>{
    try{ 
        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({massage:'User not found'});
        }
        const todos = await Todo.find({user:selectedUser._id, isCompleted:true});
        resp.status(201).json({todos});
    }catch{
        resp.status(500).json({massage:'Internal server error', error:e})
    }
}

const findTodoById = async(req,resp)=>{
    try{ 
        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({massage:'User not found'});
        }
        const todo = await Todo.findOne({_id: req.params.id, user:selectedUser._id});
        if(!todo) return resp.status(404).json({'massage':"Not found"});
        resp.status(201).json({todo});
    }catch{
        resp.status(500).json({massage:'Internal server error', error:e})
    }
}

 
const updateTodoStatus = async(req,resp)=>{
    try{ 
        const {status} = req.body;
        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({massage:'User not found'});
        }
        const todo = await Todo.findOneAndUpdate({_id: req.params.id, user:selectedUser._id},
            {isCompleted:status},{new:true}
        );
        if(!todo) return resp.status(404).json({'massage':"Not found"});
        resp.status(201).json({todo});
    }catch{
        resp.status(500).json({massage:'Internal server error', error:e})
    }
}


const updateTodoContent = async(req,resp)=>{
   try{ 
        const {title,description,dueDate} = req.body;

        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({massage:'User not found'});
        }
        const todo = await Todo.findOneAndUpdate(
            {_id: req.params.id, user:selectedUser._id},
            {title,description,dueDate},{new:true}
        );
        if(!todo) return resp.status(404).json({'massage':"Not found"});
        resp.status(201).json({todo});
    }catch{
        resp.status(500).json({massage:'Internal server error', error:e})
    } 
}

const deleteTodoById = async(req,resp)=>{
   try{ 
        const {title,description,dueDate} = req.body;

        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({massage:'User not found'});
        }
        const todo = await Todo.findOneAndDelete(
            {_id: req.params.id, user:selectedUser._id}
  
        );
        if(!todo) return resp.status(404).json({'massage':"Not found"}); 
        resp.status(201).json({'massage':"Deleted!"});
    }catch{
        resp.status(500).json({massage:'Internal server error', error:e})
    } 
}

module.exports={createTodo,
    findAllPendingTodos,
    findAllCompleteTodos,
    findTodoById,
    updateTodoStatus,
    updateTodoContent,
    deleteTodoById}