import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../index';
import TextTask from '../components/TextTask';
import CheckTask from '../components/CheckTask';
import '../components/styles/Tasks.css';
import "./styles/courses.css";
import { getAllTasksByLessonId, createTask } from '../http/tasksAPI';

const Task = () => {
	const { user } = useContext(Context);
	const { lessonId, courseId } = useParams();
	const [lessonTasks, setLessonTasks] = useState([]);
	const [newTask, setNewTask] = useState({
		title: '',
		description: '',
		task_type: 'text',
		documentLink: ''
	});

	const renderTaskComponent = (task) => {
		switch (task.task_type) {
			case 'text':
				return <TextTask key={task.id} task={task} />;
			case 'check':
				return <CheckTask key={task.id} task={task} />;
			default:
				return null;
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log(newTask)
				const response = await getAllTasksByLessonId(courseId, lessonId);
				console.log('Tasks data:', JSON.stringify(response.data));
				setLessonTasks(response.data);
			} catch (error) {
				console.error('Failed to fetch tasks:', error);
			}
		};

		fetchData();
	}, [lessonId, courseId]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewTask(prevTask => ({
			...prevTask,
			[name]: value
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log(newTask)
			const response = await createTask(courseId, lessonId, newTask);
			// console.log('New task created:', response.data);
			setNewTask({
				title: '',
				description: '',
				task_type: 'text',
				documentLink: ''
			});
			const updatedTasks = await getAllTasksByLessonId(courseId, lessonId);
			setLessonTasks(updatedTasks.data);
		} catch (error) {
			console.error('Failed to create task:', error);
		}
	};
	console.log(user);
	return (
		<div className='task-container'>
			{lessonTasks.length === 0 ? (
				<p>No tasks found</p>
			) : (
				lessonTasks.map(task => (
					<div key={task.id} className="task">
						{renderTaskComponent(task)}
					</div>
				))
			)}
			{(user._user.title === 'admin' || user._user.title === 'teacher') && (
				<div className="task-card">
					<form onSubmit={handleSubmit}>
						<div className="task-info">
							<h3 className="task-title">Add New Task</h3>
							<div className="form-group">
								<textarea
									id="title"
									placeholder="Title"
									name="title"
									value={newTask.title}
									onChange={handleInputChange}
								></textarea>
							</div>
							<div className="form-group">
								<textarea
									id="description"
									placeholder="Description"
									name="description"
									value={newTask.description}
									onChange={handleInputChange}
								></textarea>
							</div>
							<div className="form-group">
								<select
									id="task_type"
									name="task_type"
									value={newTask.task_type}
									onChange={handleInputChange}
								>
									<option value="text">Text</option>
									<option value="check">Check</option>
								</select>
							</div>
							<div className="form-group">
								<input
									type="text"
									id="documentLink"
									placeholder="Document Link"
									name="documentLink"
									value={newTask.documentLink}
									onChange={handleInputChange}
								/>
							</div>
							<button type="submit" className="btn btn-primary" style={{ backgroundColor: '#28a745' }}>Add Task</button>
						</div>
					</form>
				</div>
			)}


		</div>
	);
};

export default Task;
