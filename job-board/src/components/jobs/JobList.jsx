import React, { useEffect, useState } from "react";
import "./JobList.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const JobList = () => {
	const [jobs, setJobs] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://127.0.0.1:8000/apis/jobs/"
				);
				setJobs(response.data);
			} catch (error) {
				console.error("Failed to fetch jobs:", error);
			}
		};

		fetchData();
	}, []);

	// Filter jobs based on search term
	const filteredJobs = jobs.filter((job) =>
		job.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="job-list-container">
			<div className="h">
				<h2 className="job-list-title">Job Listings</h2>
				{localStorage.isCandidate == "false" ? (
					<Link to="/add-job/" className="add-btn">
						Add Job
					</Link>
				) : (
					<></>
				)}
			</div>

			<input
				type="text"
				placeholder="Search by job title"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="search-bar"
			/>

			<ul className="job-list">
				{filteredJobs.map((job, index) => (
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
