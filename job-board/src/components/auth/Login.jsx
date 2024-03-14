import React, { useState } from "react";
import "./Login.scss"; // Import SCSS file

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		// You can add login logic here
	};

	return (
		<div className="login-container">
			<h2 className="login-title">Log In</h2>
			<form onSubmit={handleSubmit} className="login-form">
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
					<label htmlFor="password" className="form-label">
						Password:
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="form-input"
						required
					/>
				</div>
				<button type="submit" className="btn-login">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
