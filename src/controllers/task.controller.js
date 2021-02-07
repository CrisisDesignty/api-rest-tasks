import Task from '../models/Task';
import {getPagination} from '../libs/getPagination'

export const findAllTaks = async(req, res) => {
    try {
        const {size, page, title} = req.query;

        const condition = title ? {
            title: {$regex: new RegExp(title), $options: "i"}
        }: {}; 

        const {limit, offset} = getPagination(page, size);
        const data = await Task.paginate(condition, { offset, limit });

        res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            curretnPage: data.page -1
        });
    } catch (error){
        res.status(500).json({
            message: error.mesage || 'something goes wrong retriving task',
        });
    }
};

export const sendNewTasks = async(req, res) => {
    if(!req.body.title) {
        return res.status(400).send({message: 'Content cannot be empty'});
    }
    try {
        const newTask = new Task({ 
            title: req.body.title, 
            description: req.body.description,
            done: req.body.done ? req.body.done : false });
        const taskSaved = await newTask.save(); 
        res.json(taskSaved);
    } catch (error){
        res.status(500).json({
            message: error.message || 'something goes wrong creating a task',
        });
    }
};

export const findOneTask = async(req, res) => {
    const { id } = req.params;
    try {    
        const task = await Task.findById(id);
        if (!task)
            return res
                .status(404)
                .json({message: `Task with id ${id} does not exist`})
        res.json(task)
    } catch (error) {
        res.status(500).json({
            mesage: error.message || `Error retriving Task with id: ${id}`
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.json({
            mesage: "Task were deltede succesfully"
    });
    } catch (error) {
        res.status(500).json({
            message: error.message || `Cannot delete task with id: ${id}`,
        })
        
    }
    
}
export const findAllDoneTasks = async (req, res) => {
    const tasks = await Task.find({done: true})
    res.json(tasks)
}

export const updateTask = async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: 'Task was updated succesfully' })
}