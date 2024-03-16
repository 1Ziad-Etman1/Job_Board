import React, { useState } from "react";
import "./Login.scss"; // Import SCSS file
import axios from "axios";

const Login = () => {
	const [formData, setFormData] = useState({
		contact_email: "",
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
		localStorage.removeItem("authToken");
		localStorage.removeItem("userData");
		localStorage.removeItem("username");
		localStorage.removeItem("isCandidate");

		axios
			.post("http://localhost:8000/apis/login/", {
				contact_email: formData.contact_email,
				password: formData.password,
			})
			.then((response) => {
				console.log(response.data);
				if (response.data.token) {
					// Store token in local storage securely
					localStorage.setItem("authToken", response.data.token);
					const username = response.data.username;
					const isCandidate = response.data.isCandidate;
					// const userData = {
					// 	username: username,
					// 	email: response.data.contact_email,
					// 	isCandidate: isCandidate,
					// };
					localStorage.setItem("username", username);
					localStorage.setItem("isCandidate", isCandidate);
					window.location.href = "/";
				} else {
					console.log("Login failed");
				}
			})
			.catch((error) => {
				console.log("failed to login");
				console.log(error);
			});
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
						name="contact_email"
						value={formData.contact_email}
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
