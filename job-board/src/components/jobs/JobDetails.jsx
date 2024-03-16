import React from "react";
import "./JobDetails.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
	const { jobId } = useParams();

	const [job, setJob] = useState({});
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchJob = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/apis/jobs/${jobId}`
				);
				setJob(response.data);
			} catch (error) {
				console.error("Failed to fetch job:", error);
			}
		};

		const fetchAllApplications = async () => {
			try {
				const response = await axios.get(
					"http://127.0.0.1:8000/apis/applications/"
				);
				if (response.data) {
					const applicationss = response.data;
					setApplications(applicationss);
					console.log("applications:");
					console.log(applications);
					console.log("response:");
					console.log(response.data);
				}
			} catch (error) {
				console.error("Failed to fetch applications:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchJob();
		fetchAllApplications();
		fetchAllApplications();
	}, []);

	const filteredApplicants = applications.filter(
		(application) => application.job === jobId
	);
	return (
		<div>
			<div className="job-details-container">
				<h2 className="job-title">{job.title}</h2>
				<p className="job-info">
					<span className="job-info-label">Company:</span>
					<span className="job-info-value">{job.company_name}</span>
				</p>
				<p className="job-info">
					<span className="job-info-label">Location:</span>
					<span className="job-info-value">{job.location}</span>
				</p>
				<p className="job-info">
					<span className="job-info-label">Description:</span>
					<span className="job-info-value">{job.description}</span>
				</p>
				<p className="job-info">
					<span className="job-info-label">Requirements:</span>

					<span className="job-info-value">{job.requirements}</span>
				</p>
				{localStorage.getItem("isCandidate") == "true" ? (
					<Link
						to={`/apply/${jobId}`}
						rel="noopener noreferrer"
						className="apply-button"
					>
						Apply Now
					</Link>
				) : (
					<></>
				)}
			</div>
			{!loading
				? localStorage.getItem("isCandidate") === "false" && (
						<></>
						// <div className="applicants-section">
						// 	<h3 className="section-title">Applicants</h3>
						// 	{filteredApplicants.map((applicant) => (
						// 		<div
						// 			className="applicant-details"
						// 			key={applicant.id}
						// 		>
						// 			<p>Name: {applicant.name}</p>
						// 			<p>Email: {applicant.contact_email}</p>
						// 		</div>
						// 	))}
						// </div>
				  )
				: localStorage.getItem("isCandidate") === "false" && (
						<div className="f">
							{/* <h3 className="section-title-l">loading...</h3> */}
						</div>
				  )}
		</div>
	);
};

export default JobDetails;
