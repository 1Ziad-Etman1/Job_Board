import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ApplicationForm.scss";

const ApplicationForm = () => {
	const { jobId } = useParams();
	const [formData, setFormData] = useState({
		name: "",
		contact_email: "",
		resume: null,
		cover_letter: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData({ ...formData, resume: file });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formDataToSend = new FormData();
		console.log(jobId);
		formDataToSend.append("name", formData.name);
		formDataToSend.append("contact_email", formData.contact_email);
		formDataToSend.append("job", jobId);
		formDataToSend.append("cover_letter", formData.cover_letter);
		formDataToSend.append("resume", formData.resume);
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/apis/applications/",
				formDataToSend
			);
			console.log("Application submitted successfully:", response.data);
			window.location.href = "/";
		} catch (error) {
			console.error("Failed to submit application:", error);
		}
	};

	return (
		<div className="form-container">
			<h2 className="form-title">Job Application Form</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="form-input"
						required
					/>
				</div>
				<div>
					<label htmlFor="contact_email">Contact Email:</label>
					<input
						type="email"
						id="contact_email"
						name="contact_email"
						value={formData.contact_email}
						onChange={handleChange}
						className="form-input"
						required
					/>
				</div>
				<div>
					<label htmlFor="resume">Resume:</label>
					<input
						type="file"
						id="resume"
						name="resume"
						onChange={handleFileChange}
						className="form-input"
						required
					/>
				</div>
				<div>
					<label htmlFor="cover_letter">Cover Letter:</label>
					<textarea
						id="cover_letter"
						name="cover_letter"
						value={formData.cover_letter}
						onChange={handleChange}
						className="form-input"
						rows="4"
						required
					></textarea>
				</div>
				<button type="submit" className="form-button">
					Submit Application
				</button>
			</form>
		</div>
	);
};

export default ApplicationForm;
