import React from "react";
import "./CandidateD.scss"; // Import SCSS file

const CandidateD = ({ candidate }) => {
	// Temporary data for candidate
	const candidateData = {
		name: "John Doe",
		email: "john.doe@example.com",
		address: "456 Elm St, Townsville, XYZ",
		phoneNumber: "987-654-3210",
		skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
		experience: "2 years",
		education: "Bachelor's in Computer Science",
	};

	return (
		<div className="candidate-dashboard-container">
			<h2 className="candidate-dashboard-title">Candidate Dashboard</h2>
			<div className="candidate-details">
				<p>
					<span className="detail-label">Name:</span>{" "}
					{candidateData.name}
				</p>
				<p>
					<span className="detail-label">Email:</span>{" "}
					{candidateData.email}
				</p>
				<p>
					<span className="detail-label">Address:</span>{" "}
					{candidateData.address}
				</p>
				<p>
					<span className="detail-label">Phone Number:</span>{" "}
					{candidateData.phoneNumber}
				</p>
				<p>
					<span className="detail-label">Skills:</span>{" "}
					{candidateData.skills.join(", ")}
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
