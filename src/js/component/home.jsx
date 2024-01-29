import React, {useState, useEffect} from "react";
import ToDoList from "./todolist";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	useEffect(()=>{
		async function createUser(){
			let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Keziab",{
				method:"POST",
				headers: {
					"Content-Type": "application/json",
				  },
				body: JSON.stringify([])
			})
			let data = await response.json()
			console.log(data)
		}
		createUser()
	},[])
	return (
		<ToDoList />
	);
};

export default Home;
