import React from "react";
import "./EmployerD.scss";

const EmployerD = ({ employer }) => {
	const employerData = {
		companyName: "ABC Inc.",
		email: "info@abcinc.com",
		address: "123 Main St, Cityville, ABC",
		phoneNumber: "123-456-7890",
		website: "www.abcinc.com",
	};

	return (
		<div className="employer-dashboard-container">
			<h2 className="employer-dashboard-title">Employer Dashboard</h2>
			<div className="employer-details">
				<p>
					<span className="detail-label">Company Name:</span>{" "}
					{employerData.companyName}
				</p>
				<p>
					<span className="detail-label">Email:</span>{" "}
					{employerData.email}
				</p>
				<p>
					<span className="detail-label">Address:</span>{" "}
					{employerData.address}
				</p>
				<p>
					<span className="detail-label">Phone Number:</span>{" "}
					{employerData.phoneNumber}
				</p>
				<p>
					<span className="detail-label">Website:</span>{" "}
					<a
						href={employerData.website}
						target="_blank"
						rel="noopener noreferrer"
					>
						{employerData.website}
					</a>
				</p>
			</div>
		</div>
	);
};

export default EmployerD;
