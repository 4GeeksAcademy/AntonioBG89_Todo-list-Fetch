import React, { useState, useEffect } from "react";

//include images into your bundle
import ToDoComponent from "./ToDoComponent";

//create your first component
const Home = () => {
	//LOGICA
	const getUserURL = "https://playground.4geeks.com/todo/users/AntonioBG89";
	const getToDoURL = "https://playground.4geeks.com/todo/todos/AntonioBG89";

    const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	useEffect(()=>{
		const newUser = {"name": "AntonioBG89", "todos": []};
		fetch(getUserURL, {
			method: "POST",
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(data => console.log("User created:", data))
		.catch(error => console.error("Error creating user:", error));
	}, []);
	
	//fecth (url de la API, {metodos, body, infor es un json})
	//.then (codigo de status y el mensaje, aquí se convierte de json a JS)
	//.then (manejar la info que nos llega de la API)
	//.catch (si algo sale mal en el código de aquí es donde obtenemos la info de error)
	// Si el método no se especifica en el fetch, automáticamente se interpreta como un GET

	const addTodo = () => {
		const newToDo = {"label": newTodo, "is_done": false};
		fetch(getToDoURL, {
			method: "POST",
			body: JSON.stringify(newToDo),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log("ToDo added:", data);
			setTodos([...todos, data]);
		})
		.catch(error => console.error("Error adding ToDo:", error));
		
	};

	const deleteTodo = (id) => {
		fetch(`${getToDoURL}/${id}`, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			if (response.ok){
				setTodos(todos.filter(todo => todo.id !== id));
				console.log(`ToDo with id ${id} deleted successfully.`);				
			} else {console.error(`Failed to delete ToDo with id ${id}.`);}
		})
		.catch(error => console.error("Error deleting ToDo:", error));
	}

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && newTodo.trim() !== "") {
			addTodo(newTodo);
			setNewTodo("");
		}
	};

	return (
		<div className="container text-center mt-5">
			<div className="container justify-content-center">

				<div className="mb-3">
					<label htmlFor="toDoList" className="form-label">TODO's</label>
					<input
						type="text"
						className="form-control"
						id="toDolist"
						placeholder="What needs to be done?"
						value={newTodo}
						onKeyDown={handleKeyDown}
						onChange={(e) => setNewTodo(e.target.value)}
						/>
				</div>

				<div className="container mb-5">
					{todos.map((value) => ( 
						<ToDoComponent
							key={value.id}
							toDo={value.label}
							onDelete={() => {
								deleteTodo(value.id)}}
						/>
					 ))}
				</div >

				<button className="col-1 btn btn-danger" onClick={() => {
					setTodos([]);
				}}>Clear All!!</button>
				
				<p className="d-flex justify-context-start px-5 mt-3">{todos.length} items left</p>
			</div>

		</div>
    );
};

export default Home;