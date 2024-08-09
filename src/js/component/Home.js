import React, { useState } from "react";

//include images into your bundle
import ToDoComponent from "./ToDoComponent";
import { RxValue } from "react-icons/rx";

//create your first component
const Home = () => {
	//LOGICA
	const getUserURL = "https://playground.4geeks.com/todo/users/AntonioBG89";
	const getToDoURL = "https://playground.4geeks.com/todo/todos/AntonioBG89";

    const [todos, setTodos] = useState([]);
	//fecth (url de la API, {metodos, body, infor es un json})
	//.then (codigo de status y el mensaje, aquí se convierte de json a JS)
	//.then (manejar la info que nos llega de la API)
	//.catch (si algo sale mal en el código de aquí es donde obtenemos la info de error)
	// Si el método no se especifica en el fetch, automáticamente se interpreta como un GET
	/* fetch(userUrl)
	.then((response)=>{console.log(response);
		return response.json();
	})
	.then((data)=>{console.log(data);
	})
	.catch((error)=>{error});
	*/
	let newUser = {"name": "AntonioBG89",
		"todos": []};
	let newToDo = {"label": "Pasear perro",
		"is_done": false};

	fetch(getUserURL, {
		method: "POST",
		body: JSON.stringify(newUser)
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => error);

	fetch(getUserURL, {
		method : "POST",
		body: JSON.stringify(newToDo),
		headers: {
			'Content-Type': 'aplication/json'
		}
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => error);
	
	// fetch(getUserURL)
	// 	.then(response => response.json())
	// 	.then(data => {setTodos(todos)})
	// 	.catch(error => error);

	//let newToDo = {
	//	label: "Esperar al cartero",
	//}
	// fetch(getToDoURL, {
	// 	method: "POST",
	// 	body: JSON.stringify(/*newToDo*/)
	// })
	// .then(response => response.json())
	// .then(data => console.log(data))
	// .catch(error => error);

	return (
		<div className="container text-center mt-5">
			<div className="container justify-content-center">

				<div className="mb-3">
					<label htmlFor="toDoList" className="form-label">TODO's</label>
					<input
						type="text"
						className="form-control"
						id="toDolist" placeholder="What needs to be done?"
						value={data.todos}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setTodos([...todos]);
							}
						}} onChange={(e) => {
							setTodos(e.target.value);
						}} />
				</div>

				<div className="container mb-5">
					{todos.map((value, index) => ( 
						<ToDoComponent
							key={value.id}
							todo={value.label}
							onDelete={() => deleteToDo(index)}
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