import { Link } from "react-router-dom";
import "./Header.scss";
import { useEffect, useState } from "react";

const Header = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isCandidate, setIsCandidate] = useState(false);
	const [username, setUsername] = useState("");
	const handleLogout = () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("userData");
		localStorage.removeItem("username");
		localStorage.removeItem("isCandidate");
		setLoggedIn(false);
	};

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (!!token) {
			setLoggedIn(true);
			const x = localStorage.getItem("isCandidate") == "true";
			setUsername(localStorage.getItem("username"));
			setIsCandidate(x);
		} else {
			setLoggedIn(false);
		}
	});

	return (
		<>
			<div className="header">
				<div className="links">
					<Link className="logo" to="/">
						Job Board
					</Link>
					<p className="link">
						Hello {isCandidate ? <>Candidate </> : <>Employer</>}{" "}
						{username}
					</p>
				</div>

				<div className="links">
					{loggedIn ? (
						<>
							<Link to="/jobs" className="link">
								Jobs
							</Link>
							{!isCandidate ? (
								<Link to="/employer-dashboard" className="link">
									Employer Dashboard
								</Link>
							) : (
								<Link
									to="/candidate-dashboard"
									className="link"
								>
									Candidate Dashboard
								</Link>
							)}

							<Link
								to="/login"
								onClick={handleLogout}
								className="link"
							>
								Logout
							</Link>
						</>
					) : (
						<>
							<Link to="/login" className="link">
								Login
							</Link>
							<Link to="/register" className="link">
								Register
							</Link>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Header;
