import React, {useState} from 'react';
import ToDoItem from './todoitem';

const ToDoList = () => {
    const [tasks, setTasks] = useState([
        {
            id:1,
            text: "Cook",
            completed: false,
        }
    ]);

    const [text, setText] = useState("");
        function addTask(text){
                const newTask={
                    id:Date.now(),
                    text ,
                    completed: false,
                };
                setTasks([...tasks, newTask]);
                setText("");

        }
        function handleKeyPress(item,e){
            if(e.key === "Enter"){
                addTask(item)
            }
        }

        function deleteTask(id){
            setTasks(tasks.filter(task => task.id !== id));
        }

        function toggleCompleted(id){
            setTasks(tasks.map(task => {
                if(task.id === id){
                    return{...task, completed: !task.completed};
                } else{
                    return task
                }
            }))
        }

	return (
		<div className="container">
            <div className="mx-auto">
			<h1 >My To Do's</h1>
            </div>
            <div className="inputGroup">
            <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={(e) => handleKeyPress(text,e)}
            />
            <button
            className="btn btn-success mx-2"
            onClick={() => addTask(text)}
            >Add Task</button>
            </div>
		<ul>
            {tasks.map(task => (
                <ToDoItem 
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleCompleted={toggleCompleted}
                />
            ))}
            </ul>
			
		
		</div>
	);
};

export default ToDoList;