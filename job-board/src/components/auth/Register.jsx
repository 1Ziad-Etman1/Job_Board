import React, { useState } from "react";
import "./Register.scss";

const Register = () => {
	// Temporary data for registration
	const [formData, setFormData] = useState({
		name: "John Doe",
		email: "john.doe@example.com",
		address: "456 Elm St, Townsville, XYZ",
		phoneNumber: "987-654-3210",
		skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
		experience: "2 years",
		education: "Bachelor's in Computer Science",
	});

	// Handler for form input changes
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Handler for form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		// You can add registration logic here
	};

	return (
		<div className="register-container">
			<h2 className="register-title">Register</h2>
			<form onSubmit={handleSubmit} className="register-form">
				<div className="form-group">
					<label htmlFor="name" className="form-label">
						Name:
					</label>
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
				<div className="form-group">
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="address" className="form-label">
						Address:
					</label>
					<input
						type="text"
						id="address"
						name="address"
						value={formData.address}
						onChange={handleChange}
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="phoneNumber" className="form-label">
						Phone Number:
					</label>
					<input
						type="tel"
						id="phoneNumber"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleChange}
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="skills" className="form-label">
						Skills:
					</label>
					<input
						type="text"
						id="skills"
						name="skills"
						value={formData.skills.join(", ")}
						onChange={handleChange}
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="experience" className="form-label">
						Experience:
					</label>
					<input
						type="text"
						id="experience"
						name="experience"
						value={formData.experience}
						onChange={handleChange}
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="education" className="form-label">
						Education:
					</label>
					<input
						type="text"
						id="education"
						name="education"
						value={formData.education}
						onChange={handleChange}
						className="form-input"
						required
					/>
				</div>
				<button type="submit" className="btn-register">
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
