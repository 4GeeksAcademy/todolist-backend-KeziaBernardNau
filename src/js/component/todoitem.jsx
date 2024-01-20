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
			<input type="checkbox" checked={task.completed} onChange={handleChange} />
			<div className="taskList left">{task.text}</div>
			<div className="right">
				<button className="btn btn-danger" onClick={() => deleteTask(task.id)}>delete</button>
		</div>
		
		</li>
	);
};

export default ToDoItem;