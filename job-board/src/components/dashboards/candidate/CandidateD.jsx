import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CandidateD.scss"; // Import SCSS file

const CandidateD = ({ candidate }) => {
	// Temporary data for candidate
	const [candidateData, setCandidateData] = useState({
		username: "",
		contact_email: "",
		contact_phone: "",
		skills: "",
		experience: "",
		education: "",
	});

	useEffect(() => {
		const fetchCandidateData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/apis/candidates/"
				);
				const username = localStorage.getItem("username");
				const candidate = response.data.find(
					(candidate) => candidate.username === username
				);
				setCandidateData(candidate);
			} catch (error) {
				console.error("Failed to fetch candidate data:", error);
			}
		};

		fetchCandidateData();
	}, []);

	return (
		<div className="candidate-dashboard-container">
			<h2 className="candidate-dashboard-title">Candidate Dashboard</h2>
			<div className="candidate-details">
				<p>
					<span className="detail-label">Name:</span>{" "}
					{candidateData.username}
				</p>
				<p>
					<span className="detail-label">Email:</span>{" "}
					{candidateData.contact_email}
				</p>
				<p>
					<span className="detail-label">Phone Number:</span>{" "}
					{candidateData.contact_phone}
				</p>
				<p>
					<span className="detail-label">Skills:</span>{" "}
					{candidateData.skills}
				</p>
				<p>
					<span className="detail-label">Experience:</span>{" "}
					{candidateData.experience}
				</p>
				<p>
					<span className="detail-label">Education:</span>{" "}
					{candidateData.education}
				</p>
			</div>
		</div>
	);
};

export default CandidateD;
