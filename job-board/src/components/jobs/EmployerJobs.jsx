import React, { useEffect, useState } from "react";
import "./EmployerJobs.scss";
import { Link } from "react-router-dom";
import axios from "axios";
const EmployerJobs = () => {
	const [jobs, setJobs] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://127.0.0.1:8000/apis/jobs/"
				);
				const jbs = response.data.filter(
					(job) => job.employer == localStorage.getItem("username")
				);
				console.log(jbs);
				setJobs(jbs);
			} catch (error) {
				console.error("Failed to fetch jobs:", error);
			}
		};

		fetchData();
	}, []);
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

export default EmployerJobs;
