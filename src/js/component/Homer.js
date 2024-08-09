import React, { useState } from "react";

//include images into your bundle
import ToDoComponent from "./ToDoComponent";

//create your first component
const Homer = () => {
	
	const [toDo, setToDo] = useState("");
	const [toDos, setToDos] = useState([]);

	const deleteToDo = (index) => {
		const newToDos = toDos.filter((_, i) => i !== index);
		setToDos(newToDos);
	}

	return (
		<div className="container text-center mt-5">
			<div className="container justify-content-center">

				<div className="mb-3">
					<label htmlFor="toDoList" className="form-label">TODO's</label>
					<input
						type="text"
						className="form-control"
						id="toDolist" placeholder="What needs to be done?"
						value={toDo}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setToDos([...toDos, toDo]);
								setToDo("");
							}
						}} onChange={(e) => {
							setToDo(e.target.value);
						}} />
				</div>

				<div className="container mb-5">
					{toDos.map((toDo, index) => (
						<ToDoComponent
							key={index}
							todo={toDo}
							onDelete={() => deleteToDo(index)}
						/>
					))}
				</div >

				<button className="col-1 btn btn-danger" onClick={() => {
					setToDo("");
					setToDos([]);
				}}>Clear All!!</button>
				<p className="d-flex justify-context-start px-5 mt-3">{toDos.length} items left</p>
			</div>

		</div>
	);
};

export default Homer;