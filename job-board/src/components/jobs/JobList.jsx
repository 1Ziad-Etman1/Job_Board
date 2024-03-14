import React from "react";
import "./JobList.scss";
import { Link } from "react-router-dom";

const JobList = () => {
	const jobs = [
		{
			id: 1,
			title: "Software Engineer",
			company: "ABC Inc.",
			location: "New York, NY",
		},
		{
			id: 2,
			title: "Data Analyst",
			company: "XYZ Corporation",
			location: "San Francisco, CA",
		},
		{
			id: 3,
			title: "Marketing Manager",
			company: "123 Industries",
			location: "Chicago, IL",
		},
	];

	return (
		<div className="job-list-container">
			<h2 className="job-list-title">Job Listings</h2>
			<ul className="job-list">
				{jobs.map((job, index) => (
					<li key={index} className="job-item">
						<h3 className="job-item-title">{job.title}</h3>
						<p className="job-item-company">{job.company}</p>
						<p className="job-item-location">{job.location}</p>
						<Link to={`/jobs/${job.id}`} className="job-item-link">
							View Details
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default JobList;
