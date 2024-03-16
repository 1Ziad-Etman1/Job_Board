import React, { useState } from "react";
import axios from "axios";
import "./Register.scss";

const Register = () => {
	// Temporary data for registration
	const [cFormData, setCFormData] = useState({
		username: "",
		contact_email: "",
		password: "",
		contact_phone: "",
		skills: "",
		experience: "",
		education: "",
	});

	const [eFormData, setEFormData] = useState({
		username: "",
		contact_email: "",
		password: "",
		contact_phone: "",
		company_name: "",
	});

	const [isCandidate, setIsCandidate] = useState(false);
	const [isEmployer, setIsEmployer] = useState(false);

	// Handler for form input changes
	const handleChange = (e) => {
		if (isEmployer) {
			setEFormData({
				...eFormData,
				[e.target.name]: e.target.value,
			});
		} else {
			setCFormData({
				...cFormData,
				[e.target.name]: e.target.value,
			});
		}
	};

	// Handler for form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isCandidate) {
				const endpoint = "http://localhost:8000/apis/register/";
				const response = await axios.post(endpoint, cFormData);
				console.log("Registration successful:", response.data);
				alert("Registration successful!");
			} else {
				const endpoint = "http://localhost:8000/apis/register/";
				const response = await axios.post(endpoint, eFormData);
				console.log("Registration successful:", response.data);
				alert("Registration successful!");
			}

			setCFormData({
				username: "",
				contact_email: "",
				password: "",
				contact_phone: "",
				skills: "",
				experience: "",
				education: "",
			});
			setEFormData({
				username: "",
				contact_email: "",
				password: "",
				contact_phone: "",
				company_name: "",
			});
		} catch (error) {
			console.log("Error in Registration: ", error);
		}
	};

	return (
		<div className="register-container">
			<h2 className="register-title">Register</h2>
			<div className="choices">
				<button
					className="btn-choose"
					onClick={() => {
						setIsCandidate(true);
						setIsEmployer(false);
						setEFormData({
							username: "",
							contact_email: "",
							password: "",
							contact_phone: "",
							company_name: "",
						});
					}}
				>
					Candidate
				</button>
				<button
					className="btn-choose"
					onClick={() => {
						setIsCandidate(false);
						setIsEmployer(true);
						setCFormData({
							username: "",
							contact_email: "",
							password: "",
							contact_phone: "",
							skills: "",
							experience: "",
							education: "",
						});
					}}
				>
					Employer
				</button>
			</div>
			{(isCandidate || isEmployer) && (
				<form onSubmit={handleSubmit} className="register-form">
					{isCandidate ? (
						<>
							<div className="form-group">
								<label htmlFor="name" className="form-label">
									Username:
								</label>
								<input
									type="text"
									id="name"
									name="username"
									value={cFormData.username}
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
									name="contact_email"
									value={cFormData.contact_email}
									onChange={handleChange}
									className="form-input"
									required
								/>
							</div>
							<div className="form-group">
								<label
									htmlFor="password"
									className="form-label"
								>
									Password:
								</label>
								<input
									type="password"
									id="password"
									name="password"
									value={cFormData.password}
									onChange={handleChange}
									className="form-input"
									required
								/>
							</div>
							<div className="form-group">
								<label
									htmlFor="phoneNumber"
									className="form-label"
								>
									Phone Number:
								</label>
								<input
									type="tel"
									id="phoneNumber"
									name="contact_phone"
									value={cFormData.contact_phone}
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
									value={cFormData.skills}
									onChange={handleChange}
									className="form-input"
									required
								/>
							</div>
							<div className="form-group">
								<label
									htmlFor="experience"
									className="form-label"
								>
									Experience:
								</label>
								<input
									type="text"
									id="experience"
									name="experience"
									value={cFormData.experience}
									onChange={handleChange}
									className="form-input"
									required
								/>
							</div>
							<div className="form-group">
								<label
									htmlFor="education"
									className="form-label"
								>
									Education:
								</label>
								<input
									type="text"
									id="education"
									name="education"
									value={cFormData.education}
									onChange={handleChange}
									className="form-input"
									required
								/>
							</div>
						</>
					) : (
						<>
							<div className="form-group">
								<label htmlFor="name" className="form-label">
									Username:
								</label>
								<input
									type="text"
									id="name"
									name="username"
									value={eFormData.username}
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
									name="contact_email"
									value={eFormData.contact_email}
									onChange={handleChange}
									className="form-input"
									required
								/>
							</div>
							<div className="form-group">
								<label
									htmlFor="password"
									className="form-label"
								>
									Password:
								</label>
								<input
									type="password"
									id="password"
									name="password"
									value={eFormData.password}
									onChange={handleChange}
									className="form-input"
									required
								/>
							</div>
							<div className="form-group">
								<label
									htmlFor="phoneNumber"
									className="form-label"
								>
									Phone Number:
								</label>
								<input
									type="tel"
									id="phoneNumber"
									name="contact_phone"
									value={eFormData.contact_phone}
									onChange={handleChange}
									className="form-input"
									required
								/>
							</div>
							<div className="form-group">
								<label
									htmlFor="companyName"
									className="form-label"
								>
									Company Name:
								</label>
								<input
									type="text"
									id="companyName"
									name="company_name"
									value={eFormData.company_name}
									onChange={handleChange}
									className="form-input"
									required
								/>
							</div>
						</>
					)}

					<button type="submit" className="btn-register">
						Register
					</button>
				</form>
			)}
		</div>
	);
};

export default Register;

{
	/* <div className="form-group">
						<label htmlFor="companyName" className="form-label">
							Company Name:
						</label>
						<input
							type="text"
							id="companyName"
							name="companyName"
							value={formData.companyName}
							onChange={handleChange}
							className="form-input"
							required
						/>
					</div> */
}

// <form onSubmit={handleSubmit} className="register-form">
// 					<div className="form-group">
// 						<label className="form-label">Username:</label>
// 						<input
// 							type="text"
// 							name="name"
// 							value={formData.name}
// 							onChange={handleChange}
// 							className="form-input"
// 							required
// 						/>
// 					</div>
// 					<div className="form-group">
// 						<label className="form-label">Email:</label>
// 						<input
// 							type="email"
// 							name="email"
// 							value={formData.email}
// 							onChange={handleChange}
// 							className="form-input"
// 							required
// 						/>
// 					</div>
// 					<div className="form-group">
// 						<label className="form-label">Password:</label>
// 						<input
// 							type="password"
// 							name="password"
// 							value={formData.password}
// 							onChange={handleChange}
// 							className="form-input"
// 							required
// 						/>
// 					</div>
// 					<div className="form-group">
// 						<label className="form-label">Phone Number:</label>
// 						<input
// 							type="text"
// 							name="phoneNumber"
// 							value={formData.phoneNumber}
// 							onChange={handleChange}
// 							className="form-input"
// 							required
// 						/>
// 					</div>
// </form>
