import React from "react";
import "./JobDetails.scss";
import { Link } from "react-router-dom";

const JobDetails = () => {
	const job = {
		title: "Software Engineer",
		company: "TechCorp",
		location: "New York, NY",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio eget est eleifend lacinia.",
		requirements: [
			"Bachelor's degree in Computer Science or related field",
			"2+ years of experience in software development",
			"Strong knowledge of JavaScript and React.js",
		],
		applyLink: "https://example.com/apply",
	};

	return (
		<div className="job-details-container">
			<h2 className="job-title">{job.title}</h2>
			<p className="job-info">
				<span className="job-info-label">Company:</span>
				<span className="job-info-value">{job.company}</span>
			</p>
			<p className="job-info">
				<span className="job-info-label">Location:</span>
				<span className="job-info-value">{job.location}</span>
			</p>
			<p className="job-description">{job.description}</p>
			<div className="job-requirements">
				<p className="job-requirements-title">Requirements:</p>
				<ul className="job-requirements-list">
					{job.requirements.map((requirement, index) => (
						<li key={index} className="job-requirement">
							{requirement}
						</li>
					))}
				</ul>
			</div>
			<Link
				to="/apply/:id"
				rel="noopener noreferrer"
				className="apply-button"
			>
				Apply Now
			</Link>
		</div>
	);
};

export default JobDetails;
