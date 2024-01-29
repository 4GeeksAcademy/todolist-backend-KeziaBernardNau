import React, {useState} from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";


//create your first component
const ToDoItem = ({task, deleteTask, toggleCompleted}) => {
    function handleChange(){
        toggleCompleted(task.id)
    }
    return (
        <li key={task.index}>
            <input className="box" type="checkbox" checked={task.completed} onChange={handleChange} />
            <div className="taskList left">{task.label}</div>
		{<div className="right button">
		<i className="fa-regular fa fa-trash" onClick={() => deleteTask(task.label)}></i>
		</div>}
        
        </li>
    );
};

export default ToDoItem;