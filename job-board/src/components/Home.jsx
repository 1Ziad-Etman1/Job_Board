import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.scss"; // Import SCSS file

const Home = () => {
	return (
		<div className="home-container">
			<h2 className="home-title">Welcome to our Job Board</h2>
			<p className="home-description">
				Find the perfect job or hire the best talent
			</p>
			<div className="link">
				<Link to="/jobs" className="j-link">
					check Jobs
				</Link>
			</div>
		</div>
	);
};

export default Home;
