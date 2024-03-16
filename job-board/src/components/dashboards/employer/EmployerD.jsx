import React, { useState, useEffect } from "react";
import "./EmployerD.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployerD = () => {
	const [employerData, setEmployerData] = useState({
		username: "",
		contact_email: "",
		contact_phone: "",
		company_name: "",
	});

	useEffect(() => {
		const fetchAllEmployers = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/apis/employers/"
				);
				return response.data;
			} catch (error) {
				console.error("Failed to fetch employers:", error);
				return [];
			}
		};
		const fetchEmployerByUsername = async () => {
			const employers = await fetchAllEmployers();
			const username = localStorage.getItem("username");
			const filteredEmployer = employers.find(
				(employer) => employer.username === username
			);
			setEmployerData(filteredEmployer);
			console.log(employers);
			console.log("hello");
			console.log(filteredEmployer);
		};

		fetchEmployerByUsername();
	}, []);

	return (
		<div className="employer-dashboard-container">
			<div className="l">
				<h2 className="employer-dashboard-title">Employer Dashboard</h2>
				<Link to={`/employer-jobs/${employerData.id}`} className="jobs">
					Your Jobs
				</Link>
			</div>
			<div className="employer-details">
				<p>
					<span className="detail-label">Name:</span>{" "}
					{employerData.username}
				</p>
				<p>
					<span className="detail-label">Company Name:</span>{" "}
					{employerData.company_name}
				</p>
				<p>
					<span className="detail-label">Email:</span>{" "}
					{employerData.contact_email}
				</p>
				<p>
					<span className="detail-label">Phone Number:</span>{" "}
					{employerData.contact_phone}
				</p>
			</div>
		</div>
	);
};

export default EmployerD;
