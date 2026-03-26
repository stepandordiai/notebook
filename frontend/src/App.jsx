import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";

const dateNow = new Date();
const dateNumber = dateNow.getDate();
const yearNow = dateNow.getFullYear();

// TODO: learn this
const month = dateNow.toLocaleString("default", { month: "short" });
const day = dateNow.toLocaleString("default", { weekday: "long" });

function App() {
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [todos, setTodos] = useState([]);
	const [todoEditable, setTodoEditable] = useState(false);
	const [editableTodoId, setEditableTodoId] = useState("");
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		description: "",
		date: dateNow.toLocaleDateString(),
	});

	const handleFormData = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const createTodo = async (e) => {
		e.preventDefault();

		if (!formData.description) {
			return;
		}

		try {
			const res = await axios.post(
				"https://notebook-mclx.onrender.com/todos",
				formData,
			);

			setTodos((prev) => [...prev, res.data]);

			setFormData({
				description: "",
				date: dateNow.toLocaleDateString(),
			});
		} catch (error) {}
	};

	const handleEditTodo = (id) => {
		setTodoEditable(true);
		setEditableTodoId(id);

		setDescription(todos.find((todo) => todo.id === id).description);
		setDate(todos.find((todo) => todo.id === id).date);
	};

	const editTodo = async (id) => {
		try {
			const res = await axios.put(
				`https://notebook-mclx.onrender.com/todos/${id}`,
				{
					description,
					date,
				},
			);

			setTodos((prev) =>
				prev.map((todo) => (todo.id === id ? res.data : todo)),
			);

			setTodoEditable(false);
		} catch (error) {}
	};

	const deleteTodo = async (id) => {
		try {
			await axios.delete(`https://notebook-mclx.onrender.com/todos/${id}`);

			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		} catch (error) {}
	};

	useEffect(() => {
		try {
			const getTodos = async () => {
				const res = await axios.get("https://notebook-mclx.onrender.com/todos");
				setTodos(res.data);
			};

			getTodos();
		} catch (error) {}
	}, []);

	return (
		<main className="main">
			<div className="container">
				<div style={{ padding: 25 }}>
					<h1 className="title">Today</h1>
					<p>{`${dateNumber} ${month} ${yearNow} ${day}`}</p>
				</div>
				<ul className="list">
					{todos.map((todo) => {
						return (
							<li key={todo.id}>
								{todoEditable && editableTodoId === todo.id ? (
									<input
										style={{ marginRight: 5 }}
										type="text"
										onChange={(e) => setDescription(e.target.value)}
										value={description}
									/>
								) : (
									<p>{todo.description}</p>
								)}
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										gap: 5,
									}}
								>
									{todoEditable && editableTodoId === todo.id ? (
										<input
											type="text"
											onChange={(e) => setDate(e.target.value)}
											value={date}
										/>
									) : (
										<p>{todo.date}</p>
									)}
									{todoEditable && editableTodoId === todo.id ? (
										<button onClick={() => editTodo(todo.id)}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												className="bi bi-check-lg"
												viewBox="0 0 16 16"
											>
												<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
											</svg>
										</button>
									) : (
										<>
											<button onClick={() => handleEditTodo(todo.id)}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													className="bi bi-pen"
													viewBox="0 0 16 16"
												>
													<path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
												</svg>
											</button>
											<button onClick={() => deleteTodo(todo.id)}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													className="bi bi-trash"
													viewBox="0 0 16 16"
												>
													<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
													<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
												</svg>
											</button>
										</>
									)}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
			<form className="float-form" onSubmit={createTodo}>
				<input
					className="float-form__input"
					onChange={(e) => handleFormData(e.target.name, e.target.value)}
					value={formData.description}
					name="description"
					type="text"
					placeholder="Description"
				/>
				<button type="submit">Add</button>
			</form>
		</main>
	);
}

export default App;
