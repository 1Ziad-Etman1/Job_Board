import React, { useState } from "react";
import axios from "axios";
import "./AddJob.scss";

const AddJob = () => {
	const [formData, setFormData] = useState({
		title: "",
		company_name: "",
		location: "",
		description: "",
		requirements: "",
		employer: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setFormData({
				...formData,
				employer: localStorage.getItem("username"),
			});
			const response = await axios.post(
				"http://127.0.0.1:8000/apis/jobs/",
				formData
			);
			console.log("Job added successfully:", response.data);
			// Optionally, you can redirect the user to a different page after successful job creation
			// window.location.href = '/jobs'; // Replace '/jobs' with the desired URL
		} catch (error) {
			console.error("Failed to add job:", error);
		}
	};

	return (
		<div className="add-job-container">
			<h2>Add Job</h2>
			<form onSubmit={handleSubmit} className="add-job-form">
				<div className="form-group">
					<label className="form-label">Title:</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="form-input"
					/>
				</div>
				<div className="form-group">
					<label className="form-label">Company Name:</label>
					<input
						type="text"
						name="company_name"
						value={formData.company_name}
						onChange={handleChange}
						className="form-input"
					/>
				</div>
				<div className="form-group">
					<label className="form-label">Location:</label>
					<input
						type="text"
						name="location"
						value={formData.location}
						onChange={handleChange}
						className="form-input"
					/>
				</div>
				<div className="form-group">
					<label className="form-label">Description:</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="form-textarea"
					/>
				</div>
				<div className="form-group">
					<label className="form-label">Requirements:</label>
					<textarea
						name="requirements"
						value={formData.requirements}
						onChange={handleChange}
						className="form-textarea"
					/>
				</div>
				<button type="submit" className="btn-submit">
					Add Job
				</button>
			</form>
		</div>
	);
};

export default AddJob;
