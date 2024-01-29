import React, {useState, useEffect} from 'react';
import ToDoItem from './todoitem';


const ToDoList = () => {
    const [tasks, setTasks] = useState([
      // {
      //   id: 1,
      //   text: "Cook",
      //   completed: false,
      // },
    ]);
    const [text, setText] = useState("");
  
    //   onload get any todos that already exist
    useEffect(() => {
      async function getTodos() {
        let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Keziab")
        let data = await response.json()
        setTasks(data)
      }
      getTodos()
    }, []);
  
    

    function addTask(newTask) {
      let formattedTask = { label: newTask, done: false }
      let newTaskArray = [...tasks, formattedTask];
          fetch("https://playground.4geeks.com/apis/fake/todos/user/Keziab", {
            method: "PUT",
            body: JSON.stringify(newTaskArray),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) throw Error(response.statusText);
              return response.json();
            })
      
            .then((data) => {
              // Here is where your code should start after the fetch finishes
              setTasks(newTaskArray);
              // This will print on the console the exact object received from the server
            })
            .catch((error) => {
              // Error handling
              console.log(error);
            });
      
          setTasks(newTaskArray);
          setText("")
    }
  
    function handleKeyPress(item, e) {
      if (e.key === "Enter") {
        addTask(item);
      }
    }
  
    function deleteTask(label) {
      console.log(label)
      console.log(tasks)
      const newList = tasks.filter((todo, index) => todo.label !== label);
      console.log(newList);
      fetch("https://playground.4geeks.com/apis/fake/todos/user/Keziab", {
        method: "PUT",
        body: JSON.stringify(newList),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log(resp.ok); // Will be true if the response is successful
          console.log(resp.status); // The status code=200 or code=400 etc.
          console.log(resp.text()); // Will try to return the exact result as a string
          return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
        })
        .then((result) => {
          console.log("Success:", result);
        })
        .catch((error) => {
          // Error handling
          console.log(error);
        });
        setTasks(newList);
    }
  
  
    function toggleCompleted(id) {
      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          } else {
            return task;
          }
        })
      );
    }
  
  
    return (
      <div className="container paper">
        <div className="mx-auto pattern">
          <h1>My To Do List</h1>
        </div>
        <div className="inputGroup content">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => handleKeyPress(text, e)}
          />
          <button className="btn btn-success mx-2" onClick={() => addTask(text)}>
            Add Task
          </button>
        </div>
        <ul>
          {tasks.length ? (
            tasks.map((task,index) => (
              <ToDoItem
                key={index}
                task={task}
                deleteTask={deleteTask}
                toggleCompleted={toggleCompleted}
              />
            ))
          ) : (
            <h6>Add to do's</h6>
          )}
        </ul>
      </div>
    );
  };
  
  export default ToDoList;