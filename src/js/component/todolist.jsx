import React, {useState, useEffect} from 'react';
import ToDoItem from './todoitem';

const ToDoList = () => {
    const [tasks, setTasks] = useState([
        {
            id:1,
            text: "Cook",
            completed: false,
        }
    ]);
    
    fetch('https://playground.4geeks.com/apis/fake/todos/user/DillonClass', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        console.log(resp.text()); // Will try to return the exact result as a string
        return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
    })
    .then(data => {
        // Here is where your code should start after the fetch finishes
        setTasks(data); // This will print on the console the exact object received from the server
    })
    .catch(error => {
        // Error handling
        console.log(error);
    });
   

    const [text, setText] = useState("");
        function addTask(newTask){
                let newTaskArray = [...tasks,{label: newTask, done: false}];
                fetch('https://playground.4geeks.com/apis/fake/todos/user/Keziab', {
                    method: "PUT",
                    body: JSON.stringify(newTaskArray),
                    headers: {
                      "Content-Type": "application/json"
                    }
                  })
                  .then( response => {
                    if(!response.ok) throw Error(response.statusText);
                return response.json();
                })

                  .then(data => {
                      // Here is where your code should start after the fetch finishes
                      setItems(newTaskArray);
                       // This will print on the console the exact object received from the server
                  })
                  .catch(error => {
                      // Error handling
                      console.log(error);
                  });

                  console.log(data)
        }
        function handleKeyPress(item,e){
            if(e.key === "Enter"){
                addTask(item)
            }
        }

        function deleteTask(id){
            const newList = tasks.filter(task => task.id !== id);
            fetch('https://playground.4geeks.com/apis/fake/todos/user/Keziab', {
      method: "PUT",
      body: JSON.stringify(newList),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        console.log(resp.text()); // Will try to return the exact result as a string
        return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
    })
    .then(result => {
        console.log("Success:", result);
        setTasks(newList);
    })

    .catch(error => {
        // Error handling
        console.log(error);
    });
        }

        useEffect(()=>{
            fetch('https://playground.4geeks.com/apis/fake/todos/user/Keziab')
            .then(response=>response.clone().json())
            .then(data=>{
                console.log(data)
                setTasks(data)
            })
            .catch(
                error=>console.error("this is an error",error)
            )
    },[])
  

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
		<div className="container paper">
            <div className="mx-auto pattern">
			<h1 >My To Do's</h1>
            </div>
            <div className="inputGroup content">
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
            {tasks.length ? tasks.map(task => (
                <ToDoItem 
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleCompleted={toggleCompleted}
                />
            )): <h6>Add to do's</h6>
        }
            </ul>
			
		
		</div>
	);
};

export default ToDoList;