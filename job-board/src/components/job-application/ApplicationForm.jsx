import React, { useState } from "react";
import "./ApplicationForm.scss";
const ApplicationForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [resume, setResume] = useState(null);
	const [coverLetter, setCoverLetter] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log("Form submitted:", { name, email, resume, coverLetter });

		setName("");
		setEmail("");
		setResume(null);
		setCoverLetter("");
	};

	return (
		<div className="form-container">
			<h2 className="form-title">Job Application Form</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="block mb-1">
						Name:
					</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="form-input"
						required
					/>
				</div>
				<div>
					<label htmlFor="email" className="block mb-1">
						Email:
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="form-input"
						required
					/>
				</div>
				<div>
					<label htmlFor="resume" className="block mb-1">
						Resume:
					</label>
					<input
						type="file"
						id="resume"
						accept=".pdf,.doc,.docx"
						onChange={(e) => setResume(e.target.files[0])}
						className="form-input"
						required
					/>
				</div>
				<div>
					<label htmlFor="coverLetter" className="block mb-1">
						Cover Letter:
					</label>
					<textarea
						id="coverLetter"
						value={coverLetter}
						onChange={(e) => setCoverLetter(e.target.value)}
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
