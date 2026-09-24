const tasks = [
    {id : 1, title:"Learn React",completed : true},
    {id : 2 ,title:"Learn Express", completed : true}
];
const getTasks = () => {
    return tasks;
}

const createTask = (title) => {
    const newTask = {
        id: tasks.length +1,
        title : title,
        completed : false
    };
    tasks.push(newTask);
    return newTask;
};

const updateTask = (id,title,completed) => {
    const task = tasks.find(task => task.id === id);
    if (!task){
        return null;
    }
    task.title = title;
    task.completed= completed;
    return task;
};

const deleteTask =(id) => {
    const index = tasks.findIndex(task => task.id === id);
        if (index === -1){
            return false;
        }
        tasks.splice(index,1);
          return true;
};

module.exports={
    getTasks,
    createTask,
    updateTask,
    deleteTask

};